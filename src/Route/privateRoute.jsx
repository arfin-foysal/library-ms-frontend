import {Navigate} from 'react-router-dom'
import {getPath} from './utils'
import DashboardHomePage from '../components/dashboard/views/dashboardHomePage/DashboardHomePage'
import Maneger from '../components/dashboard/Maneger'
import Worker from '../components/dashboard/Worker'
import Seller from '../components/dashboard/Seller'
import AuthorList from './../components/dashboard/views/Mastersettings/author/AuthorList';
import CategoryList from './../components/dashboard/views/Mastersettings/category/CategoryList';
import SubCategoryList from './../components/dashboard/views/Mastersettings/subCategory/SubCategoryList';
import ThirdSubCategoryList from '../components/dashboard/views/Mastersettings/thirdSubCategory/ThirdSubCategoryList'
import LanguageList from '../components/dashboard/views/Mastersettings/language/LanguageList'
import CounteryList from '../components/dashboard/views/Mastersettings/country/CountryList'
import PublisherList from '../components/dashboard/views/Mastersettings/publisher/PublisherList'







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
        path: 'category-list',
        element: <CategoryList/>,
        role: 'admin'
    },
    {
        path: 'sub-category-list',
        element: <SubCategoryList/>,
        role: 'admin'
    },
    {
        path: 'third-sub-category-list',
        element: <ThirdSubCategoryList/>,
        role: 'admin'
    },
    {
        path: 'language-list',
        element: <LanguageList/>,
        role: 'admin'
    },
    {
        path: 'country-list',
        element: <CounteryList/>,
        role: 'admin'
    },
    {
        path: 'publisher-list',
        element: <PublisherList/>,
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