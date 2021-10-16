import { render } from '@testing-library/react';
import CategoryPage from '../views/managerPages/Category/CategoryPage';

test('component should render all categories', () => {
  const comp = render(<CategoryPage />);
  comp.debug();
});
