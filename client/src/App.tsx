import './App.css'
import { LoginPage } from './components/LoginPage'
import { Toaster } from 'sonner'

function App() {
  return (
    <div className=' w-full h-screen flex justify-center items-center'>
      <Toaster richColors />
      <LoginPage />
    </div>
  )
}

export default App
