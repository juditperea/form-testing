import React, { useEffect, useState } from 'react'
import '../App.css'

function FormApp () {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [isIdValid, setIsIdValid] = useState(false)
  const [isUsernameValid, setIsUsernameValid] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    country: 'Select country',
    id: ''
  })
  //useEffect de name

  useEffect(() => {
    const { username, name, surname, country, id } = formData
    const isUsernameValid = username.length <= 10 && !username.includes(name)
    const isNameValid = name !== ''
    const isSurnameValid = surname !== ''
    const isCountryValid = country !== 'Select country'
    const isIdValid = validateID(formData.id.toUpperCase())

    setIsSubmitDisabled(
      !(
        isUsernameValid &&
        isNameValid &&
        isSurnameValid &&
        isCountryValid &&
        isIdValid
      )
    )
  }, [formData, isIdValid, showSuccessMessage])
  //meter aqui el handke submit
  const handleInputChange = event => {
    const { name, value } = event.target
    var upperCaseValue = value.toUpperCase()
    if (name === 'id') {
      setFormData({ ...formData, [name]: upperCaseValue })
      validateID(upperCaseValue)
    } else {
      setFormData({ ...formData, [name]: upperCaseValue })
    }
  }

  const handleId = event => {
    //useeffect

    const newId = event.target.value

    const isIdValid = validateID(newId)

    setIsIdValid(isIdValid)
    setFormData({
      ...formData,
      id: newId
    })
    if (!isIdValid) {
      setClicked(true)
    }
  }
  const handleUsername = event => {
    const User = event.target.value.toUpperCase()
    const isUsernameValid = User.includes(formData.name) && formData.name !== ''
    console.log(isUsernameValid)
    setIsUsernameValid(isUsernameValid)

    setFormData({
      ...formData,
      username: User
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (!isSubmitDisabled) {
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
      setClicked(true)
      clearForm()
    }
  }

  const clearForm = () => {
    setFormData({
      username: '',
      name: '',
      surname: '',
      country: 'Select country',
      id: ''
    })

    setIsSubmitDisabled(true)
  }

  const validateID = id => {
    const { country } = formData

    if (country === 'ESPAÑA') {
      const validLetters = 'TRWAGMYFPDXBNJZSQVHLCKE'
      const number = parseInt(id, 10)
      const letter = id.slice(-1).toUpperCase()

      if (id.length !== 9 || isNaN(number)) {
        setIsIdValid(false)
        return false
      }

      const calculatedLetter = validLetters[number % 23]
      setIsIdValid(letter === calculatedLetter)
      return isIdValid
    } else if (country === 'COLOMBIA') {
      let sum = 0
      let digit
      id = id.replace(/\s/g, '').replace(/-/g, '')
      id = id.split('').reverse().join('')
      for (let i = 0; i < id.length; i++) {
        digit = parseInt(id.charAt(i))

        if (i % 2 !== 0) {
          digit *= 2
          if (digit >= 10) {
            digit -= 9
          }
        }
        sum += digit
        return sum % 10 === 0
      }

      return isIdValid
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Username</p>
          <input
            type='text'
            maxLength={10}
            name='username'
            value={formData.username}
            onChange={handleUsername}
            data-testid='username'
          />
          {formData.username.includes(formData.name) && (
            <div className='message-error'>
              The name can't be included in the username
            </div>
          )}
        </div>
        <div>
          <p>Name</p>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            data-testid='name'
          />
        </div>
        <div>
          <p>Surname</p>
          <input
            type='text'
            name='surname'
            value={formData.surname}
            onChange={handleInputChange}
            data-testid='surname'
          />
        </div>
        <div>
          <p>Country</p>
          <select
            name='country'
            value={formData.country}
            onChange={handleInputChange}
            data-testid='country'
          >
            <option
              value='Select country'
              data-testid='country-option-empty'
              className='nooption'
            >
              Select country
            </option>
            <option value='ESPAÑA' data-testid='country-option-spain'>
              ESPAÑA
            </option>
            <option value='COLOMBIA' data-testid='country-option-colombia'>
              COLOMBIA
            </option>
          </select>
        </div>
        <div>
          <p>ID</p>
          <input
            type='text'
            name='id'
            data-testid='id'
            value={formData.id.toUpperCase()}
            onChange={handleId}
          />
          {clicked && (
            <div className={`message-error ${isIdValid ? 'valid' : 'invalid'}`}>
              {isIdValid ? '' : 'Please enter a valid ID'}
            </div>
          )}
        </div>
        <button
          type='submit'
          data-testid='submit-button'
          disabled={isSubmitDisabled}
          className='submit'
        >
          Submit
        </button>
        <button
          type='button'
          onClick={clearForm}
          data-testid='clear-button'
          className='clear'
        >
          Clear
        </button>
      </form>
      <div data-testid='success-message' className='message'>
        {showSuccessMessage && '✔ User created successfully.'}
      </div>
    </div>
  )
}

export default FormApp
