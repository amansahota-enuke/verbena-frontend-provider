import { ApiService } from "./index";

const PaymentService = {

addSubscriptions: (body) => ApiService.post(`/payment/addSubscription`, body),
saveSubscription:(body) => ApiService.post(`/payment/save-subscription`,body),
};

export default PaymentService;
