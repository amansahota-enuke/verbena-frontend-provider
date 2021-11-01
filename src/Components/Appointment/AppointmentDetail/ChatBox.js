import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppointmentActions } from "../../../redux/slice/appointment.slice";
import { AppointmentService } from "../../../services";
import selector from "../../../redux/selector";

const ChatBox = ({selectedAppointment}) => {
  
  const messagesList = useSelector(selector.chatMessages);
  const appointmentDetails = useSelector(selector.selectedAppointment);
  const [message, setMessage] = useState('')
  const [messages, showMessages] = useState([])
  const dispatch = useDispatch();
  let arr = []
  useEffect(() => {
    dispatch(AppointmentActions.getMessages(selectedAppointment));
    dispatch(AppointmentActions.fetchAppointmentDetail(selectedAppointment));
  }, [selectedAppointment]);

  useEffect(() => {
    showMessages(messagesList)
  }, [messagesList])

  const sendData = async () => {
    if (message !== '') {
      const requestBody = {
        id: selectedAppointment,
        body: {
          text: message,
          created_by: 'provider'
        }
      }
      await AppointmentService.sendMessage(requestBody)

      showMessages(prevArray => [...prevArray, requestBody.body])
      console.log(selectedAppointment)
      setMessage('')
    }
  }

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <div>
      <div class="chat-container closed"> 
        
          <div className="chat-container-body">
            {messages.map((i) => {
              if (i.created_by === 'provider') {
                return (
                  <div class="msg-container to-msg-container">
                    <img src="https://res.cloudinary.com/dx94hnzfl/image/upload/v1612594885/Avatar_jarzmi.png" class="from-msg-profile-pic" />
                    <div class="msg-text-container from-msg-text-container">
                      <p class='msg-text from-msg-text'>{i.text}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div class="msg-container">
                    <img src="https://res.cloudinary.com/dx94hnzfl/image/upload/v1612593409/Ellipse_1_2_uziel2.png" class="to-msg-profile-pic" />
                    <div class="msg-text-container to-msg-text-container">
                      <p class='msg-text to-msg-text'>{i.text}</p>
                    </div>
                  </div>
                )
              }
            })}
            <div ref={messagesEndRef} />
          </div>
        
        <div className="sc-user-input">
          {/* <input
          className="border"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendData();
              }
            }}
          ></input> */}
          <textarea className="border"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendData();
              }
            }}>

          </textarea>
          <button className="px-6 calibre-regular primary-bg-color text-white font-16" onClick={sendData}><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
  );
}
export default ChatBox

// import React, {Component} from 'react'
// import {Launcher} from 'react-chat-window'
 
// class ChatBox extends Component {
 
//   constructor() {
//     super();
//     this.state = {
//       messageList: []
//     };
//   }
 
//   _onMessageWasSent(message) {
//     this.setState({
//       messageList: [...this.state.messageList, message]
//     })
//   }
 
//   _sendMessage(text) {
//     if (text.length > 0) {
//       this.setState({
//         messageList: [...this.state.messageList, {
//           author: 'them',
//           type: 'text',
//           data: { text }
//         }]
//       })
//     }
//   }
 
//   render() {
//     return (<div>
//       <Launcher
//         agentProfile={{
//           teamName: 'react-chat-window',
//           imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
//         }}
//         onMessageWasSent={this._onMessageWasSent.bind(this)}
//         messageList={this.state.messageList}
//         showEmoji
//       />
//     </div>)
//   }
// }
// export default ChatBox;