import jwt from "jsonwebtoken"

const AuthHelper = {
    checkIfLogin: () => {
        const token = localStorage.getItem('bookToken')
        console.log(token)
        return !!token && !AuthHelper.isTokenExpired(token)
    },

    isTokenExpired: (token) => {
        return false;
    },

    getUserName: async (token) => {
        const decodedUser = await jwt.verify(token, 'test123')
        return decodedUser
    },
    logout: () => {
        localStorage.removeItem('bookToken');
    }
}

export default AuthHelper