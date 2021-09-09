import React, { useEffect, useState } from "react";
import Participant from "./Participant";

const Room = ({ roomName, room, handleLogout }) => {
    const [participants, setParticipants] = useState([]);

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

    return (
        <div className="room">
            <h2>Room: {roomName}</h2>
            <div className="flex justify-end">
                <button
                    className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                    onClick={handleLogout}
                >
                    Go to Appointment
                </button>
            </div>
            <div className="flex justify-between">
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
                <div className="remote-participants">{remoteParticipants}</div>
            </div>
        </div>
    );
};

export default Room;
