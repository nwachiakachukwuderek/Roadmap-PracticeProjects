import { useState, useRef, useCallback, useEffect } from 'react'
import './App.css'

function App() {
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({})
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const validateStep1 = useCallback(() => {
    const newErrors = {}
    const name = nameRef.current.value.trim()
    if (!name) newErrors.name = 'Name is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [])

  const validateStep2 = useCallback(() => {
    const newErrors = {}
    const email = emailRef.current.value.trim()
    if (!email) newErrors.email = 'Email is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [])

  const validateStep3 = useCallback(() => {
    const newErrors = {}
    const password = passwordRef.current.value
    if (!password) newErrors.password = 'Password is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [])

  useEffect(() => {
    if (step === 1) nameRef.current?.focus()
    else if (step === 2) emailRef.current?.focus()
    else if (step === 3) passwordRef.current?.focus()
  }, [step])

  const handleNext = useCallback(() => {
    let isValid = false
    if (step === 1) isValid = validateStep1()
    else if (step === 2) isValid = validateStep2()
    else if (step === 3) isValid = validateStep3()
    
    if (isValid) {
      setStep(step + 1)
      setErrors({})
    }
  }, [step, validateStep1, validateStep2, validateStep3])

  const handlePrevious = useCallback(() => {
    setStep(step - 1)
  }, [step])

  return (
    <>
      <h1>Step {step} of 3</h1>

      {step === 1 && (
        <div>
          <label>Name: <input ref={nameRef} type="text" /></label>
          {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
        </div>
      )}

      {step === 2 && (
        <div>
          <label>Email: <input ref={emailRef} type="email" /></label>
          {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
        </div>
      )}

      {step === 3 && (
        <div>
          <label>Password: <input ref={passwordRef} type="password" /></label>
          {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
        </div>
      )}

      <button onClick={handlePrevious} disabled={step === 1}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </>
  )
}

export default App
