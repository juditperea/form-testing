import React, { useEffect, useState } from 'react'
import '../App.css'

function FormApp () {
  const MAX_USERNAME_LENGTH = 10
  const [usernameAlert, setUsernameAlert] = useState('')
  const [isFormValid, setIsFormValid] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [idAlert, setIdAlert] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    country: '',
    id: ''
  })
  const clearForm = () => {
    setFormData({
      username: '',
      name: '',
      surname: '',
      country: '',
      id: ''
    })
    setSuccessMessage('')
  }
  const [errorFields, setErrorFields] = useState({
    username: false,
    name: false,
    surname: false,
    country: false,
    id: false
  })

  function validateIDByCountry (id, country) {
    const VALID_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE'
    const ID_NUMBER = id.substring(0, id.length - 1)
    const ID_LETTER = id.charAt(id.length - 1).toUpperCase()
    const calculatedLetter = VALID_LETTERS[ID_NUMBER % 23]

    if (country === 'SPAIN') {
      if (id.length !== 9) {
        return false
      }
      if (!/^\d+$/.test(ID_NUMBER)) {
        return false
      }
      return ID_LETTER === calculatedLetter
    } else if (country === 'ARGENTINA') {
      if (!(id.length === 7 || id.length === 8) || !/^\d+$/.test(ID_NUMBER)) {
        return false
      }
      return ID_LETTER === calculatedLetter
    }
  }

  function validateID (id, country) {
    if (country === 'SPAIN') {
      if (!validateIDByCountry(id, country)) {
        setIdAlert('Enter a valid ID for Spain')
      } else {
        setIdAlert('')
      }
    } else if (country === 'ARGENTINA') {
      if (!validateIDByCountry(id, country)) {
        setIdAlert('Enter a valid ID for Argentina')
      } else {
        setIdAlert('')
      }
    }
  }

  function validateUsernameLength (username) {
    return username.length <= MAX_USERNAME_LENGTH
  }

  function validateUsername (username) {
    const isFirstNameInUsername =
      username.includes(formData.name) && formData.name != ''
    if (!validateUsernameLength(username)) {
      setUsernameAlert('Username must be 10 or less characters')
    } else if (isFirstNameInUsername) {
      setUsernameAlert("The name can't be included in the username")
    } else {
      setUsernameAlert('')
    }
  }
  const handleSubmit = e => {
    e.preventDefault()

    const newErrorFields = {
      username: !formData.username,
      name: !formData.name,
      surname: !formData.surname,
      country: !formData.country,
      id: !formData.id || !validateID(formData.id, formData.country)
    }

    setErrorFields(newErrorFields)

    const valores = Object.values(newErrorFields)
    const algunCampoVacio = valores.some(valor => valor === false)
    if (algunCampoVacio) {
      setSuccessMessage('User created successfully')
    } else {
      setIsFormValid(false)
      setSuccessMessage('')
    }
  }

  useEffect(() => {
    validateUsername(formData.username)
    return () => {
      setUsernameAlert('')
    }
  }, [formData.username, formData.name])

  useEffect(() => {
    validateID(formData.id, formData.country)
    return () => {
      setIdAlert('')
    }
  }, [formData.id, formData.country])

  const handleIDChange = e => {
    const newID = e.target.value
    setFormData({ ...formData, id: newID })
  }

  return (
    <div>
      <form>
        <div>
          <p>Username</p>
          <p className='message-error' data-testid='message-error'>
            {usernameAlert && usernameAlert}
          </p>
          <input
            type='text'
            data-testid='username'
            value={formData.username}
            onChange={e =>
              setFormData({
                ...formData,
                username: e.target.value.toUpperCase()
              })
            }
          />
        </div>
        <div>
          <p>Name</p>
          <input
            type='text'
            value={formData.name}
            onChange={e =>
              setFormData({ ...formData, name: e.target.value.toUpperCase() })
            }
            data-testid='firstname'
          />
        </div>
        <div>
          <p>Surname</p>
          <input
            type='text'
            value={formData.surname}
            onChange={e =>
              setFormData({
                ...formData,
                surname: e.target.value.toUpperCase()
              })
            }
            data-testid='surname'
          />
        </div>
        <div>
          <p>Country</p>
          <select
            value={formData.country}
            onChange={e =>
              setFormData({
                ...formData,
                country: e.target.value.toUpperCase()
              })
            }
            data-testid='country'
          >
            <option value='' data-testid='country-option-empty'>
              Select country
            </option>
            <option value='SPAIN' data-testid='spain'>
              SPAIN
            </option>
            <option value='ARGENTINA' data-testid='argentina'>
              ARGENTINA
            </option>
          </select>
        </div>
        <div>
          <p>ID</p>
          <input
            type='text'
            value={formData.id.toUpperCase()}
            onChange={handleIDChange}
            data-testid='id'
          />
          <p className='message-error'>{idAlert}</p>
        </div>
        <div className='buttondiv'>
          <button
            type='submit'
            data-testid='submit-button'
            className='submit'
            onClick={handleSubmit}
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
        </div>
        <p className='success-message' data-testid='success-message'>
          {successMessage !== '' ? successMessage : ''}
        </p>
        
      </form>
    </div>
    
  )
}

export default FormApp
