import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function TriviaApp() {
  //const [topic, setTopic] = useState('Film', 'Music');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
      });
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="trivia-app">
      {questions.length > 0 ? (
        currentQuestionIndex < questions.length ? (
          <div className="question-container">
            <h2>Question {currentQuestionIndex + 1}:</h2>
            <p dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
            <ul className="options">
              {currentQuestion.incorrect_answers.map((option, index) => (
                <li key={index} onClick={() => handleAnswerClick(option)}>
                  {option}
                </li>
              ))}
              <li
                onClick={() =>
                  handleAnswerClick(currentQuestion.correct_answer)
                }
              >
                {currentQuestion.correct_answer}
              </li>
            </ul>
          </div>
        ) : (
          <div className="result">
            <h2>Quiz Completed!</h2>
            <p>
              Your Score: {score} out of {questions.length}
            </p>
          </div>
        )
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

export default TriviaApp;
