const validateEmail = (email: string) => {
  if (!email) {
    return { error: true, errorMessage: "Email is required." };
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return { error: true, errorMessage: "Please provide a valid email." };
  } else {
    return { error: false, errorMessage: "" };
  }
};

const validatePassword = (password: string) => {
  if (!password) {
    return { error: true, errorMessage: "Password is required." };
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\d@$!%*#?&]{6,}$/.test(password)
  ) {
    return {
      error: true,
      errorMessage:
        "Please provide a valid password, minimum six characters, " +
        "at least one capital letter and a number.",
    };
  } else {
    return { error: false, errorMessage: "" };
  }
};

const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (!confirmPassword) {
    return { error: true, errorMessage: "Confirm password is required." };
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\d@$!%*#?&]{6,}$/.test(
      confirmPassword,
    )
  ) {
    return {
      error: true,
      errorMessage:
        "Please provide a valid confirm password, minimum six characters, " +
        "at least one capital letter and a number.",
    };
  } else if (password !== confirmPassword) {
    return {
      error: true,
      errorMessage: "Confirm password does not matches with password.",
    };
  } else {
    return { error: false, errorMessage: "" };
  }
};

const validateFirstName = (firstName: string) => {
  if (!firstName) {
    return { error: true, errorMessage: "First name is required." };
  } else {
    return { error: false, errorMessage: "" };
  }
};

const validateLastName = (lastName: string) => {
  if (!lastName) {
    return { error: true, errorMessage: "Last name is required." };
  } else {
    return { error: false, errorMessage: "" };
  }
};

export {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateLastName,
  validateConfirmPassword,
};
