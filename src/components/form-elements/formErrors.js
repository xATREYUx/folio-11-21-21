const FormErrors = (code) => {
  switch (code) {
    case "auth/invalid-password":
      return "Invalid password";
      break;
    case "auth/user-not-found":
      return "User not found.";
      break;
    case "auth/email-already-exists":
      return "Email already exists.";
      break;
    case "auth/invalid-email":
      return "Invalid email";
      break;
    case "auth/wrong-password":
      return "Wrong password";
      break;
    default:
      return "Something went wrong. Please try again.";
  }
};

export default FormErrors;
