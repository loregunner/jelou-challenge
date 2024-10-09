import { configure, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Home } from "./Home";


configure({ testIdAttribute: "data-testid" });

describe("Home", () => {
  it("renders a heading", async () => {
    render(<Home />);
    const element = screen.getByTestId("home_test");

    expect(element).toBeInTheDocument();
  });
});
