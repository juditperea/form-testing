Feature: Form Project

  Background:
    Given the user opens the app



  Scenario: Fields are empty
    Then the "username" field should be empty

    Then the "name" field should be empty

    Then the "surname" field should be empty

    Then the "country" field should be empty

    Then the "id" field should be empty



  Scenario Outline: User fills in the form correctly

    When the user enters "<username>" on "username"
    And the user enters "<name>" on "name"
    And the user enters "<surname>" on "surname"
    And the user selects "SPAIN" from the "country" dropdown
    And the user enters "<id>" on "id"
    Then the [Submit] button should be enabled

    Examples:
      | username | name | surname | country | id        |
      | JDOE     | JOHN | DOE     | SPAIN   | 49220078D |

  Scenario: Success message is shown
    When the [Submit] button is enabled
    And the user clicks the [Submit] button
    Then success-message should show the text: "User created successfully."

  Scenario Outline: User fills in the form incorrectly

    When the user enters "<username>" on "username"
    And the user enters "<name>" on "name"
    And the user enters "<surname>" on "surname"
    And the user selects "SPAIN" from the "country" dropdown
    And the user enters "<id>" on "id"
    Then the [Submit] button should be disabled
    Examples:
      | username     | name | surname | country | id    |
      | Johnd0e1997  | John | Doe     | SPAIN   | 12345 |

  Scenario: User selects a country from the dropdown
    When the user selects the "country-option-spain" on the country dropdown
    Then the form country is "SPAIN"

  Scenario: User clears the form
    When the user clicks the [Clear] button
    Then all the form fields should be cleared
    And the dropdown should have the "Select country" value

# Scenario: Errors are highlighted red
#     When the user enters the following information:
#       | User   | Name          | Surname  | Country    | ID     |
#       | JDOE   | John          | Doe      | Spain      | 12345  |
#     And the user clicks the [Submit] button
#     Then the following fields should be highlighted in red:
#       | Field    |
#       | Country  |
#     And an error message should be displayed for the "Country" field








