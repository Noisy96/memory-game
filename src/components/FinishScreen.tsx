import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import { secondsToTime } from "../utilities/methods";

const FinishScreen = ({
  winTime,
  winner,
  gameMode,
  handleNewGame,
}: {
  winTime?: number;
  winner?: number;
  gameMode?: string;
  handleNewGame: () => void;
}) => {

  return (
    <React.Fragment>
      <Container>
        <Row className="my-5">
          <Col className="text-end">
            <button onClick={() => handleNewGame()}>New game</button>
          </Col>
          <header>
            <h1 className="text-size-10">Congratulations!!</h1>
          </header>
        </Row>
        <Row xs={2} xl={4} className="justify-content-center">
          <img
            src="https://i.pinimg.com/originals/ce/6b/20/ce6b20604cd7fad41295338e8423870d.png"
            alt="picke rick as a trophy"
          />
        </Row>

        {gameMode === "multi" ? (
          <Row className="my-5">
            {winner ? <h1>Player {winner} won</h1> : <h1>Undefined</h1>}
          </Row>
        ) : (
          <div>
            <Row className="my-5">
              <h1>
                Your time is:{" "}
                <big>
                  <b>{winTime ? secondsToTime(winTime) : "undefined"}</b>
                </big>
              </h1>
            </Row>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};

export default FinishScreen;
