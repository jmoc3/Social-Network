import { useGameStore } from "@/store/useGameStore";
import { useEffect, useState, type FC } from "react";
import { useProgresiveSound } from '@/hooks/useProgresiveSound'
import { useErrorSound } from "@/hooks/useErrorSound";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";
const BASE = 2
const randomColors = ['text-[#F4A300]', 'text-[#E63946]', 'text-[#3A0CA3]', 'text-[#4CC9F0]']

export const TypeSide: FC = () => {
  const [sent, setSent] = useState<boolean>(false)
  const [pointColor, setPointColor] = useState<string>('')
  const { user } = useAuthStore()

  const { badLetters, currentText, showAnimation, letterCounter, currentStreak, actualHistory } = useGameStore()
  const { addStatisticsFront, addStatisticsBack } = useUserStore()

  const parts = currentText.split(".").map(text => text.trim())
  const [wordPoint, setWordPoint] = useState<number>() 
  const play = useProgresiveSound()
  const playError = useErrorSound()
  
  useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) =>{  
        const {
          currentWord,
          status, 
          gameData,
          clock,
          wordCounter,
          wordWithPoints,
          goodLetters,
          setCurrentWord,
          setGameData,
          setActualHistory, 
          setWordWithPoints,
          setWordCounter,
          setLetterCounter, 
          setStatus, 
          startClock, 
          stopClock,
          doCalculation,
          setCurrentStreak,
          setBadLetters,
          setGoodLetters,
          switchShowPointsAnimation,
          setShowAnimation
        } = useGameStore.getState()

      const newKey = e.code == "Space" ? ' ' : e.key
      if(e.key == "Backspace" && letterCounter > 0){
        const behindLetterIndex = letterCounter - 1
        if (actualHistory[behindLetterIndex] == ' ' && wordCounter > 0 && Object.keys(wordWithPoints).includes(`${wordCounter - 1}`)){ setWordCounter(wordCounter - 1) }
        
        if([...badLetters].includes(behindLetterIndex)){ setBadLetters(new Set([...badLetters].filter(e => e != behindLetterIndex))) }

        const newHistory = actualHistory.slice(0, actualHistory.length - 1)
        setActualHistory(newHistory)
        setLetterCounter(behindLetterIndex) 
        setCurrentWord(currentWord.slice(0, currentWord.length - 1))
        return
      }
      
      if(e.key == 'Enter' && currentText.length == actualHistory.length && status != 'finished'){
        
        setWordWithPoints(wordCounter, 1)
        const goodLetters = currentWord.split("").filter((e, i) => e == currentText.split(" ")[wordCounter][i]).length
        const points = Math.round(goodLetters * BASE * (currentStreak || 1))
        
        setWordPoint(points)
        setGameData("points", gameData.points + points)
        setShowAnimation([...showAnimation, letterCounter])
        setPointColor(randomColors[Math.floor(Math.random() * randomColors.length)])
        switchShowPointsAnimation()
        play()

        setCurrentStreak(currentStreak + 1)
      
        setStatus('finished')
        stopClock()
        const { wpm, cpm } = doCalculation(actualHistory)
        const time = `${(clock[0])}`.padStart(2, '0') + ':' + `${(clock[1])}`.padStart(2, '0')
        const statistic = {
          user_id: user!.user_id,
          cpm,
          wpm,
          time,
          updatedAt: new Date(),
          createdAt: new Date()
        }
        addStatisticsFront(statistic)
        addStatisticsBack(statistic)
        setSent(true)
        return
      }

      if(e.key.length > 1 && e.code != 'Space') return
      
      setCurrentWord(currentWord + e.key)      
      const targetWord = currentText.split(" ")[wordCounter]

      if(currentWord.length == targetWord.length && e.key == ' ' ) {
        if(!Object.keys(wordWithPoints).includes(`${wordCounter}`)){
          setWordWithPoints(wordCounter, 1)
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
        setCurrentWord("")
        setWordCounter(wordCounter + 1)
      }

      if(status != 'playing'){
        setStatus('playing')
        startClock()
      }
      const newHistory = actualHistory + newKey
      setActualHistory(newHistory)
      setLetterCounter(letterCounter + 1)
      if(e.key != currentText[letterCounter]){
        setCurrentStreak(0)
        setBadLetters(new Set([...badLetters, newHistory.length - 1]))
        playError()
        return
      }
    
      setGoodLetters([...goodLetters, letterCounter])
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  },[
    actualHistory,
    user,
    sent,
    parts,
    badLetters,
    currentStreak,
    currentText,
    letterCounter,
    showAnimation,
    addStatisticsBack,
    addStatisticsFront,
    setWordPoint,
    setSent,
    play,
    playError
  ]
  )
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <span className="text-3xl">
        {
          currentText.split("").map((letter, index2) =>(
            <span key={index2} className={`relative ${index2}`}>
              <span 
                className={`${index2 < letterCounter  ? `relative opacity-100 underline ${[...badLetters].includes(index2) ? 'text-red-500 animate-wrongWord' : ''}` : 'opacity-25'}`} 
                >
                {letter}
              
              </span>
              {currentText[index2] == " " || currentText.length == actualHistory.length? <span className={`absolute left-0 bottom-7 opacity-0 ${showAnimation.includes(index2)  ? `animate-pointsUp ${pointColor}` : ''}`} >+{wordPoint}</span> : <></>}
              {currentText[index2] == " " ? <span className={`absolute -left-16 bottom-7 opacity-0 ${showAnimation.includes(index2)  ? `animate-pointsUp ${pointColor}` : ''}`} >x{currentStreak}</span> : <></>}
            </span>
          ))
        }
      </span>

    </div>
  )
}