import { Routes, Route } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { Toaster } from 'sonner'
import { NotFoundPage } from './pages/NotFound'
import { RegisterPage } from './pages/RegisterPage'
import { HomePage } from './pages/HomePage'
import { ProtectedRouter } from './pages/ProtectedRoute'
import { UnProtectedRouter } from './pages/UnProtectedRoute'

function App() {
  return (
    <div className=' w-full h-screen flex justify-center items-center'>
        <Toaster richColors />
      <Routes>
        <Route element={<ProtectedRouter/>}>
          <Route path='/' element={<HomePage/>}></Route>
        </Route >
        <Route element={<UnProtectedRouter />}>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
        </Route>
        <Route path='*' element={<NotFoundPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
