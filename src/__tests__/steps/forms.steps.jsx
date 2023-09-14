import React from 'react'
import { render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import FormApp from '../../components/FormApp'

export const FormProjectSteps = ({
  given: Given,
  and: And,
  when: When,
  then: Then

}) => {
  Given('the user opens the app', () => {
    render(<FormApp />) 
  })

  // Scenario: Fields are empty
  Then(/^the "(.*)" field should be empty$/, (field) => {
      expect(screen.getByTestId(field)).toBeNull
    })

//Scenario Outline: User fills in the form correctly
 
  When(/^the user enters (.*) on "(.*)"$/, (arg0, arg1) => {
    fireEvent.change(screen.getByTestId(arg1), arg0, { target: { value: arg0 } })
  });

  When(/^the user selects "(.*)" from the "(.*)" dropdown$/, (arg0, arg1) => {
    fireEvent.select(screen.getByTestId(arg1), arg0)
  });


  Then('the [Submit] button should be enabled', () => {
      expect(screen.getByTestId('submit-button')).toBeEnabled()

  });

//Scenario: Success message is shown

When('the [Submit] button is enabled', () => {
  expect(screen.getByTestId('submit-button')).toBeEnabled()
});

When('the user clicks the [Submit] button', () => {
  fireEvent.click(screen.getByTestId('submit-button'));
});

Then(/^success-message should show the text: "(.*)"$/, (arg0) => {

});
//   // Scenario: Errors are highlighted red
// Then('the following fields should be highlighted in red:', (table) => {
//   const errorFields = table.raw().map((row) => row[0]);
  
//   errorFields.forEach((field) => {
//     const inputField = screen.getByTestId(field);

//   });
// });

// And('an error message should be displayed for the "Country" field', () => {
//   const errorMessage = screen.getByTestId('Error Message for Country Field'); 
// });

//   // Scenario: User clears the form

// And('the user clicks the [Clear] button', () => {
//   const clearButton = screen.getByTestId('Clear');
//   clearButton.click();
// });

// Then('all the form fields should be cleared', () => {
//   const formFields = [
//     'User',
//     'Name',
//     'Surname',
//     'Country',
//     'ID'
//   ];

//   formFields.forEach((field) => {
//     const inputField = screen.getByTestId(field);
//     expect(inputField).toHaveValue('');
//   });
// });
//   // Scenario: User selects a country from the dropdown
// When('the user selects "SPAIN" from the "Country" dropdown', () => {
//   const countryDropdown = screen.getByTestId('Country');

//   userEvent.selectOptions(countryDropdown, 'SPAIN');
// });

// Then('the "Country" field should be filled with "SPAIN"', () => {
//   const countryField = screen.getByTestId('Country');

//   expect(countryField).toHaveValue('SPAIN');
// });

 }

export default FormProjectSteps
