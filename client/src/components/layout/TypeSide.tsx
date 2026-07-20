import { useGameStore } from "@/store/useGameStore";
import { useEffect, useState, type FC } from "react";

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

export const TypeSide: FC = () => {
  const [sent, setSent] = useState<boolean>(false)
  const {
    status, 
    clock,
    actualHistory, 
    wordCounter, 
    lineCounter, 
    setActualHistory, 
    setLineCounter, 
    setWordCounter, 
    setStatus, 
    startClock, 
    stopClock,
    doCalculation,
    addToStatistics 
  } = useGameStore()

  const parts = text.split(".").map(text => text.trim())
  const [badWordIndex, setBadWordIndex] = useState<number[]>([]) 
  
  useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) =>{  
      const newKey = e.key == "Space" ? ' ' : e.key
    
      if(e.key == "Backspace"){
        const newHistory = actualHistory.slice(0, actualHistory.length - 1)
        setActualHistory(newHistory)
        setWordCounter(wordCounter - 1)
        setBadWordIndex(badWordIndex.slice(0, badWordIndex.length - 1))
        return
      }

      if(e.key == 'Enter' && actualHistory == parts[lineCounter].toLowerCase() && status != 'finished'){
        console.log(actualHistory)
        if(parts.length - 2 == lineCounter && !sent){
          setStatus('finished')
          stopClock()
          const { wpm, cpm } = doCalculation(actualHistory)
          const time = `${(clock[0])}`.padStart(2, '0') + ':' + `${(clock[1])}`.padStart(2, '0')
          console.log(time)
          addToStatistics({
            id:null,
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
      if(status != 'playing'){
        setStatus('playing')
        startClock()
      }

      const newHistory = actualHistory + newKey
      setActualHistory(newHistory)
      setWordCounter(wordCounter + 1)
      
      if(!text.toLowerCase().includes(newHistory)){ setBadWordIndex([...badWordIndex, newHistory.length - 1]) }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  },[
      status,
      clock,
      sent,
      parts,
      lineCounter,
      wordCounter,
      actualHistory,
      badWordIndex,
      setBadWordIndex,
      setSent,
      setStatus,
      startClock,
      stopClock,
      setActualHistory,
      setLineCounter,
      setWordCounter,
      addToStatistics,
      doCalculation
    ]
  )
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {
        parts.map((line, index) => ( 
          <span key={index} className={`text-xl`}>
            {
              line.split("").map((letter, index2) =>(
                <span className={`${index2 < wordCounter && lineCounter == index  ? `opacity-100 underline ${badWordIndex.includes(index2) ? 'text-red-500' : ''}` : 'opacity-25'} `} key={index2}>{letter}</span>
              ))
            }
          </span>
        ))
      }
    </div>
  )
}