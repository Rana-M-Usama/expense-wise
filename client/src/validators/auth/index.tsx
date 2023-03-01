const validateEmail = (email: string) => {
  email = email?.trim();
  if (!email) {
    return { error: true, errorMessage: "Email is required." };
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return { error: true, errorMessage: "Please provide a valid email." };
  } else {
    return { error: false, errorMessage: "" };
  }
};

const validateLoginPassword = (password: string) => {
  if (!password) {
    return { error: true, errorMessage: "Password is required." };
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\d@$!%*#?&-]{6,}$/.test(password)
  ) {
    return {
      error: true,
      errorMessage: "Invalid password.",
    };
  } else {
    return { error: false, errorMessage: "" };
  }
};

const validatePassword = (password: string) => {
  if (!password) {
    return { error: true, errorMessage: "Password is required." };
  } else if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\d@$!%*#?&-]{6,}$/.test(password)
  ) {
    return {
      error: true,
      errorMessage:
        "Your password must be at least 6 characters long and contain at " +
        "least one uppercase letter, one lowercase letter and one number.",
    };
  } else {
    return { error: false, errorMessage: "" };
  }
};

const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (!confirmPassword) {
    return { error: true, errorMessage: "Confirm password is required." };
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
  firstName = firstName?.trim();
  if (!firstName) {
    return { error: true, errorMessage: "First name is required." };
  } else if (!/^[A-Za-z ]+$/.test(firstName)) {
    return {
      error: true,
      errorMessage:
        "Please provide a valid first name, it can only contain alphabets.",
    };
  } else if (firstName.length > 50) {
    return {
      error: true,
      errorMessage: "First name can not be longer than 50 characters.",
    };
  } else {
    return { error: false, errorMessage: "" };
  }
};

const validateLastName = (lastName: string) => {
  lastName = lastName?.trim();
  if (!lastName) {
    return { error: true, errorMessage: "Last name is required." };
  } else if (!/^[A-Za-z ]+$/.test(lastName)) {
    return {
      error: true,
      errorMessage:
        "Please provide a valid last name, it can only contain alphabets.",
    };
  } else {
    return { error: false, errorMessage: "" };
  }
};

const validateImageFile = (file: File | undefined) => {
  if (
    file &&
    !(
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg"
    )
  ) {
    return {
      error: true,
      errorMessage: "Image formate should be png/jpeg/jpg.",
    };
  } else if (file && file?.size / 1048576 > 1) {
    return {
      error: true,
      errorMessage: "Image size should be less than 1 MB.",
    };
  } else {
    return { error: false, errorMessage: "" };
  }
};

export {
  validateEmail,
  validatePassword,
  validateLoginPassword,
  validateFirstName,
  validateLastName,
  validateConfirmPassword,
  validateImageFile,
};
