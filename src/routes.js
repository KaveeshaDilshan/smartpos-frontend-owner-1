import { BASE_ROUTE } from './const/config';
import Home from './views/Home/Home';
import Warehouse from './views/Warehouses/Warehouse';
import WarehousePage from './views/Warehouses/components/WarehousePage';
import Managers from './views/Managers/Managers';

const routes = [
  {
    path: '',
    render: Home,
    layout: BASE_ROUTE,
  },
  { path: 'warehouses', render: Warehouse, layout: BASE_ROUTE },
  {
    path: 'warehouses/:id',
    render: WarehousePage,
    layout: BASE_ROUTE,
  },
  {
    path: 'managers',
    render: Managers,
    layout: BASE_ROUTE,
  },
];

export default routes;
