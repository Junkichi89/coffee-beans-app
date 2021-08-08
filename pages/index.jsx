import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from 'react-bootstrap';
import { useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoId, setTodoId] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const [editIndex, setEditIndex] = useState(-1);
  const [newTitle, setNewTitle] = useState('');

  const handleFormData = (e) => {
    setTodoTitle(e.target.value);
  };

  const handleEditFormData = (e) => {
    setNewTitle(e.target.value);
  };

  /** 編集フォーム表示 */
  const openEditForm = (data, index) => {
    const newTodos = todos.map((todo) =>
      todo.id == data.id
        ? { id: todo.id, title: todo.title, isEditable: true }
        : { id: todo.id, title: todo.title, isEditable: todo.isEditable }
    );
console.log(data)
    // data.isEditable = true
    setEditIndex(index);
    setTodos(newTodos);
    const targetTodos = todos.filter((todo) => todo.id == data.id);
    setIsDisabled(true)
    setNewTitle(targetTodos[0].title);
  };

  /** 編集フォームを閉じる */
  const closeEditForm = (data) => {
    const newTodos = todos.map((todo) =>
      todo.id == data.id
        ? { id: todo.id, title: todo.title, isEditable: false }
        : { id: todo.id, title: todo.title, isEditable: todo.isEditable}
    );
    setTodos(newTodos);
    setIsDisabled(false)
    setEditIndex(-1);
  };

  const addTodo = () => {
    setTodos([...todos, { id: todoId, title: todoTitle, isEditable: false }]);
    setTodoId(todoId + 1);
    resetFormInput();
  };

  const resetFormInput = () => {
    setTodoTitle('');
  };

  const editTodo = (data) => {
    todos[editIndex].title = newTitle;
    setNewTitle('');
    closeEditForm(data);
    setEditIndex(-1);
  };

  const deleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => todo !== targetTodo));
  };

  console.log(todos)
  return (
    <Container>
      <Row className='mt-5 justify-content-center'>
        <Col lg={8} md={10} sm={10}>
          <Card>
            <Card.Body>
              <Card.Title>Post App</Card.Title>
              <Form.Label>Title</Form.Label>
              <FormControl
                className='mb-3'
                type='text'
                placeholder='Text input'
                value={todoTitle}
                onChange={handleFormData}
              />
              <Button variant='primary' className='me-3' onClick={addTodo}>
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {todos.map((todo, index) => (
        <Row className='mt-2 justify-content-center' key={todo.id}>
          <Col lg={8} md={10} sm={10}>
            <Card>
              <Card.Body>
                <Card.Title>{todo.title}</Card.Title>
                {!todo.isEditable ? (
                  /* 新規作成フォーム */
                  <>
                    <Button
                      className={'mx-2'}
                      variant='outline-success'
                      onClick={() => openEditForm(todo, index)}
                      disabled={isDisabled}
                    >
                      編集
                    </Button>
                  </>
                ) : (
                  <>
                    <FormControl
                      type='text'
                      label='新しいタイトル'
                      value={newTitle}
                      onChange={handleEditFormData}
                    />
                    <Button
                      onClick={() => editTodo(todo)}
                      className={'mx-2'}
                      variant='outline-success'
                    >
                      編集を保存
                    </Button>
                    <Button
                      className={'mx-2'}
                      variant='outline-info'
                      onClick={() => closeEditForm(todo)}
                    >
                      キャンセル
                    </Button>
                  </>
                )}
                <Button
                  variant='outline-danger'
                  className={'mx-2'}
                  onClick={() => deleteTodo(todo)}
                >
                  DELETE
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
}
