import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";
import { decode } from "html-entities";
import { v4 as uuid } from "uuid";

export default function Trivia({
  questionsData,
  setStop,
  stopTimer,
  setStopTimer,
  questionNumber,
  setQuestionNumber,
}) {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer active");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    if (stopTimer) return;
    setSelectedAnswer(a);
    setClassName("answer active");
    setStopTimer(true);
    delay(3000, () =>
      setClassName(
        a === question.correct_answer ? "answer correct" : "answer wrong"
      )
    );
    delay(4600, () => {
      if (a === question.correct_answer) {
        correctAnswer();
        setStopTimer(false);
        delay(5600, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(3000, () => {
          setStop(true);
        });
      }
    });
  };

  useEffect(() => {
    if (!questionsData[questionNumber - 1]) {
      setStop(true);
      return;
    }
    setQuestion(questionsData[questionNumber - 1]);
    setAnswers(
      shuffleArray(
        questionsData[questionNumber - 1].incorrect_answers.concat(
          questionsData[questionNumber - 1].correct_answer
        )
      )
    );
  }, [questionsData, questionNumber]);

  return (
    <div className="trivia">
      <div className="question">
        {question
          ? decode("(" + question.difficulty + ") " + question.question)
          : ""}
      </div>
      <div className="answers">
        {question
          ? answers.map((a) => (
              <div
                key={uuid().slice(0, 8)}
                className={selectedAnswer === a ? className : "answer"}
                onClick={() => handleClick(a)}
              >
                {decode(a)}
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

//moshe
