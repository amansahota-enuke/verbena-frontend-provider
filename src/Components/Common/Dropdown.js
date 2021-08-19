/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { TokenService } from "../../services";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../redux/selector";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";
import confirmationConstants from "../../constants/confirmation.constants";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        TokenService.deleteToken();
        history.push("/login");
    };

    const user = useSelector(selector.user);
    const [profileImage, setProfileImage] = useState(
        process.env.REACT_APP_API_SERVER_URL + user.profile_image_path || ""
    );

    useEffect(() => {
        if (user.profile_image_path) {
            setProfileImage(
                process.env.REACT_APP_API_SERVER_URL + user.profile_image_path
            );
        }
    }, [user]);

    const parseName = (name) => {
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    };

    const openConfirmation = () => {
        dispatch(ConfirmationActions.setConfirmationType(confirmationConstants.START_APPOINTMENT));
        dispatch(ConfirmationActions.openConfirmation());
    };

    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <div>
                        <Menu.Button className="inline-flex justify-center items-center">
                            <img
                                src={
                                    profileImage
                                        ? profileImage
                                        : "/images/user.png"
                                }
                                className="mr-2 w-10"
                                alt=""
                                title=""
                            />
                            {!!user.first_name && parseName(user.first_name)}{" "}
                            {!!user.last_name && parseName(user.last_name)}
                        </Menu.Button>
                    </div>

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
                            className="origin-top-right absolute right-0 w-24 rounded-md shadow-lg bg-white"
                        >
                            <div className="">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            to="/home/profile"
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                            )}
                                        >
                                            Profile
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={openConfirmation}
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                            )}
                                        >
                                            Open Modal
                                        </button>
                                    )}
                                </Menu.Item>
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                type="submit"
                                                className={classNames(
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700",
                                                    "block w-full text-left px-4 py-2 text-sm"
                                                )}
                                            >
                                                Sign out
                                            </button>
                                        )}
                                    </Menu.Item>
                                </form>
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
}
