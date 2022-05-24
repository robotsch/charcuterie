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
  console.log("u, p: ", username, password)
  return rQueries.getEmployeeWithUsername(username).then((userData) => {
    console.log("userData in auth-utils: ", userData)
    if (userData.employee) {
      console.log("pre-bcrypt check: ", userData.employee)
      if (bcrypt.compareSync(password, userData.employee.password)) {
        console.log("auth did succeeed")
        return {
          restaurantId: userData.restoId,
          employeeId: userData.employee._id,
        };
      }
    }
  });
};
