import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import { store } from "../../store";
import { Navbar } from "./Navbar";

beforeEach(() => {
  render(
    <Provider store={store}>
      <Navbar />
    </Provider>
  );
});

test("renders navbar", () => {
  const navbarList = screen.getByTestId("navlist");
  expect(navbarList).toBeInTheDocument();
});

test("app starts on home page", () => {
  const homeButton = screen.getByTestId("home");
  expect(homeButton).toHaveClass("text-slate-100");
});

test("add button works", () => {
  const addButton = screen.getByTestId("add");
  userEvent.click(addButton);
  expect(addButton).toHaveClass("text-slate-100");
});

test("favorites button works", () => {
  const favsButton = screen.getByTestId("add");
  userEvent.click(favsButton);
  expect(favsButton).toHaveClass("text-slate-100");
});
