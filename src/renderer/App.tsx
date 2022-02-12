/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


import './App.css';

// const { BrowserWindow } = require('electron');

// const win = new BrowserWindow({ frame: false })
  const styles = getComputedStyle(document.documentElement);
  let animationDuration:number = parseInt(styles.getPropertyValue('--animation-duration'), 10);

const Question = () => {

  const navigate = useNavigate();
  const [question, setQuestion] = useState('Question');
  const [reset, setReset] = useState(1);

  console.log("animation duration",animationDuration);
  const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const newQuestion = () => {
    // eslint-disable-next-line prefer-template
    document.documentElement.style.setProperty('--animation-duration', (animationDuration*0.9).toString() + 's');
    animationDuration *= 0.95;
    console.log("new question");
    setQuestion("Question2");
  }



  const gameTimer = async () => {
    console.log('gameTimer1')
    sleep(10000);
    console.log('gameTimer');

  }

  gameTimer();



  return (
    <div className="Question-Body">
      <div className="Question-Body-Text">
        <p>{question}</p>
      </div>
      <button type="button" className="Question-Body-Button" onClick={()=>{newQuestion();}}>True</button>
      <button type="button" className="Question-Body-Button">False</button>
      <div key = {reset}>
      <div className="progress-bar2"

      onAnimationEnd={() => {
        setReset(reset+1);
        newQuestion();}}
      />
      </div>
      <div className="progress-bar1"
      onAnimationEnd={() => {navigate(`/`, { replace: true })}}
      />
    </div>
  )
}
const HomePage = () => {
  const [title, SetTitle] = useState('Quiz !');

  const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const navigate = useNavigate();


  const Bubbles = () => {
    return (
      <div className="area">
        <ul className="circles">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
    );
  };

  return (
    <div className="App">
      <button type="button" className="settings">&#x2699;</button>
      <Bubbles />
      <div className="content">
        <div className="title">
          <p>{title}</p>
        </div>
        <div className="buttons">
        <button
          type="button"
          className="button"
          onClick={async () => {
            console.log("new game");
            SetTitle('Ready.');
            await sleep(850);
            SetTitle('Ready..');
            await sleep(800);
            SetTitle('Ready...');
            await sleep(750);
            SetTitle('Go !');
            await sleep(700);
            document.documentElement.style.setProperty('--animation-duration', '2s');
            animationDuration = parseInt(styles.getPropertyValue('--animation-duration'), 10);
            navigate(`/Question`, { replace: true })
          }}
        >
          Play quiz &nbsp;{'>'}
        </button>
        <button
        className="button"
          type="button"
          onClick={async () => {

          }}
        >
          Edit Question &nbsp;{'>'}
        </button>
        <button
        className="button"
          type="button"
          onClick={() => {
            console.log('owo');
          }}
        >
          Import / Create Questions &nbsp;{'>'}
        </button>
      </div>
        {/* <button onClick = { () => {toggle}}>{playing ? "Pause" : "Play"}</button> */}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Question" element={<Question />} />
      </Routes>
    </Router>
  );
}
