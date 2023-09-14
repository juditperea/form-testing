import React, { useEffect, useState } from 'react';
import '../App.css';

function FormApp() {
  
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [allUpperCase, setAllUpperCase] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    country: '',
    id: '',
  });

  const clearForm = () => {
    setFormData({
      username: '',
      name: '',
      surname: '',
      country: '',
      id: '',
    });
  };


  const handleInputChange = (event) => {
  const { name } = event.target;
  var value = event.target.value.toUpperCase();
  console.log(name, value);
 setFormData({ ...formData, [name]: value });
  // Verificar si el valor contiene al menos un carácter en minúscula
  };


  const handleSubmit = (event) => {
    event.preventDefault()//evita que el submit refresque la pagina

    setShowSuccessMessage(true);//poner condicion, si es correcto el formulario
    //y no hay errores, sera true, si hay errores sera false

   clearForm()

  };



  useEffect ( () => {
    


  }, []);


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Username</p>
          <input
            type="text"
            name="username"
            onChange={handleInputChange}
            data-testid="username"
          />
        </div>
        <div>
          <p>Name</p>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            data-testid="name"
          />
        </div>
        <div>
          <p>Surname</p>
          <input
            type="text"
            name="surname"
            onChange={handleInputChange}
            data-testid="surname"
          />
        </div>
        <div>
          <p>Country</p>
          <select
            id="country"
            name="country"
            onChange={handleInputChange}
            data-testid="country"
          >
            <option value="" data-testid="country-option-empty">
              Select country
            </option>
            <option value="SPAIN" data-testid="country-option-spain">
              SPAIN
            </option>
            <option value="ARGENTINA" data-testid="country-option-argentina">
              ARGENTINA
            </option>
          </select>
        </div>
        <div>
          <p>ID</p>
          <input
            type="text"
            name="id"
            onChange={handleInputChange}
            data-testid="id"
          />
        </div>
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
        <button type="button"onClick={clearForm} data-testid="clear-button">
          Clear
        </button>
      </form>

      {showSuccessMessage && <div data-testid="success-message">User created successfully.</div>}
    </div>
  );
}

export default FormApp;
