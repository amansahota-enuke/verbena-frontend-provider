import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import moment from "moment";

import { FullWidthContainer, Pagination } from "../..";
import statusConstants from "../../../constants/status.constants";
import selector from "../../../redux/selector";
import { AppointmentActions } from "../../../redux/slice/appointment.slice";
import ButtonLoader from "../../Common/ButtonLoader";

function AppointmentList() {
    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const appointmentStatus = useSelector(selector.appointmentStatus);
    const appointmentCount = useSelector(selector.appointmentCount);
    const appointmentList = useSelector(selector.appointmentList);

    const [pageCount, setPageCount] = useState(1);
    const [appointmentId, setAppointmentId] = useState("");
    const [patientName, setPatientName] = useState("");
    const [patientNumber, setPatientNumber] = useState("");
    const [patientEmail, setPatientEmail] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");

    const getAppointment = (page = null) => {
        dispatch(
            AppointmentActions.fetchAppointmentList({
                ...(page && { page }),
                ...(appointmentId && { appointment_id: appointmentId }),
                ...(patientName && { patient_name: patientName }),
                ...(patientNumber && { patient_number: patientNumber }),
                ...(patientEmail && { patient_email: patientEmail }),
                ...(startDate && { start_date: startDate }),
                ...(endDate && { end_date: endDate }),
                ...(status && { status }),
            })
        );
    };

    useEffect(() => {
        setPageCount(Math.ceil(Number(appointmentCount) / 10));
    }, [appointmentCount]);

    const handlePageChange = ({ selected }) => {
        getAppointment(selected);
    };

    useEffect(() => {
        getAppointment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const parseName = (name) => {
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    };

    const resetSearch = () => {
        setAppointmentId("");
        setPatientName("");
        setPatientNumber("");
        setPatientEmail("");
        setStartDate("");
        setEndDate("");
        setStatus("");
        getAppointment();
    };

    return (
        <FullWidthContainer>
            <div className="bg-white rounded-md mb-6">
                <div className="border-b-1 p-4 wrapper-title">
                    <h3 className="mb-0 hepta-slab text-lg leading-none">
                        Appointments
                    </h3>
                </div>
                <div className="p-4 wrapper-content">
                    <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Appointment ID"
                                value={appointmentId}
                                onChange={(e) =>
                                    setAppointmentId(e.target.value)
                                }
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Patient Name"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Patient Mobile"
                                value={patientNumber}
                                onChange={(e) =>
                                    setPatientNumber(e.target.value)
                                }
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Patient Email"
                                value={patientEmail}
                                onChange={(e) =>
                                    setPatientEmail(e.target.value)
                                }
                            />
                        </div>
                        <div className="relative">
                            <ReactDatePicker
                                className="custom-input input-border-color border text-justify"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                placeholderText="Start Date"
                            />
                        </div>
                        <div className="relative">
                            <ReactDatePicker
                                className="custom-input input-border-color border text-justify"
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                placeholderText="End Date"
                            />
                        </div>
                        <div className="relative">
                            <select
                                className="custom-input input-border-color border text-justify"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">
                                    Select Appointment Status
                                </option>
                                <option
                                    value={JSON.stringify([
                                        "paid",
                                        "rescheduled",
                                    ])}
                                >
                                    Upcoming
                                </option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="relative">
                            <div className="flex">
                                <button
                                    type="button"
                                    className="btn-search calibre-regular font-16 uppercase primary-bg-color text-white mr-3"
                                    onClick={() => getAppointment()}
                                >
                                    Search
                                </button>
                                <button
                                    type="button"
                                    className="btn-reset calibre-regular font-16 uppercase primary-light-bg-color primary-text-color mr-3"
                                    onClick={resetSearch}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 calibre-regular thead-bg">
                                <tr>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Patient Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Mobile Number
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
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Reason For Visit
                                    </th>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Appointment Time
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
                                                {appointment.id}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {appointment.patient.email}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {appointment.appointment_reason_text
                                                    ? appointment.appointment_reason_text
                                                    : appointment.appointment_reason &&
                                                      appointment
                                                          .appointment_reason
                                                          .name}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {moment(
                                                    appointment.appointment_datetime
                                                ).format(
                                                    "MM-DD-YYYY | hh:mm A"
                                                )}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                <Link
                                                    to={`${path}/${appointment.id}`}
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
            {appointmentCount > 0 && (
                <Pagination
                    pageCount={pageCount}
                    handlePageChange={handlePageChange}
                />
            )}
        </FullWidthContainer>
    );
}

export default AppointmentList;
