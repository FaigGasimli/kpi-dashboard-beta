"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import styles from "./login.module.css"

const STATIC_EMAIL = "tahira.akhundova@gmail.com"
const STATIC_PASSWORD = "123456"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/", { replace: true })
    }
  }, [navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Zəhmət olmasa, bütün xanaları doldurun.")
      return
    }
    const emailTrimmed = email.trim().toLowerCase()
    if (emailTrimmed !== STATIC_EMAIL || password !== STATIC_PASSWORD) {
      setError("Email və ya şifrə yanlışdır. Yalnız icazəli istifadəçi daxil ola bilər.")
      return
    }
    setError("")
    localStorage.setItem("token", "logged_in")
    navigate("/", { replace: true })
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoArea}><img src="" alt="" /></div>

        <h2 className={styles.title}>Hesaba daxil ol</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ünvanınızı daxil edin"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Şifrə
            </label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrənizi daxil edin"
                className={styles.passwordInput}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.eyeButton}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className={styles.forgotPassword}>
              <button type="button" className={styles.forgotPasswordLink} onClick={() => setError("")}>
                Şifrənizi unutmusunuz?
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Daxil olun
          </button>
        </form>
      </div>
    </div>
  )
}
