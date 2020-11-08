import axios from 'axios'

const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MINLENGTHPASS = 'MINLENGTHPASS';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_PASSWORD_MATCH = 'MATCH';
const VALIDATOR_TYPE_USERNAME_MATCH = 'USERMATCH';


export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = val => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val
});
export const VALIDATOR_MINLENGTHPASS = val => ({
  type: VALIDATOR_TYPE_MINLENGTHPASS,
  val: val
});
export const VALIDATOR_USERMATCH = () => ({
  type: VALIDATOR_TYPE_USERNAME_MATCH
});
export const VALIDATOR_MAXLENGTH = val => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val
});
export const VALIDATOR_PASSWORD_MATCH = val => ({
  type: VALIDATOR_TYPE_PASSWORD_MATCH,
  val: val
});
export const VALIDATOR_MIN = val => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = val => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
var pass = '';
var usernames = [];
export const validate = (value, validators) => {

  axios.get("https://miolaproject.herokuapp.com/users")
  .then((response) => {
    if (response.data != null) {
      // console.log("my usernames ",response.data.username);
      usernames = response.data;
      // setShow(true);
      // setTimeout(() => setShow(false), 1000);
      // setEtudiants(Etudiants);

    } else {
      // setShow(false);
    }
  });

  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTHPASS) {
      pass = value;
      console.log("passs ",pass);
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_USERNAME_MATCH) {
      for(const username of usernames){
        isValid = isValid && username.username !== value;
    
      }
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_PASSWORD_MATCH) {
      if(validator.val !== null)
      console.log(`validate pass  ${pass}`);
      isValid = isValid && value === pass;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
};
