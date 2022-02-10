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
import { toast } from "react-toastify";

function AppointmentDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const appointmentStatus = useSelector(selector.appointmentStatus);

  const [oldReports, setOldReports] = useState([]);
  const [oldMedication, setOldMedication] = useState([]);
  const [appointment, setAppointment] = useState({});

  const fetchAppointment = async () => {
    try {
      const response = await AppointmentService.getAppointmentDetail(id);
      setAppointment(response.data.data);
      dispatch(AppointmentActions.StoreAppointementDetails(response.data.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [dispatch, id]);

  useEffect(() => {
    if (
      appointment.appointment_reports &&
      appointment.appointment_reports.length > 0
    ) {
      setOldReports(appointment.appointment_reports);
    }

    if (
      appointment.appointment_medications &&
      appointment.appointment_medications.length > 0
    ) {
      setOldMedication(appointment.appointment_medications);
    }
  }, [appointment]);

  async function savePdf() {
    //     const file = await AppointmentService.getPdf(id);
    //     const fileBlog = await file.blob();
    //     const fileURL = URL.createObjectURL(fileBlog);

    //     const link = document.createElement("a");
    //     link.href = fileURL;
    //     link.download = fileName;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    const response = await AppointmentService.getPdf(id);
    const file = await fetch(
      `${process.env.REACT_APP_API_SERVER_URL}/pdf/${response.data.data}`
    );
    const fileBlog = await file.blob();
    const fileURL = URL.createObjectURL(fileBlog);

    const link = document.createElement("a");
    link.href = fileURL;
    link.download = response.data.data;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <FullWidthContainer>
      {appointmentStatus === statusConstants.PENDING && <Loader />}
      <div className="">
        {/* Appoint ment Detail */}
        {appointment.status === "cancelled" && (
          <p className="text-center px-2 py-2 bg-red-500 text-white text-lg">
            Cancelled
          </p>
        )}
        <h2 className="hepta-bold font-32 primary-text-color mb-2">
          Appointment Details
        </h2>
        {["pending", "completed"].includes(appointment.status) && (
          <p className="text-right">
            <button
              className="calibre-regular font-18 leading-none btn-ready-visit px-3 py-3 rounded-full uppercase text-white primary-bg-color"
              onClick={savePdf}
            >
              <DownloadIcon className="h-6 inline-block align-middle" />{" "}
              Download Report
            </button>
          </p>
        )}
        <div className="">
          <DoctorDetail selectedAppointment={appointment} />

          <PatientDetail selectedAppointment={appointment} />
          {appointment.appointment_reason_id && <QuestionnaireDetail />}

          <Report
            appointmentId={id}
            oldReports={oldReports}
            setOldReports={setOldReports}
            fetchAppointment={fetchAppointment}
          />

          <Medication
            appointmentId={id}
            oldMedication={oldMedication}
            setOldMedication={setOldMedication}
            fetchAppointment={fetchAppointment}
          />

          <Detail
            selectedAppointment={appointment}
            fetchAppointment={fetchAppointment}
          />
        </div>
      </div>
    </FullWidthContainer>
  );
}

export default AppointmentDetail;
