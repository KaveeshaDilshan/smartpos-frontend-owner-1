import { BASE_ROUTE } from './const/config';
import Home from './views/Home/Home';
import Warehouse from './views/Warehouses/Warehouse';

const routes = [
  {
    path: '',
    render: Home,
    layout: BASE_ROUTE,
  },
  { path: 'warehouses', render: Warehouse, layout: BASE_ROUTE },
];

export default routes;
