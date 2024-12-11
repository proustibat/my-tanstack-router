import {vi, describe, it, expect, beforeEach} from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent, {UserEvent} from "@testing-library/user-event";

import Button from "./Button.tsx";

describe("Button", () => {
  let button: HTMLButtonElement;
  let user: UserEvent;
  let onClick: () => void;

  beforeEach(() => {
    user = userEvent.setup();
    onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    button = screen.getByRole("button", { name: "Click me" });
  });

  it("should render a button with the text 'Click me'", () => {
    expect(button).toHaveAttribute("type", "button");
    expect(button).toBeInTheDocument();
  });

  it("should call the onClick function when clicked", async () => {
    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("should not call the onClick function when it isn't clicked", async () => {
    expect(onClick).not.toHaveBeenCalled();
  });
});
