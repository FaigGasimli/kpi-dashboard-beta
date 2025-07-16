import React, { useState } from "react";
import styles from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Zəhmət olmasa, bütün xanaları doldurun.");
      return;
    }
    setError("");
    alert("Daxil oldunuz!");
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email daxil edin"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Şifrə</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifrə daxil edin"
          />
        </div>
        <button type="submit" className={styles.loginButton}>Daxil ol</button>
      </form>
    </div>
  );
};

export default Login;
