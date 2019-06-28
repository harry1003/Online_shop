import jwt from "jsonwebtoken"

const AuthHelper = {
    checkIfLogin: async () => {
        const token = localStorage.getItem('bookToken')
        //console.log(token)
        const isExpired = await AuthHelper.isTokenExpired(token)
        //console.log(isExpired)
        //console.log(!!token && !isExpired)
        return !!token && !isExpired
    },

    isTokenExpired: async (token) => {
        try {
            const decodedUser = await AuthHelper.getUserName(token)
            //console.log(decodedUser)
            //console.log(Date.now()/1000)
            if (decodedUser.exp > Date.now() / 1000) { 
                return false;
            }
            else{
                AuthHelper.logout()
                return true;
            }
            
        }
        catch (err) {
            AuthHelper.logout()
            return false;
            
        }
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