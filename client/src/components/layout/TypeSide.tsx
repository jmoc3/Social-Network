import { useGameStore } from "@/store/useGameStore";
import { useEffect, useState, type FC } from "react";

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
const BASE = 2

export const TypeSide: FC = () => {
  const [sent, setSent] = useState<boolean>(false)
  const [showAnimation, setShowAnimation] = useState<boolean>(false)
  const {
    status, 
    gameData,
    clock,
    actualHistory, 
    wordCounter,
    letterCounter, 
    lineCounter, 
    playerStatistics,
    setGameData,
    setActualHistory, 
    setLineCounter, 
    setWordCounter,
    setLetterCounter, 
    setStatus, 
    startClock, 
    stopClock,
    doCalculation,
    addToStatistics 
  } = useGameStore()

  const parts = text.split(".").map(text => text.trim())
  const [badWordIndex, setBadWordIndex] = useState<Set<number>>(new Set()) 
  
  useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) =>{  
      
      if(showAnimation){ setShowAnimation(false) }
      const newKey = e.key == "Space" ? ' ' : e.key
      if(e.key == "Backspace" && letterCounter > 0){
        const actualLetterIndex = letterCounter - 1
      
        if (actualHistory[actualLetterIndex] == ' ' && wordCounter > 0){ setWordCounter(wordCounter - 1) }
        
        if([...badWordIndex].includes(actualLetterIndex)){ setBadWordIndex(new Set([...badWordIndex].filter(e => e != actualLetterIndex))) }

        const newHistory = actualHistory.slice(0, actualHistory.length - 1)
        setActualHistory(newHistory)
        setLetterCounter(actualLetterIndex) 

        return
      }
  
      if(e.key == 'Enter' && actualHistory == parts[lineCounter] && status != 'finished'){
        if(parts.length - 2 == lineCounter){
          setStatus('finished')
          stopClock()
          const { wpm, cpm } = doCalculation(actualHistory)
          const time = `${(clock[0])}`.padStart(2, '0') + ':' + `${(clock[1])}`.padStart(2, '0')
          addToStatistics({
            id: playerStatistics[0].id! + 1,
            userId: 1,
            cpm,
            wpm,
            time,
            updatedAt: new Date(),
            createdAt: new Date()
          })
          setSent(true)
          return
        }

        setLineCounter(lineCounter + 1)
        return
      }

      if(e.key.length > 1 && e.key != 'Space') return
      const currentWord = actualHistory.split(" ")[wordCounter]
      const targetWord = text.split(" ")[wordCounter]

      if(currentWord == targetWord && e.key == ' '){
        const points = currentWord.length * BASE
        setGameData("points", gameData.points + points)
        setWordCounter(wordCounter + 1)
        setShowAnimation(true)
      }

      if(status != 'playing'){
        setStatus('playing')
        startClock()
      }
      const newHistory = actualHistory + newKey
      setActualHistory(newHistory)
      if(text[letterCounter] != newHistory[letterCounter]){ setBadWordIndex(new Set([...badWordIndex, newHistory.length - 1])) }
      setLetterCounter(letterCounter + 1)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  },[
      status,
      showAnimation,
      gameData,
      clock,
      sent,
      parts,
      lineCounter,
      wordCounter,
      letterCounter,
      actualHistory,
      badWordIndex,
      playerStatistics,
      setShowAnimation,
      setStatus,
      setGameData,
      setBadWordIndex,
      setSent,
      startClock,
      stopClock,
      setActualHistory,
      setWordCounter,
      setLineCounter,
      setLetterCounter,
      addToStatistics,
      doCalculation
    ]
  )
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {
        parts.map((line, index) => ( 
          <span key={index} className={`relative text-xl`}>
            {
              line.split("").map((letter, index2) =>(
                <span key={index2}>
                  <span 
                    className={`${index2 < letterCounter && lineCounter == index  ? `opacity-100 underline ${[...badWordIndex].includes(index2) ? 'text-red-500' : ''}` : 'opacity-25'} `} 
                    >
                    {letter}
                  
                  </span>
                  {letterCounter == index2 ? <span className={`absolute bottom-5 ${showAnimation ? 'aniamte-pointsUp' : ''} `} >+{gameData.points}</span> : <></>}
                </span>
            ))
            }
          </span>
        ))
      }
    </div>
  )
}