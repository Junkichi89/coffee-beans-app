import axios from 'axios'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { client } from '../../../libs/client'
//TODO:ここがいっぱいになりそうでうざいのでなんとかしたい 何か方法ないか探す

export default function DraftPage({ recipe }) {
  const { register, handleSubmit } = useForm()

  //asanumaアカウントで確認できるように変更
  const onDraftSubmit = (data, e) => {
    e.preventDefault()
    const headers = {
      'Content-Type': 'application/json',
      'X-WRITE-API-KEY': process.env.NEXT_PUBLIC_WRITE_API_KEY
    }

    // 下書きにする場合にpostするデータに公開情報(key=public)を追加
    const draftData = { ...data, public: false }
    axios
      // postをpatch処理に変更 エンドポイントにcontentのIDを設定するため`/${recipe.id}`を追加
      .patch(process.env.NEXT_PUBLIC_CMS_URL + `/${recipe.id}`, draftData, {
        headers
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Submitボタンを押すと発火する、引数にフォーム内で入力された値の格納されたdataを渡す
  const onSubmit = (data, e) => {
    e.preventDefault()
    const headers = {
      'Content-Type': 'application/json',
      'X-WRITE-API-KEY': process.env.NEXT_PUBLIC_WRITE_API_KEY
    }

    // 下書きにする場合にpostするデータに公開情報(key=public)を追加
    const postData = { ...data, public: true }

    axios
      // postをpatch処理に変更 エンドポイントにcontentのIDを設定するため`/${recipe.id}`を追加
      .patch(process.env.NEXT_PUBLIC_CMS_URL + `/${recipe.id}`, postData, {
        headers
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <Container>
      <Row className="mt-5 justify-content-center">
        <Col lg={8} md={10} sm={10}>
          <Card>
            <Card.Body>
              <Card.Title>Draft Edit</Card.Title>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    defaultValue={recipe.title}
                    type="text"
                    placeholder="Text input"
                    {...register('title')}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    defaultValue={recipe.description}
                    {...register('description')}
                    as="textarea"
                    placeholder="write description"
                    rows={3}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className="me-3"
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={handleSubmit(onDraftSubmit)}
                >
                  Draft
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'recipe' })
  const paths = data.contents.map((content) => `/draft/edit/${content.id}`)

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
