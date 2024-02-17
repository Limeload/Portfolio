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
            <a className="relative z-10 mt-4 flex item-center text-sm font-medium text-teal-500" href="https://medium.com/@shraddharao_">
      Find more blogs
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 m-1.5 stroke-current"><path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </a>
          </div>
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
