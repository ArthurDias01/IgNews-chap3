import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';
import styles from './home.module.scss';
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe';
import Image from 'next/image'
import AvatarImg from '../../public/images/avatar.svg';


// formas de fazer chamadas à API
// Client-side (padrão de estado use effect)
// Server-side (GetServerSideProps - chamada feita à nivel servidor NODE(next))
// Static-site Generation (chamada feita 1vez fica salva por X período de  tempo)


export default function Home({ product }) {
  return (
    <>
      <Head>
        <title>Home | ig.News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome!</span>
          <h1>News about the <span>React</span> world</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} monthly</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image src={AvatarImg} alt="Girl Coding" />
      </main>

    </>
  );
}

//Chamada à API via SSG (static site generation)
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JFTf4Ktc53BpqjTvKR5dDn3')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24,//tempo em segundo sem revalidar a informação - 24h
  }
}

//Chamada à API via SSR
// export const getServerSideProps: GetServerSideProps = async () => {
//   const price = await stripe.prices.retrieve('price_1JFTf4Ktc53BpqjTvKR5dDn3')

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(price.unit_amount / 100),
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }
