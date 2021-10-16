import { BASE_ADMIN_ROUTE, BASE_MANAGER_ROUTE } from './const/config';
import Home from './views/Home/Home';
import Warehouse from './views/adminPages/Warehouses/Warehouse';
import WarehousePage from './views/adminPages/Warehouses/components/WarehousePage';
import Dashboard from './views/managerPages/Dashboard/Dashboard';
import ProductsPage from './views/managerPages/Products/ProductsPage';
import SalespersonsPage from './views/managerPages/Salespersons/SalespersonsPage';
import managerWarehousePage from './views/managerPages/Warehouse/managerWarehousePage';
import SalesPage from './views/managerPages/Sales/SalesPage';
import CategoryPage from './views/managerPages/Category/CategoryPage';
import LeavesPage from './views/managerPages/Leaves/LeavesPage';
import AddNewSalesperson from './views/managerPages/Salespersons/components/AddNewSalesperson';
import SalespersonTracking from './views/managerPages/Salespersons/components/Tracking';
import AddNewProduct from './views/managerPages/Products/components/AddNewProduct';
import ProductDetails from './views/managerPages/Products/components/ProductDetails';
import OneSalesperson from './views/managerPages/Salespersons/components/OneSalesperson';
import EditSalesperson from './views/managerPages/Salespersons/components/EditSalesperson';
import AnalyticsPage from './views/adminPages/Analytics/AnalyticsPage';
import Salesperson from './views/adminPages/Salespersons/SalespersonPage';
import AddManager from './views/adminPages/Managers/components/AddManager';
import ManagerPage from './views/adminPages/Managers/ManagerPage';
import LoginForm from './views/login/LoginForm';
import SalespersonPage from './views/adminPages/Salespersons/components/SalespersonPage';

const routes = [
  {
    path: '',
    render: Home,
    layout: BASE_ADMIN_ROUTE,
  },
  { path: 'warehouses', render: Warehouse, layout: BASE_ADMIN_ROUTE },
  {
    path: 'warehouses/:id',
    render: WarehousePage,
    layout: BASE_ADMIN_ROUTE,
  },
  { path: 'salespersons', render: Salesperson, layout: BASE_ADMIN_ROUTE },
  { path: 'analytics', render: AnalyticsPage, layout: BASE_ADMIN_ROUTE },
  { path: 'managers/addManager', render: AddManager, layout: BASE_ADMIN_ROUTE },
  {
    path: 'salespersons/analytics/:id',
    render: SalespersonPage,
    layout: BASE_ADMIN_ROUTE,
  },
  {
    path: 'dashboard',
    render: Dashboard,
    layout: BASE_MANAGER_ROUTE,
  },
  {
    path: 'salespersons',
    render: SalespersonsPage,
    layout: BASE_MANAGER_ROUTE,
  },
  {
    path: 'managers',
    render: ManagerPage,
    layout: BASE_ADMIN_ROUTE,
  },
  {
    path: 'salespersons/addnew',
    render: AddNewSalesperson,
    layout: BASE_MANAGER_ROUTE,
  },
  {
    path: 'salespersons/tracking/:id',
    render: SalespersonTracking,
    layout: BASE_MANAGER_ROUTE,
  },
  {
    path: 'salespersons/moredetails/:id',
    render: OneSalesperson,
    layout: BASE_MANAGER_ROUTE,
  },
  {
    path: 'salespersons/edit/:id',
    render: EditSalesperson,
    layout: BASE_MANAGER_ROUTE,
  },
  { path: 'salesDetails', render: SalesPage, layout: BASE_MANAGER_ROUTE },
  {
    path: 'warehouse',
    render: managerWarehousePage,
    layout: BASE_MANAGER_ROUTE,
  },
  { path: 'products', render: ProductsPage, layout: BASE_MANAGER_ROUTE },
  {
    path: 'products/addnew',
    render: AddNewProduct,
    layout: BASE_MANAGER_ROUTE,
  },
  {
    path: 'products/getOne/:id',
    render: ProductDetails,
    layout: BASE_MANAGER_ROUTE,
  },
  { path: 'category', render: CategoryPage, layout: BASE_MANAGER_ROUTE },
  { path: 'leaves', render: LeavesPage, layout: BASE_MANAGER_ROUTE },
];

export default routes;
