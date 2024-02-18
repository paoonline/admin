import { render } from "@testing-library/react"
import Home from "../page"
import { Providers } from "@/store/provider"
import Layout from "../layout"

describe('home', () => {
    it('render', () => {
        const {container} =render(<Home/>, {wrapper: Providers})
        expect(container).toMatchSnapshot()
    })
})

describe('home layout', () => {
    it('render', () => {
        const {container} =render(<Layout><div></div></Layout>, {wrapper: Providers})
        expect(container).toMatchSnapshot()
    })
})