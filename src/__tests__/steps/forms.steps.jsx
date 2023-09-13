import React from 'react'
import { render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import FormApp from '../../components/FormApp'

let input;
let submitButton
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

  // Scenario: Fields are empty
  Then(/^the "(.*)" field should be empty$/, (field) => {
      expect(screen.getByTestId(field)).toBeNull
    })

  // Scenario: User fills in the form correctly and submits
When('the user enters the following information:', () => {
  const formData = {
    username: 'JDOE',
    name: 'JOHN',
    surname: 'DOE',
    country: 'SPAIN',
    id: '492200778D',
  };

  for (const field in formData) {
  
        input = screen.getByTestId(field);
      
    }
    expect(input).toBeInTheDocument();

  }
)

Then('the [Submit] button should be enabled', () => {
   submitButton = screen.getByTestId('submit-button');
  expect(submitButton).toBeEnabled();
});

When('the user clicks the [Submit] button', () => {
  fireEvent.click(submitButton);
});

Then('a success message should be displayed on the new page with the following text:', (docString) => {
  const successMessage = screen.getByText(docString.trim());

  expect(successMessage).toBeInTheDocument();
});

//

  Then('the form should not be submitted', () => {
    const successMessage = screen.queryByTestId('Success Message'); 
  
    expect(successMessage).not.toBeInTheDocument();
  });
  
  // Scenario: Errors are highlighted red
Then('the following fields should be highlighted in red:', (table) => {
  const errorFields = table.raw().map((row) => row[0]);
  
  errorFields.forEach((field) => {
    const inputField = screen.getByTestId(field);

    // Add assertions to check if the inputField is highlighted in red.
    // You can check for CSS classes or styles that indicate an error state.
    // Example using Jest-DOM: expect(inputField).toHaveClass('error-class');
  });
});

And('an error message should be displayed for the "Country" field', () => {
  const errorMessage = screen.getByTestId('Error Message for Country Field'); // Replace with the actual error message text

  // Add assertions to check if the error message is displayed for the "Country" field.
  // Example: expect(errorMessage).toBeInTheDocument();
});

  // Scenario: User clears the form

And('the user clicks the [Clear] button', () => {
  const clearButton = screen.getByTestId('Clear');
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
    const inputField = screen.getByTestId(field);
    expect(inputField).toHaveValue('');
  });
});
  // Scenario: User selects a country from the dropdown
When('the user selects "Spain" from the "Country" dropdown', () => {
  const countryDropdown = screen.getByTestId('Country');

  // Simulate selecting "Spain" from the dropdown
  userEvent.selectOptions(countryDropdown, 'Spain');
});

Then('the "Country" field should be filled with "Spain"', () => {
  const countryField = screen.getByTestId('Country');

  // Add an assertion to check if the "Country" field is filled with "Spain"
  expect(countryField).toHaveValue('Spain');
});

}

export default FormProjectSteps
