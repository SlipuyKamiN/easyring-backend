export const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const loginRegexp = /^[a-z]+\.[a-z]{1,2}$/;

export const passwordRegexp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,16}$/;

export const carNumberRegexp = /^[A-ZÄÖÜ]{2,5}[0-9]{3,4}[EH]?$/u;

export const phoneRegexp = /^(?:\+49|0049)(15[0-9]|16[0-9]|17[0-9])[0-9]{7,9}$/;

export default {
  emailRegexp,
  passwordRegexp,
  carNumberRegexp,
  phoneRegexp,
};
