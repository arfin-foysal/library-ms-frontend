import {Navigate} from 'react-router-dom'
import {getPath} from './utils'
import AdminPage from '../components/dashboard/AdminPage'
import Maneger from '../components/dashboard/Maneger'
import Worker from '../components/dashboard/Worker'
import Seller from '../components/dashboard/Seller'
import Payment from '../components/dashboard/Payment'





export const privateRoute = [
    {
        path: '/dashboard',
        element: <Navigate replace to ={getPath()}/>,
        role: 'all'
    },
  
    {
        path: 'admin',
        element: <AdminPage />,
        role: 'admin',

    },

    {
        path: 'payment',
        element: <Payment />,
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