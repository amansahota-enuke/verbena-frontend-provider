import React, { useState, useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "twilio-video";

import { VideoService } from "../../../services";
import Room from "./Room";
import { Loader } from "../../";

const VideoChat = () => {
    const history = useHistory();
    const { appointmentId } = useParams();
    const [room, setRoom] = useState(null);

    const joinRoom = async () => {
        try {
            const response = await VideoService.getToken(appointmentId);
            const room = await connect(response.data.data, {
                name: `room-appointment-${appointmentId}`,
                audio: true,
                video: true,
            });
            setRoom(room);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        joinRoom();
    }, []);

    const handleLogout = useCallback((type) => {
        setRoom(null);
        history.push(`/home/appointments/${appointmentId}`);
    }, []);

    const openAppointmentWindow = () => {
        let popUpObj = window.open(
            `${window.location.origin}/appointment/${appointmentId}`,
            "_blank",
            "toolbar=0,location=0,menubar=0,width=400,height=300"
        );
        popUpObj.focus();
    };

    let render;
    if (room) {
        render = (
            <Room
                room={room}
                handleLogout={handleLogout}
                openAppointmentWindow={openAppointmentWindow}
            />
        );
    } else {
        render = <Loader />;
    }
    return render;
};

export default VideoChat;
