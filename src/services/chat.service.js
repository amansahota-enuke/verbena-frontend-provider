import { ApiService } from "./index";

const ChatService = {
    getMessages:(id)=>ApiService.get(`/chat/get-messages/${id}`),
    sendMessage: ({id,body}) =>
        ApiService.post(`/chat/add-message/${id}`, body),
    getNotifications:()=>ApiService.get(`/chat/notfication`),
    updateNotification:({id,body})=>ApiService.put(`/chat/notification-status/${id}`, body),
};

export default ChatService;
