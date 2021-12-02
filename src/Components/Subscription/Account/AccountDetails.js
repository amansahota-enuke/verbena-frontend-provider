import moment from "moment";
import React, { useEffect, useState } from "react";
import PaymentService from "../../../services/payment.service"

function AccountDetails() {
    const [test, setTest] = useState()

    const getSubscriptionData = async()=>{
        const res = await PaymentService.getSubscriptionDetails()
        setTest(res.data.data)
    }

    useEffect(() => {
        getSubscriptionData()
    }, [])

    return (
        <>
            <h2 className="hepta-slab font-32 text-center primary-text-color mb-5">
                Account Details
            </h2>
            <div className="bg-white login-box mb-10">
                <div className="p-10 px-5 py-5 border-b">
                    <div className="flex items-center mb-4">
                        <div className="dd w-36">
                            <h3 className="leading-none text-lg calibre-regular">
                                Patient Name
                            </h3>
                        </div>
                        <div className="w-2.5 mr-4">:-</div>
                        <div className="w-auto">
                            <h3 className="leading-none text-lg calibre-bold">
                                {test && JSON.parse(test.res_body).latest_invoice.customer_name}
                            </h3>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="dd w-36">
                            <h3 className="leading-none text-lg calibre-regular">Email</h3>
                        </div>
                        <div className="w-2.5 mr-4">:-</div>
                        <div className="w-auto">
                            <h3 className="leading-none text-lg calibre-bold">
                            {test && JSON.parse(test.res_body).latest_invoice.customer_email}
                            </h3>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="dd w-36">
                            <h3 className="leading-none text-lg calibre-regular">Type</h3>
                        </div>
                        <div className="w-2.5 mr-4">:-</div>
                        <div className="w-auto">
                            <h3 className="leading-none text-lg calibre-bold">
                                Annual
                            </h3>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="dd w-36">
                            <h3 className="leading-none text-lg calibre-regular">
                                Expiration
                            </h3>
                        </div>
                        <div className="w-2.5 mr-4">:-</div>
                        <div className="w-auto">
                            <h3 className="leading-none text-lg calibre-bold">
                                {test && `${moment(
                                    Number(JSON.parse(test.res_body).current_period_end + "000")
                                ).format("D MMMM YYYY")}`}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-36">
                            <h3 className="leading-none text-lg calibre-regular">
                                Subscription Plan
                            </h3>
                        </div>
                        <div className="w-2.5 mr-4">:-</div>
                        <div className="w-auto">
                            <h3 className="leading-none text-lg calibre-bold">{`$${test &&
                                JSON.parse(test.res_body).latest_invoice.amount_paid / 100
                                }`}</h3>
                        </div>
                    </div>
                </div>
                <div className="p-10 px-5 py-5">
                    <div className="flex justify-start items-center">
                        <a href = {test && JSON.parse(test.res_body).latest_invoice.invoice_pdf }
                            type="button"
                            className="btn-login calibre-regular font-18 uppercase primary-bg-color text-white"
                        >
                            Download Receipt
                        </a>
                        <a className="pl-4">
                            Cancel
                        </a>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default AccountDetails;
