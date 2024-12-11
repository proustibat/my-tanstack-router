import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoApp from "./index";

describe("TodoApp", () => {
    it("renders the init tasks", () => {
        // since screen does not have the container property, we'll destructure render to obtain a container for this test
        const { container } = render(<TodoApp />);
        expect(container).toMatchSnapshot();
    });

    it("renders correct heading", () => {
        render(<TodoApp />);
        expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(
            /TODO/i,
        );
    });

    it("deletes a task", async () => {
        const user = userEvent.setup();
        render(<TodoApp />);
        expect(screen.queryByText(/Youpi/i)).toBeInTheDocument();
        const allDeleteButtons = screen.getAllByText(/delete/i);
        expect(allDeleteButtons).toHaveLength(4);
        await user.click(allDeleteButtons[0]);
        expect(screen.queryByText(/Youpi/i)).not.toBeInTheDocument();
        expect(screen.getAllByText(/delete/i)).toHaveLength(3);
    });
});