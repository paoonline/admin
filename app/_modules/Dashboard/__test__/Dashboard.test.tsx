import { render } from "@testing-library/react"

import { Providers } from "@/store/provider"
import DashboardModule from "../Dashboard"

describe('DashboardModule', () => {
   it('test', () => {
    const {container} = render(<DashboardModule/>, {wrapper: Providers})
    expect(container).toMatchSnapshot()
   })
})