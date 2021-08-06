import Link from 'next/link'
import { Card, Container } from 'react-bootstrap'
import { client } from '../../libs/client'

export default function RecipeId({ recipe }) {
  return (
    <Container>
      <Card className={'mt-5'}>
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Subtitle>{recipe.publishedAt}</Card.Subtitle>
          <div
            dangerouslySetInnerHTML={{
              __html: `${recipe.description}`
            }}
          />
          <Link href={`/draft/edit/${recipe.id}`}>
            <a>Edit</a>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  )
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  //TODO:endpointをrecipeに戻す
  const data = await client.get({ endpoint: 'recipe' })
  //TODO:urlを/recipe/~~~に戻す
  const paths = data.contents.map((content) => `/draft/${content.id}`)

  return {
    paths,
    fallback: false // getStaticPathsで返されないパスをすべて404ページで返します。
  }
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id
  // TODO:endpointをrecipeに戻す
  const data = await client.get({ endpoint: 'recipe', contentId: id })
  return {
    props: {
      recipe: data
    }
  }
}
