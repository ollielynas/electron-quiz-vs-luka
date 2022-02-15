/* eslint-disable prettier/prettier */
/* eslint-disable no-console */

import { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import quizData2 from './QuestionsJSON.json';
import './App.css';
// import scoreJSON from './Score.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const quizData: { [key: string]: any } = quizData2;

// const Pusher = require("pusher");

// const pusher = new Pusher({
//   appId: "1347623",
//   key: "4370162c8a6278c33c2a",
//   secret: "036e36522cff76298e64",
//   cluster: "ap4",
//   useTLS: true
// });

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world"
// });

const globalState = {
  score: 0,
  HScore: 0,
};



console.log(quizData);

// const { BrowserWindow } = require('electron');

// const win = new BrowserWindow({ frame: false })
  const styles = getComputedStyle(document.documentElement);
  let animationDuration:number = parseInt(styles.getPropertyValue('--animation-duration'), 10);

const Question = () => {

  const navigate = useNavigate();
  const [question, setQuestion] = useState('Question');
  const [reset, setReset] = useState(1);
  const [score, setScore] = useState(0);

  globalState.score = score;
  if (score > globalState.HScore) {
    globalState.HScore = score;
  }

  console.log("animation duration",animationDuration);
  const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }


  const newQuestion = (ans:boolean | null) => {
    setReset(reset+1);
    console.log(ans);
    // eslint-disable-next-line prefer-template
    document.documentElement.style.setProperty('--animation-duration', (animationDuration*0.9).toString() + 's');
    animationDuration *= 0.95;
    console.log("new question");
    const keys = Object.keys(quizData.active);
    console.log(keys);
    setQuestion(keys[Math.floor(Math.random() * keys.length)]);
    if (ans!==null) {
    if (quizData.active[question][1] === ans) {
      setScore(score+1);
    }else{setScore(score-1);};
  }
  }

  if (reset === 1) {
    newQuestion(null);
  }

  const gameTimer = async () => {
    console.log('gameTimer1')
    sleep(10000);
    console.log('gameTimer');

  }

  gameTimer();

  return (
    <div className="Question-Body">
      <div className="Question-score">{score}</div>
      <div className="Question-Body-Text">
        <p>{question}</p>
      </div>
      <div className="true-false-buttons">
      <button type="button" className="Question-Body-Button" onClick={()=>{newQuestion(true);}}>True</button>
      <button type="button" onClick={()=>{newQuestion(false);}} className="Question-Body-Button">False</button>
      </div>
      <div className="progress-bar2"
      key = {reset}
      onAnimationEnd={() => {
        newQuestion(null);}}
      />
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


  const handleSubmit = (e:any) => {
		e.preventDefault();

		const objt = globalState.HScore;

		// eslint-disable-next-line promise/catch-or-return
		axios
			.post(
				'https://sheet.best/api/sheets/eeabed85-8ff0-449f-bcdc-8bcad89f5beb',
				objt
			)
			// eslint-disable-next-line promise/always-return
			.then((response) => {
				console.log(response);
			});
	};

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
        <div className="column">
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
      </div>
      <div className="Last-Score">
        <p>Last Score: {globalState.score}</p>
        <p>Best Score: {globalState.HScore}</p>
      </div>
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
