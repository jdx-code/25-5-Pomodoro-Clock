import React, { useState, useEffect } from 'react';
import './App.css'

function App() {

    const[breakValue, setBreakValue] = useState(5);
    const[sessionValue, setSessionValue] = useState(25);
    const[displayTime, setDisplayTime] = useState(25 * 60);

    const[timeType, setTimeType] = useState("SESSION");
    const[play, setPlay] = useState(false);

    const timeout = setTimeout(() => {
        if(displayTime && play){
            setDisplayTime(displayTime - 1)
        }
    }, 1000);

    const incrementBreakValue = () => {
        if(breakValue < 60) {
            setBreakValue(breakValue + 1)
        }
    }

    const decrementBreakValue = () => {
        if(breakValue > 1) {
            setBreakValue(breakValue - 1)
        }
    }

    const incrementSessionValue = () => {
        if(sessionValue < 60) {
            setSessionValue(sessionValue + 1)
            setDisplayTime(displayTime + 60)
        }
    }

    const decrementSessionValue = () => {
        if(sessionValue > 1) {
            setSessionValue(sessionValue - 1)
            setDisplayTime(displayTime - 60)
        }
    }

    const handlePlay = () => {
        clearTimeout(timeout);
        setPlay(!play);
    }   
    
    const resetTimer = () => {
        const audio = document.getElementById("beep");
        if(!displayTime && timeType === "SESSION"){
          setDisplayTime(breakValue * 60)
          setTimeType("BREAK")
          audio.play()
        }
        if(!displayTime && timeType === "BREAK"){
          setDisplayTime(sessionValue * 60)
          setTimeType("SESSION")
          audio.pause()
          audio.currentTime = 0;
        }
      }
    
    const handleReset = () => {
        clearTimeout(timeout)
        setPlay(false)
        setBreakValue(5)
        setSessionValue(25)
        setDisplayTime(25 * 60)
        setTimeType("SESSION")
        const audio = document.getElementById("beep")
        audio.pause()
        audio.currentTime = 0
    }

    const clock = () => {
        if(play){
            timeout
            // setTimeout(() => {
            //     if(displayTime && play){
            //         setDisplayTime(displayTime - 1)
            //     }
            // }, 1000);
            resetTimer()
        } else {
           clearTimeout(timeout)       
        }
      }
      
     useEffect(() => {
        clock()
      }, [play, displayTime, timeout])


    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        return (
            (minutes < 10 ? '0' + minutes : minutes) + ":" +
            (seconds < 10 ? '0' + seconds : seconds)
        )
    }      

    return(
        <div className="App">
            <h1>25 + 5 Pomodoro Clock</h1>
            <div class="container-fluid">
                <div class="row">
                    <div id="break-label" class="col-md-6">
                        <h3>Break Length</h3>
                            <div id="break-length">
                                <button className="btn btn-success" disabled={play} id="break-increment" onClick={()=>incrementBreakValue()}> + </button>
                                    <h5>{breakValue}</h5>
                                <button className="btn btn-success" disabled={play} id="break-decrement" onClick={()=>decrementBreakValue()}> - </button>   
                            </div>                            
                    </div>

                    <div id="session-label" class="col-md-6">
                        <h3>Session Length</h3>                        
                            <div id="session-length">
                                <button className="btn btn-success" disabled={play} id="session-increment" onClick={()=>incrementSessionValue()}> + </button>
                                    <h5>{sessionValue}</h5>
                                <button className="btn btn-success" disabled={play} id="session-decrement" onClick={()=>decrementSessionValue()}> - </button>                
                            </div>                        
                    </div>
                
                </div>
                
            

            <div id="timer-label">
                <h3>{timeType === "SESSION" ? "Session" : "Break"}</h3>
                
                <div id="time-left">
                    <h5>{formatTime(displayTime)}</h5>
                </div>              
            </div>

            
            

            <button className="btn btn-primary" id="start_stop" onClick={handlePlay}>Start/Stop</button>
            <button className="btn btn-info" id="reset" onClick={handleReset}>Reset</button>

            </div>
            
            <audio
            id="beep" 
            preload="auto"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />
        </div>
    )
}

export default App;