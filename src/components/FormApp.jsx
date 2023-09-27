import React, { useEffect, useState } from 'react'
import '../App.css'
import UsernameInput from './UsernameInput'
import NameInput from './NameInput'
import SurnameInput from './SurnameInput'
import CountrySelect from './CountrySelect'
import IDInput from './IDInput'
import SubmitButton from './SubmitButton'
import ClearButton from './ClearButton'
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
      username: validateUsername(formData.username),
      name: formData.name !== '',
      surname: formData.surname !== '',
      country: formData.country !== '',
      id: validateID(formData.id, formData.country)
    }

    setErrorFields(newErrorFields)

    const hasErrors = Object.values(newErrorFields).every(value => !!value)
    const hasEmptyFields = Object.values(formData).some(value => value === '')

    if (!hasErrors && !hasEmptyFields) {
      setIsFormValid(true)
      setSuccessMessage('User created successfully')
    } else {
      setIsFormValid(false)
      setSuccessMessage('')
    }
    console.log(newErrorFields)
    console.log(setIsFormValid)
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
      <UsernameInput
          value={formData.username}
          onChange={(e) =>
            setFormData({
              ...formData,
              username: e.target.value.toUpperCase(),
            })
          }
          usernameAlert={usernameAlert}
        />
         <NameInput
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value.toUpperCase(),
            })
          }
        />
            <SurnameInput
          value={formData.surname}
          onChange={(e) =>
            setFormData({
              ...formData,
              surname: e.target.value.toUpperCase(),
            })
          }
        />
          <CountrySelect
          value={formData.country}
          onChange={(e) =>
            setFormData({
              ...formData,
              country: e.target.value.toUpperCase(),
            })
          }
        />
         <IDInput
          value={formData.id}
          onChange={handleIDChange}
          idAlert={idAlert}
        />
        <div className='buttondiv'>
          <SubmitButton onClick={handleSubmit} />
          <ClearButton onClick={clearForm} />
        </div>
        <p className='success-message' data-testid='success-message'>
          {isFormValid && successMessage}
        </p>
      </form>
    </div>
  )
}

export default FormApp
