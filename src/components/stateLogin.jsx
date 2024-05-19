import { useState } from "react";

import { Input } from './Input.jsx';

export default function Login() {
  // * Extracting form data through state.
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  });

  // * Handling form input validation on blur will show validation message too long. To handle this issue, we can remove the error on input change and validate it on blur.
  const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
  const passwordIsInvalid = didEdit.password && enteredValues.password.trim().length < 6;

  function handleSubmission(event) {
    // * Note: Need to add prevent default to prevent reloading of page and making http call when form submits.
    event.preventDefault();
    console.log(enteredValues);
    // * Resetting form
    setEnteredValues({
      email: "",
      password: "",
    });
    setDidEdit({
      email: false,
      password: false
    });
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: true
    }))
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
          value={enteredValues.email}
          onChange={(event) => handleInputChange("email", event.target.value)}
          onBlur={() => handleInputBlur("email")}
          error={emailIsInvalid && "Please enter a valid email!"}
        ></Input>

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          value={enteredValues.password}
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
          onBlur={() => handleInputBlur("password")}
          error={passwordIsInvalid && "Please enter a valid password!"}
        ></Input>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
