import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import { UserActions } from "../../redux/slice/user.slice";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const initialValues = {
    email: "",
};

const validationSchema = yup.object({
    email: yup
        .string()
        .required("Email is a required field")
        .email("Invalid email"),
});

function ForgotPassForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    const submit = async (payload) => {
        const actionResult = await dispatch(
            UserActions.forgotPassword(payload)
        );
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
                            <h1 className="hepta-bold primary-text-color lh-40">
                                Forgot Password
                            </h1>
                        </div>
                        <div>
                            <img
                                src="images/login-vector.png"
                                alt=""
                                title=""
                            />
                        </div>
                    </div>

                    <div className="d-flex items-center mb-8">
                        <span className="font-18 dark-gray-color">
                            We'll email you a link to make a brand new password.
                        </span>
                    </div>

                    <form onSubmit={handleSubmit(submit)}>
                        <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-nowrap sm:flex-wrap flex-wrap items-center mb-5">
                            <div className="input-label calibre-regular">
                                Email
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    className="custom-input input-border-color border"
                                    placeholder="Email"
                                    {...register("email")}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.email?.message}
                                </span>
                            </div>
                        </div>

                        <div className="d-flex items-center mb-5">
                            <button
                                type="button"
                                className="btn-create-account calibre-bold font-18 uppercase primary-text-color mr-3"
                                onClick={() => history.goBack()}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white mr-3"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ForgotPassForm;
