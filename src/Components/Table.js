import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Fragment, useState } from 'react';

export default function Table({ data, updateData, selectedName }) {
  const [input, setInput] = useState({
    name: '',
    age: '',
    height: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    console.log(input);
  };

  const renderRows = (student) => {
    return (
      <Row
        key={student.name}
        style={{
          marginTop: '10px',
          backgroundColor: student.name === selectedName ? '#CCC' : 'white',
          alignItems: 'center',
        }}
      >
        <Col xs={3}>
          <span>{student.name}</span>
        </Col>
        <Col xs={3}>
          <span>{student.height}</span>
        </Col>
        <Col xs={3}>
          <span>{student.age}</span>
        </Col>
        <Col>
          <Button
            variant={'danger'}
            type={'button'}
            style={{ width: '100%' }}
            name={student.name}
            onClick={handleRemove}
          >
            Delete
          </Button>
        </Col>
      </Row>
    );
  };

  const handleRemove = (e) => {
    updateData(e.target.name, 'remove');
  };

  const handleSubmit = () => {
    updateData(input, 'add');
  };
  return (
    <Fragment>
      <Row>
        <Col xs={3}>
          <Form.Control placeholder="Name" name="name" onChange={handleInput} />
        </Col>
        <Col xs={3}>
          <Form.Control
            placeholder="Height"
            name="height"
            onChange={handleInput}
            value={input.height}
          />
        </Col>
        <Col xs={3}>
          <Form.Control
            placeholder="Age"
            name="age"
            onChange={handleInput}
            value={input.age}
          />
        </Col>
        <Col>
          <Button
            variant={'primary'}
            type={'button'}
            style={{ width: '100%' }}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Col>
      </Row>
      {data.map(renderRows)}
    </Fragment>
  );
}
