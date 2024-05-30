import React, {useState, useEffect} from "react"
import Question from '../../components/Question';
import axios from 'axios';

const Simulator = ({count}) => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
      const fetchQuestions = async () => {
          const response = await axios.get('http://127.0.0.1:6001/api/questions');
          setQuestions(response.data);
      };
      fetchQuestions();
  }, []);

  const handleShowResults = () => {
    let score = 0;
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === question.answer) {
            score++;
        }
    });
    setScore(score);
  };

  return (
    <div>
      <div className="container-fluid mt-5">
        <h1>Exam Simulation</h1>
        <div id="questions-container">
            {questions.map((question, index) => (
                <Question key={index} question={question} index={index} />
            ))}
        </div>
        <button onClick={handleShowResults}>Show Results</button>
        {score !== null && <p>Your score is {score} out of {questions.length}</p>}
      </div>
    </div>
  )
}

export default Simulator