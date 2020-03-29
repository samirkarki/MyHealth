
var jwtDecoder = require('jwt-decode'); 

export const decodedToken = () =>  {
    try {
        const token = localStorage.getItem('token');
        let decodedToken = jwtDecoder(token);
        return {
            isLoggedIn: decodedToken.sub != "" ? true: false,
            userName: decodedToken.UserName,
            email: decodedToken.email,
            firstName: decodedToken.FirstName,
            lastName: decodedToken.LastName,
            role: decodedToken.role,
            userId: decodedToken.sub
        };
    }
    catch (error) {
        throw error;
    }
}


// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = localStorage.getItem('token');
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
};