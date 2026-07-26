import { useGameStore } from "@/store/useGameStore";
import { useEffect, useState, type FC } from "react";
import { useProgresiveSound } from '@/hooks/useProgresiveSound'
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non erat sit amet est tempor varius. Aenean gravida quam dui, eget convallis odio suscipit ut."
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
    wordWithPoints,
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
  const [wordPoint, setWordPoint] = useState<number>() 
  const play = useProgresiveSound()
  
  useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) =>{  
      const newKey = e.key == "Space" ? ' ' : e.key
      if(e.key == "Backspace" && letterCounter > 0){
        const actualLetterIndex = letterCounter - 1
        
        if (actualHistory[actualLetterIndex] == ' ' && wordCounter > 0 && Object.keys(wordWithPoints).includes(actualHistory.split(" ")[wordCounter])){ 
          delete wordWithPoints[actualHistory.split(" ")[wordCounter]]
          setWordCounter(wordCounter - 1) 
        }
        
        if([...badWordIndex].includes(actualLetterIndex)){ setBadWordIndex(new Set([...badWordIndex].filter(e => e != actualLetterIndex))) }

        const newHistory = actualHistory.slice(0, actualHistory.length - 1)
        setActualHistory(newHistory)
        setLetterCounter(actualLetterIndex) 

        return
      }

      if(e.key == 'Enter' && actualHistory == text && status != 'finished'){
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

      if(e.key.length > 1 && e.key != 'Space') return
      const currentWord = actualHistory.split(" ")[wordCounter]
      const targetWord = text.split(" ")[wordCounter]

      console.log(" -> ", wordWithPoints, targetWord, wordCounter)
      if(currentWord == targetWord && e.key == ' ' && !Object.keys(wordWithPoints).includes(currentWord)){
        wordWithPoints[currentWord] = 1
        const points = currentWord.length * BASE
        setWordPoint(points)
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
      setWordPoint,
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
      <span className="text-2xl">
        {
          text.split("").map((letter, index2) =>(
            <span key={index2} className={`relative ${index2}`}>
              <span 
                className={`${index2 < letterCounter  ? `opacity-100 underline ${[...badWordIndex].includes(index2) ? 'text-red-500' : ''}` : 'opacity-25'}`} 
                >
                {letter}
              
              </span>
              {text[index2] == " " ? <span className={`absolute left-0 bottom-7 opacity-0 ${showAnimation.includes(index2)  ? `animate-pointsUp ${pointColor}` : ''}`} >+{wordPoint}</span> : <></>}
            </span>
          ))
        }
      </span>

    </div>
  )
}