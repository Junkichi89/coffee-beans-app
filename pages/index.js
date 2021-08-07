import axios from 'axios';
import { useRouter } from 'next/router';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import firebase from '../lib/cilentApp.js';
//TODO:ここがいっぱいになりそうでうざいのでなんとかしたい 何か方法ないか探す

export default function Home() {
  const router = useRouter();

  const db = firebase.firestore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submitボタンを押すと発火する、引数にフォーム内で入力された値の格納されたdataを渡す
  const onSubmit = async (data, e) => {
    e.preventDefault();

    await db
    .collection('coffee-beans')
    .add({...data})
    .then((req) => {
      console.log(req);
      console.log('Document successfully written!');
      router.push('/posts')
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });

  };

  return (
    <Container>
      <Row className='mt-5 justify-content-center'>
        <Col lg={8} md={10} sm={10}>
          <Card>
            <Card.Body>
              <Card.Title>Post App</Card.Title>
              <Form>
                <Form.Group
                  className='mb-3'
                  controlId='exampleForm.ControlInput'
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Text input'
                    {...register('title', { required: true })}
                  />
                  <Col>
                    {errors.title && errors.title.type === 'required' && (
                      <Alert variant='danger'>This is required</Alert>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group
                  className='mb-3'
                  controlId='exampleForm.ControlTextarea'
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    {...register('description', { required: true })}
                    as='textarea'
                    placeholder='write description'
                    rows={3}
                  />
                  <Col>
                    {errors.description &&
                      errors.description.type === 'required' && (
                        <Alert variant='danger'>This is required</Alert>
                      )}
                  </Col>
                </Form.Group>
                <Button
                  variant='primary'
                  className='me-3'
                  // フォーム内に入力されたデータを引数にもつonSubmitを発火
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
                <Button
                  variant='outline-secondary'
                  // フォーム内のデータを引数にもつonDraftSubmitを発火
                  onClick={handleSubmit(onSubmit)}
                >
                  Draft
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
