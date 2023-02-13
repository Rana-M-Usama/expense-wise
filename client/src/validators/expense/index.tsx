const validateTitle = (title: string) => {
  title = title?.trim();
  if (!title) {
    return { error: true, errorMessage: "Title is required." };
  } else if (title.length > 100) {
    return {
      error: true,
      errorMessage: "Title can not be longer than 100 characters.",
    };
  } else {
    return { error: false, errorMessage: "" };
  }
};

const validateType = (type: string) => {
  type = type?.trim();
  if (!type) {
    return { error: true, errorMessage: "Type is required." };
  } else if (type.length > 100) {
    return {
      error: true,
      errorMessage: "Type can not be longer than 100 characters.",
    };
  } else {
    return { error: false, errorMessage: "" };
  }
};

const validateAmount = (amount: number) => {
  let amountValue = amount.toString();
  const regex = /^[0-9]*\.?[0-9]+$/;
  if (amountValue === "0") {
    return { error: true, errorMessage: "Amount is required." };
  } else if (!regex.test(amountValue)) {
    return {
      error: true,
      errorMessage: "Amount must be valid positive number.",
    };
  } else {
    return { error: false, errorMessage: "" };
  }
};

const validateStatus = (status: string) => {
  if (!status) {
    return { error: true, errorMessage: "Status is required." };
  } else {
    return { error: false, errorMessage: "" };
  }
};

const validateAmountType = (amountType: string) => {
  if (!amountType) {
    return { error: true, errorMessage: "Amount type is required." };
  } else {
    return { error: false, errorMessage: "" };
  }
};

export {
  validateTitle,
  validateAmount,
  validateAmountType,
  validateStatus,
  validateType,
};
