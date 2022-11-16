import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../../../redux/slice/chat.slice";
import { ChatService } from "../../../services";
import selector from "../../../redux/selector";
import { useParams } from "react-router";

const ChatBox = ({ chatBoxOpen, selectedAppointment }) => {
  const { id, appointmentId } = useParams();
  const messages = useSelector(selector.messages);
  const user = useSelector(selector.user);
  const [messageList, setMessageList] = useState([]);
  const dispatch = useDispatch();
  const selectedId = id ? id : appointmentId;
  const message = useRef("");
  const appointment = useSelector(selector.receivemessages);

  useEffect(() => {
    // let messageInterval = null;
    // if (selectedId && Number(selectedId)) {
    //   messageInterval = setInterval(() => {
    //     dispatch(ChatActions.getMessages(selectedId));
    //   }, 1000);
    // }

    // return () => {
    //   clearInterval(messageInterval);
    // };
    if (selectedAppointment && Number(selectedAppointment.id)) {
      dispatch(ChatActions.getMessages(selectedId));
    }
  }, [selectedAppointment]);

  useEffect(() => {
    if (selectedAppointment && Number(selectedAppointment.id)) {
      if (appointment.message) {
        if (appointment.message.created_by === "provider") {
          setMessageList((prev) => [...prev, appointment.message]);
        } else if (appointment.appointmentId === selectedAppointment.id) {
          setMessageList((prev) => [...prev, appointment.message]);
        }
      }
    }
  }, [appointment]);

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  const sendData = async () => {
    if (message.current.value !== "") {
      const requestBody = {
        id: selectedAppointment.id,
        body: {
          text: message.current.value,
          created_by: "provider",
        },
      };
      await ChatService.sendMessage(requestBody);
      dispatch(
        ChatActions.EmitMessage({
          appointmentId: selectedAppointment.id,
          receiver_roomname: `patient${selectedAppointment.patient.id}`,
          sender_roomname: `provider${selectedAppointment.provider.id}`,
          notification: {
            user_message: {
              appointment_id: selectedAppointment.id,
              seen: false,
              provider: {
                ...(user.profile_logo && {
                  profile_logo: user.profile_logo,
                }),
                first_name: user.first_name,
                last_name: user.last_name,
              },
              text: requestBody.body.text,
            },
          },
          message: {
            text: message.current.value,
            created_by: "provider",
          },
        })
      );
      message.current.value = "";
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
            <p>Patient/Provider chat box is active for 48 hours.</p>
          </div>
          {messageList.map((msg, index) => {
            if (msg.created_by === "provider") {
              return (
                <div key={index} className="msg-container to-msg-container">
                  <img
                    src={
                      user.profile_logo
                        ? process.env.REACT_APP_API_SERVER_URL +
                          user.profile_logo
                        : "https://res.cloudinary.com/dx94hnzfl/image/upload/v1612594885/Avatar_jarzmi.png"
                    }
                    className="from-msg-profile-pic"
                  />
                  <div className="msg-text-container from-msg-text-container">
                    <p className="msg-text from-msg-text">{msg.text}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="msg-container">
                  <img
                    src={
                      selectedAppointment.patient &&
                      selectedAppointment.patient.profile_image_path
                        ? process.env.REACT_APP_API_SERVER_URL +
                          selectedAppointment.patient.profile_image_path
                        : "https://res.cloudinary.com/dx94hnzfl/image/upload/v1612593409/Ellipse_1_2_uziel2.png"
                    }
                    className="to-msg-profile-pic"
                  />
                  <div className="msg-text-container to-msg-text-container">
                    <p className="msg-text to-msg-text">{msg.text}</p>
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
            ref={message}
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
