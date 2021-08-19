import React from "react";
import { ClipLoader } from "react-spinners";
const ButtonLoader = ({ color }) => {
    return (
        <>
            <ClipLoader color={!!color ? color : "#fff"} />
        </>
    );
};

export default ButtonLoader;
