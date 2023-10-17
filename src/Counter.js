import { useEffect, useRef, useState } from 'react';

import './Counter.css';

const START_DATE = new Date(2023, 9, 13, 17, 0, 0);

export default function Counter() {
  const [counter, setCounter] = useState({});
  const [topOffset, setTopOffset] = useState(0);
  const counterRef = useRef();

  useEffect(() => {
    if (counterRef.current) {
      setTopOffset(window.innerHeight / 2 - counterRef.current.clientHeight / 2.5);
    }
  }, [window.innerHeight])

  const numEmojisYAxis = window.innerHeight / 192;
  const numEmojisXAxis = window.innerWidth / 128;
  const numEmojis = Math.floor(numEmojisYAxis * numEmojisXAxis) * 2;

  const daysPassed = () => {
    const now = new Date();
    const daysPassed = now - START_DATE;
    
    let days = daysPassed / (1000 * 60 * 60 * 24)
    let hours = days % 1;

    days -= hours;

    hours *= 24;
    let minutes = hours % 1;
    hours -= minutes;

    minutes *= 60;
    let seconds = minutes % 1;
    minutes -= seconds

    seconds = (seconds * 60) - (seconds * 60 % 1);
    
    return { days, hours, minutes, seconds };
  }

  setTimeout(() => setCounter(daysPassed()), 1000);
  
  return (
    <div className='counter h-100 d-flex flex-column align-items-center'>
      <div className='counter__title'>
        <h1>Cadê nosso Happy Hour!?</h1>
      </div>
      <main className='counter__main' style={{ top: topOffset }}>
        <div className='counter__content' ref={counterRef}>
          <p>Já se passaram</p>
          <div className='counter__output'>
            <p><span>{counter.days}</span> dias</p>
            <p><span>{counter.hours}</span> horas</p>
            <p><span>{counter.minutes}</span> minutos</p>
            <p><span>{counter.seconds}</span> segundos</p>
          </div>
          <p>sem happy hour...</p>
        </div>
      </main>
      <div className='emoji-bg d-flex'>
        {
          Array(numEmojis).fill(null).map((_, index) => {
            const isEven = index % 2 === 0;
            const top = `-${(isEven ? 24 : 56)}px`;
            return <span className='emoji' style={{ top }}>&#x1F62D;</span>;
          })
        }      
      </div>
    </div>
  );
} 