import * as React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
​
const audios = {
  Q: {
    keypad: "Q",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    displayText: "Heater 1"
  },
  W: {
    keypad: "W",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    displayText: "Heater 2"
  },
  E: {
    keypad: "E",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    displayText: "Heater 3"
  },
  A: {
    keypad: "A",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    displayText: "Heater 4"
  },
  S: {
    keypad: "S",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    displayText: "Clap"
  },
  D: {
    keypad: "D",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    displayText: "Open HH"
  },
  Z: {
    keypad: "Z",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    displayText: "Kick n' Hat"
  },
  X: {
    keypad: "X",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    displayText: "Kick"
  },
  C: {
    keypad: "C",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    displayText: "Closed HH"
  }
};
​
const audios2 = {
  Q: {
    keypad: "Q",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    displayText: "Cord 1"
  },
  W: {
    keypad: "W",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    displayText: "Cord 2"
  },
  E: {
    keypad: "E",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    displayText: "Cord 3"
  },
  A: {
    keypad: "A",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    displayText: "Shaker"
  },
  S: {
    keypad: "S",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    displayText: "Open HH"
  },
  D: {
    keypad: "D",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    displayText: "CLosed HH"
  },
  Z: {
    keypad: "Z",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    displayText: "Punchy Kick"
  },
  X: {
    keypad: "X",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    displayText: "Side Stick"
  },
  C: {
    keypad: "C",
    audio: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    displayText: "Snare"
  }
};
​
const DrumPad = props => {
  const padID = props.keypad.displayText.replace(/\s/g,'-');
  return(
    <div className="drum-pad" id={padID} onClick={props.onClick}>
      <audio className='clip' id={props.key} src={props.keypad.audio}></audio>
      {props.keypad.keypad}
    </div>
  );
}
​
function Display(props){
  return <p id="display" style={{'font-size':'1.2em'}}><strong>{props.display}</strong></p>;
}
​
export default function App() {
​
const [song,setSong]=React.useState(audios);
const [display, setDisplay] = React.useState('');
const [volume, setVolume] = React.useState(1);
const [bank, setBank] = React.useState('left');
const [power, setPower] = React.useState('right');
const [play , setPlay] = React.useState(true);
​
​
function handleCLick(event, id, displayText){
  const element= event.target;
  const audio = element.querySelector("audio");
  if(play){
    handlePlay(audio);
    handleDisplay(displayText);
  }
}
​
function handleDisplay(display){
  setDisplay(display);
}
​
function handlePlay(audio){
  audio.currentTime=0;
  audio.volume = volume;
  audio.play();
}
​
function controlVolume(event){
  setVolume(event.target.value);
}
​
function handleSound(){
  if(bank=='right'){
    setBank('left');
    setSong(audios);
    setDisplay('Heater');
  }
  else{
    setBank('right');
    setSong(audios2);
    setDisplay('Smooth Piano Kit');
  }
}
​
function handlePower(){
  power=='left'? setPower('right') : setPower('left');
  play?setPlay(false):setPlay(true);
}
​
const drumPad = Object.values(song).map(audio => (
  <DrumPad keypad={audio} key={audio.keypad} onClick={(event)=>handleCLick(event,audio.keypad, audio.displayText)} />
))
​
  return (
    <div>
      <div className="container">
​
        <div id="drum-machine">
​
          <div className="pad-bank">
            {drumPad}
          </div>
​
          <div className="logo">
​
            <span className="inner-logo">RAJ&nbsp;</span>
            <FontAwesomeIcon icon={faMicrophoneLines} />
​
          </div>
​
          <div className="control-container">
​
            <div className="control">
              <p>Power</p>
              <div className="select" onClick={handlePower}>
                <div className="inner" style={{'float':power}}></div>
              </div>
            </div>
​
            <Display display={display} />
​
            <div className="volume-slider">
              <input max="1" min="0" step="0.01" type="range" onInput={controlVolume}/>
            </div>
​
            <div className="control">
              <p>Bank</p>
              <div className="select" onClick={handleSound}>
                <div className="inner" style={{'float':bank}} ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}