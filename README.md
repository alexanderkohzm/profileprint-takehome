# profileprint-takehome

Take home assignment for Profile Print. Automated testing using Gauge and Taiko

Interesting edge case error:

- if you type into confirm password first and then password, the password does not match error message persists even though the password and confirm password match

Nitpick:

- I notice that a user is able click on register even if the form is not valid (an error notification pops up). I think it'll make more sense visually to disable the register button until the form is valid

## Steps

### Install Gauge

https://docs.gauge.org/getting_started/installing-gauge.html?os=macos&language=javascript&ide=vscode

- `brew install gauge`
- `gauge --version`
- Should display your version (e.g. Gauge Version: 1.5.1). No plugins installed if it's a fresh install
- Install Gauge VS-Code extension

### Run gauge test

- cd into `gauge-tests`
- `npm i` to install node modules
- `npm run test` to run all tests
  - please note that some tests may take a while to run / the UI feedback is delayed. For example, the password validation tests
- go to specific spec document (e.g. `gauge-tests/specs/register.spec`) and click on `run scenario` to run specific scenarios (i.e. Unit tests, Integration tests)

## Testing https://hub.profileprint.ai/auth/register

### Requirement Analysis

This is Profile Print's register page

**functional requirement (MVP)**
A user needs to be able to register an account. I have listed out the criteria below.

Crossed out points indicate that unit and integration tests have covered the test cases.

In terms of strategy, I have prioritised the MVP and basic logic to ensure a valid account is created. There are other cases (e.g. password too simple) that I have noticed but
have not the time to implement

**Fields**

- [x] User should be able to enter values into fields
- [x] Relevant fields must exist (Name, Display Name, Email, Password, Confirm Password, Country, Contact Number)
- [ ] Required Fields should have a red asterisk next to it
- [x] Email Field
  - [x] Must be unique emails
- [x] Display Name field
  - [x] Must be unique Display Name
- [ ] Password Field
  - [ ] Password fields should have option to hide/unhide value by clicking on the "eye" icon
  - [x] If password is not at least 8 characters long and include 1 number, show error
  - [x] If passwords do not match, show error
  - [x] If passwords do match, do not show eror
- [ ] Country Field
  - [ ] If user clicks on Country dropdown, list of countries should appear
  - [x] If user types in string and substring exists, countries should be filtered
  - [x] If user types in string and string does not exist, should show no data available
- [ ] Contact Number Field
  - [ ] If user clicks on the Contact Number dropdown, list of countries should appear
  - [x] If user types country code, country should appear
  - [x] If user types country code, countries should be filtered
  - [x] If user types in invalid country code (e.g. string is not a substring of any country, > longest country code), should show no data available

**Radio Buttons**

- [x] User should be able to click on radio buttons (marketing comms, terms and conditions & privacy policy)
- [ ] Marketing comms should be ticked from start
- [x] Clicking on the underlined "terms and conditions" will create a pop-up of ProfilePrint's T&C document

**Form Submission**

- [x] Form should display error messages (e.g. please enter valid email, password is invalid, name is required)
- [x] Successful Form will create a modal (Telling user that a confirmation email has been sent)
- [ ] Register button should be disabled by default
- [ ] If user tries to submit form when there is an error, error notification will pop up
  - [ ] If Email has already been registered, display error notification
  - [ ] If password is too simple, display error notification

**Alternative Registration**

- [x] User should be directed to Facebook if they want to register with Facebook and click "Continue with Facebook"

**non-functional requirements**
Outside of the registration form and its functioanlity, there are several other things on the Register page that need to be tested. For example, clicking on Log In should switch the form to a Log In form.

Note - I have NOT decided to proceed with testing for other aspects of the Register page. Specifically, not testing the top nav-bar and the footer section. This is because I have decided with the strategy of separating tests based on functionality. The top nav-bar and footer section should be tested separately.

However, changing language directly impacts the functionality of the form

**Switch to Log In**

- [ ] Clicking on the Log In Button should switch to the Log In form

**By continuing, you agree to our Terms and Conditions**

- [x] Clicking on "Terms and Conditions" will generate a new tab with terms and conditions

**Switching languages switches language of form**

- [ ] Switching languages should switch from English to Bahasa vice versa

## Videos

### Integration Test


https://github.com/alexanderkohzm/profileprint-takehome/assets/127705458/100788b0-cd5a-4648-90d1-9ed4e16c3eaa


### Unit Test


https://github.com/alexanderkohzm/profileprint-takehome/assets/127705458/efe4ead1-14f7-4cf4-934b-4d9c129460a1




