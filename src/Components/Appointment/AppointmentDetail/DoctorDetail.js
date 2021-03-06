import React from "react";
import { useDispatch, useSelector } from "react-redux";

import confirmationConstants from "../../../constants/confirmation.constants";
import selector from "../../../redux/selector";
import { ConfirmationActions } from "../../../redux/slice/confirmation.slice";
import { AppointmentActions } from "../../../redux/slice/appointment.slice";
import { useParams } from "react-router-dom";
import { UserActions } from "../../../redux/slice/user.slice";
import { useEffect } from "react";
import { toast } from "react-toastify";

function DoctorDetail({ selectedAppointment }) {
  const dispatch = useDispatch();
  const { appointmentId } = useParams();

  const user = useSelector(selector.user);

  const parseName = (name) => {
    return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
  };

  const startAppointment = () => {
    const diff =
      new Date(selectedAppointment.appointment_datetime) - new Date();

    var minutes = Math.floor(diff / 1000 / 60);
    if (minutes <= 5 && minutes >= -10) {
      dispatch(
        ConfirmationActions.setConfirmationType(
          confirmationConstants.START_APPOINTMENT
        )
      );
      dispatch(ConfirmationActions.openConfirmation());
    } else {
      toast.success(
        "You may log on to your visit 5 minutes prior to your scheduled appointment."
      );
    }
  };

  const rescheduleAppointment = () => {
    dispatch(
      ConfirmationActions.setConfirmationType(
        confirmationConstants.RESCHEDULE_APPOINTMENT
      )
    );
    dispatch(ConfirmationActions.openConfirmation());
  };

  const cancelAppointment = () => {
    dispatch(
      ConfirmationActions.setConfirmationType(
        confirmationConstants.CANCEL_APPOINTMENT
      )
    );
    dispatch(ConfirmationActions.openConfirmation());
  };

  const updateAppointmentStatus = async (status) => {
    const actionResult = await dispatch(
      AppointmentActions.updateAppointmentStatus({
        id: selectedAppointment.id,
        body: {
          status,
        },
      })
    );
    if (!actionResult.hasOwnProperty("error")) {
      dispatch(
        AppointmentActions.fetchAppointmentDetail(selectedAppointment.id)
      );
    }
  };
  useEffect(() => {
    dispatch(UserActions.getProfile(appointmentId));
  }, []);

  return (
    <>
      <h4 className="hepta-slab mb-2 leading-none">Doctor Details</h4>

      <div className="bg-white rounded-md mb-10 px-4 py-4">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-nowrap">
              <div>
                <div
                  className="doctor-image primary-bg-color rounded-full mr-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-3 mb-3"
                  style={{
                    backgroundImage: `url("${
                      process.env.REACT_APP_API_SERVER_URL + user.profile_logo
                    }")`,
                  }}
                ></div>
              </div>
              <div>
                <h3 className="hepta-slab mb-2 text-xl leading-none">
                  {`Dr. ${user.first_name && parseName(user.first_name)} ${
                    user.last_name && parseName(user.last_name)
                  }`}
                </h3>
                <h6 className="text-base uppercase mb-0 light-dark-gray-color calibre-regular">
                  {user.provider_speciality_master &&
                    user.provider_speciality_master.name}
                </h6>
                <div className="provider-education calibre-regular flex items-center xl:flex-nowrap md:flex-wrap mb-0 whitespace-nowrap">
                  <div className="edu-icon mr-3">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="light-dark-gray-color capitalize font-18 mb-0 calibre-regular">
                    {user.board_certifications &&
                      JSON.parse(user.board_certifications).map(
                        (hospital, index) => {
                          let test = index + 1;
                          if (
                            JSON.parse(user.board_certifications).length ===
                            test
                          ) {
                            return hospital.value;
                          } else {
                            return `${hospital.value}, `;
                          }
                        }
                      )}
                  </div>
                </div>
                <div className="provider-address calibre-regular flex xl:flex-nowrap md:flex-wrap">
                  <div className="address-icon mr-3">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="light-dark-gray-color font-18 calibre-regular">
                    {user.address &&
                      `${user.address.address_line1}, ${
                        user.address.address_line2 + ","
                      } ${user.address.city}, ${
                        user.address.state.state_name
                      } ${user.address.zipcode}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="quick-btn quick-new1">
              <div className="flex">
                {["ongoing", "patientDone"].includes(
                  selectedAppointment.status
                ) && (
                  <>
                    <button
                      type="button"
                      className="btn-reschedule calibre-regular font-16 px-3 py-2 rounded-full uppercase text-white primary-dim-bg-color mr-3"
                      onClick={() => {
                        dispatch(
                          ConfirmationActions.setConfirmationType(
                            confirmationConstants.COMPLETE_APPOINTMENT
                          )
                        );
                        dispatch(ConfirmationActions.openConfirmation());
                      }}
                    >
                      Complete Appointment
                    </button>
                    <button
                      type="button"
                      className="btn-cancel-meet calibre-regular font-16 px-3 py-2 rounded-full uppercase primary-text-color primary-light-bg-color"
                      onClick={() => updateAppointmentStatus("noshow")}
                    >
                      No Show
                    </button>
                  </>
                )}
                {["paid", "rescheduled", "patientStart"].includes(
                  selectedAppointment.status
                ) && (
                  <>
                    <button
                      type="button"
                      className="modal-open calibre-regular font-16 leading-none btn-ready-visit px-3 py-2 rounded-full uppercase text-white primary-bg-color mr-3"
                      onClick={startAppointment}
                    >
                      Ready For Visit
                    </button>
                    <button
                      type="button"
                      className="btn-reschedule px-3 py-2 calibre-regular font-16 rounded-full uppercase text-white primary-dim-bg-color mr-3"
                      onClick={rescheduleAppointment}
                    >
                      Reschedule
                    </button>
                    <button
                      type="button"
                      className="btn-cancel-meet px-3 py-2 calibre-regular font-16 rounded-full uppercase primary-text-color primary-light-bg-color"
                      onClick={cancelAppointment}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorDetail;
