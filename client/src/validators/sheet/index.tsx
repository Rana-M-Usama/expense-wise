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

const validateDescription = (description: string) => {
  description = description?.trim();
  if (!description) {
    return { error: true, errorMessage: "Description is required" };
  } else if (description.length > 1000) {
    return {
      error: true,
      errorMessage: "Description can not be longer than 1000 characters.",
    };
  } else {
    return { error: false, errorMessage: "" };
  }
};

export { validateTitle, validateDescription };
