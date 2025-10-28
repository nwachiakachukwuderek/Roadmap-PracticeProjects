import React, { useState, useRef, useEffect } from 'react';

const DEFAULTS = {
  work: 25 * 60,        // 25 minutes
  shortBreak: 5 * 60,   // 5 minutes
  longBreak: 15 * 60,   // 15 minutes
};

function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  console.log(m, s)
  return `${m}:${s}`;
}

const SESSION_TYPES = {
  WORK: 'Work',
  SHORT: 'Short Break',
  LONG: 'Long Break',
};

function MainTimer() {
  const [sessionType, setSessionType] = useState(SESSION_TYPES.WORK);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULTS.work);
  const [isRunning, setIsRunning] = useState(false);
  // const [workSessions, setWorkSessions] = useState(0);

  const intervalRef = useRef(null);

  // Handle timer countdown
  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          // handleSessionEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);

  }, [isRunning, sessionType]);

  // // Handle session end logic
  // function handleSessionEnd() {
  //   // Play sound here if desired
  //   if (sessionType === SESSION_TYPES.WORK) {
  //     const newWorkSessions = workSessions + 1;
  //     setWorkSessions(newWorkSessions);
  //     if (newWorkSessions % 4 === 0) {
  //       setSessionType(SESSION_TYPES.LONG);
  //       setSecondsLeft(DEFAULTS.longBreak);
  //     } else {
  //       setSessionType(SESSION_TYPES.SHORT);
  //       setSecondsLeft(DEFAULTS.shortBreak);
  //     }
  //   } else {
  //     setSessionType(SESSION_TYPES.WORK);
  //     setSecondsLeft(DEFAULTS.work);
  //   }
  //   setIsRunning(false);
  // }

  // Button handlers
  function startTimer() {
    setIsRunning(true);
  }

  function pauseTimer() {
    setIsRunning(false);
  }
  
  function resetTimer() {
    setIsRunning(false);
    if (sessionType === SESSION_TYPES.WORK) setSecondsLeft(DEFAULTS.work);
    if (sessionType === SESSION_TYPES.SHORT) setSecondsLeft(DEFAULTS.shortBreak);
    if (sessionType === SESSION_TYPES.LONG) setSecondsLeft(DEFAULTS.longBreak);
  }
  function switchSession(type) {
    setIsRunning(false);
    setSessionType(type);
    if (type === SESSION_TYPES.WORK) setSecondsLeft(DEFAULTS.work);
    if (type === SESSION_TYPES.SHORT) setSecondsLeft(DEFAULTS.shortBreak);
    if (type === SESSION_TYPES.LONG) setSecondsLeft(DEFAULTS.longBreak);
  }

  return (
    <div className="border-2 border-solid mt-4 ml-4 size-120 p-4 rounded-lg bg-white shadow-md">
      <div className="flex justify-between mb-4">
        <button
          className={`px-4 py-2 rounded ${sessionType === SESSION_TYPES.WORK ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
          onClick={() => switchSession(SESSION_TYPES.WORK)}
          aria-label="Switch to Work session"
        >
          Pomodoro
        </button>
        <button
          className={`px-4 py-2 rounded ${sessionType === SESSION_TYPES.SHORT ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
          onClick={() => switchSession(SESSION_TYPES.SHORT)}
          aria-label="Switch to Short Break"
        >
          Short Break
        </button>
        <button
          className={`px-4 py-2 rounded ${sessionType === SESSION_TYPES.LONG ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
          onClick={() => switchSession(SESSION_TYPES.LONG)}
          aria-label="Switch to Long Break"
        >
          Long Break
        </button>
      </div>

      <div className="flex flex-col items-center mt-8">
        <div className="text-2xl mb-2 font-semibold">{sessionType}</div>
        <div className="text-8xl mb-10 font-mono" aria-live="polite">{formatTime(secondsLeft)}</div>
        <div className="flex gap-4">
          {!isRunning ? (
            <button
              className="text-2xl px-6 py-2 bg-indigo-500 text-white rounded hover:bg-fuchsia-500"
              onClick={startTimer}
              aria-label="Start timer"
            >
              Start
            </button>
          ) : (
            <button
              className="text-2xl px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={pauseTimer}
              aria-label="Pause timer"
            >
              Pause
            </button>
          )}
          <button
            className="text-2xl px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={resetTimer}
            aria-label="Reset timer"
          >
            Reset
          </button>
        </div>
        {/* <div className="mt-8 text-lg">
          Work sessions completed: <span className="font-bold">{workSessions}</span>
        </div> */}
      </div>
    </div>
  );
}

export default MainTimer;
