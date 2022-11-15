// This example requires Tailwind CSS v2.0+ /
import { Fragment, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import selector from "../../redux/selector";
import { useDispatch } from "react-redux";
import { ChatActions } from "../../redux/slice/chat.slice";
import io from "socket.io-client";
import { ChatService } from "../../services";
import { useState } from "react";

const socket = io.connect(`${process.env.REACT_APP_SOCKET_SERVER}`, {
  transports: ["websocket"],
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selector.user);
  const sendMessage = useSelector(selector.emitMessages);
  const [notificationsList, setNotificationList] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      // socket.emit("deleteUser", { roomname: `provider${user.id}` });
      console.log("INTO PROVIDER JOINING ROOM");

      socket.emit("joinRoom", { roomname: `provider${user.id}` });
    }
  }, [user]);

  useEffect(() => {
    const fetchNotification = async () => {
      const response = await ChatService.getNotifications();
      setNotificationList(response.data.data.messages);
      setNotificationCount(response.data.data.unseenMessagesCount);
    };
    fetchNotification();
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      if (data.message.created_by === "patient") {
        setNotificationList((prev) => [data.notification, ...prev]);
        setNotificationCount((prev) => prev + 1);
      }
      dispatch(ChatActions.ReceiveMessage(data));
    });

    // return () => {
    //   socket.off("disconnect");
    // };
  }, [socket]);

  useEffect(() => {
    if (Object.keys(sendMessage).length > 0) {
      socket.emit("chat", sendMessage);
    }
  }, [sendMessage]);

  const updateNotification = async (notification, type) => {
    const actionResult = await dispatch(
      ChatActions.updateNotification({
        id: notification.id,
        body: {
          type,
        },
      })
    );
    if (!actionResult.hasOwnProperty("error")) {
      dispatch(ChatActions.getNotifications());
    }
  };

  return (
    <Menu
      as="div"
      className="relative inline-block xl:mr-4 lg:mr-4 md:mr-4 sm:mr-0 mr-0 xl:mt-3 lg:mt-3 md:mt-0 sm:mt-0 mt-0"
    >
      {({ open }) => (
        <>
          <Menu.Button className="calibre-regular relative xl:mr-4 lg:mr-4 md:mr-4 sm:mr-0 mr-0">
            <i className="font-20 far fa-bell"></i>
            {Number(notificationCount) !== 0 && (
              <span className="notify-count h-5 w-5 rounded-full primary-bg-color text-white font-12 absolute -top-2 leading-5">
                {notificationCount}
              </span>
            )}
          </Menu.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="notification-wrapper origin-top-right absolute right-0 w-72 rounded-md shadow-lg bg-white"
            >
              {notificationsList.map((notification, index) => (
                <div key={index} className="">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={
                          !location.pathname.includes("video")
                            ? `/home/appointments/${notification.user_message.appointment_id}?chat=open`
                            : ""
                        }
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900 calibre-regular border-b"
                            : "text-gray-700 calibre-regular border-b relative",
                          `block px-4 py-4 text-sm font-16 ${
                            !notification.seen && "unread"
                          }`
                        )}
                      >
                        <div className="inline-flex">
                          <div className="chat-user-img mr-3 bg-cover">
                            <img
                              src={
                                notification.user_message.patient
                                  .profile_image_path
                                  ? process.env.REACT_APP_API_SERVER_URL +
                                    notification.user_message.patient
                                      .profile_image_path
                                  : "https://res.cloudinary.com/dx94hnzfl/image/upload/v1612593409/Ellipse_1_2_uziel2.png"
                              }
                            />
                          </div>
                          <div className="chat-user-content">
                            <h4 className="font-14">
                              {notification.user_message.patient.first_name +
                                " " +
                                notification.user_message.patient
                                  .last_name}{" "}
                            </h4>
                            <span className="overflow-ellipsis overflow-hidden truncate inline-block max-w-120 align-middle">
                              {notification.user_message.text}
                            </span>
                          </div>
                        </div>
                        {!notification.seen && (
                          <button
                            className="absolute right-8 font-12"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              updateNotification(notification, "seen");
                            }}
                          >
                            <span>Mark As Read</span>
                          </button>
                        )}
                        <button
                          className="absolute right-4 font-12"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateNotification(notification, "removed");
                          }}
                        >
                          <span>
                            <i className="fas fa-times"></i>
                          </span>
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
