import { Col, Container, Row } from 'react-bootstrap'
import { client } from '../../libs/client'

export default function RecipeId({ recipe }) {
  return (
    <Container>
      <h1 className="mt-5">{recipe.title}</h1>
      <Row className="mt-5">
        <Col>{recipe.publishedAt}</Col>
      </Row>
      <Row className="mt-5">
        <Col>{recipe.description}</Col>
      </Row>
    </Container>
  )
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'recipe' })
  const paths = data.contents.map((content) => `/recipes/${content.id}`)
  return {
    paths,
    fallback: false // getStaticPathsで返されないパスをすべて404ページで返します。
  }
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id
  const data = await client.get({ endpoint: 'recipe', contentId: id })
  return {
    props: {
      recipe: data
    }
  }
}
