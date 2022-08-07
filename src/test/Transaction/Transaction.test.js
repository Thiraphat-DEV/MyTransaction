import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/react";
//import useState
import { useState } from "react";
// component
import TransactionForm from "../../pages/Transaction/TransactionForm";
//generate Uid
function generateUid() {
  let uid = () => {
    // random and compare to string base 16
    return Math.floor((1 + Math.random()) * 0x1000)
      .toString(16)
      .substring(1);
  };
  //generate uid
  return (
    uid() +
    uid() +
    "-" +
    uid() +
    "-" +
    uid() +
    "-" +
    uid() +
    "-" +
    uid() +
    uid() +
    uid()
  );
}
//check input

function MoneyInput() {
  const [value, setValue] = useState("");

  const removeDollarSign = (value) =>
    value[0] === "$" ? value.slice(1) : value;
  const getReturnValue = (value) => (value === "" ? "" : `$${value}`);

  const handleChange = (e) => {
    e.preventDefault();
    const inputtedValue = e.currentTarget.value;
    const noDollarSign = removeDollarSign(inputtedValue);
    if (isNaN(noDollarSign)) return;
    setValue(getReturnValue(noDollarSign));
  };

  return <input value={value} aria-label="cost" onChange={handleChange} />;
}

const setup = () => {
  const utils = render(<MoneyInput />);
  const input = utils.getByLabelText("cost");
  return {
    input,
    ...utils,
  };
};

//render component
function renderForm() {
  render(<TransactionForm uid={generateUid()} />);
}

describe("render FormTransaction component", () => {
  it("check text in form", async () => {
    await renderForm();
    const btnAdd = screen.getAllByRole(
      "button",
      { name: "Add" },
      { pressed: true }
    );
    expect(screen.getByLabelText(/Menu Name: /i)).toBe(/Menu Name: /i);
    expect(screen.getByPlaceholderText(/Enter MenuName: /i)).toBe(
      /Enter MenuName: /i
    );
    expect(screen.getByLabelText(/Money($): /i)).toBe(/Money($): /i);
    expect(screen.getByPlaceholderText(/Enter Money: /i)).toBe(
      /Enter Money: /i
    );
    expect(fireEvent.click(btnAdd)).not.toBeDisabled();
    await screen.findByText("Add");
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
