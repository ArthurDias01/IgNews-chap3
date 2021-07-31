import { GetServerSideProps } from "next"
import Head from 'next/head'
import { getSession } from "next-auth/client";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";
import styles from './post.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

//toda pagina gerada de forma estática (getStaticSiteProps) é uma página não protegida (publica) por isso usa-se getServerSideProps
export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | IgNews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            //atributo dangerouslySetInnerHTML permite inserir ou injetar qualquer coisa HTML dentro do componente, deve-se tomar cuidado para não permitir que seja injetado scripts maliciosos através dessa brecha aberta pela tag. No caso o prismic tem a tratativa para não permitir essa injeção de script por isso podemos usar quando na utilização do prismic como CMS.
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (session === null || !session.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  const prismic = await getPrismicClient(req);
  const response = await prismic.getByUID('post', String(slug), {})
  if (!response) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }
  return {
    props: {
      post,
    }
  }
}