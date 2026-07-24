import { useGameStore } from "@/store/useGameStore";
import { useEffect, useState, type FC } from "react";
import { useProgresiveSound } from '@/hooks/useProgresiveSound'
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
const BASE = 2
const randomColors = ['text-[#F4A300]', 'text-[#E63946]', 'text-[#3A0CA3]', 'text-[#4CC9F0]']

export const TypeSide: FC = () => {
  const [sent, setSent] = useState<boolean>(false)
  const [showAnimation, setShowAnimation] = useState<number[]>([])
  const [pointColor, setPointColor] = useState<string>('')
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
  const play = useProgresiveSound()
  
  useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) =>{  
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
        setShowAnimation([...showAnimation, letterCounter])
        setPointColor(randomColors[Math.floor(Math.random() * randomColors.length)])
        play()
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
      doCalculation,
      play
    ]
  )
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {
        parts.map((line, index) => ( 
          <span key={index} className={`text-xl`}>
            {
              line.split("").map((letter, index2) =>(
                <span key={index2} className={`relative ${index2}`}>
                  <span 
                    className={`${index2 < letterCounter && lineCounter == index  ? `opacity-100 underline ${[...badWordIndex].includes(index2) ? 'text-red-500' : ''}` : 'opacity-25'} `} 
                    >
                    {letter}
                  
                  </span>
                  {text[index2] == " " ? <span className={`absolute left-0 bottom-7 opacity-0 ${showAnimation.includes(index2)  ? `animate-pointsUp ${pointColor}` : ''}`} >+{gameData.points}</span> : <></>}
                </span>
            ))
            }
          </span>
        ))
      }
    </div>
  )
}