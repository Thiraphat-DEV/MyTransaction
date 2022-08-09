import Signup from "../../pages/Signup/Signup";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useState } from "react";

function User() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    const inputPassword = e.currentTarget.value;
    if (password === "") return;
    setPassword(inputPassword);
  };
  const handleChangeEmail = (e) => {
    e.preventDefault();
    const inputEmail = e.currentTarget.value;
    if (inputEmail === "") return;
    setEmail(inputEmail);
  };

  return (
    <>
      <input value={email} aria-label="email" onChange={handleChangeEmail} />
      <input
        value={password}
        aria-label="password"
        onChange={handleChangePassword}
      />
    </>
  );
}

const user = () => {
  const utils = render(<User />);
  const inputEmail = utils.getByLabelText("email");
  const inputPassword = utils.getByLabelText("password");
  const inputDisplayName = utils.getByLabelText('displayName')
  return {
    inputEmail,
    inputPassword,
    inputDisplayName,
    ...utils,
  };
};

function renderSignup() {
  render(<Signup />);
}
describe("render component Signup", () => {
  test("it should be render page text is visible", async () => {
    await renderSignup();
    const btnSignup = screen.getByRole(
      "button",
      { name: /Signup/i },
      { pressed: true }
    );
    const btnLoading = screen.getByRole(
      "button",
      { name: /Signup.../i },
      { pressed: false }
    );
    const labelEmail = screen.getByLabelText(/Email: /i);
    const labelPassword = screen.getByLabelText(/Password: /i);
    const labelDisplayName = screen.getByLabelText(/Name: /i);
    expect(btnSignup).not.toBeDisabled();
    expect(labelEmail).toBe("Email: ");
    expect(labelPassword).toBe("Password: ");
    expect(labelDisplayName).toBe('Name: ')
    expect(btnLoading).toBeDisabled();
  });
  // email
  test("it should be add value is email", () => {
    const { inputEmail } = user();
    expect(inputEmail.value).toBe(""); // empty before
    fireEvent.change(inputEmail, { target: { value: "thiraphat@gmail.com" } });
    expect(inputEmail.value).toBe(/thiraphat@gmail.com/i); //empty after
    //after add success
    fireEvent.change(inputEmail, {target: {value: ''}})
    expect(inputEmail).toBe('')
  });

  test("it should be add value is password", () => {
    const { inputPassword } = user();
    fireEvent.change(inputPassword, { target: { value: "helloword123" } });
    expect(inputPassword.value).toBe(/helloword123/i);
    fireEvent.change(inputPassword, { target: { value: "" } });
    expect(inputPassword.value).toBe("");
  });
test("it should be add value is diplayName", () => {
    const { inputDisplayName} = user();
    expect(inputDisplayName.value).toBe(""); // empty before
    fireEvent.change(inputDisplayName, { target: { value: "Thiraphat " } });
    expect(inputDisplayName.value).toBe(/Thiraphat/i); //empty after
    //after add success
    fireEvent.change(inputDisplayName, {target: {value: ''}})
    expect(inputDisplayName).toBe('')
  });
  test("it should be add value is email test", () => {
    const { inputEmail } = user();
    expect(inputEmail.value).toBe(""); // empty before
    fireEvent.change(inputEmail, { target: { value: "Demo@bru.ac.th" } });
    expect(inputEmail.value).toBe(/Demo@bru.ac.th/i);
    fireEvent.change(inputEmail, { target: { value: "" } });
    expect(inputEmail.value).toBe("");
  });
test("It should be add value is Password", () => {
    const { inputPassword } = user();
    fireEvent.change(inputPassword, { target: { value: "thiraphat4545" } });
    expect(inputPassword.value).toBe(/thiraphat4545/i);
    fireEvent.change(inputPassword, { target: { value: "" } });
    expect(inputPassword.value).toBe("");
  });
test("it should be add value is displayName", () => {
    const { inputEmail } = user();
    expect(inputEmail.value).toBe(""); // empty before
    fireEvent.change(inputEmail, { target: { value: "thiraphat@gmail.com" } });
    expect(inputEmail.value).toBe(/thiraphat@gmail.com/i); //empty after
    //after add success
    fireEvent.change(inputEmail, {target: {value: ''}})
    expect(inputEmail).toBe('')
  });

  test("It should be add value is email", () => {
    const { inputEmail } = user();
    expect(inputEmail.value).toBe(""); // empty before
    fireEvent.change(inputEmail, { target: { value: "hello@gmail.com" } });
    expect(inputEmail.value).toBe(/hello@gmail.com/i); //empty after
    fireEvent.change(inputEmail, { target: { value: "" } });
    expect(inputEmail.value).toBe("");
  });
test("it should be add value is displayName1", () => {
    const { inputDisplayName } = user();
    expect(inputDisplayName.value).toBe(""); // empty before
    fireEvent.change(inputDisplayName, { target: { value: "Wachirawit" } });
    expect(inputDisplayName.value).toBe(/Wachirawit/i); //empty after
    //after add success
    fireEvent.change(inputDisplayName, {target: {value: ''}})
    expect(inputDisplayName).toBe('')
  });
  test("it should be check password after pass value success", () => {
    const { inputPassword, inputEmail, inputDisplayName } = user();
    fireEvent.change(inputPassword, { target: { value: "gmailhello21" } });
    expect(inputPassword.value).toBe(/gmailhello21/i); // need to make a change so React registers "" as a change
    fireEvent.change(inputEmail, {
      target: { value: "gmail.hello@gmail.com" },
    });

    expect(inputEmail.value).toBe(/gmail.hello@gmail.com/i); // need to make a change so React registers "" as a change
    fireEvent.change(inputDisplayName, {target: {value: 'Phattaraphoom'}})
    expect(inputDisplayName.value).toBe(/Phattaraphoom/i)
    //after add 
    fireEvent.change(inputPassword, { target: { value: "" } });
    fireEvent.change(inputEmail, { target: { value: "" } });
    expect(inputEmail.value).toBe("");
    expect(inputPassword.value).toBe("");
  });
});
