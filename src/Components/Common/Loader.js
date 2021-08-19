import React from "react";
const Loader = () => {
    return (
        <div className="overlay">
            <div className="overlay__inner">
                <div className="overlay__content">
                    <span className="spinner"></span>
                </div>
            </div>
        </div>
    );
};

export default Loader;
