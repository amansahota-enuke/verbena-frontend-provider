import React, { useState, useEffect } from "react";
import Track from "./Track";

const Participant = (props) => {
    const existingPublications = Array.from(props.participant.tracks.values());
    const existingTracks = existingPublications.map(
        (publication) => publication.track
    );
    const nonNullTracks = existingTracks.filter((track) => track !== null);
    const [tracks, setTracks] = useState(nonNullTracks);

    useEffect(() => {
        if (!props.localParticipant) {
            props.participant.on("trackSubscribed", (track) => addTrack(track));
        }
    }, []);

    const addTrack = (track) => {
        setTracks([...tracks, track]);
    };

    return (
        <div className="participant">
            <h3>{props.participant.identity}</h3>
            {tracks.map((track) => (
                <Track key={track} track={track} />
            ))}
        </div>
    );
};

export default Participant;
