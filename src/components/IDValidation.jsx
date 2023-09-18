import React, { useState } from "react";

function IDValidation({ id, onIdChange }) {
  const [isValid, setIsValid] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleIdChange = (event) => {
    const newId = event.target.value;
    onIdChange(newId);
    setId(newId);
    setClicked(true);
    validateID(newId);
  };

  const validateID = (id) => {
    const validLetters = "TRWAGMYFPDXBNJZSQVHLCKE";
    const number = parseInt(id, 10);
    const letter = id.slice(-1).toUpperCase();

    if (id.length !== 9 || isNaN(number)) {
      setIsValid(false);
      return;
    }

    const calculatedLetter = validLetters[number % 23];
    setIsValid(letter === calculatedLetter);
  };

  return (
    <div>
      <input
        type="text"
        name="id"
        value={id}
        data-testid="id"
        onChange={handleIdChange}
      />
      {clicked && ( 
        isValid ? (
          <p style={{ color: "green" }}>✔ </p>
        ) : (
          <p style={{ color: "red" }}>Please enter a valid ID</p>
        )
      )}
    </div>
  );
}

export default IDValidation;
