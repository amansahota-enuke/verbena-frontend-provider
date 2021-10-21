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
                        className="block border-b-1 p-2 calibre-regular"
                        title="Verbena Home"
                        href={process.env.REACT_APP_VERBENA_HOME}
                    >
                        <span className="icon sprite-menu home"></span>
                        <span className="title uppercase">Verbena Home</span>
                    </a>

                    <Link
                        className="block border-b-1 p-2 caliber-regular"
                        to="/home/dashboard"
                        title="Patient Dashboard"
                    >
                        <span className="icon sprite-menu dashboard"></span>
                        <span className="title uppercase">Dashboard</span>
                    </Link>

                    <Link
                        className="block border-b-1 p-2 caliber-regular"
                        to="/home/appointments"
                        title="Appointments"
                    >
                        <span className="icon sprite-menu appointment"></span>
                        <span className="title uppercase">Appointments</span>
                    </Link>

                    <Link
                        className="block border-b-1 p-2 caliber-regular"
                        to="/home/patients"
                        title="Patients"
                    >
                        <span className="icon sprite-menu sp"></span>
                        <span className="title uppercase">Patients</span>
                    </Link>

                    <button
                        className="block border-b-1 p-2 caliber-regular cursor-pointer w-full"
                        title="Manage Calendar"
                        disabled={Number(user.status) === 0 ? true : false}
                        onClick={() => openAcuityWindow()}
                    >
                        <span className="icon sprite-menu mc"></span>
                        <span className="title uppercase">Manage Calendar</span>
                    </button>

                    <Link
                        className="block border-b-1 p-2 caliber-regular"
                        to="/home/profile"
                        title="Profile"
                    >
                        <span className="icon sprite-menu profile"></span>
                        <span className="title uppercase">Profile</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default LeftMenu;
