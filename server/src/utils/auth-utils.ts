import * as rQueries from '../db/queries/01_restaurants';
import bcrypt from 'bcrypt';

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

export const authenticateUser = function (username: string, password: string) {
  return rQueries.getEmployeeWithUsername(username).then((userData) => {
    if (userData.employee) {
      if (bcrypt.compareSync(password, userData.employee.password)) {

        return {
          restaurantId: userData.restoId,
          employeeId: userData.employee._id,
        };
      }
    }
  });
};
