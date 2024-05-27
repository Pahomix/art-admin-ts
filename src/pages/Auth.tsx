import {SyntheticEvent, useState} from "react";
import axiosInstance from "../api.config.ts";

export default function Auth () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const authenticationHandler = async (e: SyntheticEvent)=> {
    e.preventDefault()
    try {
      const response = await axiosInstance.post('/login', {
        username,
        password
      })
      const {token, role} = response.data

      if (role !== 'admin') {
        setError('Только админ может войти')
        return
      }

      localStorage.setItem('token', token)
      window.location.href = '/';
    } catch (e) {
      setError("Неверное имя пользователя или пароль")
    }
  }

  return (
    <>
      <div className="bg-white flex justify-center items-center w-full">
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="max-h-auto mx-auto max-w-xl">
            <div className="mb-8 space-y-3">
              <p className="text-xl font-bold text-center">ALEXEY EFREMOV</p>
              <p className="text-gray-500">
                Магия кроссовок в простом - играй красиво
              </p>
            </div>
            <form className="w-full" onSubmit={authenticationHandler}>
              <div className="mb-10 space-y-3">
                <div className="space-y-1">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none
                    peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="username">Имя
                      пользователя</label>
                    <input className="border-input bg-background ring-offset-background
                    placeholder:text-muted-foreground focus-visible:ring-ring
                    flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0
                    file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-offset-2
                    disabled:cursor-not-allowed disabled:opacity-50" id="username" placeholder="Pahomixmc"
                           name="username" onChange={e => setUsername(e.target.value)}/>
                    <label className="text-sm font-medium leading-none
                    peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">Пароль</label>
                    <input className="border-input bg-background ring-offset-background
                    placeholder:text-muted-foreground focus-visible:ring-ring
                    flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0
                    file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-offset-2
                    disabled:cursor-not-allowed disabled:opacity-50" id="password" placeholder="123qwerty"
                           name="password" onChange={e => setPassword(e.target.value)}/>
                  </div>
                </div>
                <button className="ring-offset-background focus-visible:ring-ring flex h-10
      w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2
      text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none
      disabled:opacity-50">
                  Авторизоваться
                </button>
              </div>
            </form>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </>
  )
}