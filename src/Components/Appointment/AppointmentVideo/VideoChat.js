import React, { useState, useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Video from "twilio-video";

import { VideoService } from "../../../services";
import Room from "./Room";
import { Loader } from "../../";
import { useDispatch, useSelector } from "react-redux";
import selector from "../../../redux/selector";
import { AppointmentActions } from "../../../redux/slice/appointment.slice";

const VideoChat = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { appointmentId } = useParams();
    const [room, setRoom] = useState(null);
    const selectedAppointment = useSelector(selector.selectedAppointment);

    const joinRoom = async () => {
        try {
            const response = await VideoService.getToken(appointmentId);
            const room = await Video.connect(response.data.data, {
                name: `room-appointment-${appointmentId}`,
            });
            setRoom(room);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dispatch(AppointmentActions.fetchAppointmentDetail(appointmentId));
        joinRoom();
    }, []);

    const handleLogout = useCallback((type) => {
        setRoom((prevRoom) => {
            if (prevRoom) {
                prevRoom.localParticipant.tracks.forEach((trackPub) => {
                    trackPub.track.stop();
                });
                prevRoom.disconnect();
            }
            return null;
        });
        history.push(`/home/appointments/${appointmentId}`);
    }, []);

    useEffect(() => {
        if (room) {
            const tidyUp = (event) => {
                if (event.persisted) {
                    return;
                }
                if (room) {
                    handleLogout();
                }
            };
            window.addEventListener("pagehide", tidyUp);
            window.addEventListener("beforeunload", tidyUp);
            return () => {
                window.removeEventListener("pagehide", tidyUp);
                window.removeEventListener("beforeunload", tidyUp);
            };
        }
    }, [room, handleLogout]);

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
                selectedAppointment={selectedAppointment}
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
