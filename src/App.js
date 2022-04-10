import { useEffect, useMemo, useState } from "react";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";
import "./app.css";

// next steps:
// blink right answer when a wrong was chosen
// check to get always 10 question of different type with less json queue

function App() {
  const [questionsData, setQuestionsData] = useState(null);
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 1000" },
        { id: 2, amount: "$ 2000" },
        { id: 3, amount: "$ 5000" },
        { id: 4, amount: "$ 10 000" },
        { id: 5, amount: "$ 20 000" },
        { id: 6, amount: "$ 50 000" },
        { id: 7, amount: "$ 100 000" },
        { id: 8, amount: "$ 200 000" },
        { id: 9, amount: "$ 500 000" },
        { id: 10, amount: "$ 1 000 000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className="app">
      {username && questionsData ? (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">
                Can you believe it, {username}? <br /> You've just earned:{" "}
                {earned}
              </h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setStop={setStop}
                      stopTimer={stopTimer}
                      setStopTimer={setStopTimer}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    questionsData={questionsData}
                    setStop={setStop}
                    stopTimer={stopTimer}
                    setStopTimer={setStopTimer}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              <li
                className="moneyListItem"
                onClick={() =>
                  questionsData[questionNumber] && !stop && !stopTimer
                    ? setQuestionNumber(questionNumber + 1)
                    : ""
                }
              >
                <span className="moneyListItemNumber"></span>
                <span className="moneyListItemAmount">(click to skip)</span>
              </li>
              {moneyPyramid.map((m) =>
                m.id > questionsData.length ? (
                  ""
                ) : (
                  <li
                    className={
                      questionNumber === m.id
                        ? "moneyListItem active"
                        : "moneyListItem"
                    }
                  >
                    <span className="moneyListItemNumber">{m.id}</span>
                    <span className="moneyListItemAmount">{m.amount}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </>
      ) : (
        <Start
          setUsername={setUsername}
          questionsData={questionsData}
          setQuestionsData={setQuestionsData}
        />
      )}
    </div>
  );
}

export default App;

//moshe
