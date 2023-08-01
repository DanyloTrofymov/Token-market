import { FormikValues } from 'formik';

const todoValidationConstants = {
  titleMinLength: 1,
  titleMaxLength: 50,
  descriptionMinLength: 1,
  descriptionMaxLength: 500
};

const userConstants = {
  usernameMinLength: 8,
  usernameMaxLength: 64,
  passwordMinLength: 8,
  passwordMaxLength: 64
};
const emailRegex =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const validateEmail = (values: FormikValues) => {
  const errors: Partial<FormikValues> = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const validateUsername = (username: string) => {
  const errors: Partial<FormikValues> = {};
  if (!username) {
    errors.username = 'Username is required';
  } else if (
    username.length < userConstants.usernameMinLength ||
    username.length > userConstants.usernameMaxLength
  ) {
    errors.username = `Username must be between ${userConstants.usernameMinLength} and ${userConstants.usernameMaxLength} characters`;
  }
  return errors;
};

const validatePassword = (password: string) => {
  const errors: Partial<FormikValues> = {};
  if (!password) {
    errors.password = 'Password is required';
  } else if (
    password.length < userConstants.passwordMinLength ||
    password.length > userConstants.passwordMaxLength
  ) {
    errors.password = `Password must be between ${userConstants.passwordMinLength} and ${userConstants.passwordMaxLength} characters`;
  }
  return errors;
};
const validateRepeatPassword = (password: string, repeatPassword: string) => {
  const errors: Partial<FormikValues> = {};
  if (!repeatPassword) {
    errors.repeatPassword = 'Repeat password is required';
  } else if (!password.match(repeatPassword)) {
    errors.repeatPassword = 'Passwords do not match';
  }
  return errors;
};

export const validateTodoForm = (values: FormikValues) => {
  const errors: Partial<FormikValues> = {};

  if (!values.title) {
    errors.title = 'Title is required';
  }
  if (values.title.length > todoValidationConstants.titleMaxLength) {
    errors.title = `Title is too long. Max ${todoValidationConstants.titleMaxLength} characters`;
  }
  if (values.description.length > todoValidationConstants.descriptionMaxLength) {
    errors.description = `Description is too long. Max ${todoValidationConstants.descriptionMaxLength} characters`;
  }

  return errors;
};
export const validateUserEditForm = (values: FormikValues) => {
  const errors: Partial<FormikValues> = {};
  if (values.length === 0) {
    errors.values = 'At least one value is required';
  }
  const usernameValidation = validateUsername(values.username).username;
  if (usernameValidation) {
    errors.username = usernameValidation;
  }
  const emailValidation = validateEmail(values).email;
  if (emailValidation) {
    errors.email = emailValidation;
  }
  return errors;
};

export const validateLoginForm = (values: FormikValues) => {
  const errors: Partial<FormikValues> = {};
  const usernameValidation = validateUsername(values.username).username;
  if (usernameValidation) {
    errors.username = usernameValidation;
  }
  const passwordValidation = validatePassword(values.password).password;
  if (passwordValidation) {
    errors.password = passwordValidation;
  }
  return errors;
};

export const validateSignUpForm = (values: FormikValues) => {
  const errors: Partial<FormikValues> = validateLoginForm(values);
  const emailValidation = validateEmail(values).email;
  if (emailValidation) {
    errors.email = emailValidation;
  }
  const repeatPasswordValidation = validateRepeatPassword(
    values.password,
    values.repeatPassword
  ).repeatPassword;
  if (repeatPasswordValidation) {
    errors.repeatPassword = repeatPasswordValidation;
  }
  return errors;
};

export const validatePasswordChangeForm = (values: FormikValues) => {
  const errors: Partial<FormikValues> = {};
  const oldPasswordValidation = validatePassword(values.oldPassword).password;
  if (oldPasswordValidation) {
    errors.oldPassword = oldPasswordValidation;
  }
  const newPasswordValidation = validatePassword(values.password).password;
  if (newPasswordValidation) {
    errors.password = newPasswordValidation;
  }
  const repeatPasswordValidation = validateRepeatPassword(
    values.password,
    values.repeatPassword
  ).repeatPassword;
  if (repeatPasswordValidation) {
    errors.repeatPassword = repeatPasswordValidation;
  }
  return errors;
};

export const validateRestorePasswordForm = (values: FormikValues) => {
  const errors: Partial<FormikValues> = {};
  const passwordValidation = validatePassword(values.password).password;
  if (passwordValidation) {
    errors.password = passwordValidation;
  }
  const repeatPasswordValidation = validateRepeatPassword(
    values.password,
    values.repeatPassword
  ).repeatPassword;
  if (repeatPasswordValidation) {
    errors.repeatPassword = repeatPasswordValidation;
  }
  return errors;
};

export const restorePasswordInitialValues = {
  password: '',
  repeatPassword: ''
};

export const loginInitialValues = {
  username: '',
  password: ''
};

export const signupInitialValues = {
  username: '',
  email: '',
  password: '',
  repeatPassword: ''
};
