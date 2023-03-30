import { authUser } from "../utils/Auth";

export const user = {
    name: 'Arfin Foysal',
    role: authUser?authUser: 'all'
}

const routes = [
    {
        path: '/dashboard/admin',
        role: 'admin'
    },
    {
        path: '/dashboard/maneger',
        role: 'maneger'
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