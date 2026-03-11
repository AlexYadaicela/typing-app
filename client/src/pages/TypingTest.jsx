import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTextById } from "../services/text.service.js";
import { saveResult } from "../services/result.service.js";

const TypingTest = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [text, setText] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const startTime = useRef(null);

  // get text
  useEffect(() => {
    const fetchText = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getTextById(token, id);
        setText(data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchText();
  }, [id]);

  // set timer
  useEffect(() => {
    if (started && !finished) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishTest(userInput);
            return 0;
          }
        }, 1000);
      });
    }
    return () => clearInterval(timerRef.current);
  }, [started, finished]);

  const calculateResults = (input) => {
    const originalText = text.content;
    const timeTaken = (Date.now() - startTime.current) / 1000;
    const minutes = timeTaken / 60;

    let errors = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== originalText[i]) {
        errors++;
      }
    }

    const wordsTyped = input.trim().split(/\s/).filter(Boolean).length;
    const calculateWpm = Math.round(wordsTyped / minutes);
    const calculatedAcc = Math.round(
      ((input.length - errors) / input.length) * 100,
    );

    return {
      wpm: calculateWpm,
      accuracy: calculatedAcc,
      errorCount: errors,
      duration: Math.round(timeTaken),
    };
  };

  const startTest = () => {
    setStarted(true);
    startTime.current = Date.now();
    inputRef.current?.focus();
  };

  const finishTest = async (input) => {
    clearInterval(timerRef.current);
    setFinished(true);

    const results = calculateResults(input || userInput);
    setWpm(results.wpm);
    setAccuracy(results.accuracy);
    setErrorCount(results.errorCount);

    try {
      const token = localStorage.getItem("token");
      await saveResult(token, {
        textId: id,
        wpm: results.wpm,
        accuracy: results.accuracy,
        errorCount: results.errorCount,
        duration: results.duration,
        completed: input.length >= text.content.length,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInput = (e) => {
    const input = e.target.value;
    setUserInput(input);

    if (input.length >= text.content.length) {
      finishTest(input);
    }
  };

  const handleRestart = () => {
    clearInterval(timerRef.current);
    setUserInput("");
    setStarted(false);
    setFinished(false);
    setTimeLeft(60);
    setWpm(0);
    setAccuracy(0);
    setErrorCount(0);
    startTime.current = null;
  };

  const renderText = () => {
    return text.content.split("").map((char, index) => {
      let color = "grey";
      if (index < userInput.length) {
        color = userInput[index] === char ? "green" : "red";
      }

      return (
        <span key={index} style={{ color }}>
          {char}
        </span>
      );
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!text) return <p>Text not found.</p>;

  return (
    <div>
      {/* header */}
      <div>
        <h1>Typing Test</h1>
        <button onClick={() => navigate("/dashboard")}>Back</button>
      </div>

      {/* text info */}
      <div>
        <span>{text.difficulty}</span>
        <span>{text.category}</span>
        <span>{text.wordCount} words</span>
      </div>

      {/* timer */}
      {started && !finished && (
        <div>
          <p>Time Left: {timeLeft}s</p>
        </div>
      )}

      {/* text to type */}
      <div>{renderText()}</div>

      {/* input */}
      {!finished ? (
        <div>
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={handleInput}
            disabled={!started || finished}
            placeholder={started ? "Start typing..." : "Click Start to begin"}
            rows={4}
          />

          {!started ? (
            <button onClick={startTest}>Start Test</button>
          ) : (
            <button onClick={() => finishTest(userInput)}>Finish Early</button>
          )}
        </div>
      ) : (
        // results screen
        <div>
          <h2>Results</h2>
          <p>WPM: {wpm}</p>
          <p>Accuracy: {accuracy}%</p>
          <p>Errors: {errorCount}</p>

          <button onClick={handleRestart}>Try Again</button>
          <button onClick={() => navigate("/results")}>View All Results</button>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        </div>
      )}
    </div>
  );
};

export default TypingTest;
