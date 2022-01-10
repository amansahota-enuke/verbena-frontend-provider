import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { UserService } from "../../services";
import { TokenService } from "../../services";
import { useDispatch } from "react-redux";
import { SubscriptionActions } from "../../../src/redux/slice/subscription.slice";

const initialValues = {
  token: null,
};

const validationSchema = Yup.object({
  token: Yup.number().required("Otp is a required Field"),
});

const TotpForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const login = async (payload) => {
    try {
      const response = await UserService.verifyTotp(Number(userId), payload);
      TokenService.setToken(response.data.data.token);
      dispatch(SubscriptionActions.checkSetUpfeeDetails());
      dispatch(SubscriptionActions.checkSubscription());
      history.push("/home");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="bg-white p-10 login-box px-5 xl:px-8 lg:px-8 md:px-3 sm:px-3 py-10 mb-10">
        <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap justify-between mb-10 items-end">
          <div>
            <h1 className="hepta-bold primary-text-color login-heading">
              Two Factor Authentication
            </h1>
          </div>
          <div>
            <img src="images/login-vector.png" alt="" title="" />
          </div>
        </div>

        <form onSubmit={handleSubmit(login)}>
          <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-nowrap sm:flex-wrap flex-wrap items-center mb-5">
            <div className="input-label calibre-regular">
              Temporary One Time Password (TOTP)
            </div>
            <div className="w-full">
              <input
                type="text"
                className="custom-input input-border-color border"
                placeholder="otp"
                {...register("token")}
              />
              <span className="text-red-500 block mt-2">
                {errors.token?.message}
              </span>
            </div>
          </div>
          <div className="d-flex items-center mb-5">
            <button
              type="submit"
              className="btn-login calibre-regular tracking-wider font-16 uppercase primary-bg-color text-white mr-3"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default TotpForm;
