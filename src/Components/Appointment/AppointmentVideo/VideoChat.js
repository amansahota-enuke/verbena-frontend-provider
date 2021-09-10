import React, { useState, useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
    const user = useSelector(selector.user);

    const connectRoom = async (token) => {
        Video.connect(token, {
            name: `room-appointment-${appointmentId}`,
        })
            .then((room) => {
                setRoom(room);
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    const checkToken = () => {
        const tokenArr = selectedAppointment.appointment_videos;
        return tokenArr.find(
            (item) => Number(item.provider_id) === Number(user.id)
        );
    };

    const joinRoom = async () => {
        const tokenObj = await checkToken();
        if (tokenObj) {
            console.log("yes");
            connectRoom(tokenObj.token);
        } else {
            console.log("no");
            const response = await VideoService.getToken(appointmentId);
            connectRoom(response.data.data);
        }
    };

    useEffect(() => {
        dispatch(AppointmentActions.fetchAppointmentDetail(appointmentId));
    }, []);

    useEffect(() => {
        if (user.id && selectedAppointment.appointment_videos) {
            joinRoom();
        }
    }, [selectedAppointment, user]);

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

    let render;
    if (room) {
        render = (
            <Room
                roomName={`room-appointment-${appointmentId}`}
                room={room}
                handleLogout={handleLogout}
            />
        );
    } else {
        render = <Loader />;
    }
    return render;
};

export default VideoChat;
