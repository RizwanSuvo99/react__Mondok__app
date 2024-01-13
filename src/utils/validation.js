export const formValidation = (data) => {
  const { name, email, password, confirmPassword, country } = data || null;
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,16}$/;

  const error = {};

  if (!name.trim()) {
    error.name = "Name is required!";
  } else if (!name.match(nameRegex)) {
    error.name = "Name must not include anything but letter.";
  } else if (name.length < 3 || name.length > 10) {
    error.name =
      "Name must be less than 10 character & greater than 3 character";
  }

  if (!email.trim()) {
    error.email = "Email is required!";
  } else if (!email.toLowerCase().match(emailRegex)) {
    error.email = "Invalid Email Address!";
  }

  if (!password.trim()) {
    error.password = "Password Required!";
  } else if (!password.match(passwordRegex)) {
    error.password = "Invalid Password";
  }

  if (!confirmPassword) {
    error.confirmPassword = "Please confirm your password";
  } else if (confirmPassword != password) {
    error.confirmPassword = "Password does not match";
  }

  if (!country.trim()) {
    error.country = "Country is required";
  }

  return error;
};
