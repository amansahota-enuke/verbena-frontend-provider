import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../../../redux/slice/chat.slice";
import { ChatService } from "../../../services";
import selector from "../../../redux/selector";
import { useParams } from "react-router";
import { ButtonLoader } from "../..";

const ChatBox = ({ chatBoxOpen, selectedAppointment }) => {
    const { id } = useParams();
    const messages = useSelector(selector.messages);
    const user = useSelector(selector.user);
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        let messageInterval = null;
        if (id && Number(id)) {
            messageInterval = setInterval(() => {
                dispatch(ChatActions.getMessages(id));
            }, 1000);
        }

        return () => {
            clearInterval(messageInterval);
        };
    }, [id]);

    useEffect(() => {
        if (messages.length !== messageList.length) {
            setMessageList(messages);
        }
    }, [messages]);

    const sendData = async () => {
        if (message !== "") {
            const requestBody = {
                id: id,
                body: {
                    text: message,
                    created_by: "provider",
                },
            };
            console.log("reqbody",requestBody)
            await ChatService.sendMessage(requestBody);
            setMessage("");
        }
    };

    const messagesEndRef = useRef();
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView();
    };

    useEffect(scrollToBottom, [messageList]);

    return (
        <div>
            <div className={`chat-container ${!chatBoxOpen && "closed"}`}>
                <div className="chat-container-body">
                <div className="chat-header">
                        <p>
                        Patient/Provider chat box is active for 48 hours.
                        </p>
                        </div>
                    {messageList.map((msg, index) => {
                        if (msg.created_by === "provider") {
                            return (
                                <div
                                    key={index}
                                    className="msg-container to-msg-container"
                                >
                                    <img
                                        src={
                                            user.profile_logo
                                                ? process.env
                                                      .REACT_APP_API_SERVER_URL +
                                                  user.profile_logo
                                                : "https://res.cloudinary.com/dx94hnzfl/image/upload/v1612594885/Avatar_jarzmi.png"
                                        }
                                        className="from-msg-profile-pic"
                                    />
                                    <div className="msg-text-container from-msg-text-container">
                                        <p className="msg-text from-msg-text">
                                            {msg.text}
                                        </p>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={index} className="msg-container">
                                    <img
                                        src={
                                            selectedAppointment.patient &&
                                            selectedAppointment.patient
                                                .profile_image_path
                                                ? process.env
                                                      .REACT_APP_API_SERVER_URL +
                                                  selectedAppointment.patient
                                                      .profile_image_path
                                                : "https://res.cloudinary.com/dx94hnzfl/image/upload/v1612593409/Ellipse_1_2_uziel2.png"
                                        }
                                        className="to-msg-profile-pic"
                                    />
                                    <div className="msg-text-container to-msg-text-container">
                                        <p className="msg-text to-msg-text">
                                            {msg.text}
                                        </p>
                                    </div>
                                </div>
                            );
                        }
                    })}
                    <div ref={messagesEndRef} />
                </div>

                <div className="sc-user-input">
                    <textarea
                        className="border"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                sendData();
                            }
                        }}
                    ></textarea>
                    <button
                        className="px-6 calibre-regular primary-bg-color text-white font-16"
                        onClick={sendData}
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ChatBox;
