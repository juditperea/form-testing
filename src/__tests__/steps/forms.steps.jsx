import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FormApp from '../../components/FormApp'

export const FormProjectSteps = ({
  given: Given,
  and: And,
  when: When,
  then: Then
}) => {
  // Background
  Given('the user opens the app', () => {
    render(<FormApp />) 
  })

  // Scenario: Form elements are present
  Then('the following form elements should be visible:', (table) => {
    const formElements = table.raw().map((row) => row[0])
    formElements.forEach((element) => {
      expect(screen.getByLabelText(element)).toBeInTheDocument()
    })
  })

  // Scenario: Fields are empty
  Then('the following form fields should be empty:', (table) => {
    const formFields = table.raw().map((row) => row[0])
    formFields.forEach((field) => {
      expect(screen.getByLabelText(field)).toHaveValue('')
    })
  })

  // Scenario: Clicking on fields is working
  When('the user clicks on the following form fields:', (table) => {
    const formFields = table.raw().map((row) => row[0])
    formFields.forEach((field) => {
      const inputField = screen.getByLabelText(field)
      inputField.click()
    })
  })

  Then('the clicked fields should be active for input', () => {
    // You can add assertions here to check if the clicked fields are active for input
  })

  // Scenario: Country dropdown is working
  When('the user clicks on the "Country" dropdown', () => {
    const countryDropdown = screen.getByLabelText('Country')
    countryDropdown.click()
  })

  Then('a list of countries should be displayed', () => {
    // Add assertions to check if the list of countries is displayed
  })

  And('the user should be able to select a country from the list', () => {
    // Add assertions to check if the user can select a country from the list
  })

  // Scenario: User fills in the form correctly and submits
  When('the user enters the following information:', (table) => {
    // Fill in the form fields with the provided data
    const formData = table.rowsHash()
    // Example: formData.User, formData.Name, etc.
  })

  And('the user clicks the [Submit] button', () => {
    const submitButton = screen.getByText('Submit')
    submitButton.click()
  })

  Then('the user should be redirected to a new page', () => {
    // Add assertions to check if the user is redirected to a new page
  })

  And('a success message should be displayed on the new page with the following text:', (docString) => {
    // Add assertions to check if the success message is displayed with the provided text
  })
  Then('the form should not be submitted', () => {
    // Add assertions to check that the form was not submitted successfully
    // For example, you can check for error messages or the absence of a success message
    const successMessage = screen.queryByText('Success Message'); // Replace with the actual success message
  
    expect(successMessage).not.toBeInTheDocument();
  });
  
  // Scenario: Errors are highlighted red
Then('the following fields should be highlighted in red:', (table) => {
  const errorFields = table.raw().map((row) => row[0]);
  
  errorFields.forEach((field) => {
    const inputField = screen.getByLabelText(field);

    // Add assertions to check if the inputField is highlighted in red.
    // You can check for CSS classes or styles that indicate an error state.
    // Example using Jest-DOM: expect(inputField).toHaveClass('error-class');
  });
});

And('an error message should be displayed for the "Country" field', () => {
  const errorMessage = screen.getByText('Error Message for Country Field'); // Replace with the actual error message text

  // Add assertions to check if the error message is displayed for the "Country" field.
  // Example: expect(errorMessage).toBeInTheDocument();
});

  // Scenario: User clears the form

And('the user clicks the [Clear] button', () => {
  const clearButton = screen.getByText('Clear');
  clearButton.click();
});

Then('all the form fields should be cleared', () => {
  // Add assertions to check if all form fields are cleared
  const formFields = [
    'User',
    'Name',
    'Surname',
    'Country',
    'ID'
  ];

  formFields.forEach((field) => {
    const inputField = screen.getByLabelText(field);
    expect(inputField).toHaveValue('');
  });
});
  // Scenario: User selects a country from the dropdown
When('the user selects "Spain" from the "Country" dropdown', () => {
  const countryDropdown = screen.getByLabelText('Country');

  // Simulate selecting "Spain" from the dropdown
  userEvent.selectOptions(countryDropdown, 'Spain');
});

Then('the "Country" field should be filled with "Spain"', () => {
  const countryField = screen.getByLabelText('Country');

  // Add an assertion to check if the "Country" field is filled with "Spain"
  expect(countryField).toHaveValue('Spain');
});

}

export default FormProjectSteps
