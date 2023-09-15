import React from "react";
import { render, screen, fireEvent, userEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import FormApp from "../../components/FormApp";

export const FormProjectSteps = ({
  given: Given,
  and: And,
  when: When,
  then: Then,
}) => {
  Given("the user opens the app", () => {
    render(<FormApp />);
  });

  // Scenario: Fields are empty
  Then(/^the "(.*)" field should be empty$/, (field) => {
    expect(screen.getByTestId(field)).toBeNull;
  });

  //Scenario Outline: User fills in the form correctly

  When(/^the user enters (.*) on "(.*)"$/, (arg0, arg1) => {
    fireEvent.change(screen.getByTestId(arg1), arg0, {
      target: { value: arg0 },
    });
  });

  When(/^the user selects "(.*)" from the "(.*)" dropdown$/, (arg0, arg1) => {
    fireEvent.select(screen.getByTestId(arg1), arg0);
  });

  Then("the [Submit] button should be enabled", () => {
    expect(screen.getByTestId("submit-button")).toBeEnabled();
  });

  //Scenario: Success message is shown

  When("the [Submit] button is enabled", () => {
    expect(screen.getByTestId("submit-button")).toBeEnabled();
  });

  When("the user clicks the [Submit] button", () => {
    fireEvent.click(screen.getByTestId("submit-button"));
  });

  Then(/^success-message should show the text: "(.*)"$/, (arg0) => {});

  //Scenario Outline: User fills in the form incorrectly

  Then("the [Submit] button should be disabled", () => {
    var disabled = false;
    var submitButton = screen.getByTestId("submit-button");
    if (submitButton.disabled == false) disabled = true;
    expect(disabled).toBe(true);
  });

 // Scenario: User selects a country from the dropdown
When('the user selects the "country-option-spain" on the country dropdown', () => {
  fireEvent.click(screen.getByTestId('country-option-spain'));
});

Then('the form country is "SPAIN"', () => {
  expect(screen.getByTestId('country-option-spain').value).toBe('SPAIN');
});

 // Scenario: User clears the form
When("the user clicks the [Clear] button", () => {
  fireEvent.click(screen.getByTestId("clear-button"));
});

Then("all the form fields should be cleared", () => {
  const usernameField = screen.getByTestId("username");
  expect(usernameField.value).toBe(""); 

  const nameField = screen.getByTestId("name");
  expect(nameField.value).toBe("");

  const surnameField = screen.getByTestId("surname"); 
  expect(surnameField.value).toBe("");


});

And("the dropdown should have the \"Select country\" value", () => {
  const countryDropdown = screen.getByTestId("country-option-empty");
  expect(countryDropdown.value).toBe("Select country");
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

 

};

export default FormProjectSteps;
