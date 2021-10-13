import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FullWidthContainer } from "..";
import statusConstants from "../../constants/status.constants";
import selector from "../../redux/selector";
import { AppointmentActions } from "../../redux/slice/appointment.slice";
import { PatientActions } from "../../redux/slice/patient.slice";
import AppointmentTable from "./AppointmentTable";
import DashboardBox from "./DashboardBox";
import PatientTable from "./PatientTable";

const Dashboard = () => {
    const dispatch = useDispatch();
    const userStatus = useSelector(selector.userStatus);
    const patientStatus = useSelector(selector.patientStatus);
    const appointmentStatus = useSelector(selector.appointmentStatus);

    useEffect(() => {
        dispatch(PatientActions.fetchPatientList());
        dispatch(AppointmentActions.fetchAppointmentList());
    }, []);

    return (
        <FullWidthContainer>
            {(patientStatus || userStatus || appointmentStatus) ===
                statusConstants.PENDING}
            <DashboardBox />
            <PatientTable />
            <AppointmentTable />
        </FullWidthContainer>
    );
};

export default Dashboard;
