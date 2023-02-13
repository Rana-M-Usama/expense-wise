const validatePermissionType = (permissionType: string) => {
  if (!permissionType) {
    return { error: true, errorMessage: "Permission Type is required." };
  } else {
    return { error: false, errorMessage: "" };
  }
};

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

export { validatePermissionType, validateEmail };
