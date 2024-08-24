import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .matches(/^[a-zA-Z0-9_-]+$/, "Special characters are not allowed"),
  email: yup.string().email("Enter a valid email"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
});

export const editProfileSchema = yup.object().shape({
  displayName: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .matches(/^[a-zA-Z0-9_-]+$/, "Special characters are not allowed"),
  bio: yup.string().nullable(),
  avatarUrl: yup.string().url("Enter a valid URL").nullable(),
});
