import React, { useEffect, useState } from "react";
import Participant from "./Participant";
import Timer from "./Timer";

const Room = ({ roomName, room, handleLogout, openAppointmentWindow }) => {
    const [remoteParticipants, setRemoteParticipants] = useState(
        Array.from(room.participants.values())
    );

    useEffect(() => {
        // Add event listeners for future remote participants coming or going
        room.on("participantConnected", (participant) =>
            addParticipant(participant)
        );
        room.on("participantDisconnected", (participant) =>
            removeParticipant(participant)
        );

        window.addEventListener("beforeunload", leaveRoom);

        return () => {
            leaveRoom();
        };
    }, []);

    const addParticipant = (participant) => {
        console.log(`${participant.identity} has joined the room.`);
        setRemoteParticipants([...remoteParticipants, participant]);
    };

    const removeParticipant = (participant) => {
        console.log(`${participant.identity} has left the room`);
        setRemoteParticipants(
            remoteParticipants.filter(
                (p) => p.identity !== participant.identity
            )
        );
    };

    const leaveRoom = () => {
        room.disconnect();
        handleLogout();
    };

    return (
        <div className="room">
            <div className="flex justify-between items-center">
                <div className="local-participant">
                    <Participant
                        key={room.localParticipant.identity}
                        localParticipant="true"
                        participant={room.localParticipant}
                    />
                </div>
                <div>
                    <div className="remote-participants">
                        {remoteParticipants.map((participant) => (
                            <Participant
                                key={participant.identity}
                                participant={participant}
                            />
                        ))}
                    </div>
                    <h2> Waiting for the Aman Sahota </h2>
                </div>
            </div>

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
                            onClick={() => leaveRoom()}
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
