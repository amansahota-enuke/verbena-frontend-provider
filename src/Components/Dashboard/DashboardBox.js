import React from "react";
import { useSelector } from "react-redux";
import selector from "../../redux/selector";

function DashboardBox() {
    const user = useSelector(selector.user);
    const patientCount = useSelector(selector.patientCount);
    const appointmentCount = useSelector(selector.appointmentCount);

    return (
        <>
            <div className="grid xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 gap-3 mb-6">
                <div className="bg-white rounded-lg py-4 px-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="count-title hepta-semibold light-dark-gray-color text-2xl">
                                Status
                            </h4>
                            <h2
                                className={`count-total calibre-bold text-6xl ${
                                    Number(user.status) === 0
                                        ? "text-red-500"
                                        : "text-green-500"
                                }`}
                            >
                                {Number(user.status) === 0
                                    ? "Inactive"
                                    : "Active"}
                            </h2>
                        </div>
                        <div>
                            <img
                                src="/images/count-provider-vector.png"
                                alt=""
                                title=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-3 mb-6">
                <div className="bg-white rounded-lg py-4 px-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="count-title hepta-semibold light-dark-gray-color text-2xl">
                                Patients
                            </h4>
                            <h2 className="count-total calibre-bold text-6xl text-black">
                                {patientCount}
                            </h2>
                        </div>
                        <div>
                            <img
                                src="/images/count-patient-vector.png"
                                alt=""
                                title=""
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg py-4 px-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="count-title hepta-semibold light-dark-gray-color text-2xl">
                                Appointments
                            </h4>
                            <h2 className="count-total calibre-bold text-6xl text-black">
                                {appointmentCount}
                            </h2>
                        </div>
                        <div>
                            <img
                                src="/images/count-appointment-vector.png"
                                alt=""
                                title=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardBox;
