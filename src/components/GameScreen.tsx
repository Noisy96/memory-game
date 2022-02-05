import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";

// Utilities
import { secondsToTime } from "../utilities/methods";
import { CardInt } from "../utilities/interfaces";

// Card back cover
import cardBack from "../assets/images/card-back.jpg";

// Arbitrary value denoting the number of unique cards to use (cards displayed will be double that)
const cardsCount = 15;

// Building our cards collection
const cardsSource = Array(cardsCount)
  .fill(0)
  .map((e, i) => ({
    src: `https://rickandmortyapi.com/api/character/avatar/${i + 1}.jpeg`,
    id: i,
  }));

// A single card component
const Card = ({
  card,
  handleChoice,
  flipped,
  freeze,
}: {
  card: CardInt;
  handleChoice: (card: CardInt) => void;
  flipped: boolean;
  freeze: boolean;
}) => {
  const handleClick = () => {
    if (!freeze) {
      handleChoice(card);
    }
  };

  return (
    <Col className="my-3">
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={card.src} alt="front of the card" />
          <img
            className="back"
            src={cardBack}
            onClick={handleClick}
            alt="back of the card"
          />
        </div>
      </div>
    </Col>
  );
};

const GameScreen = ({
  handleNewGame,
  gameMode,
  handleFinishGame,
}: {
  handleNewGame: any;
  gameMode?: string;
  handleFinishGame: (score: number) => void;
}) => {

  // Cards deck
  const [cards, setCards] = useState<CardInt[]>();

  // Choices revealed by a player
  const [choiceOne, setChoiceOne] = useState<CardInt | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardInt | null>(null);

  // List containing the id of the cards that have been matched to remain open
  const [matched, setMatched] = useState<number[]>([]);

  // To freeze the game when a player has just flipped two cards
  const [freeze, setFreeze] = useState<boolean>(false);

  // Timer
  const [secondsCount, setSecondsCount] = useState<number>(0);

  // State used in two players mode to keep track of turns and scores
  const [turn, setTurn] = useState<number>(0);
  const [playerOneScore, setPlayerOneScore] = useState<number>(0);
  const [playerTwoScore, setPlayerTwoScore] = useState<number>(0);

  // Function for handling the card flipping
  const handleChoice = (card: CardInt) => {
    choiceOne === null ? setChoiceOne(card) : setChoiceTwo(card);
  };

  // Emptying the choices to move to a new turn
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setFreeze(false);
  };

  // State hook to keep track of when the game is completed
  useEffect(() => {
    if (matched.length === cardsCount) {
      if (gameMode === "single") {
        handleFinishGame(secondsCount);
      } else {
        let winner = playerOneScore > playerTwoScore ? 1 : 2;
        handleFinishGame(winner);
      }
    }
  }, [matched]);

  // State hook that verified matching cards picks
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setFreeze(true);
      if (choiceOne.id === choiceTwo.id) {
        setMatched((prevState) => [...prevState, choiceOne.id]);
        resetTurns();
        if (gameMode === "multi") {
          if (turn === 0) {
            setPlayerOneScore((prevState) => prevState + 1);
          } else {
            setPlayerTwoScore((prevState) => prevState + 1);
          }
        }
      } else {
        setTimeout(() => {
          resetTurns();
          if (gameMode === "multi") {
            setTurn((prevState) => (prevState + 1) % 2);
          }
        }, 1000);
      }
    }
  }, [choiceTwo]);

  // Start the game function to shuffle the cards and reset everything
  const StartGame = () => {
    const shuffledCards = [...cardsSource, ...cardsSource]
      .sort(() => Math.random() - 0.5)
      .map((e, i) => ({ ...e, uniq_id: i }));
    setCards(shuffledCards);

    setMatched([]);
    resetTurns();

    if (gameMode === "multi") {
      setTurn(0);
      setPlayerOneScore(0);
      setPlayerTwoScore(0);
    }
  };

  // State hook to kick off the game and the timer on first component mount
  useEffect(() => {
    StartGame();
    let intervalID = setInterval(() => {
      setSecondsCount((prevState) => prevState + 1);
    }, 1000);

    return function cleanup() {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <React.Fragment>
      <Container fluid="sm">
        <Row className="my-5">
          <Col className="text-start">
            <h1>{secondsToTime(secondsCount)}</h1>
          </Col>
          <Col className="text-end">
            <button onClick={() => handleNewGame()}>New game</button>
          </Col>
        </Row>
        {gameMode === "multi" ? (
          <Row>
            <Col>
              <h3>
                <b>
                  Score <sub>Player 1 </sub>
                </b>{" "}
                {playerOneScore * 100}
              </h3>
            </Col>
            <Col>
              <h3>
                <b>Turn </b> Player {turn + 1}
              </h3>
            </Col>
            <Col>
              <h3>
                <b>
                  Score <sub>Player 2 </sub>
                </b>{" "}
                {playerTwoScore * 100}
              </h3>
            </Col>
          </Row>
        ) : (
          ""
        )}
        <Row className="lg-w-75 m-auto" xl={5} xs={3}>
          {cards
            ? cards.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={
                    card.uniq_id === choiceOne?.uniq_id ||
                    card.uniq_id === choiceTwo?.uniq_id ||
                    matched.includes(card.id)
                  }
                  freeze={freeze}
                />
              ))
            : ""}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default GameScreen;