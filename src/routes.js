import { BASE_ROUTE } from './const/config';
import Home from './views/home/Home';

const routes = [
  {
    path: '',
    render: Home,
    layout: BASE_ROUTE,
  },
];

export default routes;
