import React from "react";

import { FullWidthContainer } from "../..";
import VideoChat from "./VideoChat";
import Timer from "./Timer";

const AppointmentVideo = () => {
    return (
        <>
            <FullWidthContainer>
            <h2><Timer/></h2>
                <VideoChat />
            </FullWidthContainer>
        </>
    );
};

export default AppointmentVideo;
