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
  above,
  click,
  checkBox,
  listItem,
  toLeftOf,
  link,
  text,
  into,
  textBox,
  evaluate,
  waitFor,
  focus,
  below,
  dropDown,
  $,
} = require("taiko");
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === "true";

beforeSuite(async () => {
  await openBrowser({
    headless: headless,
  });
});

afterSuite(async () => {
  await closeBrowser();
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

step("Open Register Page", async function () {
  await goto("https://hub.profileprint.ai/auth/register");
});

step("Fill up the form with table of values <table>", async (table) => {
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
        await defaultInputMethod(field, value);
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
});

step("Click on Terms & Condition Radio", async () => {
  await click("I agree to");
});

step("Click on Register Button", async () => {
  await click(
    button(
      "Register",
      below("I agree to terms and conditions and privacy policy")
    )
  );
});

step("Is able to type into email", async () => {
  await write("email", into(textBox("email")));
});

step("View <type> tasks", async function (type) {
  await click(link(type));
});

step("Complete tasks <table>", async function (table) {
  for (var row of table.rows) {
    await click(checkBox(toLeftOf(row.cells[0])));
  }
});

step("Clear all entries from fields", async () => {
  const fields = await taiko.$$(textBox());
  for (const field of fields) {
    await write("", into(field));
  }
});

step("Must not have <table>", async function (table) {
  for (var row of table.rows) {
    assert.ok(!(await text(row.cells[0]).exists(0, 0)));
  }
});

step("Must display <message>", async function (message) {
  assert.ok(await text(message).exists(0, 0));
});

step("Add tasks <table>", async function (table) {
  for (var row of table.rows) {
    await write(row.cells[0]);
    await press("Enter");
  }
});

step("Must have <table>", async function (table) {
  for (var row of table.rows) {
    assert.ok(await text(row.cells[0]).exists());
  }
});
