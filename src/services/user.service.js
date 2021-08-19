import { ApiService } from "./index";

const UserService = {
    login: (payload) => ApiService.post("/auth/login", payload),
    signUp: (payload) => ApiService.post("/auth/register", payload),
    forgotPassword: (payload) =>
        ApiService.post("/auth/forget-password", payload),
    updatePassword: (payload) =>
        ApiService.post("/auth/reset-password", payload),
    getProfile: () => ApiService.get("/profile"),
    updateProfile: (payload) => ApiService.put("/profile", payload),
};

export default UserService;
