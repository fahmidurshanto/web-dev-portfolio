import React, { useState, useEffect } from 'react';

const DigitalWatch = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="text-[var(--text-color)] text-lg font-mono">
      {time.toLocaleTimeString()}
    </div>
  );
};

export default DigitalWatch;
