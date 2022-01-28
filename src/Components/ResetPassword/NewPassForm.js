import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";
import { UserActions } from "../../redux/slice/user.slice";

import { TokenService } from "../../services";

function NewPassForm(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token, email } = useParams();
  TokenService.setToken(token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(
      yup.object({
        password: yup
          .string()
          .required("Password is a required field")
          .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
          ),
        confirmPassword: yup
          .string()
          .required("Confirm Passsword is a required field")
          .oneOf([yup.ref("password"), null], "Password must match"),
      })
    ),
  });

  const submit = async (payload) => {
    const actionResult = await dispatch(UserActions.updatePassword(payload));
    if (!actionResult.hasOwnProperty("error")) {
      history.push("/login");
    }
  };

  return (
    <>
      <div className="">
        <div className="bg-white p-10 login-box px-8 py-10 mb-10">
          <div className="flex justify-between mb-10 items-end">
            <div>
              <h1 className="hepta-bold primary-text-color lh-40 font-32">
                Create New Password
              </h1>
            </div>
            <div>
              <img src="images/login-vector.png" alt="" title="" />
            </div>
          </div>

          <div className="d-flex items-center mb-8">
            <span className="font-18 dark-gray-color">
              Change password for your email <strong>{email}</strong>
            </span>
          </div>

          <form onSubmit={handleSubmit(submit)}>
            <div className="flex items-center mb-5">
              <div className="input-label calibre-regular">
                New <br /> Password
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  className="custom-input input-border-color border"
                  placeholder="Enter New Password"
                  {...register("password")}
                />
                <span className="text-red-500 block mt-2">
                  {errors.password?.message}
                </span>
              </div>
            </div>

            <div className="flex items-center mb-5">
              <div className="input-label calibre-regular">
                Confirm <br /> Password
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  className="custom-input input-border-color border"
                  placeholder="Enter Confirm Password"
                  {...register("confirmPassword")}
                />
                <span className="text-red-500 block mt-2">
                  {errors.confirmPassword?.message}
                </span>
              </div>
            </div>

            <div className="d-flex items-center mb-5">
              <button
                type="submit"
                className="btn-login calibre-regular tracking-wider font-16 uppercase primary-bg-color text-white mr-3"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPassForm;
