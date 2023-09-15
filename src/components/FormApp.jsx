import React, { useEffect, useState } from "react";
import "../App.css";

function FormApp() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    country: "",
    id: "",
  });

  const handleInputChange = (event) => {
    const { name } = event.target;
    var value = event.target.value.toUpperCase();
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setShowSuccessMessage(true);

    clearForm();
  };

  const clearForm = () => {
    // Establece los valores de los campos de entrada en blanco directamente
    document.getElementsByName("username")[0].value = "";
    document.getElementsByName("name")[0].value = "";
    document.getElementsByName("surname")[0].value = "";
    document.getElementsByName("id")[0].value = "";

    // Restablece el valor del campo de selección a "Select country"
    const countrySelect = document.getElementById("country");
    countrySelect.value = "Select country";

    // También puedes limpiar el estado formData si lo deseas
    setFormData({
      username: "",
      name: "",
      surname: "",
      country: "",
      id: "",
    });
  };

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
            <option value="Select country" data-testid="country-option-empty">
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
        <button type="button" onClick={clearForm} data-testid="clear-button">
          Clear
        </button>
      </form>

      {showSuccessMessage && (
        <div data-testid="success-message">User created successfully.</div>
      )}
    </div>
  );
}

export default FormApp;
