const TokenService = {
    getToken: () => window.localStorage.getItem("token"),
    setToken: (token) => window.localStorage.setItem("token", token),
    deleteToken: () => window.localStorage.removeItem("token"),
};

export default TokenService;
