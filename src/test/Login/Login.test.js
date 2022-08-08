import Login from "../../pages/Login/Login";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useState } from "react";

function user() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault()
    const inputPassword = e.currentTarget.value;
    if (isNaN(password)) return;
    setPassword(inputPassword);
  };
  const handleChangeEmail = (e) => {
    e.preventDefault();
    const inputEmail = e.currentTarget.value;
    if (isNaN(inputEmail)) return;
    setEmail(inputEmail);
  };

  return (
    <>
      <input value={email} aria-label="email" onChange={handleChangeEmail} />
      <input value={password} aria-label="password" onChange={handleChangePassword} />
    </>
  );
}

const setup = () => {
  const utils = render(<user />);
  const inputEmail = utils.getByLabelText("email");
  const inputPassword= utils.getByLabelText("password");
  return {
    inputEmail,
    inputPassword,
    ...utils,
  };
};

function renderLogin() {
  render(<Login />);
}
describe("render component Login", () => {
  it("it should be render text is visible", async () => {
    await renderLogin();
    const btnLogin = screen.getByRole(
      "button",
      { name: /Login/i },
      { pressed: true }
    );
    const btnLoading = screen.getByRole(
      "button",
      { name: /Login.../i },
      { pressed: false }
    );
    const labelEmail = screen.getByLabelText(/Email: /i);
    const labelPassword = screen.getByLabelText(/Password: /i);
    expect(btnLogin).not.toBeDisabled();
    expect(labelEmail).toBe("Email: ");
    expect(labelPassword).toBe("Password: ");
    expect(btnLoading).toBeDisabled();
  });
  // email
  it("It should not allowed empty string", () => {
    const { inputEmail } = setup();
    expect(inputEmail.value).toBe(""); // empty before
    fireEvent.change(inputEmail, { target: { value: "thiraphat@gmail.com" } });
    expect(inputEmail.value).toBe(""); //empty after
  });

  it("It should be keep $ of the input", () => {
    const { inputPassword } = setup();
    fireEvent.change(inputPassword, { target: { value: "helloword" } });
    expect(inputPassword.value).toBe("$82");
  });
  it("It should be add value somtum", () => {
    const { inputEmail } = setup();
    expect(inputEmail.value).toBe(""); // empty before
    fireEvent.change(inputEmail, { target: { value: "Demo@bru.ac.th" } });
    expect(inputEmail.value).toBe(""); //empty after
  });
  it("It should be allow a $ to be in the input when the value is changed", () => {
    const { inputPassword } = setup();
    fireEvent.change(inputPassword, { target: { value: "thiraphat4545" } });
    expect(inputPassword.value).toBe("$200.0");
  });

  it("It should not allowed value noodle", () => {
    const { inputEmail } = setup();
    expect(inputEmail.value).toBe(""); // empty before
    fireEvent.change(inputEmail, { target: { value: "hello@gmail.com" } });
    expect(inputEmail.value).toBe(""); //empty after
  });

  it("it should be to remove $", () => {
    const { inputPassword } = setup();
    fireEvent.change(inputPassword, { target: { value: "gmailhello21" } });
    expect(inputPassword.value).toBe("gmailhello20"); // need to make a change so React registers "" as a change
    fireEvent.change(inputPassword, { target: { value: "" } });
    expect(inputPassword.value).toBe("");
  });
});
