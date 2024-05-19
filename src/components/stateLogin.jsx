import { useState } from "react";

export default function Login() {
  // * Extracting form data through state.
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  // * Handling form input validation on key stroke. Won't be a good solution since errors will be shown too early.
  const emailIsInvalid = enteredValues.email !== '' && !enteredValues.email.includes('@');

  function handleSubmission(event) {
    // * Note: Need to add prevent default to prevent reloading of page and making http call when form submits.
    event.preventDefault();
    console.log(enteredValues);
    // * Resetting form
    setEnteredValues({
      email: "",
      password: "",
    });
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmission}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={enteredValues.email}
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={enteredValues.password}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
