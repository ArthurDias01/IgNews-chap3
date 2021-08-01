import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";
import styles from '../post.module.scss';

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

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
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={styles.continueReading}>
            Wanna continue Reading?
            <Link href="/">
              <a href="">Subscribe now!🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

// a função getStaticPaths identifica quais "arquivos / paginas" serão gerados estaticamente no momento da build. Dessa forma a build gera todos os arquivos q estiverem identificados na função.
//Caso o array esteja vazio ele gera apenas no momento do primeiro acesso.
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('publication', String(slug), {})
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
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }
  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  }
}
