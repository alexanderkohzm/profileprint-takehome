/* globals gauge*/
"use strict";
const path = require("path");
const {
  openBrowser,
  write,
  closeBrowser,
  goto,
  press,
  screenshot,
  click,
  text,
  textBox,
  waitFor,
  below,
  reload,
  $,
  switchTo,
  clear,
  button,
} = require("taiko");
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === "true";

let isBrowserOpen = false;

beforeSuite(async () => {
  await openBrowser({
    headless: headless,
  });
  isBrowserOpen = true;
});

afterSuite(async () => {
  await closeBrowser();
  isBrowserOpen = false;
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
  const screenshotFilePath = path.join(
    process.env["gauge_screenshots_dir"],
    `screenshot-${process.hrtime.bigint()}.png`
  );

  await screenshot({
    path: screenshotFilePath,
  });
  return path.basename(screenshotFilePath);
};

const defaultInputMethod = async (field, value) => {
  await click(field);
  await write(value);
};

const inputWithId = async (field, value, id) => {
  const targetField = textBox({ id }, below(field));
  await write(value, targetField);
};

const inputDropdown = async (field, value, id) => {
  const targetField = textBox({ id }, below(field));
  await write(value, targetField);
  await press("Enter");
};

const generateRandomString = (length) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

step("Open Register Page", async function () {
  if (isBrowserOpen) {
    await goto("https://hub.profileprint.ai/auth/register");
  } else {
    await openBrowser({
      headless: headless,
    });
    await goto("https://hub.profileprint.ai/auth/register");
  }
});

step("Open browser", async function () {
  await openBrowser({
    headless: headless,
  });
});

step("Close browser", async function () {
  await closeBrowser();
  isBrowserOpen = false;
});

step("Type into Name field", async function () {
  const value = "Test Name";
  await write(value, "Name");
  const nameField = textBox("Name");
  const actualValue = await nameField.value();

  assert.strictEqual(
    actualValue,
    value,
    "Name field value does not match input value"
  );
});

step("Type into Display Name field", async function () {
  const value = "Test Display Name";
  await write(value, "Display Name");
  const displayNameField = textBox("Display Name");
  const actualValue = await displayNameField.value();

  assert.strictEqual(
    actualValue,
    value,
    "Display Name field value does not match input value"
  );
});

step("Type into Email field", async function () {
  const value = "email123@email.com";
  const field = "Email";

  await click(field);
  await write(value);

  const emailField = textBox("Email");
  const actualValue = await emailField.value();
  assert.strictEqual(
    actualValue,
    value,
    "Email field value does not match input value"
  );
});

step("Email must be a valid email", async function () {
  const value = "invalidEmailAddress";
  const field = "Email";

  // clear the field
  await click(field);
  await write(`blankSpace ${value}`);

  const errorMessage = "Please enter valid email";
  const errorElementExists = await text(errorMessage).exists();
  assert.ok(errorElementExists);
});

step("Type into Password field and password is valid", async function () {
  const value = "TestPassword123";
  const field = "Password";
  await defaultInputMethod(field, value);

  const passwordField = textBox("Password");
  const actualValue = await passwordField.value();

  const errorMessage =
    "To help keep your information safe, your password must contain at least 8 characters, including one number";

  assert.strictEqual(
    actualValue,
    value,
    "Password field value does not match input value"
  );

  const errorMessageExists = await text(errorMessage).exists();
  assert.ok(!errorMessageExists);
});

step("Display error message if password is not valid", async function () {
  const value = "invalidpassword";
  const field = "Password";
  await defaultInputMethod(field, value);

  const errorMessage =
    "To help keep your information safe, your password must contain at least 8 characters, including one number";

  const errorMessageExists = await text(errorMessage).exists();
  assert.ok(errorMessageExists);
});

step("Type into Confirm Password field", async function () {
  const field = "Confirm Password";
  const value = "TestPassword123";
  const id = "password-confirm";
  await inputWithId(field, value, id);

  const confirmPasswordField = textBox({ id }, below(field));
  const actualValue = await confirmPasswordField.value();

  assert.strictEqual(
    actualValue,
    value,
    "Confirm Password field value does not match input value"
  );
});

step("Passwords must match", async function () {
  await clear(textBox("Password"));
  await clear(textBox({ id: "password-confirm" }), below("Confirm Password"));

  const passwordValue = "matchingPassword123";
  const passwordField = "Password";
  await defaultInputMethod(passwordField, passwordValue);

  const confirmPasswordField = "Confirm Password";
  const confirmPasswordValue = "matchingPassword123";
  const confirmPasswordId = "password-confirm";
  await inputWithId(
    confirmPasswordField,
    confirmPasswordValue,
    confirmPasswordId
  );

  // Interesting edge case error:
  // if you type into confirm password first and then password
  // the password does not match error exists

  waitFor(2000);

  const errorMessage = "Your password does not match. Try again";
  const errorMessageExists = await text(errorMessage).exists();
  assert.ok(!errorMessageExists);
});

step("Display error message if passwords do not match", async function () {
  await clear(textBox("Password"));
  await clear(textBox({ id: "password-confirm" }), below("Confirm Password"));

  const passwordValue = "TestPassword123";
  const passwordField = "Password";
  await defaultInputMethod(passwordField, passwordValue);

  const confirmPasswordField = "Confirm Password";
  const confirmPasswordValue = "NOTMATCHING";
  const confirmPasswordId = "password-confirm";
  await inputWithId(
    confirmPasswordField,
    confirmPasswordValue,
    confirmPasswordId
  );

  const errorMessage = "Your password does not match. Try again";
  const errorMessageExists = await text(errorMessage).exists();
  assert.ok(errorMessageExists);
});

step("Can select Country with valid substring", async function () {
  const countrySubString = "Singapo";
  const countryField = "Country";
  const id = "country";
  await inputDropdown(countryField, countrySubString, id);

  const countryFieldValue = textBox({ id }, below(countryField));

  const actualValue = await countryFieldValue.value();

  assert.strictEqual(
    actualValue,
    "Singapore",
    "Dropdown does not complete substring"
  );
});

step(
  "If no substring for Country, display no data available",
  async function () {
    const countrySubString = "InvalidCountry";
    const countryField = "Country";
    const id = "country";
    await inputDropdown(countryField, countrySubString, id);

    const noDataAvailableMessage = "No data available";

    const messageExists = await text(noDataAvailableMessage).exists();
    assert.ok(messageExists);

    // clear field
    await inputDropdown(countryField, "", id);
  }
);

step(
  "If no substring for Country code, display no data available",
  async function () {
    const invalidCountryCode = "+999999";
    const countryCodeField = "Country Code";
    const id = "input-124";

    await inputDropdown(countryCodeField, invalidCountryCode, id);
    const noDataAvailableMessage = "No data available";

    const messageExists = await text(noDataAvailableMessage).exists();
    assert.ok(messageExists);
  }
);

step("Display error message if required field is empty", async () => {
  // clear all fields by refreshing page
  await reload();

  // click on all fields but do not type. This will trigger empty message
  const arrayOfErrorMessages = [
    "Name is required",
    "Email is required",
    "Password is required",
    "This field is mandatory",
  ];

  const arrayOfFields = [
    { field: "name", id: "", dropDown: false },
    { field: "display name", id: "", dropDown: false },
    { field: "email", id: "", dropDown: false },
    { field: "password", id: "password", dropDown: false },
    { field: "country", id: "country", dropDown: true },
  ];

  for (const fieldInfo of arrayOfFields) {
    const { field, id, dropDown } = fieldInfo;
    if (id && dropDown) {
      await inputDropdown(field, "empty", id);
      await clear(field);
    } else if (id) {
      await inputWithId(field, "empty", id);
      await clear(field);
    } else {
      await defaultInputMethod(field, "empty");
      await clear(field);
    }
  }
  // click on contact number to get rid of country dropdown
  await click("Name");

  for (const errorMessage of arrayOfErrorMessages) {
    const messageExists = await text(errorMessage).exists();
    assert.ok(messageExists, `Error message does not exist: ${errorMessage}`);
  }
});

step("Click on Terms & Condition Radio", async () => {
  await click("I agree to");
});

step("Click on Marketing Communications Radio", async () => {
  await click(
    "I would like to receive marketing communications from ProfilePrint"
  );
});

step("Click on terms and conditions link", async () => {
  click("terms and conditions");

  // wait for new tab to open
  await waitFor(2500);

  const isPdf = await $("body").exists("PDF");

  // Assert that the new tab is a PDF
  assert.ok(isPdf, "The new tab is not a PDF");
});

step("Click on terms and conditions link at bottom of screen", async () => {
  click("Terms and Conditions", below("Facebook"));

  // wait for new tab to open
  await waitFor(2500);

  const isPdf = await $("body").exists("PDF");

  // Assert that the new tab is a PDF
  assert.ok(isPdf, "The new tab is not a PDF");
});

step("Fill up the form with table of values <table>", async (table) => {
  for (const row of table.rows) {
    const field = row.cells[0];
    const value = row.cells[1];
    const inputMethod = row.cells[2];
    const id = row.cells[3];

    // !IMPORTANT!
    // Email, ConfirmPassword, Country, and PhoneNumber fields cannot be written into directly
    // and returns an error. We need to use different methods for different fields
    // Example Error below
    // Error: TextBox with label Email is not writable

    // This switch statement is not optimal
    // There must be a more reliable way of writing into fields
    // But that'll only be certain after more experience - this is my first time
    // using Gauge and Taiko

    switch (inputMethod) {
      case "Default":
        // need to randomise email to make sure it's unique
        if (field === "Email") {
          const randomString = generateRandomString(6);
          const uniqueEmail = `${randomString}${value}`;
          await defaultInputMethod(field, uniqueEmail);
        } else {
          await defaultInputMethod(field, value);
        }
        break;
      case "ById":
        await inputWithId(field, value, id);
        break;
      case "Dropdown":
        await inputDropdown(field, value, id);
        break;
      default:
        console.log(`Error, no inputMethod passed in`);
    }
  }

  // agree to T&C
  await click("I agree to");

  // click on register
  waitFor(1000);
  await click(
    button(
      "Register",
      below("I agree to terms and conditions and privacy policy")
    )
  );

  // wait for request to create account
  waitFor(5000);

  // Registered Successfully modal
  const successModalHeader = text("Registered Successfully!");
  const successModalHeaderExists = await successModalHeader.exists();
  const successMessage = text(`We've sent an email`);
  const successMessageExists = await successMessage.exists();

  assert(
    successModalHeaderExists && successMessageExists,
    "Registration Integration test failed, unable to find success modal header or success message"
  );
});
