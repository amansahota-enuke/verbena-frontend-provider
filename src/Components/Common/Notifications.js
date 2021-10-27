// This example requires Tailwind CSS v2.0+ /
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { TokenService } from "../../services";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import selector from "../../redux/selector";
import { BellIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { AppointmentActions } from "../../redux/slice/appointment.slice";
import { AppointmentService } from "../../services";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const history = useHistory();
  const user = useSelector(selector.user);
  const notificationsList = useSelector(selector.chatNotifications);
  const [notifications, showNotifications] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AppointmentActions.getNotifications());
  }, []);

  useEffect(() => {
    showNotifications(notificationsList);
  }, [notificationsList]);

  return (
    <Menu as="div" className="relative inline-block">
      {({ open }) => (
        <>
            <Menu.Button className="calibre-regular">
              {/* <svg class="w-10 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg> */}
              <i className="font-24 far fa-bell mr-4"></i>
              <span className="notify-count h-5 w-5 rounded-full primary-bg-color text-white font-12 absolute -top-2 left-3 leading-5">2</span>
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
              {notifications.map((i) => {
                return (
                  <div className="">
                    <Menu.Item >
                      {({ active }) => (
                        <Link
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 calibre-regular border-b"
                              : "text-gray-700 calibre-regular border-b relative",
                            "block px-4 py-4 text-sm font-16"
                          )}
                        >
                          <span className="overflow-ellipsis overflow-hidden truncate inline-block max-w-120 align-middle">{i.user_message.text}</span>
                          <a href="#" className="absolute right-4 font-12"><span><i className="fas fa-times"></i></span></a>
                          <a href="#" className="absolute right-8 font-12"><span>Mark As Read</span></a>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                )
              })}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
