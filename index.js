import Link from 'next/link'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { client } from '../../libs/client'

export default function Recipes({ recipe }) {
  return (
    <Container>
      <h1 className="mt-5">Post Lists</h1>
      <Row className="mt-5">
        {recipe.map((recipe) => (
          <Col lg="4" key={recipe.id}>
            <Card>
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Button variant="primary">
                  <Link href={`/recipes/${recipe.id}`}>
                    <a>詳しく見る</a>
                  </Link>
                </Button>
                <Button variant="danger">削除</Button>
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
