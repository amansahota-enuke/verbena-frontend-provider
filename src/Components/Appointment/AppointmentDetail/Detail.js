import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { AppointmentActions } from "../../../redux/slice/appointment.slice";
import { AppointmentService } from "../../../services";

function Detail({ selectedAppointment }) {
    const dispatch = useDispatch();
    const [complaint, setComplaint] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [assesmentPlans, setAssesmentPlans] = useState("");

    useEffect(() => {
        if (selectedAppointment && selectedAppointment.appointment_detail) {
            setComplaint(
                selectedAppointment.appointment_detail.provider_complaint
            );
            setDiagnosis(
                selectedAppointment.appointment_detail.provider_diagnosis
            );
            setAssesmentPlans(
                selectedAppointment.appointment_detail.provider_assesment_plans
            );
        }
    }, [selectedAppointment]);

    const saveDetail = async () => {
        try {
            let requestBody = {
                provider_complaint: complaint,
                provider_diagnosis: diagnosis,
                provider_assesment_plans: assesmentPlans,
            };

            await AppointmentService.saveAppointmentDetail(
                selectedAppointment.id,
                requestBody
            );

            toast.success("Details saved successfully");
            dispatch(
                AppointmentActions.fetchAppointmentDetail(
                    selectedAppointment.id
                )
            );
        } catch (error) {
            toast.error("Error Saving Details");
        }
    };

    return (
        <>
            <h4 className="hepta-slab mb-4">Complaint</h4>
            <div className="bg-white rounded-md mb p-6 mb-6">
                <textarea
                    disabled
                    className="disabled:opacity-50 w-full p-4 border rounded-md"
                    placeholder="Patient's complaint"
                    value={
                        selectedAppointment.appointment_detail &&
                        selectedAppointment.appointment_detail.patient_complaint
                    }
                ></textarea>
                <textarea
                    className="w-full p-4 border rounded-md"
                    placeholder="Type Here"
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                ></textarea>
            </div>
            <h4 className="hepta-slab mb-4">Diagnosis</h4>
            <div className="bg-white rounded-md mb p-6 mb-6">
                <textarea
                    className="w-full p-4 border rounded-md"
                    placeholder="Type Here"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                ></textarea>
            </div>
            <h4 className="hepta-slab mb-4">Assessment and Plan</h4>
            <div className="bg-white rounded-md mb p-6 mb-6">
                <textarea
                    className="w-full p-4 border rounded-md"
                    placeholder="Type Here"
                    value={assesmentPlans}
                    onChange={(e) => setAssesmentPlans(e.target.value)}
                ></textarea>
            </div>
            <button
                className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                onClick={() => saveDetail()}
            >
                save
            </button>
        </>
    );
}

export default Detail;
