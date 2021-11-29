import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useSelector } from "react-redux";
import selector from "../../redux/selector";

const LeftMenu = ({ show }) => {
    const user = useSelector(selector.user);

    useEffect(() => {
        $("a.multi-level").on("click", function (e) {
            $(".multi-level-menu").toggleClass("show");
            e.stopPropagation();
        });

        $("a.multi-level").on("click", function (e) {
            $(".arrow").toggleClass("rotate");
            e.stopPropagation();
        });
    }, []);

    const openAcuityWindow = () => {
        const popupObj = window.open(
            "https://secure.acuityscheduling.com/login.php",
            "_blank",
            "toolbar=0,location=0,menubar=0,width=400,height=300"
        );
        popupObj.focus();
    };

    return (
        <>
            <div
                className={`left-menu fixed left-0 h-screen p10 top-0 bg-white ${
                    show ? "expanded" : ""
                }`}
            >
                <div>
                    <a
                        className="block border-b-1 pl-4 pt-3 pb-3 calibre-regular"
                        title="Verbena Home"
                        href={process.env.REACT_APP_VERBENA_HOME}
                    >
                        <span className="icon sprite-menu home"></span>
                        <span className="title captilaize font-18 pl-3">Verbena Home</span>
                    </a>

                    <Link
                        className="block border-b-1 pl-4 pt-3 pb-3 calibre-regular"
                        to="/home/dashboard"
                        title="Patient Dashboard"
                    >
                        <span className="icon sprite-menu dashboard"></span>
                        <span className="title captilaize font-18 pl-3">Dashboard</span>
                    </Link>

                    <Link
                        className="block border-b-1 pl-4 pt-3 pb-3 calibre-regular"
                        to="/home/appointments"
                        title="Appointments"
                    >
                        <span className="icon sprite-menu appointment"></span>
                        <span className="title captilaize font-18 pl-3">Appointments</span>
                    </Link>

                    <Link
                        className="block border-b-1 pl-4 pt-3 pb-3 calibre-regular"
                        to="/home/patients"
                        title="Patients"
                    >
                        <span className="icon sprite-menu sp"></span>
                        <span className="title captilaize font-18 pl-3">Patients</span>
                    </Link>

                    <button
                        className="block border-b-1 pl-4 pt-3 pb-3 calibre-regular cursor-pointer w-full"
                        title="Manage Calendar"
                        disabled={Number(user.status) === 0 ? true : false}
                        onClick={() => openAcuityWindow()}
                    >
                        <span className="icon sprite-menu mc"></span>
                        <span className="title captilaize font-18 pl-3">Manage Calendar</span>
                    </button>

                    <Link
                        className="block border-b-1 pl-4 pt-3 pb-3 calibre-regular"
                        to="/home/profile"
                        title="Profile"
                    >
                        <span className="icon sprite-menu profile"></span>
                        <span className="title captilaize font-18 pl-3">Profile</span>
                    </Link>

                    {/* <Link
                        className="block border-b-1 pl-4 pr-4 pt-3 pb-3 caliber-regular"
                        to="/home/subscription"
                        title="Profile"
                    >
                        <span class="fa fa-rocket" ></span>
                        <span className="title capitalize font-18 pl-3">Subscription</span>
                    </Link> */}
                </div>
            </div>
        </>
    );
};

export default LeftMenu;
