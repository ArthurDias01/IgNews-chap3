<h1 align="center">
<br>
  <img src="./public/images/logo.svg" alt="Ignews" width="250">
<br>
<br>
</h1>

<p align="center">Portal de notícias com CMS e meio de pagamento integrado</p> 
 <p align="center">Aplicação desenvolvida no curso IGNITE da <a href="https://www.rocketseat.com.br/">@rocketseat</a> </p>

<p align="center">
  <a href="https://github.com/ArthurDias01/ignews/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>  
</p>

## 🎯 Sobre | About
[PT-BR]
<p>O ignews é um portal de notícias no qual os usuários pagam para ter acesso. O usuário só pode ver as postagens completas caso ele tenha uma inscrição ativa no Stripe. caso o usuário não seja inscrito, poderá ler apenas um resumo das postagens.
</p>
<p>
  Os meios de pagamento da aplicação são integrados com a API do Stripe, juntamente do FaunaDB para armazenar as informações dos usuários. as postagens são administradas através do CMS Prismic.io 
 </p>
 <p>A aplicação é construída com modelo <strong>Serveless</strong>, sem necessidade de criar uma API externa para manipular os dados 🚀</p>
 
 [EN]
 
 <p>IGnews is a news portal where users pay to have access. The user can only see full posts if they have an active Stripe subscription. if the user is not subscribed, he will only be able to read a summary of the posts.
</p>
<p>
  The application's payment methods are integrated with the Stripe API, together with FaunaDB to store user information. posts are managed through CMS Prismic.io
 </p>
 <p>The application is built with a <strong>Serveless</strong> model, without the need to create an external API to manipulate the data 🚀</p>

## 🚀 Techs
- [NextJS](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [FaunaDB](https://fauna.com/)
- [Stripe](https://stripe.com/docs/payments)
- [Prismic.io](https://prismic.io/)



## :fire: Execução da aplicação em produção | Execute in Production App

[PT-BR]
- Link da aplicação: https://ignews-deploy-roan.vercel.app/
- :credit_card: para realizar a assinatura sem precisar usar seu cartão de crédito, pode utilizar esse número fake: ``` 4242 4242 4242 4242 ```

[EN]
- Application link: https://ignews-deploy-roan.vercel.app/
- :credit_card: to subscribe without having to use your credit card, you can use this fake number: ``` 4242 4242 4242 4242 ```

## :octocat: Execução da aplicação em desenvolvimento | In development Execution
- Requisítos: Instalar [Git](https://git-scm.com/), [Node](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/)
- Baixar o repositório na máquina e entrar no projeto:
```bash
$ git clone https://github.com/ArthurDias01/IgNews-chap3.git
$ cd ignews
```
- baixar as dependências do projeto e executar o projeto:
```bash
$ yarn
$ yarn dev
```
