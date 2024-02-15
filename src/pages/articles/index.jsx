import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Blogs - Shraddha Rao</title>
        <meta
          name="description"
          content="Welcome to my digital diary, where I share insights, musings, and adventures from my coding escapades. Dive into a world of technology, creativity, and problem-solving as I navigate through the ever-evolving landscape of software engineering. "
        />
      </Head>
      <SimpleLayout
        title="Code Chronicles"
        intro="Welcome to my digital diary, where I share insights, musings, and adventures from my coding escapades. Dive into a world of technology, creativity, and problem-solving as I navigate through the ever-evolving landscape of software engineering."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16 my-12">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <a className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded" href="https://medium.com/@shraddharao_">
      Find more blogs
      </a>
        </div>
      </SimpleLayout>

    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  }
}
