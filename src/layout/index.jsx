"use client"

import { useState, useEffect, startTransition } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../layout/sidebar/sidebar"
import LoginForm from "../pages/login"
import "../App.css"

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn")
    if (loggedInStatus === "true") {
      startTransition(() => {
        setIsLoggedIn(true)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  const handleLogin = () => {
    startTransition(() => {
      setIsLoggedIn(true)
      localStorage.setItem("isLoggedIn", "true")
    })
  }

  if (isLoading) {
    return null 
  }

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <LoginForm onLoginSuccess={handleLogin} />
      </div>
    )
  }

  return (
    <div className="mein">
      <Sidebar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
