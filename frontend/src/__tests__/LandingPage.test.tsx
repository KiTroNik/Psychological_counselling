import {expect, test} from "vitest";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { LandingPage } from "../pages/landing";

test("displays a landing page", async () => {
  const view = render(<LandingPage/>);
  const heading = await screen.findByTestId("heading");
  expect(heading).toBeTruthy();
  view.unmount();
})
