import React, { useEffect, useState } from "react";
import Participant from "./Participant";
import Timer from "./Timer";
import ChatBox from "../AppointmentDetail/ChatBox";

const Room = ({
    selectedAppointment,
    room,
    handleLogout,
    openAppointmentWindow,
}) => {
    const [participants, setParticipants] = useState([]);
    const [chatBoxOpen, setChatBoxOpen] = useState(false);

    useEffect(() => {
        const participantConnected = (participant) => {
            setParticipants((prevParticipants) => [
                ...prevParticipants,
                participant,
            ]);
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

    const parseName = (name) => {
        if (!name) return null;
        return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
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
                    <div className="remote-participants">
                        {remoteParticipants}
                    </div>
                    {!remoteParticipants && <h2>
                        {selectedAppointment.patient &&
                            `Waiting for ${parseName(
                                selectedAppointment.patient.first_name
                            )} ${parseName(
                                selectedAppointment.patient.last_name
                            )}`}
                    </h2>}
                </div>
            </div>
            <ChatBox
                chatBoxOpen={chatBoxOpen}
                selectedAppointment={selectedAppointment}
            />
            <button
                onClick={() => setChatBoxOpen(!chatBoxOpen)}
                className="sc-closed-icon"
            >
                <i class="fas fa-comment"></i>
            </button>
            <div class="px-4 py-6 rounded-lg border bg-white mt-10 border-t">
                <div class="flex justify-between items-center">
                    <div className="flex justify-end">
                        {/* <button
                            className="btn-login calibre-regular font-16 uppercase primary-bg-color text-white mr-3"
                        >
                            Share Screen
                        </button> */}              
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
