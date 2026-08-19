import { useGameStore } from "@/store/useGameStore"
export const useProgresiveSound = () => {
  const counter = useGameStore((state)=> state.soundCounter)
  const increment = useGameStore((state)=> state.incrementSoundCounter)
  const resetSoundCounter = useGameStore((state)=> state.resetSoundCounter)

  const play = () => {
    const ctx = new window.AudioContext()
    const now = ctx.currentTime

    const harmonics = [ 
      { mult: 1,    decay: 0.9,  vol: 0.35 },
      { mult: 2.0,  decay: 0.6,  vol: 0.25 },
      { mult: 2.51, decay: 0.4,  vol: 0.18 },
      { mult: 3.9,  decay: 0.25, vol: 0.10 },
      { mult: 5.4,  decay: 0.15, vol: 0.05 }
    ]

    const baseFrecuency = 900 + counter * 50

    harmonics.forEach(({mult, decay, vol}) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.value = baseFrecuency * mult
      
      gain.gain.setValueAtTime(vol, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + decay)

      osc.connect(gain).connect(ctx.destination)
      osc.start()
      osc.stop(now + decay)
    })

    increment()
  } 

  return {play, resetSoundCounter}
}