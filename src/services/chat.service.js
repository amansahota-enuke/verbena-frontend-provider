import { ApiService } from "./index";

const ChatService = {
    getMessages:(id)=>ApiService.get(`/chat/get-messages/${id}`),
    sendMessage: ({appointmentId,body}) =>
        ApiService.post(`/chat/add-message/${appointmentId}`, body),
    getNotifications:()=>ApiService.get(`/chat/notfication`),
    updateNotification:({id,body})=>ApiService.put(`/chat/notification-status/${id}`, body),
};

export default ChatService;
