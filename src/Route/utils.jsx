import { authUser, authUserToken } from "../utils/Auth";

export const user = {
    name: "Arfin Foysal",
    role: authUser ? authUser : "all",
    token: authUserToken ? authUserToken : "",
}

const routes = [
    {
        path: '/dashboard/admin',
        role: 'admin'
    },
    {
        path: '/dashboard/developer',
        role: 'developer'
    },
    {
        path: '/dashboard/seller',
        role: 'seller'
    },
    {
        path: '/dashboard/worker',
        role: 'worker'
    },
    {
        path: '/login',
        role: 'all'
    }

]

export const getPath = () => {
    const route = routes.find(r => r.role === user.role);
    return route.path
}