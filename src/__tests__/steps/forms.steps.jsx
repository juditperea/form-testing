import React from "react";
import {
  render,
  screen,
  fireEvent,
  userEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import FormApp from "../../components/FormApp";

export const FormProjectSteps = ({ given: Given, when: When, then: Then }) => {
  Given("the user opens the app", () => {
    render(<FormApp />);
  });

  // Scenario: Fields are empty

  Then(/^the "(.*)" field should be empty$/, (arg0) => {
    expect(screen.getByTestId(arg0)).toBeNull;
  });

  //Scenario Outline: User fills in the form correctly

  When(/^the user enters "(.*)" on "(.*)"$/, (arg0, arg1) => {
    fireEvent.change(screen.getByTestId(arg1), {
      target: { value: arg0 },
    });
  });

  When(/^the user selects "(.*)" from the "(.*)" dropdown$/, (arg0, arg1) => {
    fireEvent.select(screen.getByTestId(arg1), arg0);
  });

  Then("the submit button should be enabled", () => {
    expect(screen.getByTestId("submit-button")).not.toBeDisabled;
  });

  //Scenario: Success message is shown

  When("the submit button is enabled", () => {
    expect(screen.getByTestId("submit-button")).not.toBeDisabled;
  });

  When("the user clicks the submit button", () => {
    fireEvent.click(screen.getByTestId("submit-button"));
  });

  Then(/^success-message should show the text: "(.*)"$/, async (expectedMessage) => {

    const successMessage = screen.getByTestId('success-message');
    expect(successMessage).toHaveTextContent(expectedMessage);
    expect(successMessage).toBeInTheDocument();
  
  });

  //Success message is not shown

  Then(/^success-message should not show the text: "(.*)"$/, (arg0) => {
    expect(screen.getByTestId("success-message")).toHaveTextContent("")
  });

  //Scenario Outline: User fills in the form incorrectly

  Then('the success-message should show the text: ""', () => {
    expect(screen.getByTestId("success-message").toHaveTextContent(""));
  });

  // Scenario: User clears the form

  When("the user clicks the clear button", () => {
    fireEvent.click(screen.getByTestId("clear-button"));
  });

  Then('the dropdown should have the "" value', () => {});

  Then("all the form fields should be cleared", () => {
    const usernameField = screen.getByTestId("username");
    expect(usernameField.value).toBe("");

    const nameField = screen.getByTestId("firstname");
    expect(nameField.value).toBe("");

    const surnameField = screen.getByTestId("surname");
    expect(surnameField.value).toBe("");

    const idField = screen.getByTestId("id");
    expect(idField.value).toBe("");
  });

  // Scenario: Username longer than 10 characters

  Then(
    /^the user should not be able to enter more characters in the "(.*)" field.$/,
    (fieldName) => {
      const input = screen.getByTestId(fieldName).value;
      const maxCharactersAsNumber = 10;

      expect(input.length).toBe(maxCharactersAsNumber);
    }
  );

  // Scenario: Username includes the Name field error

  Then(/^message-error should show the text: "(.*)"$/, (arg0) => {
    expect(screen.getByTestId("message-error")).toHaveTextContent(
      "The name can't be included in the username"
    );
  });
};
export default FormProjectSteps;
