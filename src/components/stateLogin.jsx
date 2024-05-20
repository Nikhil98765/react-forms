
import { Input } from './Input.jsx';
import {hasMinLength, isEmail} from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";

// * Extracting form data through state.
export default function Login() {
  const { value: emailValue, handleInputChange: handleEmailChange, handleInputBlur: handleEmailBlur, hasError: emailHasError } = useInput('', (value) => isEmail(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  // * Handling form input validation on blur will show validation message too long. To handle this issue, we can remove the error on input change and validate it on blur.

  function handleSubmission(event) {
    // * Note: Need to add prevent default to prevent reloading of page and making http call when form submits.
    event.preventDefault();
    if (emailHasError || passwordHasError) {
      return;
    }

    console.log(`Email: ${emailValue} && Password: ${passwordValue}`);
    // * Resetting form
    // setEnteredValues({
    //   email: "",
    //   password: "",
    // });
    // setDidEdit({
    //   email: false,
    //   password: false
    // });
  }


  return (
    <form onSubmit={handleSubmission}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          value={emailValue}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailHasError && "Please enter a valid email!"}
        ></Input>

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={passwordHasError && "Please enter a valid password!"}
        ></Input>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
