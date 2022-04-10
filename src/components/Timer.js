import { useEffect, useState } from "react";
import useSound from "use-sound";
import wrong from "../assets/wrong.mp3";

export default function Timer({
  setStop,
  stopTimer,
  setStopTimer,
  questionNumber,
}) {
  const [timer, setTimer] = useState(30);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    if (stopTimer) return;
    if (timer === 0) {
      wrongAnswer();
      setStopTimer(true);
      setTimeout(() => setStop(true), 2000);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setStop, timer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  if (timer < 10) return <div className="endOfTime">{timer}</div>;
  else return timer;
}

//moshe
