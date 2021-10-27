import React, { useEffect } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import Dropdown from "./Dropdown";
import Notifications from "./Notifications";
import { BellIcon } from "@heroicons/react/solid";
const Header = ({ handleToggle }) => {
    return (
        <>
            <div className="bg-white fixed top-0 w-full z-10 header-shadow">
                <div className="container mx-auto xl:px-4 lg:px-4 md-px-2 sm:px-2 px-2">
                    <div className="flex justify-between items-center py-4 md:space-x-10">
                        <div>
                        <div className="flex justify-start items-center">
                            <NavLink to="/home">
                                <span className="sr-only">Verbena</span>
                                <img
                                    className="w-40"
                                    src="/images/logo.png"
                                    alt=""
                                />
                            </NavLink>
                            <span
                                className="toggle-menu ml-8 cursor-pointer"
                                onClick={() => {
                                    handleToggle();
                                }}
                            >
                                <img
                                    className="w-8"
                                    src="/images/bars.png"
                                    alt=""
                                    title=""
                                />
                            </span>
                        </div>
                        </div>
                        <div>
                            <Notifications />
                            <Dropdown />
                        </div>    
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;

<script>$(document).ready(function (){console.log("working")})</script>;
