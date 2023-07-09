/*
 * Ideally I would like to keep all the utility functions in one file as
 * it's likely that other pages (e.g. homePage) would require it
 * However, for some reason, if I try to import functions it causes the runners to fail
 * If I had more time, I would investigate how imports work in Gauge & Taiko to see
 * why it fails
 */

// export const defaultInputMethod = async (field, value) => {
//   await click(field);
//   await write(value);
// };

// export const inputWithId = async (field, value, id) => {
//   const targetField = textBox({ id }, below(field));
//   await write(value, targetField);
// };

// export const inputDropdown = async (field, value, id) => {
//   const targetField = textBox({ id }, below(field));
//   await write(value, targetField);
//   await press("Enter");
// };

// export const generateRandomString = (length) => {
//   const characters =
//     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let randomString = "";

//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     randomString += characters.charAt(randomIndex);
//   }

//   return randomString;
// };
