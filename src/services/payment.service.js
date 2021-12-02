import { ApiService } from "./index";

const PaymentService = {

addSubscriptions: (body) => ApiService.post(`/payment/addSubscription`, body),
saveSubscription:(body) => ApiService.post(`/payment/save-subscription`,body),
fetchPaymentIntent:() => ApiService.get(`/payment/get-client-secret`),
saveTransaction:(body) => ApiService.post(`/payment/save-intent`,body),
getSubscriptionDetails:() => ApiService.get(`/payment/get-subscription-details`)

};

export default PaymentService;
