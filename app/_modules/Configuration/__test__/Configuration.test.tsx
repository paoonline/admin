import { render } from "@testing-library/react";

import { Providers } from "@/store/provider";
import Configuration from "../Configuration";
import { ITableState } from "@/models/table.type";

describe("Configuration", () => {
  it("render", () => {
    const { container } = render(
      <Configuration
        onEdit={jest.fn()}
      />,
      { wrapper: Providers }
    );
    expect(container).toMatchSnapshot();
  });
});
