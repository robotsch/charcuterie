/**
 * Takes a password string
 * @returns the string if it passes checks, otherwise returns null
 */
export const validatePassword = (password: string) => {
  const checks = {
    capital: /[A-Z]/,
    numbers: /[0-9]/,
    special: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
  };
  if (
    password.length < 8 ||
    !checks.capital.test(password) ||
    !checks.numbers.test(password) ||
    !checks.special.test(password)
  ) {
    return null;
  }
  return password;
};
