import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import ScatterWrapper from './Components/ScatterWrapper';
import { useEffect, useState } from 'react';
import Table from './Components/Table';
import { json } from 'd3';

function App() {
  const [data, setData] = useState([]);
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    json('https://udemy-react-d3.firebaseio.com/children.json').then((d) => {
      setData(d);
    });
  }, []);

  const updateData = (target, type) => {
    if (type === 'remove') {
      setData(data.filter((d) => d.name !== target));
    } else if (type === 'add') {
      setData(data.concat(target));
    }
  };

  const handleHover = (name) => {
    setSelectedName(name);
  };

  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand href="#home">D3 Practice</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col md={6} xs={12}>
            <ScatterWrapper data={data} onHover={handleHover} />
          </Col>
          <Col md={6} xs={12}>
            <Table
              data={data}
              updateData={updateData}
              selectedName={selectedName}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
