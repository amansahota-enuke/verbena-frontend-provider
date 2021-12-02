import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import selector from "../../../redux/selector";

function Subscribed() {
  const subscriptionDetails = useSelector(selector.subscriptionData)

  return (
    <>
      <h2 className="hepta-slab font-32 text-center primary-text-color mb-5">
        Thank You
      </h2>
      <p className="text-center mb-12 font-18">
        Thank you for subscribing to Verbena, healthcare your way. Your Monthly
        membership will ensure safe, convenient access to your patient anytime,
      </p>
      <div className="bg-white login-box mb-10">
        <div className="p-10 px-5 py-5 flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap border-b">
          <div>
            {/* <div
                                className="doctor-image primary-bg-color rounded-full mr-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-3 mb-3"
                                style={{
                                    backgroundImage:
                                        selectedAppointment.provider &&
                                        `url("${
                                            process.env
                                                .REACT_APP_API_SERVER_URL +
                                            selectedAppointment.provider
                                                .profile_logo
                                        }")`,
                                }}
                            ></div> */}
          </div>
          <div>
            <h3 className="hepta-slab mb-1 leading-none text-xl">
              Provider Subscription Plan Details
            </h3>
            <h6 className="font-18 calibre-regular uppercase mb-0 light-dark-gray-color">
              
            </h6>
            {/* <div>
              <div className="flex items-center">
                <div>
                  <h3 className="calibre-regular leading-none font-18 light-dark-gray-color border-r-2 pr-2 mr-2">
                    <i className="fas fa-calendar mr-2"></i>
                    ls/;sassa/s
                  </h3>
                </div>
                <div>
                  <h3 className="calibre-regular leading-none font-18 light-dark-gray-color">
                    sksaasa
                  </h3>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="p-10 px-5 py-5 border-b">
          <div className="flex items-center mb-4">
            <div className="dd w-36">
              <h3 className="leading-none text-lg calibre-regular">
                Provider Name
              </h3>
            </div>
            <div className="w-2.5 mr-4">:-</div>
            <div className="w-auto">
              <h3 className="leading-none text-lg calibre-bold">
                {subscriptionDetails && subscriptionDetails.latest_invoice.customer_name}
              </h3>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="dd w-36">
              <h3 className="leading-none text-lg calibre-regular">
                Email
              </h3>
            </div>
            <div className="w-2.5 mr-4">:-</div>
            <div className="w-auto">
              <h3 className="leading-none text-lg calibre-bold">
                {subscriptionDetails && subscriptionDetails.latest_invoice.customer_email}
              </h3>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="dd w-36">
              <h3 className="leading-none text-lg calibre-regular">
                Type
              </h3>
            </div>
            <div className="w-2.5 mr-4">:-</div>
            <div className="w-auto">
              <h3 className="leading-none text-lg calibre-bold">
                Monthly
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
                    {`${moment(Number(subscriptionDetails.current_period_end+"000")).format('D MMMM YYYY')}`}
              </h3>
            </div>
          </div>
          {/* <div className="flex items-center mb-4">
                            <div className="w-36">
                                <h3 className="leading-none text-lg calibre-regular">
                                    Age
                                </h3>
                            </div>
                            <div className="w-2.5 mr-4">:-</div>
                            <div className="w-auto">
                                <h3 className="leading-none text-lg calibre-bold">
                                {selectedAppointment.patient &&
                                        moment().diff(selectedAppointment.patient.dob, 'years') }
                                </h3>
                            </div>
                        </div> */}
          <div className="flex items-center">
            <div className="w-36">
              <h3 className="leading-none text-lg calibre-regular">
                Subscription Plan
              </h3>
            </div>
            <div className="w-2.5 mr-4">:-</div>
            <div className="w-auto">
              <h3 className="leading-none text-lg calibre-bold">{`$${subscriptionDetails && (subscriptionDetails.latest_invoice.amount_paid)/100}`}</h3>
            </div>
          </div>
        </div>
        <div className="p-10 px-5 py-5">
          <div className="flex justify-start">
            <Link
              type="button"
              className="btn-login calibre-regular font-18 uppercase primary-bg-color text-white"
              to={`/home/dashboard`}
            >
              Go To dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscribed;
