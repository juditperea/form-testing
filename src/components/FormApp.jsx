import React, { useEffect, useState } from "react";
import "../App.css";

function FormApp() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    country: "Select country",
    id: "",
  });
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    var upperCaseValue = value.toUpperCase();
    setFormData({ ...formData, [name]: upperCaseValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isSubmitDisabled) {
      setShowSuccessMessage(true);
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

  useEffect(() => {
    const { username, name, surname, country, id } = formData;
    const isUsernameValid = username.length <= 10;
    const isNameValid = name !== "";
    const isSurnameValid = surname !== "";
    const isCountryValid = country !== "Select country";
    const isIdValid = id !== "";

    setIsSubmitDisabled(!(isUsernameValid && isNameValid && isSurnameValid && isCountryValid && isIdValid));
  }, [formData]);

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
            <option value="Select country" data-testid="country-option-empty" className="nooption">Select country </option>
            <option value="SPAIN" data-testid="country-option-spain">SPAIN</option>
            <option value="ARGENTINA" data-testid="country-option-argentina">ARGENTINA</option>
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
