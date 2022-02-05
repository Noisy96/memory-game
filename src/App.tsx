import { useState } from "react";
import "./App.css";

// Custom components
import FinishScreen from "./components/FinishScreen";
import GameScreen from "./components/GameScreen";
import GreetingScreen from "./components/GreetingScreen";

function App() {
  // Game progress and mode
  const [gameStep, setGameStep] = useState<number>(0);
  const [gameMode, setGameMode] = useState<"single" | "multi">();

  // Scores to display at the end
  const [winTime, setWinTime] = useState<number>();
  const [winner, setWinner] = useState<number>();

  // Reseting the game back to initial screen
  const handleNewGame = () => {
    setGameStep(0);
  };

  // Updating the scores and moving to the last step
  const handleFinishGame = (score: number) => {
    if (gameMode === "single") {
      setWinTime(score);
    } else {
      setWinner(score);
    }
    setGameStep(2);
  };

  return (
    <div className="App">
      {gameStep === 0 ? (
        <GreetingScreen setGameMode={setGameMode} setGameStep={setGameStep} />
      ) : gameStep === 1 ? (
        <GameScreen
          handleNewGame={handleNewGame}
          gameMode={gameMode}
          handleFinishGame={handleFinishGame}
        />
      ) : (
        <FinishScreen
          gameMode={gameMode}
          winTime={winTime}
          winner={winner}
          handleNewGame={handleNewGame}
        />
      )}
    </div>
  );
}

export default App;
