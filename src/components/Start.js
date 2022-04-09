import { useRef, useEffect } from "react";
import axios from "axios";

export default function Start({
  setUsername,
  questionsData,
  setQuestionsData,
}) {
  const inputRef = useRef();

  useEffect(() => {
    axios.get(`https://opentdb.com/api.php?amount=500`).then((res) => {
      const questionsSet = [].concat(
        res.data.results
          .filter((obj) => {
            return obj.difficulty === "easy" && obj.type === "boolean";
          })
          .slice(0, 2),
        res.data.results
          .filter((obj) => {
            return obj.difficulty === "easy" && obj.type === "multiple";
          })
          .slice(0, 3),
        res.data.results
          .filter((obj) => {
            return obj.difficulty === "medium" && obj.type === "boolean";
          })
          .slice(0, 2),
        res.data.results
          .filter((obj) => {
            return obj.difficulty === "medium" && obj.type === "multiple";
          })
          .slice(0, 2),
        res.data.results
          .filter((obj) => {
            return obj.difficulty === "hard" && obj.type === "boolean";
          })
          .slice(0, 1),
        res.data.results
          .filter((obj) => {
            return obj.difficulty === "hard" && obj.type === "multiple";
          })
          .slice(0, 1)
      );
      setQuestionsData(questionsSet.slice(0, 10));
    });
  }, []);

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };

  return (
    <div className="start">
      {questionsData ? (
        <>
          <input
            placeholder="enter your name"
            className="startInput"
            ref={inputRef}
          />
          <button className="startButton" onClick={handleClick}>
            Start
          </button>
        </>
      ) : (
        <div className="loading-spinner"></div>
      )}
    </div>
  );
}