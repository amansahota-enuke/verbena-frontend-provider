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
    addSubscriptions: (body) => ApiService.post(`/auth/addSubscription`, body),
    saveSubscription: (body) => ApiService.post(`/auth/save-subscription`, body),
    fetchPaymentIntent: () => ApiService.get(`/auth/get-client-secret`),
    checkToken: (payload) => ApiService.post("/auth/check-token", payload),
    changePassword: (body) => ApiService.post(`/auth/change-password`, body),
    fetchQrCode: () => ApiService.get('/totp/get-secret'),
    cancel2FA: () => ApiService.put('/totp/disable-totp'),
    verifyTotp: (id, body) => ApiService.post(`/totp/verify-totp/${id}`, body),
};

export default UserService;
