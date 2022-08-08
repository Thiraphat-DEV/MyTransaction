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
  it("It should not allowed empty string", () => {
    const { input } = setup();
    expect(input.value).toBe(""); // empty before
    fireEvent.change(input, { target: { value: "pasta" } });
    expect(input.value).toBe(""); //empty after
  });

  it("It should be keep $ of the input", () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: "82" } });
    expect(input.value).toBe("$82");
  });
  it("It should be add value somtum", () => {
    const { input } = setup();
    expect(input.value).toBe(""); // empty before
    fireEvent.change(input, { target: { value: "somtum kaiyang" } });
    expect(input.value).toBe(""); //empty after
  });
  it("It should be allow a $ to be in the input when the value is changed", () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: "$200.0" } });
    expect(input.value).toBe("$200.0");
  });

  it("It should not allowed value noodle", () => {
    const { input } = setup();
    expect(input.value).toBe(""); // empty before
    fireEvent.change(input, { target: { value: "noodle" } });
    expect(input.value).toBe(""); //empty after
  });

  it("it should be to remove $", () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: "1000" } });
    expect(input.value).toBe("$1000"); // need to make a change so React registers "" as a change
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
  });
});
