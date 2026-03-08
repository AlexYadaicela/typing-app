import "./styles.css";
import { useEffect, useState, useRef } from "react";

function DisplayText() {
  const [challenge, setchallenge] = useState("hard-5");
  const [typingPrompt, setTypingPrompt] = useState("");
  const [typedText, setTypedText] = useState("");
  const [strIndex, setStrIndex] = useState(-1);
  const [isError, setIsError] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    const handleTypedText = (e) => {
      if (e.key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1));
        if (strIndex > typedText.length) {
          setStrIndex((index) => (index -= 1));
        }
      }

      if (e.key.length === 1) {
        setStrIndex((index) => (index += 1));
        setTypedText((prev) => prev + e.key);
      }
    };
    console.log(strIndex);
    window.addEventListener("keyup", handleTypedText);
    return () => window.removeEventListener("keyup", handleTypedText);
  }, [typedText, strIndex]);
  // handle user typed text

  //   handle data fetching
  useEffect(() => {
    console.log("entering data handler");
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/api/v1/texts/${challenge}`
      );
      if (!response.ok) {
        console.error(response.statusText);
        return;
      }
      const {
        text: { text },
      } = await response.json();
      console.log(text);
      setTypingPrompt(text);
    }
    fetchData();
    return;
  }, [challenge]);

  // create reference to letter div container to change color based on correctness
  useEffect(() => {
    if (divRef.current) {
      const statusText =
        typedText[strIndex] === typingPrompt[strIndex] ? true : false;
      if (statusText) {
        divRef.current.focus();
      }
    }
  }, []);

  return (
    <>
      <div>
        {typingPrompt.split("").map((letter, index) => {
          if (letter === " ") {
            return (
              <div key={index} className="letter-container" ref={divRef}>
                &nbsp;
              </div>
            );
          }
          return (
            <div key={index} className="letter-container" ref={divRef}>
              {letter}
            </div>
          );
        })}
        {typedText}
      </div>
    </>
  );
}

export default DisplayText;
