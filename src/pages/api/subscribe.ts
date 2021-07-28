import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../services/stripe'
import { getSession } from 'next-auth/client'
import { fauna } from '../../services/fauna';
import { query as q } from 'faunadb';

type User = {
  ref: {
    id: string;
  }
  data: {
    stripe_customer_id: string;
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req }); //pega o usuário da sessão nos cookies salvos pelo next

  const user = await fauna.query<User>( //checa dentro do banco de dados a existência de um usuário com o email (já logado)
    q.Get(
      q.Match(
        q.Index('user_by_email'),
        q.Casefold(session.user.email) // session user email é pego pelos cookies do next gerados dentro do sv node.
      )
    )
  )
  let customerId = user.data.stripe_customer_id; // cria variável customerId

  if (!customerId) { // checa se a variável existe - caso exista (quer dizer que o usuário está logado com o github) cria o cliente dentro da API do stripe
    //a partir do email dele.
    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
      //metadata
    });
    await fauna.query( // depois de criado o usuário na api stripe, atualiza o objeto salvo na tabela users com a referencia user.ref.id que vêm da requisição do fauna db - caso exista o user ele pega a referência, dentro da query na coleção users no índice user.ref.id (o fauna só pega atualização pelo ref) ele atualiza o objeto colocando dentro dele o stripe_customer_id
      q.Update(
        q.Ref(q.Collection('users'), user.ref.id),
        {
          data: {
            stripe_customer_id: stripeCustomer.id,
          }
        }
      )
    )
    customerId = stripeCustomer.id;
  }

  if (req.method === 'POST') { // caso a chamada da API seja post (quando clicado no botão subscribe)

    const stripeCheckoutSession = await stripe.checkout.sessions.create({ // cria uma sessão de checkout (pagina do stripe) passando o id do usuário (criado anteriormente pelo método stripe.customers.create) passa o id dele, método de pagamento, endereço de cobrança, line_intens (item comprado q recebe pelo price('id de referencia do produto') e quantidade), modo subscription (recorrente) allowPromotionCode => habilita cupons, success url e cancel_url devem sempre constar no método de requisição//
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1JFTf4Ktc53BpqjTvKR5dDn3', quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })

    return res.status(200).json({ sessionId: stripeCheckoutSession.id }) // retorna da sessão o id da sessão de checkout

  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not Allowed')
  }
}
