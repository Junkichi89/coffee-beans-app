import axios from 'axios'
import { useRouter } from 'next/router'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
//TODO:ここがいっぱいになりそうでうざいのでなんとかしたい 何か方法ないか探す

// TODO:下書きデータをこのページで表示して、どこかに一覧で表示させてクリックすると編集できるようにしてみたい
export default function Home() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onDraftSubmit = (data, e) => {
    e.preventDefault()
    const headers = {
      'Content-Type': 'application/json'
    }

    // 下書きにする場合にpostするデータに公開情報(key=public)を追加
    const draftData = { ...data, public: false }

    axios
      .post('/api/register', draftData, { headers })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    router.push('/draft')
  }

  // Submitボタンを押すと発火する、引数にフォーム内で入力された値の格納されたdataを渡す
  const onSubmit = (data, e) => {
    e.preventDefault()
    const headers = {
      'Content-Type': 'application/json'
    }
    // 下書きにする場合にpostするデータに公開情報(key=public)を追加
    const postData = { ...data, public: true }

    axios
      .post('/api/register', postData, {
        headers
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    router.push('/recipes')
  }

  return (
    <Container>
      <Row className="mt-5 justify-content-center">
        <Col lg={8} md={10} sm={10}>
          <Card>
            <Card.Body>
              <Card.Title>Post App</Card.Title>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Text input"
                    {...register('title', { required: true })}
                  />
                  <Col>
                    {errors.title && errors.title.type === 'required' && (
                      <Alert variant="danger">This is required</Alert>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    {...register('description', { required: true })}
                    as="textarea"
                    placeholder="write description"
                    rows={3}
                  />
                  <Col>
                    {errors.description &&
                      errors.description.type === 'required' && (
                        <Alert variant="danger">This is required</Alert>
                      )}
                  </Col>
                </Form.Group>
                <Button
                  variant="primary"
                  className="me-3"
                  // フォーム内に入力されたデータを引数にもつonSubmitを発火
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
                <Button
                  variant="outline-secondary"
                  // フォーム内のデータを引数にもつonDraftSubmitを発火
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
