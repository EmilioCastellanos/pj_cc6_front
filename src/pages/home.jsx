import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="homeDiv">
      <Container className="d-flex flex-column justify-content-center align-items-center" id={'homeContainer'}>
        <Row className="text-center">
          <Col>
            <Link to="/tracking">
              <Button className="menu-button mb-3 defaultButt">Tracking</Button>
            </Link>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Link to="/solicitar-envio">
              <Button className="menu-button mb-3 defaultButt">Solicitar Envío</Button>
            </Link>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Link to="/disponibilidad">
              <Button className="menu-button mb-3 defaultButt">Disponibilidad</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
