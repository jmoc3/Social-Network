import { Routes, Route } from 'react-router-dom'
import './App.css'
import { LoginPage } from './components/LoginPage'
import { Toaster } from 'sonner'
import { NotFoundPage } from './components/NotFound'
import { RegisterPage } from './components/RegisterPage'

function App() {
  return (
    <div className=' w-full h-screen flex justify-center items-center'>
        <Toaster richColors />
      <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='*' element={<NotFoundPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
