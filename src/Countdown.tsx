import React, { useState, useEffect, useRef } from 'react';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(90000); // 1 minute 30 seconds in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1000) {
            setTotalTime((total) => total + 90000);
            return 90000;
          } else {
            return prevTime - 10;
          }
        });
      }, 10);
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(90000);
    setTotalTime(0);
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatTotalTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen text-white ${
        timeLeft > 5000 ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      <div className="text-9xl p-8 rounded-lg">
        {formatTime(timeLeft)}
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
          onClick={startTimer}
        >
          Start
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 m-2 rounded"
          onClick={pauseTimer}
        >
          Pause
        </button>
        <button
          className="bg-red-700 text-white px-4 py-2 m-2 rounded"
          onClick={stopTimer}
        >
          Stop
        </button>
      </div>
      <div className="mt-4 text-2xl">
        Total Time: {formatTotalTime(totalTime)}
      </div>
    </div>
  );
};

export default Countdown;
