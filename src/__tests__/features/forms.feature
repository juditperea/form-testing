Feature: Form Project

  Background:
    Given the user opens the app



  Scenario: Fields are empty
    Then the "username" field should be empty

    Then the "firstname" field should be empty

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
      | username | name | surname | country  | id        |
      | JDOE     | JOHN | DOE     | ESPAÑA   | 49220078D |

  Scenario: Success message is shown
    When the user enters "JDOE" on "username"
    And the user enters "JOHN" on "firstname"
    And the user enters "DOE" on "surname"
    And the user selects "SPAIN" from the "country" dropdown
    And the user enters "49220078D" on "id"
    And the user clicks the [Submit] button
    Then success-message should show the text: "✔ User created successfully."

  Scenario Outline: User fills in the form incorrectly
    When the user enters "<username>" on "username"
    And the user enters "<firstname>" on "firstname"
    And the user enters "<surname>" on "surname"
    And the user selects "SPAIN" from the "country" dropdown
    And the user enters "<id>" on "id"
    Then the [Submit] button should be disabled
    Examples:
      | username    | name | surname | country | id    |
      | Johnd0e1997 | John | Doe     | ESPAÑA   | 12345 |

  Scenario: User selects a country from the dropdown
    When the user selects the option "spain" on the country dropdown
    Then the form country is "SPAIN"

  Scenario: User clears the form
    When the user clicks the [Clear] button
    Then all the form fields should be cleared
    And the dropdown should have the "" value
  
  Scenario: Username longer than 10 characters
    When the user enters "JOHN123456" on "username"
    Then the user should not be able to enter more characters in the "username" field.
   

  Scenario: Username includes the Name field error
  When the user enters "JOHN123" on "username"
  And the user enters "JOHN" on "firstname"
  And the user enters "DOE" on "surname"
  And the user selects "SPAIN" from the "country" dropdown
  And the user enters "49220078D" on "id"
  And the user clicks the [Submit] button
  Then message-error should show the text: "The name can't be included in the username"









