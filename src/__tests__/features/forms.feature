Feature: Creating a form app for user interaction with React

  Background:

    Given the user opens the app


  Scenario: Fields are empty

    Then the "username" field should be empty
    And the "firstname" field should be empty
    And the "surname" field should be empty
    And the "country" field should be empty
    And the "id" field should be empty


  Scenario Outline: User fills in the form correctly

    When the user enters "<username>" on "username"
    And the user enters "<name>" on "firstname"
    And the user enters "<surname>" on "surname"
    And the user selects "SPAIN" from the "country" dropdown
    And the user enters "<id>" on "id"
    Then the submit button should be enabled

    Examples:
      | username | firstname | surname | country | id        |
      | JDOE     | JOHN      | DOE     | SPAIN   | 49220078D |


  Scenario: User fills in the form incorrectly

    When the user enters "Johnd0e1997" on "username"
    And the user enters "John" on "firstname"
    And the user enters "Doe" on "surname"
    And the user selects "SPAIN" from the "country" dropdown
    And the user enters "12345" on "id"
    Then success-message should show the text: ""


  Scenario: Success message is shown

    When the user enters "JDOE" on "username"
    And the user enters "JOHN" on "firstname"
    And the user enters "DOE" on "surname"
    And the user selects "SPAIN" from the "country" dropdown
    And the user enters "49220078D" on "id"
    And the user clicks the submit button
    Then success-message should show the text: "User created successfully"


  Scenario: Success message is not shown

    When the user enters "JDOE" on "username"
    And the user enters "JOHN" on "firstname"
    And the user enters "" on "surname"
    And the user selects "SPAIN" from the "country" dropdown
    And the user enters "" on "id"
    And the user clicks the submit button
    Then success-message should not show the text: "User created successfully"


  Scenario: User clears the form

    When the user clicks the clear button
    Then all the form fields should be cleared
    And the dropdown should have the "" value


  Scenario: Username longer than 10 characters

    When the user enters "JOHN123456" on "username"
    Then the user should not be able to enter more characters in the "username" field.


  Scenario: Username includes the Name field error

    When the user enters "JOHN123" on "username"
    And the user enters "JOHN" on "firstname"
    And the user enters "DOE" on "surname"
    Then message-error should show the text: "The name can't be included in the username"









