import React, { useEffect, useState } from "react";
import "../App.css";

function FormApp() {
  const MAX_USERNAME_LENGTH = 10;
  const [usernameAlert, setUsernameAlert] = useState("");
  const [idAlert, setIdAlert] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    country: "Select country",
    id: "", 
  });

  function validateIDByCountry(id, country) {
    if (country === "SPAIN") {
      if (id.length !== 9) {
        return false;
      }

      const VALID_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";
      const ID_NUMBER = id.substring(0, 8);
      const ID_LETTER = id.charAt(8).toUpperCase();

      if (!/^\d+$/.test(ID_NUMBER)) {
        return false;
      }

      const calculatedLetter = VALID_LETTERS[ID_NUMBER % 23];

      return ID_LETTER === calculatedLetter;
    } else if (country === "COLOMBIA") {
      
      return /^\d{10}$/.test(id);
    }
  }

  function validateID(id, country) {
    if (country === "SPAIN") {
      if (!validateIDByCountry(id, country)) {
        setIdAlert("Enter a valid ID for Spain");
      } else {
        setIdAlert("");
      }
    } else if (country === "COLOMBIA") {
      if (!validateIDByCountry(id, country)) {
        setIdAlert("Enter a valid ID for Colombia");
      } else {
        setIdAlert(""); 
      }
    }
  }

  function validateUsernameLength(username) {
    return username.length <= MAX_USERNAME_LENGTH;
  }

  function validateUsername(username) {
    if (!validateUsernameLength(username)) {
      setUsernameAlert("Username must be 10 or less characters");
    } else {
      setUsernameAlert("");
    }
  }

  useEffect(() => {
    validateUsername(formData.username);
    validateID(formData.id, formData.country);
    return () => {
      setUsernameAlert("");
      setIdAlert("");
    };
  }, [formData.username, formData.id, formData.country]);

  const handleIDChange = (e) => {
    const newID = e.target.value;
    setFormData({ ...formData, id: newID });
  };

  return (
    <div>
      <form>
        <div>
          <p>Username</p>
          <p>{usernameAlert}</p>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value.toUpperCase() })
            }
            data-testid="username"
          />
        </div>
        <div>
          <p>Name</p>
          <input
            type="text"
            value={formData.firstname}
            onChange={(e) =>
              setFormData({ ...formData, firstname: e.target.value.toUpperCase() })
            }
            data-testid="firstname"
          />
        </div>
        <div>
          <p>Surname</p>
          <input
            type="text"
            value={formData.surname}
            onChange={(e) =>
              setFormData({ ...formData, surname: e.target.value.toUpperCase() })
            }
            data-testid="surname"
          />
        </div>
        <div>
          <p>Country</p>
          <select
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value.toUpperCase() })
            }
            data-testid="country"
          >
            <option value="Select country" data-testid="country-option-empty">
              Select country
            </option>
            <option value="SPAIN" data-testid="spain">
              SPAIN
            </option>
            <option value="COLOMBIA" data-testid="colombia">
              COLOMBIA
            </option>
          </select>
        </div>
        <div>
          <p>ID</p>
          <input
            type="text"
            value={formData.id.toUpperCase()}
            onChange={handleIDChange}
            data-testid="id"
          />
          <p>{idAlert}</p>
        </div>
      </form>
    </div>
  );
}

export default FormApp;
