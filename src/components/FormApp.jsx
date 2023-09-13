import React, { useState } from 'react';
import '../App.css';

function FormApp() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    country: '',
    id: '',
    usernameError: '',
    nameError: '',
    surnameError: '',
    idError: '',
  });

  const clearForm = () => {
    setFormData({
      username: '',
      name: '',
      surname: '',
      country: '',
      id: '',
      usernameError: '',
      nameError: '',
      surnameError: '',
      idError: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Username</p>
          <input
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            maxLength={10}
            required
            data-testid="username"
          />
          <span style={{ color: 'red' }} data-testid="username-error">
            {formData.usernameError}
          </span>
        </div>
        <div>
          <p>Name</p>
          <input
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            required
            data-testid="name"
          />
          <span style={{ color: 'red' }} data-testid="name-error">
            {formData.nameError}
          </span>
        </div>
        <div>
          <p>Surname</p>
          <input
            type="text"
            value={formData.surname}
            onChange={handleInputChange}
            required
            data-testid="surname"
          />
          <span style={{ color: 'red' }} data-testid="surname-error">
            {formData.surnameError}
          </span>
        </div>
        <div>
          <p>Country</p>
          <select
            id="country"
            value={formData.country}
            onChange={handleInputChange}
            required
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
            value={formData.id}
            onChange={handleInputChange}
            required
            data-testid="id"
          />
          <span style={{ color: 'red' }} data-testid="id-error">
            {formData.idError}
          </span>
        </div>
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
        <button type="button" onClick={clearForm} data-testid="clear-button">
          Clear
        </button>
      </form>
    </div>
  );
}

export default FormApp;
