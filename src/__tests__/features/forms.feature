Feature: Form Project

  Background:
    Given the user opens the app

    @single

  Scenario: Fields are empty
    Then the "username" field should be empty

    Then the "name" field should be empty

    Then the "surname" field should be empty

    Then the "country" field should be empty

    Then the "id" field should be empty


  # Scenario: User fills in the form correctly and submits
  #   When the user enters the following information:

  #   Then the [Submit] button should be enabled
  #   And the user clicks the [Submit] button
  #   And a success message should be displayed on the new page with the following text:
  #     """
  #     User created successfully.
  #     """

  # Scenario: User fills in the form incorrectly 
  #   When the user enters the following information:
  #     | User   | Name          | Surname  | Country    | ID     |
  #     | JDOE   | John          | Doe      | Spain      | 12345  |
  #   Then the [Submit] button should be disabled

  # Scenario: Errors are highlighted red
  #     When the user enters the following information:
  #       | User   | Name          | Surname  | Country    | ID     |
  #       | JDOE   | John          | Doe      | Spain      | 12345  |
  #     And the user clicks the [Submit] button
  #     Then the following fields should be highlighted in red:
  #       | Field    |
  #       | Country  |
  #     And an error message should be displayed for the "Country" field

  # Scenario: User clears the form
  #   When the user enters the following information:
  #     | User   | Name    | Surname  | Country    | ID     |
  #     | JDOE   | JOHN    | DOE      | USA        | 12345  |
  #   Then the [Clear] button should be enabled
  #   And the user clicks the [Clear] button
  #   Then all the form fields should be cleared

  # Scenario: User selects a country from the dropdown
  #   When the user selects "Spain" from the "Country" dropdown
  #   Then the "Country" field should be filled with "Spain"
