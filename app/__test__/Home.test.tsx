import Home from "../page"
import { render } from '@testing-library/react';

jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));
  
describe('Home', () => {
    it('test', () => {
        render(<Home/>)
    })
})