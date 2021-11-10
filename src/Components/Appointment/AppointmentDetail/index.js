import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DownloadIcon } from "@heroicons/react/outline";

import { FullWidthContainer } from "../..";
import statusConstants from "../../../constants/status.constants";
import selector from "../../../redux/selector";
import { AppointmentActions } from "../../../redux/slice/appointment.slice";
import Loader from "../../Common/Loader";
import DoctorDetail from "./DoctorDetail";
import PatientDetail from "./PatientDetail";
import QuestionnaireDetail from "./QuestionnaireDetail";
import Report from "./Report";
import Medication from "./Medication";
import Detail from "./Detail";
import { AppointmentService } from "../../../services";

function AppointmentDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const appointmentStatus = useSelector(selector.appointmentStatus);
    const selectedAppointment = useSelector(selector.selectedAppointment);

    const [oldReports, setOldReports] = useState([]);
    const [oldMedication, setOldMedication] = useState([]);

    useEffect(() => {
        dispatch(AppointmentActions.fetchAppointmentDetail(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (
            selectedAppointment.appointment_reports &&
            selectedAppointment.appointment_reports.length > 0
        ) {
            setOldReports(selectedAppointment.appointment_reports);
        }

        if (
            selectedAppointment.appointment_medications &&
            selectedAppointment.appointment_medications.length > 0
        ) {
            setOldMedication(selectedAppointment.appointment_medications);
        }
    }, [selectedAppointment]);

    async function savePdf() {
        const file = await AppointmentService.getPdf(id);
        const fileBlog = await file.blob();
        const fileURL = URL.createObjectURL(fileBlog);

        const link = document.createElement("a");
        link.href = fileURL;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <FullWidthContainer>
            {appointmentStatus === statusConstants.PENDING && <Loader />}
            <div className="container mx-auto px-4 sm:px-6">
                {/* Appoint ment Detail */}
                {selectedAppointment.status === "cancelled" && (
                    <p className="text-center px-2 py-2 bg-red-500 text-white text-lg">
                        Cancelled
                    </p>
                )}
                <h2 className="hepta-bold primary-text-color mb-10">
                    Appointment Details
                </h2>
                {["pending", "completed"].includes(
                    selectedAppointment.status
                ) && (
                    <p className="text-right">
                        <button
                            className="calibre-regular font-16 leading-none btn-ready-visit px-3 py-3 rounded-full uppercase text-white primary-bg-color"
                            onClick={savePdf}
                        >
                            <DownloadIcon className="h-6 inline-block align-middle" />{" "}
                            Download Report
                        </button>
                    </p>
                )}
                <div className="">
                    <DoctorDetail selectedAppointment={selectedAppointment} />

                    <PatientDetail selectedAppointment={selectedAppointment} />
                    {selectedAppointment.appointment_reason_id && (
                        <QuestionnaireDetail />
                    )}

                    <Report
                        appointmentId={id}
                        oldReports={oldReports}
                        setOldReports={setOldReports}
                    />

                    <Medication
                        appointmentId={id}
                        oldMedication={oldMedication}
                        setOldMedication={setOldMedication}
                    />

                    <Detail selectedAppointment={selectedAppointment} />
                </div>
            </div>
        </FullWidthContainer>
    );
}

export default AppointmentDetail;
