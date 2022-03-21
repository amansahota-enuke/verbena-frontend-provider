import React from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";
import Notifications from "./Notifications";

const Header = ({ handleToggle }) => {
  return (
    <>
      <div className="bg-white fixed top-0 w-full z-10 header-shadow">
        <div className="container mx-auto xl:px-4 lg:px-4 md-px-2 sm:px-2 px-2">
          <div className="flex justify-between items-center xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap py-4 md:space-x-10">
            <div className="xl:flex-grow-0 lg:flex-grow-0 md:flex-grow sm:flex-grow flex-grow">
              <div className="flex items-center xl:justify-start lg:justify-start md:justify-start sm:justify-between justify-between">
                <NavLink to="/home">
                  <span className="sr-only">Verbena</span>
                  <img
                    className="xl:w-40 lg:w-40 md:w-40 sm:w-32 w-32"
                    src="/images/logo.png"
                    alt=""
                  />
                </NavLink>
                {/* <div className="xl:hidden lg:hidden md:hidden sm:block block">
                                    <Notifications />
                                </div> */}
                <span
                  className="toggle-menu ml-8 md:mr-4 sm:mr-4 mr-4 cursor-pointer"
                  onClick={() => {
                    handleToggle();
                  }}
                >
                  <img
                    className="xl:w-8 lg:w-8 md:w08 sm:w-6 w-6"
                    src="/images/bars.png"
                    alt=""
                    title=""
                  />
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="xl:block lg:block md:block sm:hidden hidden">
                <Notifications />
              </div>
              <div>
                <Dropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

<script>$(document).ready(function (){console.log("working")})</script>;
