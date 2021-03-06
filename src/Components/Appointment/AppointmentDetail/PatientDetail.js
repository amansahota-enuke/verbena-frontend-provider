import React from "react";
import moment from "moment";

function PatientDetail({ selectedAppointment }) {
  const parseName = (name) => {
    return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <>
      <h4 className="hepta-slab mb-2 leading-none">Patient Details</h4>
      <div className="bg-white rounded-md mb-10 px-4 py-4">
        <div className="flex flex-wrap justify-between">
          <div>
            <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-nowrap">
              <div>
                <div
                  className="doctor-image primary-bg-color rounded-full mr-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-3 mb-3"
                  style={{
                    backgroundImage:
                      selectedAppointment.patient &&
                      `url("${
                        process.env.REACT_APP_API_SERVER_URL +
                        selectedAppointment.patient.profile_image_path
                      }")`,
                  }}
                ></div>
              </div>
              <div>
                <h3 className="hepta-slab mb-1 text-xl">
                  {selectedAppointment.patient &&
                    `${parseName(
                      selectedAppointment.patient.first_name
                    )} ${parseName(selectedAppointment.patient.last_name)}`}
                </h3>
                <div className="flex flex-nowrap mb-2">
                  <div className="calibre-regular font-16 light-dark-gray-color mr-3 pr-3 leading-none border-r-2">
                    {selectedAppointment.patient &&
                    selectedAppointment.patient.gender === "M"
                      ? "Male"
                      : "Female"}
                  </div>
                  <div className="calibre-regular font-16 light-dark-gray-color leading-none">
                    {selectedAppointment.patient &&
                      getAge(selectedAppointment.patient.dob)}
                  </div>
                </div>
                <div className="flex flex-nowrap items-center mb-0">
                  <div className="calibre-regular font-16 light-dark-gray-color mr-3 pr-3 leading-none border-r-2">
                    {moment(selectedAppointment.appointment_datetime).format(
                      "D MMMM YYYY"
                    )}
                  </div>
                  <div className="calibre-regular font-16 light-dark-gray-color leading-none">
                    {moment(selectedAppointment.appointment_datetime).format(
                      "hh:mm A"
                    )}
                  </div>
                </div>
                <div className="flex flex-nowrap">
                  <div className="calibre-regular font-16 light-dark-gray-color">
                    Reason for your visit{" "}
                    <span className="text-black calibre-bold">
                      {selectedAppointment.appointment_reason_text
                        ? selectedAppointment.appointment_reason_text
                        : selectedAppointment.appointment_reason &&
                          selectedAppointment.appointment_reason.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientDetail;
