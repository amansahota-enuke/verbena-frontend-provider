import React from "react";
import { FullWidthContainer } from "../..";
import Detail from "../AppointmentDetail/Detail";
import DoctorDetail from "../AppointmentDetail/DoctorDetail";
import PatientDetail from "../AppointmentDetail/PatientDetail";
import Medication from "../AppointmentDetail/Medication";
import QuestionnaireDetail from "../AppointmentDetail/QuestionnaireDetail";
import Report from "../AppointmentDetail/Report";
import statusConstants from "../../../constants/status.constants";
import Loader from "react-spinners/BarLoader";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../../redux/selector";
import { useState } from "react";
import { AppointmentActions } from "../../../redux/slice/appointment.slice";
import { useEffect } from "react";

function Index() {
    const { id: appointmentId } = useParams();
    const dispatch = useDispatch();
    const appointmentStatus = useSelector(selector.appointmentStatus);
    const selectedAppointment = useSelector(selector.selectedAppointment);

    const [oldReports, setOldReports] = useState([]);
    const [oldMedication, setOldMedication] = useState([]);

    useEffect(() => {
        dispatch(AppointmentActions.fetchAppointmentDetail(appointmentId));
    }, []);

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
                <h2 className="hepta-bold primary-text-color mb-4">
                    Appointment Details
                </h2>
                <div className="col-span-4">
                    <DoctorDetail selectedAppointment={selectedAppointment} />

                    <PatientDetail selectedAppointment={selectedAppointment} />
                    {selectedAppointment.appointment_reason_id && (
                        <QuestionnaireDetail />
                    )}

                    <Report
                        appointmentId={appointmentId}
                        oldReports={oldReports}
                        setOldReports={setOldReports}
                    />

                    <Medication
                        appointmentId={appointmentId}
                        oldMedication={oldMedication}
                        setOldMedication={setOldMedication}
                    />

                    <Detail selectedAppointment={selectedAppointment} />
                </div>
            </div>
        </FullWidthContainer>
    );
}

export default Index;
