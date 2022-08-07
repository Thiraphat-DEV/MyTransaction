import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/react";
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
    screen.getByLabelText(/Menu Name: /);
    screen.getByPlaceholderText(/Enter MenuName: /);
    screen.getByLabelText(/Money($): /);
    screen.getByPlaceholderText(/Enter Money: /);
    fireEvent.click(btnAdd);
    await screen.findByText("Add");
  });
});
