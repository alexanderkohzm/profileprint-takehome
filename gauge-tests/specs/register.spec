# Register

To execute this specification, use
	npm test

This is a context step that runs before every scenario
* Open Register Page

## Unit Tests 
We should break up our tests into unit and integration tests

### Fields 

#### Name 
* Type into Name field 

#### Display Name 
* Type into Display Name field

#### Emails
* Type into Email field
* Email must be a valid email 

#### Passwords
* Type into Password field and password is valid
* Type into Confirm Password field
* Passwords must match
* Display error message if passwords do not match 


#### Country 
* Can select Country with valid substring
* If no substring for Country, display no data available

#### Contact Number 
* If no substring for Country code, display no data available 

### Buttons 
#### Terms & Conditions Radio
* Click on Terms & Condition Radio

#### Marketing Communications Radio
* Click on Marketing Communications Radio

#### Required Fields 
* Display error message if required field is empty

#### Able to get Terms & Conditions document 
* Click on terms and conditions link
* Close browser
* Open Register Page
* Click on terms and conditions link at bottom of screen 
* Close browser

#### Register with Facebook 
* Open Register Page
* Clicking on Facebook link will redirect to Facebook


## Integration Tests

### Able to register an account 
* Register by filling up the form with table of values

| Field             | Value         | InputMethod  | Id                |
|-------------------|---------------|--------------|-------------------|
| Name              | Test Name     | Default      |                   |
| Display Name      | Testing123    | Default      |                   |
| Email             | test@email.com| Default      |                   |
| Password          | nJhYt#134     | Default      |                   |
| Confirm Password  | nJhYt#134     | ById         | password-confirm  |
| Country           | Singapore     | Dropdown     |   country         |
| Country Code      | +65           | Dropdown     |   input-124       |
| Contact Number    | 88888888      | ById         |   input-129       |
