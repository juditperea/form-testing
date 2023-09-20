import React from "react";
import { render, screen, fireEvent, userEvent, waitFor} from "@testing-library/react";
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

  When(/^the user enters "(.*)" on "(.*)"$/, (arg0, arg1) => {
    fireEvent.change(screen.getByTestId(arg1), arg0, {
      target: { value: arg0 },
    });
  });

  When(/^the user selects "(.*)" from the "(.*)" dropdown$/, (arg0, arg1) => {
    fireEvent.select(screen.getByTestId(arg1), arg0);
  });

  Then("the [Submit] button should be enabled", () => {
    expect(screen.getByTestId("submit-button")).not.toBeDisabled;
  });

  //Scenario: Success message is shown

  // When("the [Submit] button is enabled", () => {
  //   expect(screen.getByTestId("submit-button")).not.toBeDisabled
  // });

  // When("the user clicks the [Submit] button", () => {
  //   fireEvent.click(screen.getByTestId("submit-button"));
  // });

  // Then(/^success-message should show the text: "(.*)"$/, async(arg0) => {
  //   let message = screen.getByTestId("success-message").textContent
  //   await waitFor(() => {
  //     expect(screen.getByTestId('success-message')).toBeInTheDocument()
  //   });
  
  //  expect(screen.getByTestId('success-message')).toHaveTextContent('✔ User created successfully.')
  // });

  //Scenario Outline: User fills in the form incorrectly

  Then("the [Submit] button should be disabled", () => {
    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();
  });

 // Scenario: User selects a country from the dropdown
When('the user selects the "country-option-spain" on the country dropdown', () => {
  fireEvent.click(screen.getByTestId('country-option-spain'));
});

Then('the form country is "ESPAÑA"', () => {
  expect(screen.getByTestId('country-option-spain').value).toBe('ESPAÑA');
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
    // Scenario: Username longer than 10 characters
Then(/^the maximum number of characters should be (\d+)$/, async (maxLength) => {
  const input = screen.getByTestId("username");
  const maxCharactersAsNumber = parseInt(maxLength); 
  await waitFor(() => {
      const maxLength = input.maxLength;
      expect(input.value).toBe(maxCharactersAsNumber);
  });
  
    });
}
export default FormProjectSteps;
