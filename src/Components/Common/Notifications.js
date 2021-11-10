// This example requires Tailwind CSS v2.0+ /
import { Fragment, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import selector from "../../redux/selector";
import { useDispatch } from "react-redux";
import { ChatActions } from "../../redux/slice/chat.slice";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    const location = useLocation();
    const dispatch = useDispatch();
    const notificationCount = useSelector(selector.notificationCount);
    const notifications = useSelector(selector.notifications);

    useEffect(() => {
        setInterval(() => {
            dispatch(ChatActions.getNotifications());
        }, 5000);
    }, []);

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
        <Menu as="div" className="relative inline-block mr-4 mt-3">
            {({ open }) => (
                <>
                    <Menu.Button className="calibre-regular relative mr-4">
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
                            {notifications.map((notification, index) => (
                                <div key={index} className="">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to={
                                                    !location.pathname.includes(
                                                        "video"
                                                    )
                                                        ? `/home/appointments/${notification.user_message.appointment_id}?chat=open`
                                                        : ""
                                                }
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900 calibre-regular border-b"
                                                        : "text-gray-700 calibre-regular border-b relative",
                                                    `block px-4 py-4 text-sm font-16 ${
                                                        !notification.seen &&
                                                        "unread"
                                                    }`
                                                )}
                                            >
                                                <span className="overflow-ellipsis overflow-hidden truncate inline-block max-w-120 align-middle">
                                                    {
                                                        notification
                                                            .user_message.text
                                                    }
                                                </span>
                                                {!notification.seen && (
                                                    <button
                                                        className="absolute right-8 font-12"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            updateNotification(
                                                                notification,
                                                                "seen"
                                                            );
                                                        }}
                                                    >
                                                        <span>
                                                            Mark As Read
                                                        </span>
                                                    </button>
                                                )}
                                                <button
                                                    className="absolute right-4 font-12"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        updateNotification(
                                                            notification,
                                                            "removed"
                                                        );
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
