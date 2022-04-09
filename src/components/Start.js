import { useRef, useEffect } from "react";
import axios from "axios";

export default function Start({
  setUsername,
  questionsData,
  setQuestionsData,
}) {
  const inputRef = useRef();

  useEffect(() => {
    axios.get(`https://opentdb.com/api.php?amount=30`).then((res) => {
      setQuestionsData(res.data.results);
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
