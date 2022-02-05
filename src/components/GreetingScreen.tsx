import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const GreetingScreen = ({
  setGameMode,
  setGameStep,
}: {
  setGameMode: any;
  setGameStep: any;
}) => (
  <React.Fragment>
    <header className="mt-5">
      <h1>Rick and Morty memory game</h1>
    </header>
    <Container className="mt-5">
      <Row className="my-5 justify-content-center" xl={3}>
        <img
          src="https://i.pinimg.com/originals/78/84/1e/78841ebe0e2d748ed2f3e6d88ea5bf6f.png"
          alt="Rick and morty"
        />
      </Row>
      <Row className="my-3 justify-content-center">
        <h3>Pick game mode</h3>
      </Row>
      <Row className="justify-content-center">
        <Col className="my-2" lg={3} sm={12}>
          <button
            onClick={() => {
              setGameMode("single");
              setGameStep(1);
            }}
          >
            Single player
          </button>
        </Col>
        <Col className="my-2" lg={3} sm={12}>
          <button
            onClick={() => {
              setGameMode("multi");
              setGameStep(1);
            }}
          >
            Two players
          </button>
        </Col>
      </Row>
    </Container>
  </React.Fragment>
);

export default GreetingScreen;
