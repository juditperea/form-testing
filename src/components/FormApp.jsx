import React, { useEffect, useState } from "react";
import "../App.css";

function FormApp() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isIdValid, setIsIdValid] = useState(false)
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    country: "Select country",
    id: "",
  });
  useEffect(() => {
    const { username, name, surname, country, id } = formData;
    const isUsernameValid = username.length <= 10;
    const isNameValid = name !== "";
    const isSurnameValid = surname !== "";
    const isCountryValid = country !== "Select country";
    const isIdValid = validateID(formData.id);

    setIsSubmitDisabled(!(isUsernameValid && isNameValid && isSurnameValid && isCountryValid && isIdValid));
  }, [formData,isIdValid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    var upperCaseValue = value.toUpperCase();
    if (name === "id") {
      setFormData({ ...formData, [name]: upperCaseValue });
      validateID(upperCaseValue);
    } else {
      setFormData({ ...formData, [name]: upperCaseValue });
    }
  };

  const handleIdChange = (event) => {

    const newId = event.target.value;
  
    const isIdValid = validateID(newId);
  
    setIsIdValid(isIdValid); 
    setFormData({
      ...formData,
      id: newId
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isSubmitDisabled) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); 
      setClicked(true)
      clearForm();
    }
  };

  const clearForm = () => {
    setFormData({
      username: "",
      name: "",
      surname: "",
      country: "Select country",
      id: "",
    });

    setIsSubmitDisabled(true);
  };

  const validateID = (id) => {
    const { country } = formData;

    if (country === "ESPAÑA") {
      const validLetters = "TRWAGMYFPDXBNJZSQVHLCKE";
      const number = parseInt(id, 10);
      const letter = id.slice(-1).toUpperCase();
  
      if (id.length !== 9 || isNaN(number)) {
        setIsIdValid(false);
        return false;
      }
  
      const calculatedLetter = validLetters[number % 23];
      setIsIdValid(letter === calculatedLetter);
      return letter === calculatedLetter;
    } else if (country === "COLOMBIA") {
        id = id.replace(/\s/g, '').replace(/-/g, '');
      
        id = id.split('').reverse().join('');
      
        let sum = 0;
        for (let i = 0; i < id.length; i++) {
          let digit = parseInt(id.charAt(i));
      
          if (i % 2 !== 0) {
            digit *= 2;
            if (digit >= 10) {
              digit -= 9;
            }
          }
      
          sum += digit;
          return sum % 10 === 0;
      
      }
      
  return isIdValid;
      
    }
    
  };


  return (
    <div className="mt-4 p-4">
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            data-testid="username"
          />
        </div>
        <div>
          <p>Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            data-testid="name"
          />
        </div>
        <div>
          <p>Surname</p>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            data-testid="surname"
          />
        </div>
        <div>
          <p>Country</p>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            data-testid="country"
          >
            <option value="Select country" data-testid="country-option-empty" className="nooption">Select country</option>
            <option value="ESPAÑA" data-testid="country-option-spain">ESPAÑA</option>
            <option value="COLOMBIA" data-testid="country-option-colombia">COLOMBIA</option>
          </select>
        </div>
        <div>
          <p>ID</p>
          <input
            type="text"
            name="id"
            data-testid="id"
            value={formData.id}
            onChange={handleIdChange}/>
              {clicked &&(
              <div
                className={`message-error ${isIdValid ? 'valid' : 'invalid'}`}
              >
                {isIdValid ? '' : 'Please enter a valid ID'}
              </div>
            )}
        </div>
        <button
          type="submit"
          data-testid="submit-button"
          disabled={isSubmitDisabled}
          className="submit"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={clearForm}
          data-testid="clear-button"
          className="clear"
        >
          Clear
        </button>
      </form>

      {showSuccessMessage && (
        <div data-testid="success-message" className="message">
          ✔ User created successfully.
        </div>
      )}
    </div>
  );
}

export default FormApp;
