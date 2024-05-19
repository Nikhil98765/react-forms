import { useRef, useState } from "react";

// * Handled form data using useRef way.
export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailIsInvalid, setEmailIsInvalid] = useState(false);


  function handleSubmission(event) {
    // * Note: Need to add prevent default to prevent reloading of page and making http call when form submits.
    event.preventDefault();
    // ! resetting form controls can be achieved through useRef way but its not recommended to do it and useRef is only for readonly.
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const emailIsValid = enteredEmail.includes('@');

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);

    console.log('sending HTTP requests...');
  }

  return (
    <form onSubmit={handleSubmission}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            ref={emailRef}
          />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={passwordRef}
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
