/**
 * @jest-environment jsdom
 */

import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("Tests runs", () => {
  expect(true).toBe(true);
});

test("displays hello world text", async () => {
  render(<App />);
  const h1 = await screen.findByTestId("h1-test");
  expect(h1.textContent).toBe("Hello World");
});
