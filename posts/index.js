import Link from 'next/link'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { client } from '../../libs/client'

export default function PostList({ recipe }) {
  // 下書きの投稿だけrecipesに集めて表示させる
  const recipes = recipe.filter((rec) => rec.public === true)
  return (
    <Container>
      <h1 className="mt-5">Post List</h1>
      <Row className="mt-5">
        {recipes.map((recipe) => (
          <Col lg="4" key={recipe.id}>
            <Card>
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card&apos;s content.
                </Card.Text>
                <Link href={`/posts/${recipe.id}`}>
                  <a>詳しく見る</a>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'recipe' })

  return {
    props: {
      recipe: data.contents
    }
  }
}
