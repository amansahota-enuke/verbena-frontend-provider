import React from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";

const Header = ({ handleToggle }) => {
    return (
        <>
            <div className="bg-white fixed top-0 w-full z-10">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center py-4 md:space-x-10">
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
                                onClick={(e) => {
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

                        <Dropdown />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;

<script>$(document).ready(function (){console.log("working")})</script>;
