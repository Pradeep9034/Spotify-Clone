import { createContext } from "react";

const songContext=createContext({
    currentSong:null,
    setCurrenSong:(currentSong)=>{},
    soundPlayed:null,
    setSoundPlayed:()=>{},
    isPaused:null,
    setIsPaused:()=>{},
    isMuted:null,
    setIsMuted:()=>{}
})

export default songContext;