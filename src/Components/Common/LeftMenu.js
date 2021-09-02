import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

const LeftMenu = ({ show }) => {
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

                    <Link
                        className="block border-b-1 p-2 caliber-regular"
                        to="/home/calendar"
                        title="Manage Calendar"
                    >
                        <span className="icon sprite-menu bh"></span>
                        <span className="title uppercase">Manage Calendar</span>
                    </Link>
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
