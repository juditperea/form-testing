import React, { useState } from 'react';
import '../App.css';

function FormApp() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    country: '',
    id: '',
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (event) => {
  //  const { name, value } = event.target;
 //   setFormData({ ...formData, [name]: value });
  };
 const clearForm = () => {
    setFormData({
      username: '',
      name: '',
      surname: '',
      country: '',
      id: '',
    });}
  const handleSubmit = (event) => {
    event.preventDefault()//evita que el submit refresque la pagina

    setShowSuccessMessage(true);//poner condicion, si es correcto el formulario
    //y no hay errores, sera true, si hay errores sera false

   clearForm()

    // Hide the success message after a delay (e.g., 3 seconds)
    setTimeout(() => {
      //setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            data-testid="username"
          />
          <span style={{ color: 'red' }} data-testid="username-error"></span>
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
          <span style={{ color: 'red' }} data-testid="name-error"></span>
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
          <span style={{ color: 'red' }} data-testid="surname-error"></span>
        </div>
        <div>
          <p>Country</p>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            data-testid="country"
          >
            <option value="" data-testid="country-option-empty">
              Select country
            </option>
            <option value="Spain" data-testid="country-option-spain">
              Spain
            </option>
            <option value="Argentina" data-testid="country-option-argentina">
              Argentina
            </option>
          </select>
        </div>
        <div>
          <p>ID</p>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            data-testid="id"
          />
          <span style={{ color: 'red' }} data-testid="id-error"></span>
        </div>
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
        <button type="button" onClick={clearForm} data-testid="clear-button">
          Clear
        </button>
      </form>

      {showSuccessMessage && <div data-testid="success-message">User created successfully.</div>}
    </div>
  );
}

export default FormApp;
