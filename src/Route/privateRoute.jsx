import {Navigate} from 'react-router-dom'
import {getPath} from './utils'
import DashboardHomePage from '../components/dashboard/views/dashboardHomePage/DashboardHomePage'
import Maneger from '../components/dashboard/Maneger'
import Worker from '../components/dashboard/Worker'
import Seller from '../components/dashboard/Seller'
import Payment from '../components/dashboard/Payment'
import AuthorList from './../components/dashboard/views/author/AuthorList';





export const privateRoute = [
    {
        path: '/dashboard',
        element: <Navigate replace to ={getPath()}/>,
        role: 'all'
    },
  
    {
        path: 'admin',
        element: <DashboardHomePage />,
        role: 'admin',

    },

    {
        path: 'author-list',
        element: <AuthorList />,
        role: 'admin'
    },
    {
        path: 'worker',
        element: <Worker />,
        role: 'worker'
    },
    {
        path: 'seller',
        element: <Seller />,
        role: 'seller'
    },
    {
        path: 'maneger',
        element: <Maneger />,
        role: 'maneger'
    },
]