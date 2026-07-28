import { useGameStore } from "@/store/useGameStore";
import { useEffect, useState, type FC } from "react";
import { useProgresiveSound } from '@/hooks/useProgresiveSound'
import { useErrorSound } from "@/hooks/useErrorSound";
const BASE = 2
const randomColors = ['text-[#F4A300]', 'text-[#E63946]', 'text-[#3A0CA3]', 'text-[#4CC9F0]']

export const TypeSide: FC = () => {
  const [sent, setSent] = useState<boolean>(false)
  const [pointColor, setPointColor] = useState<string>('')
  const {
    currentText,
    status, 
    gameData,
    clock,
    actualHistory, 
    wordCounter,
    wordWithPoints,
    letterCounter, 
    playerStatistics,
    currentStreak,
    goodLetters,
    badLetters,
    showAnimation,
    setGameData,
    setActualHistory, 
    setWordCounter,
    setLetterCounter, 
    setStatus, 
    startClock, 
    stopClock,
    doCalculation,
    addToStatistics,
    setCurrentStreak,
    setBadLetters,
    setGoodLetters,
    switchShowPointsAnimation,
    setShowAnimation
  } = useGameStore()

  const parts = currentText.split(".").map(text => text.trim())
  const [badWordIndex, setBadWordIndex] = useState<Set<number>>(new Set())
  const [wordPoint, setWordPoint] = useState<number>() 
  const play = useProgresiveSound()
  const playError = useErrorSound()
  
  useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) =>{  
      const newKey = e.key == "Space" ? ' ' : e.key
      if(e.key == "Backspace" && letterCounter > 0){
        const behindLetterIndex = letterCounter - 1
        
        if(badLetters.includes(behindLetterIndex)){ setBadLetters(badLetters.filter(e => e != behindLetterIndex)) }
        if (actualHistory[behindLetterIndex] == ' ' && wordCounter > 0 && Object.keys(wordWithPoints).includes(`${wordCounter - 1}`)){ setWordCounter(wordCounter - 1) }
        
        if([...badWordIndex].includes(behindLetterIndex)){ setBadWordIndex(new Set([...badWordIndex].filter(e => e != behindLetterIndex))) }

        const newHistory = actualHistory.slice(0, actualHistory.length - 1)
        setActualHistory(newHistory)
        setLetterCounter(behindLetterIndex) 

        return
      }

      if(e.key == 'Enter' && status != 'finished'){
        setStatus('finished')
        stopClock()
        const { wpm, cpm } = doCalculation(actualHistory)
        const time = `${(clock[0])}`.padStart(2, '0') + ':' + `${(clock[1])}`.padStart(2, '0')
        addToStatistics({
          id: playerStatistics[playerStatistics.length - 1].id! + 1,
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
      const targetWord = currentText.split(" ")[wordCounter]
      console.log(actualHistory.split(" "), currentWord.length > targetWord.length, wordCounter)
      if(currentWord.length == targetWord.length && 
          e.key == ' '
        ){
        
        if(!Object.keys(wordWithPoints).includes(`${wordCounter}`)){
          wordWithPoints[wordCounter] = 1
          
          const goodLetters = currentWord.split("").filter((e, i) => e == targetWord[i]).length
          const points = Math.round(goodLetters * BASE * (currentStreak || 1))
          
          setWordPoint(points)
          setGameData("points", gameData.points + points)
          setShowAnimation([...showAnimation, letterCounter])
          setPointColor(randomColors[Math.floor(Math.random() * randomColors.length)])
          switchShowPointsAnimation()
          play()

          setCurrentStreak(currentStreak + 1)
        }

        setWordCounter(wordCounter + 1)
      }

      if(status != 'playing'){
        setStatus('playing')
        startClock()
      }
      const newHistory = actualHistory + newKey
      setActualHistory(newHistory)
      if(currentText[letterCounter] != newHistory[letterCounter]){ setBadWordIndex(new Set([...badWordIndex, newHistory.length - 1])) }
      setLetterCounter(letterCounter + 1)

      if(e.key != currentText[letterCounter]){
        setCurrentStreak(0)
        setBadLetters([...badLetters, letterCounter])
        playError()
        return
      }
    
      setGoodLetters([...goodLetters, letterCounter])
      console.log(actualHistory)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  },[
      currentText,
      status,
      showAnimation,
      gameData,
      clock,
      sent,
      parts,
      wordCounter,
      letterCounter,
      actualHistory,
      badWordIndex,
      playerStatistics,
      wordWithPoints,
      currentStreak,
      goodLetters,
      badLetters,
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
      setLetterCounter,
      addToStatistics,
      doCalculation,
      setCurrentStreak,
      setBadLetters,
      setGoodLetters,
      switchShowPointsAnimation,
      play,
      playError
    ]
  )
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <span className="text-2xl">
        {
          currentText.split("").map((letter, index2) =>(
            <span key={index2} className={`relative ${index2}`}>
              <span 
                className={`${index2 < letterCounter  ? `relative opacity-100 underline ${[...badWordIndex].includes(index2) ? 'text-red-500 animate-wrongWord' : ''}` : 'opacity-25'}`} 
                >
                {letter}
              
              </span>
              {currentText[index2] == " " ? <span className={`absolute left-0 bottom-7 opacity-0 ${showAnimation.includes(index2)  ? `animate-pointsUp ${pointColor}` : ''}`} >+{wordPoint}</span> : <></>}
              {currentText[index2] == " " ? <span className={`absolute -left-16 bottom-7 opacity-0 ${showAnimation.includes(index2)  ? `animate-pointsUp ${pointColor}` : ''}`} >x{currentStreak}</span> : <></>}
            </span>
          ))
        }
      </span>

    </div>
  )
}