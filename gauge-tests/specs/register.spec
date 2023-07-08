# Register 

This is an example markdown specification file.
Every heading in this file is a scenario.
Every bulleted point is a step.

To execute this specification, use
	npm test

This is a context step that runs before every scenario
* Open Register Page

## Able to register an account 

* Fill up the form with table of values

| Field             | Value         | InputMethod  | Id                |
|-------------------|---------------|--------------|-------------------|
| Name              | Test Name     | Default      |                   |
| Display Name      | Testing123    | Default      |                   |
| Email             | test@email.com| Default      |                   |
| Password          | Test1234      | Default      |                   |
| Confirm Password  | Test1234      | ById         | password-confirm  |
| Country           | Singapore     | Dropdown     |   country         |
| Country Code      | +65           | Dropdown     |   input-124       |
| Contact Number    | 88888888      | ById         |   input-129       |

## Able to click on Terms & Conditions Radio

* Click on Terms & Condition Radio 

## Able to click on Register Button
* Click on Register Button