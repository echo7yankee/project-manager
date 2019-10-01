const bcrypt = require("bcryptjs");

const ecryptPassword = async (password, confirmPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const hashedConfirmPassword = await bcrypt.hash(confirmPassword, salt);

  const hashedPasswords = { hashedPassword, hashedConfirmPassword };
  return hashedPasswords;
};

const comparePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

module.exports = { cryptPassword: ecryptPassword, comparePassword };
