import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { AppointmentActions } from "../../../redux/slice/appointment.slice";
import { AppointmentService } from "../../../services";

function Report({ appointmentId, oldReports, setOldReports }) {
    const dispatch = useDispatch();
    const [reports, setReports] = useState([]);

    const addReport = () => {
        setReports([...reports, { name: "" }]);
    };

    const removeReport = (index, type) => {
        if (type === "old") {
            let fileArr = [...oldReports];
            fileArr.splice(index, 1);
            setOldReports(fileArr);
        } else {
            let fileArr = [...reports];
            fileArr.splice(index, 1);
            setReports(fileArr);
        }
    };

    const handleFileUpload = (e, index) => {
        let fileArr = [...reports];
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onloadend = function (e) {
            fileArr.splice(index, 1, file);
            setReports(fileArr);
        };

        reader.readAsDataURL(file);
    };

    const saveReport = async () => {
        try {
            const formData = new FormData();

            formData.append("reports", JSON.stringify(oldReports));

            if (reports.length > 0) {
                reports.forEach((report) => {
                    formData.append("newReports", report);
                });
            }

            await AppointmentService.saveAppointmentReport(
                appointmentId,
                formData
            );

            toast.success("Reports saved successfully");
            dispatch(AppointmentActions.fetchAppointmentDetail(appointmentId));
            setReports([]);
        } catch (error) {
            toast.error("Error Saving Reports");
        }
    };

    return (
        <>
            <h4 className="hepta-slab mb-4">Lab Test</h4>
            <button
                className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                onClick={() => addReport()}
            >
                +
            </button>
            <div className="bg-white rounded-md mb-6">
                <div className="content">
                    {oldReports.map((report, index) => (
                        <div key={index} className="p-3 border-b-1 mb-3">
                            <div className="flex justify-between items-center">
                                <div className="">
                                    {report.name && (
                                        <h2 className="font-16 m-0 calibre-regular">
                                            <i className="fas fa-file mr-3"></i>
                                            {report.name}
                                        </h2>
                                    )}
                                </div>
                                <div className="relative">
                                    <a
                                        className="btn-reschedule px-3 py-2 rounded-full uppercase text-white primary-dim-bg-color mr-3"
                                        href={
                                            process.env
                                                .REACT_APP_API_SERVER_URL +
                                            report.name
                                        }
                                        download={report.name}
                                    >
                                        Download Report
                                    </a>
                                </div>
                                <div className="relative">
                                    <button
                                        className="btn-create-account calibre-bold font-18 uppercase primary-text-color mr-3"
                                        onClick={() =>
                                            removeReport(index, "old")
                                        }
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {reports.map((report, index) => (
                        <div key={index} className="p-3 border-b-1 mb-3">
                            <div className="flex justify-between items-center">
                                <div className="">
                                    {report.name && (
                                        <h2 className="font-16 m-0 calibre-regular">
                                            <i className="fas fa-file mr-3"></i>
                                            {report.name}
                                        </h2>
                                    )}
                                </div>
                                <div>
                                    <div className="upload-image-input">
                                        <input
                                            type="file"
                                            id={`profile-image-${index}`}
                                            onChange={(e) =>
                                                handleFileUpload(e, index)
                                            }
                                        />
                                        <label
                                            htmlFor={`profile-image-${index}`}
                                        >
                                            Upload
                                        </label>
                                    </div>
                                </div>
                                <button
                                    className="btn-create-account calibre-bold font-18 uppercase primary-text-color mr-3"
                                    onClick={() => removeReport(index)}
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    ))}
                    {reports.length + oldReports.length > 0 && (
                        <div className="justify-center">
                            <button
                                className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                                onClick={() => saveReport()}
                            >
                                save
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Report;
