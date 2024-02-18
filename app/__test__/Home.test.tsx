
import { render } from "@testing-library/react";
import Auth from "../page";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Auth", () => {
  it("render", () => {
    const { container } = render(<Auth />);
    expect(container).toMatchSnapshot();
  });
});