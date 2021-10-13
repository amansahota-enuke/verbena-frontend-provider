import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ButtonLoader } from "..";
import statusConstants from "../../constants/status.constants";
import selector from "../../redux/selector";

function AppointmentTable() {
    const appointmentStatus = useSelector(selector.appointmentStatus);
    const appointmentList = useSelector(selector.appointmentList);

    const parseName = (name) => {
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    };

    return (
        <>
            <h4 className="hepta-slab mb-4">Appointments</h4>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 calibre-regular thead-bg">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                        >
                                            Patient's Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                        >
                                            Patient's Mobile Number
                                        </th>
                                        <th
                                            scope="col"
                                            className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                        >
                                            Patient's Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                        >
                                            Appointment ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                        >
                                            Appointment Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                        >
                                            Provider's Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                        >
                                            Provider's Mobile Number
                                        </th>
                                        <th
                                            scope="col"
                                            className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                        >
                                            Provider's Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {appointmentStatus ===
                                    statusConstants.PENDING ? (
                                        <ButtonLoader color="#000" />
                                    ) : appointmentList.length === 0 ? (
                                        <p>No Appointments</p>
                                    ) : (
                                        appointmentList.map((appointment) => (
                                            <tr key={appointment.id}>
                                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                    {`${parseName(
                                                        appointment.patient
                                                            .first_name
                                                    )} ${parseName(
                                                        appointment.patient
                                                            .last_name
                                                    )}`}
                                                </td>
                                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                    {
                                                        appointment.patient
                                                            .mobile_number
                                                    }
                                                </td>
                                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                    {appointment.patient.email}
                                                </td>
                                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                    {appointment.id}
                                                </td>
                                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                    {moment(
                                                        appointment.appointment_datetime
                                                    ).format(
                                                        "MM-DD-YYYY | hh:mm A"
                                                    )}
                                                </td>
                                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                    {`${parseName(
                                                        appointment.provider
                                                            .first_name
                                                    )} ${parseName(
                                                        appointment.provider
                                                            .last_name
                                                    )}`}
                                                </td>
                                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                    {
                                                        appointment.provider
                                                            .mobile_number
                                                    }
                                                </td>
                                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                    {appointment.provider.email}
                                                </td>
                                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                    <Link
                                                        to={`/home/appointments/${appointment.id}`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        <i className="fas fa-eye"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AppointmentTable;
