import { useGameStore } from "@/store/useGameStore";
import { useEffect, useState, type FC } from "react";

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

export const TypeSide: FC = () => {

  const {status, actualHistory, wordCounter, lineCounter, setActualHistory, setLineCounter, setWordCounter, setStatus, startClock, stopClock } = useGameStore()
  const parts = text.split(".").map(text => text.trim()) 
  const [state, setState] = useState<'good' | 'bad' >('good')
  useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) =>{
      const newKey = e.key == "Space" ? ' ' : e.key
    
      if(e.key == "Backspace"){
        const newHistory = actualHistory.slice(0, actualHistory.length - 1)
        setActualHistory(newHistory)
        setWordCounter(wordCounter - 1)
        if(!text.toLowerCase().includes(newHistory)){ setState('bad') }
        else{ setState('good') }
        return
      }

      if(e.key == 'Enter' && actualHistory == parts[lineCounter].toLowerCase()){
        console.log(lineCounter, parts.length - 1)
        if(parts.length - 2 == lineCounter){
          setStatus('finished')
          console.log("END")
          stopClock()
          return
        }

        setLineCounter(lineCounter + 1)
        setWordCounter(0)
        setActualHistory('')
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
      
      if(!text.toLowerCase().includes(newHistory)){ setState('bad') }
      else{ setState('good') }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  },[status, parts, lineCounter, wordCounter, actualHistory, setStatus, startClock, stopClock, setActualHistory, setLineCounter, setWordCounter])
  

  return (
    <div className="w-full h-full flex flex-col justify-center items-center" onKeyDown={()=> console.log("aaaaaaaaa")}>
      {
        parts.map((line, index) => ( 
          <span key={index} className={`text-xl`}>
            {
              line.split("").map((letter, index2) =>(
                <span className={`${index2 < wordCounter && lineCounter == index  ? `opacity-100 underline ${state != 'good' ? 'text-red-500' : ''}` : 'opacity-25'} `} key={index2}>{letter}</span>
              ))
            }
          </span>
        ))
      }
    </div>
  )
}