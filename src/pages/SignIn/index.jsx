import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../services/api.js'
import { useIsConnected } from '../../utils/authentication.js'
import '../../styles/SignIn.css'

function SignIn() {
  const isConnected = useIsConnected()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  // async function login(e, p) {
  //   try {
  //     setLoading(true)
  //     const response = await API.login(e, p)
  //     if (response.status === 200) {
  //       console.log('success')
  //     } else {
  //       throw new Error('Erreur de connexion')
  //     }
  //   } catch (err) {
  //     setError(true)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    console.log('Email entré:', event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    console.log('Mot de passe entré:', event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      console.log('Email envoyé:', email)
      console.log('Password envoyé:', password)
      await API.login(email, password)
      setLoading(false)
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isConnected) {
      navigate('/user')
    }
  }, [isConnected, navigate])

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" />
        <h1>Sign In</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleEmailChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && (
            <div className="input-wrapper">
              <p style={{ color: 'red' }}>
                Les informations saisies ne sont pas correctes
              </p>
            </div>
          )}
          <button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default SignIn
