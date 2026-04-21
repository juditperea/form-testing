# Form Testing – BDD + Automation

## 📌 Objective
This project focuses on testing a form-based application using a **BDD approach** with **Cucumber (Gherkin)** and **automated tests with Jest**.

The goal is to validate user interactions, input validations, and edge cases from a functional testing perspective.


## 🧪 Testing Approach

### BDD (Behavior Driven Development)
Test scenarios are written using **Gherkin syntax** to describe user behavior in a clear and readable way.

Example:

 Given the user is on the form page
 
 When the user submits the form with invalid data
 
 Then an error message should be displayed

## ✅ Test Coverage

### Functional Scenarios
- Valid form submission
- Required field validation
- Invalid input formats
- Empty fields
- Boundary values (min/max length)

### Negative Cases
- Submitting incomplete data
- Invalid formats
- Unexpected input values


## 🛠 Tech Stack
- Jest
- Cucumber / Gherkin
- JavaScript
- React (for UI)

## ▶️ How to Run

```bash
npm install
npm test
