import React from "react";
import { FullWidthContainer } from "../..";

function AppointmentList() {
    return (
        <FullWidthContainer>
            <div className="bg-white rounded-md mb-6">
                <div className="border-b-1 p-4 wrapper-title">
                    <h3 className="mb-0 hepta-slab text-lg leading-none">
                        Upcoming Appointments
                    </h3>
                </div>
                <div className="p-4 wrapper-content">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Appointment ID"
                                name=""
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Patient Name"
                                name=""
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Patient Mobile"
                                name=""
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Patient Email"
                                name=""
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="Start Date"
                                name=""
                            />
                            <i className="fa fa-calendar light-gray-color absolute input-icon calendar"></i>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="custom-input input-border-color border text-justify"
                                placeholder="End Date"
                                name=""
                            />
                            <i className="fa fa-calendar light-gray-color absolute input-icon calendar"></i>
                        </div>
                        <div className="relative">
                            <div className="flex">
                                <button
                                    type="button"
                                    className="btn-search calibre-bold font-18 uppercase primary-bg-color text-white mr-3"
                                >
                                    Search
                                </button>
                                <button
                                    type="button"
                                    className="btn-reset calibre-bold font-18 uppercase primary-light-bg-color primary-text-color mr-3"
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
                            <tr>
                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                    Joe Smith
                                </td>
                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                    9878325064
                                </td>
                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                    64921
                                </td>
                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                    joesmith@gmail.com
                                </td>
                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                    Pimlpe Treatment
                                </td>
                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                    20-8-2021 | 02:30PM
                                </td>
                                <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                    <a
                                        href="#"
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        <i className="fas fa-eye"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </FullWidthContainer>
    );
}

export default AppointmentList;
