import React, { useEffect, useState } from "react";
import { FullWidthContainer, Pagination } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import selector from "../../../redux/selector";
import ReactDatePicker from "react-datepicker";
import ReactPaginate from "react-paginate";
import { PatientActions } from "../../../redux/slice/patient.slice";
import statusConstants from "../../../constants/status.constants";
import ButtonLoader from "../../Common/ButtonLoader";
import moment from "moment";

function PatientList() {
    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const patientStatus = useSelector(selector.patientStatus);
    const patientCount = useSelector(selector.patientCount);
    const patientList = useSelector(selector.patientList);

    const [pageCount, setPageCount] = useState(1);
    const [patientId, setPatientId] = useState("");
    const [patientName, setPatientName] = useState("");
    const [patientNumber, setPatientNumber] = useState("");
    const [patientEmail, setPatientEmail] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const getPatientList = (page = null) => {
        dispatch(
            PatientActions.fetchPatientList({
                ...(page && { page }),
                ...(patientId && { patient_id: patientId }),
                ...(patientName && { patient_name: patientName }),
                ...(patientNumber && { patient_number: patientNumber }),
                ...(patientEmail && { patient_email: patientEmail }),
                ...(startDate && { start_date: startDate }),
                ...(endDate && { end_date: endDate }),
            })
        );
    };

    useEffect(() => {
        setPageCount(Math.ceil(Number(patientCount) / 10));
    }, [patientCount]);

    const handlePageChange = ({ selected }) => {
        getPatientList(selected);
    };

    useEffect(() => {
        getPatientList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const parseName = (name) => {
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    };

    const resetSearch = () => {
        setPatientId("");
        setPatientName("");
        setPatientNumber("");
        setPatientEmail("");
        setStartDate("");
        setEndDate("");
        getPatientList();
    };

    return (
        <FullWidthContainer>
            <div className="bg-white rounded-md mb-6">
                <div className="border-b-1 p-4 wrapper-title">
                    <h3 className="mb-0 hepta-slab text-lg leading-none">
                        Search Patients
                    </h3>
                </div>
                <div className="p-4 wrapper-content">
                    <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Patient Name"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        getPatientList();
                                    }
                                }}
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
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        getPatientList();
                                    }
                                }}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Patient Email"
                                nvalue={patientEmail}
                                onChange={(e) =>
                                    setPatientEmail(e.target.value)
                                }
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        getPatientList();
                                    }
                                }}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Patient ID"
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        getPatientList();
                                    }
                                }}
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
                                placeholderText="Start Date"
                            />
                        </div>
                        <div className="relative">
                            <div className="flex">
                                <button
                                    type="button"
                                    className="btn-search calibre-regular font-16 uppercase primary-bg-color text-white mr-3"
                                    onClick={() => getPatientList()}
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
                                        ID
                                    </th>
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
                                        Gender
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
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider"
                                    >
                                        Date of Birth
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
                                {patientStatus === statusConstants.PENDING ? (
                                    <ButtonLoader color="#000" />
                                ) : patientList.length === 0 ? (
                                    <p>No Patients</p>
                                ) : (
                                    patientList.map((patient) => (
                                        <tr key={patient.id}>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {patient.id}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {`${parseName(
                                                    patient.first_name
                                                )} ${parseName(
                                                    patient.last_name
                                                )}`}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {patient.gender === "M"
                                                    ? "Male"
                                                    : "Female"}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {patient.mobile_number}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {patient.email}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                {moment(patient.dob).format(
                                                    "MM-DD-YYYY"
                                                )}
                                            </td>
                                            <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                                <Link
                                                    to={`${path}/${patient.id}`}
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
            {patientCount > 0 && (
                <Pagination
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                />
            )}
        </FullWidthContainer>
    );
}

export default PatientList;
