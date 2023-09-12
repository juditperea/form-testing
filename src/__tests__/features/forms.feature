Feature: Form Project

  Background:
    Given the user opens the app
  Scenario: Form elements are present
    Then the following form elements should be visible:
      | Element      |
      | User Field   |
      | Name Field   |
      | Surname Field|
      | Country Field|
      | ID Field     |
      | [Submit] Button |
      | [Clear] Button  |
  Scenario: Fields are empty
    Then the following form fields should be empty:
      | Field        |
      | User Field   |
      | Name Field   |
      | Surname Field|
      | Country Field|
      | ID Field     |
  Scenario: Clicking on fields is working
  Given the user opens the app
  When the user clicks on the following form fields:
    | Field   |
    | Name    |
    | Email   | 
  Then the clicked fields should be active for input

  Scenario: Country dropdown is working
    When the user clicks on the "Country" dropdown
    Then a list of countries should be displayed
    And the user should be able to select a country from the list

  Scenario: User fills in the form correctly and submits
    When the user enters the following information:
      | User   | Name    | Surname  | Country    | ID     |
      | JDOE   | JOHN    | DOE      | USA        | 12345  |
    And the user clicks the [Submit] button
    Then the user should be redirected to a new page
    And a success message should be displayed on the new page with the following text:
      """
      User 'JDOE' created successfully.
      """

  Scenario: User fills in the form incorrectly and submits
    When the user enters the following information:
      | User   | Name          | Surname  | Country    | ID     |
      | JDOE   | John          | Doe      | Spain      | 12345  |
    And the user clicks the [Submit] button
    Then the form should not be submitted

  Scenario: Errors are highlighted red
      When the user enters the following information:
        | User   | Name          | Surname  | Country    | ID     |
        | JDOE   | John          | Doe      | Spain      | 12345  |
      And the user clicks the [Submit] button
      Then the following fields should be highlighted in red:
        | Field    |
        | Country  |
      And an error message should be displayed for the "Country" field

  Scenario: User clears the form
    When the user enters the following information:
      | User   | Name    | Surname  | Country    | ID     |
      | JDOE   | JOHN    | DOE      | USA        | 12345  |
    And the user clicks the [Clear] button
    Then all the form fields should be cleared

  Scenario: User selects a country from the dropdown
    When the user selects "Spain" from the "Country" dropdown
    Then the "Country" field should be filled with "Spain"
