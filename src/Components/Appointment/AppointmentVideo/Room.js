import React, { useEffect, useState } from "react";
import Participant from "./Participant";
import Timer from "./Timer";

const Room = ({ roomName, room, handleLogout, openAppointmentWindow }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));
  const openRoomWindow = () => {
    const popupObj = window.open(
      `https://verbenacare.com/blog`,
      "_blank",
      "toolbar=0,location=0,menubar=0,width=400,height=300"
    );
    popupObj.focus();
  };

  return (
    <div className="room">
      <div className="flex justify-between items-center">
        <div className="local-participant">
          {room ? (
            <Participant
              key={room.localParticipant.sid}
              participant={room.localParticipant}
            />
          ) : (
            ""
          )}
        </div>
        <div>
          <div className="remote-participants">{remoteParticipants}</div>
          <h2> Waiting for the Aman Sahota </h2>
        </div>
      </div>
      {/* <div class="text-center mt-10 border-t pt-5">
        <img
          src="/images/the-waiting-roomss.png"
          className="ff m-auto w-3/5"
          alt="waiting room"
        />
        <button
          className="btn-reschedule px-3 py-2 mt-5 calibre-regular font-16 rounded-full uppercase text-white primary-dim-bg-color mr-3"
          onClick={() => openRoomWindow()}
        >
          Read
        </button>
      </div> */}
      <div class="px-4 py-6 rounded-lg border bg-white mt-10 border-t">
        <div class="flex justify-between items-center">
          <div className="flex justify-end">
            <button
              className="btn-login calibre-regular font-16 uppercase primary-bg-color text-white mr-3"
              onClick={() => handleLogout()}
            >
              Share Screen
            </button>
            <button
              className="btn-reschedule px-3 py-2 calibre-regular font-16 rounded-full uppercase text-white primary-dim-bg-color mr-3"
              onClick={() => openAppointmentWindow()}
            >
              Open Appointment Detail
            </button>
            <button
              className="btn-login calibre-regular font-16 uppercase primary-bg-color text-white"
              onClick={() => handleLogout()}
            >
              End Call
            </button>
          </div>
          <div>
            <h6>
              <Timer />
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
