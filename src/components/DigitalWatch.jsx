import React, { useState, useEffect } from 'react';

const DigitalWatch = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // Format time to 12-hour format with AM/PM
  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const hours = time.getHours();
  const minutes = formatTime(time.getMinutes());
  const seconds = formatTime(time.getSeconds());
  
  // Convert to 12-hour format
  const displayHours = hours % 12 || 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';

  return (
    <div className="relative">
      {/* Violet effect container */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg opacity-30 blur-md animate-pulse"></div>
      
      {/* Digital watch display */}
      <div className="relative bg-[var(--background-color)] bg-opacity-80 backdrop-blur-sm border border-violet-500 border-opacity-50 rounded-lg p-2 shadow-lg animate__animated animate__fadeIn">
        <div className="flex items-center">
          {/* Violet effect indicators */}
          <div className="w-2 h-2 bg-violet-500 rounded-full mr-2 animate-pulse"></div>
          
          {/* Time display with violet glow */}
          <div className="text-[var(--text-color)] text-lg font-mono font-bold tracking-wider">
            <span className="text-violet-500">{displayHours}</span>
            <span className="text-[var(--text-color)] animate-pulse">:</span>
            <span className="text-violet-500">{minutes}</span>
            <span className="text-[var(--text-color)] animate-pulse">:</span>
            <span className="text-violet-500">{seconds}</span>
            <span className="text-violet-400 text-sm ml-1">{ampm}</span>
          </div>
          
          {/* Violet effect indicators */}
          <div className="w-2 h-2 bg-violet-500 rounded-full ml-2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-lg border-2 border-violet-500 opacity-40 pointer-events-none animate-pulse"></div>
      
      {/* Additional violet particles */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-violet-500 rounded-full animate-ping"></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default DigitalWatch;