import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import selector from "../../redux/selector";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";
import { ButtonLoader } from "../../Components";
import { toast } from "react-toastify";
import moment from "moment";
import { AcuityService } from "../../services";
import { AppointmentActions } from "../../redux/slice/appointment.slice";

function RescheduleAppointment() {
  const dispatch = useDispatch();
  const selectedAppointment = useSelector(selector.selectedAppointment);

  const [availableDates, setAvailableDates] = useState(null);
  const [dateLoader, setDateLoader] = useState(null);
  const [date, setDate] = useState(null);

  const [availableTimes, setAvailableTimes] = useState(null);
  const [timeLoader, setTimeLoader] = useState(null);
  const [time, setTime] = useState(null);

  const [processing, setProcessing] = useState(null);

  const closeModal = () => {
    dispatch(ConfirmationActions.closeConfirmation());
  };

  useEffect(() => {
    if (!availableDates) {
      getDate();
    }
  }, [availableDates]);

  const getDate = async () => {
    try {
      setDateLoader(true);
      const response = await AcuityService.getDates(
        selectedAppointment.provider_id
      );
      if (response.data.data.length !== 0) {
        const dates = response.data.data.map((date) => new Date(date));
        setAvailableDates(dates);
      }
      setDateLoader(false);
    } catch (error) {
      toast.error(error);
      setDateLoader(false);
    }
  };

  const handleDate = async (date) => {
    try {
      if (date) {
        setDate(date);
      }
      setTimeLoader(true);
      const payload = { date: moment(date).format("YYYY-MM-DD") };
      const times = await AcuityService.getTimes(
        selectedAppointment.provider_id,
        payload
      );
      setAvailableTimes(times.data.data);
      setTimeLoader(false);
    } catch (error) {
      setTimeLoader(false);
      toast.error(error);
    }
  };

  const saveAppointment = async () => {
    setProcessing(true);
    const actionResult = await dispatch(
      AppointmentActions.rescheduleAppointment({
        id: selectedAppointment.id,
        body: {
          appointment_datetime: time,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      })
    );
    setProcessing(false);
    if (!actionResult.hasOwnProperty("error")) {
      closeModal();
    }
  };

  return (
    <>
      <Dialog.Title
        as="h2"
        className="hepta-slab xl:text-2xl lg:text-2xl md:text-2xl sm:text-2xl text-lg mb-6 text-center primary-text-color"
      >
        Reschedule Appointment
      </Dialog.Title>
      {dateLoader ? (
        <ButtonLoader color="#000" />
      ) : (
        <div className="bg-white mb-10">
          <div className="p-10 px-2 py-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <div className="input-label calibre-regular mb-4">Date</div>
                <div className="relative">
                  <DatePicker
                    {...(!!availableDates && {
                      includeDates: availableDates,
                    })}
                    disabled={processing}
                    className="disabled:opacity-50 custom-input input-border-color border text-justify"
                    minDate={new Date()}
                    selected={date}
                    onChange={(date) => handleDate(date)}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <div className="input-label calibre-regular mb-4">
                  Time Slot
                </div>
                <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-3">
                  {date ? (
                    timeLoader ? (
                      <ButtonLoader color="#000" />
                    ) : availableTimes?.length === 0 ? (
                      "No time slot available, please select another date"
                    ) : (
                      availableTimes.map((currentTime, index) => {
                        return (
                          <React.Fragment key={index}>
                            <button
                              disabled={
                                currentTime.slotsAvailable === 0 || processing
                              }
                              className={`disabled:opacity-50 time-slot text-center rounded-md border px-1 py-3 font-14 calibre-regular uppercase cursor-pointer 
                                                    ${
                                                      time === currentTime.time
                                                        ? "selected"
                                                        : ""
                                                    }`}
                              onClick={() => setTime(currentTime.time)}
                            >
                              {moment(currentTime.time).format("hh:mm A")}
                            </button>
                          </React.Fragment>
                        );
                      })
                    )
                  ) : (
                    "Please select a date"
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 px-2 py-2 border-b mt-3">
            <div className="flex justify-end">
              <button
                type="button"
                disabled={processing}
                className="disabled:opacity-50 btn-create-account calibre-regular font-16 uppercase primary-text-color mr-3"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!date || !time || processing}
                className="disabled:opacity-50 btn-login calibre-regular font-16 uppercase primary-bg-color text-white"
                onClick={saveAppointment}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RescheduleAppointment;
