import { useState, useEffect, useRef} from 'react';
import quizData from './quizData.json'

function AiQuiz() {
  const TOTAL = quizData.length;
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0); // zero-based;
  const [_selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const q = quizData[index];
  const [results, setResults] = useState([]); // { id, selected, correct, timedOut }
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    resetTimer();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, started]);

  useEffect(() => {
    if (!started) return;
    if (timeLeft <= 0 && !answered) {
      handleTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  function resetTimer() {
    clearInterval(timerRef.current);
    setTimeLeft(60);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
  }

  function startQuiz() {
    setStarted(true);
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setResults([]);
    resetTimer();
  }

  function handleSelect(option) {
    if (answered) return;
    const correct = q.correctAnswer;
    const isCorrect = option === correct;
    setSelected(option);
    setAnswered(true);

    // update score and results
    setResults((r) => [
      ...r,
      {
        id: q.id ?? index + 1,
        question: q.question,
        selected: option,
        correct,
        isCorrect,
        timedOut: false,
      },
    ]);
    if (isCorrect) setScore((s) => s + 1);

    // stop timer
    clearInterval(timerRef.current);

    // auto-advance after short delay so user sees feedback
    setTimeout(() => {
      goToNext();
    }, 1200);
  }

  function handleTimeout() {
    clearInterval(timerRef.current);
    setAnswered(true);
    setSelected(null);

    setResults((r) => [
      ...r,
      {
        id: q.id ?? index + 1,
        question: q.question,
        selected: null,
        correct: q.correctAnswer,
        isCorrect: false,
        timedOut: true,
      },
    ]);

    // decrement score by 1 but clamp at 0
    setScore((s) => Math.max(0, s - 1));

    // show feedback briefly then move on
    setTimeout(() => {
      goToNext();
    }, 900);
  }

  function goToNext() {
    clearInterval(timerRef.current);
    setSelected(null);
    setAnswered(false);
    if (index + 1 < TOTAL) {
      setIndex((i) => i + 1);
    } else {
      // quiz finished
      setIndex(TOTAL); // mark as finished
      clearInterval(timerRef.current);
    }
  }

  function goToPrev() {
    if (index === 0 || index >= TOTAL) return;
    clearInterval(timerRef.current);
    setSelected(null);
    setAnswered(false);
    setIndex((i) => i - 1);
  }

  function restart() {
    setStarted(false);
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setResults([]);
    setTimeLeft(60);
    clearInterval(timerRef.current);
  }

  // finished view
  if (started && index >= TOTAL) {
    return (
      <>
        <div>
          <h2>Quiz Finished</h2>
          <p>
            Score: {score} / {TOTAL}
          </p>
          <button onClick={restart}>Restart Quiz</button>

          <h3>Results</h3>
          <ol>
            {results.map((r) => (
              <li key={r.id}>
                <div><strong>Q{r.id}:</strong> {r.question}</div>
                <div>
                  Your answer:{' '}
                  {r.timedOut ? (
                    <em>Timed out</em>
                  ) : r.selected ? (
                    <span>{r.selected}</span>
                  ) : (
                    <em>—</em>
                  )}
                </div>
                <div>Correct answer: <span>{r.correct}</span></div>
              </li>
            ))}
          </ol>
        </div>
      </>
    );
  }

  // start screen
  if (!started) {
    return (
      <>
        <div>
          <h1>Welcome to the Quiz</h1>
          <p>Press Start to begin. There are {TOTAL} questions. You have 60 seconds per question.</p>
          <button onClick={startQuiz}>Start</button>
        </div>
      </>
    );
  }

  // question card
  const displayNumber = index + 1;

  return (
    <>
      <div>
        <div>
          <span>{displayNumber}</span>
          <span> of {TOTAL}</span>
          <span>Score: {score}</span>
          <span>Time: {timeLeft}s</span>
        </div>

        <div>
          <h3>{q.question}</h3>

          <div>
            {q.options.map((opt) => {
              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  disabled={answered}>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* If correct answer is not among options, show it after answering */}
          {answered && !q.options.includes(q.correctAnswer) && (
            <div>
              <strong>Correct answer:</strong>{' '}
              <span>{q.correctAnswer}</span>
            </div>
          )}
        </div>

        <div>
          <button onClick={goToPrev} disabled={index === 0}>
            Previous
          </button>
          <button onClick={goToNext} disabled={index + 1 >= TOTAL}>
            Next
          </button>
          <button onClick={restart}>
            Quit
          </button>
        </div>
      </div>
    </>
  );
}

export default AiQuiz;