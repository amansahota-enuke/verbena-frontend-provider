import React from "react";

function InsuranceInformation({ insuranceDetail = null }) {
    return (
        <>
            {insuranceDetail && Number(insuranceDetail.status) === 1 && (
                <>
                    <h4 className="hepta-slab mb-4 mt-4">Insurance Detail</h4>
                    <div className="bg-white rounded-md">
                        <div className="grid grid-cols-2 gap-0">
                            <div className="dd border-r-2 border-b-2 p-4">
                                <h4 className="text-base dark-color mb-2">
                                    Front Image
                                </h4>
                                <img
                                    className="w-52"
                                    src={
                                        insuranceDetail &&
                                        insuranceDetail.front_image_path
                                            ? process.env
                                                  .REACT_APP_API_SERVER_URL +
                                              insuranceDetail.front_image_path
                                            : "images/card-front-image.png"
                                    }
                                    alt=""
                                    title=""
                                />
                            </div>
                            <div className="border-b-2 p-4">
                                <h4 className="text-base dark-color mb-2">
                                    Back Image
                                </h4>
                                <img
                                    className="w-52"
                                    src={
                                        insuranceDetail &&
                                        insuranceDetail.back_side_image_path
                                            ? process.env
                                                  .REACT_APP_API_SERVER_URL +
                                              insuranceDetail.back_side_image_path
                                            : "images/card-back-image.png"
                                    }
                                    alt=""
                                    title=""
                                />
                            </div>
                            <div className="border-b-2 border-r-2 p-4">
                                <h4 className="text-base dark-color mb-2 opacity-50">
                                    Insurance Plan Name
                                </h4>
                                <h6 className="text-black font-bold">
                                    {insuranceDetail &&
                                        insuranceDetail.insurance_plan_name}
                                </h6>
                            </div>
                            <div className="border-b-2 p-4">
                                <h4 className="text-base dark-color mb-2">
                                    ID Number
                                </h4>
                                <h6 className="text-black">
                                    {insuranceDetail &&
                                        insuranceDetail.id_number}
                                </h6>
                            </div>
                            <div className="border-b-2 border-r-2 p-4">
                                <h4 className="text-base dark-color mb-2">
                                    Policy Number
                                </h4>
                                <h6 className="text-black">
                                    {insuranceDetail &&
                                        insuranceDetail.policy_number}
                                </h6>
                            </div>
                            <div className="border-b-2 p-4">
                                <h4 className="text-base dark-color mb-2">
                                    Type of Insurance Coverage
                                </h4>
                                <h6 className="text-black">
                                    {insuranceDetail &&
                                        insuranceDetail.insurance_coverage_type}
                                </h6>
                            </div>
                            <div className="p-4 border-r-2">
                                <h4 className="text-base dark-color mb-2">
                                    Relationship to Insured
                                </h4>
                                <h6 className="text-black">
                                    {insuranceDetail &&
                                        insuranceDetail.relationship}
                                </h6>
                            </div>
                            <div className="p-4">
                                <h4 className="text-base dark-color mb-2">
                                    Copayment
                                </h4>
                                <h6 className="text-black">
                                    $
                                    {insuranceDetail &&
                                        insuranceDetail.copayment}
                                </h6>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default InsuranceInformation;
