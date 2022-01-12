import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ConfirmationActions } from "../../redux/slice/confirmation.slice";
import { UserService } from "../../services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
};

const validationSchema = Yup.object({
    oldPassword: Yup.string().required("old Password is a required field"),

    newPassword: Yup.string().required("New Password is a required field")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
        ),
        
    confirmPassword: Yup.string()
        .required("Confirm Passsword is a required field")
        .oneOf([Yup.ref("newPassword"), null], "Password must match"),
});

const ChangePassword = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    const confirm = async (payload) => {
        try{
            const response = await UserService.changePassword(payload)
            toast.success(response.data.message);
            dispatch(ConfirmationActions.closeConfirmation())
        }catch(error){
            toast.error(error.response.data.message);
        }
    };

    const handleCancel = () => {
        dispatch(ConfirmationActions.closeConfirmation());
    }


    return (
        <>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 mb-4"
            >
                Change Password
            </Dialog.Title>

            <form onSubmit={handleSubmit(confirm)}>
                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-nowrap sm:flex-wrap flex-wrap items-center mb-5">
                    <div className="input-label calibre-regular">Old Password</div>
                    <div className="w-full">
                        <input
                            type="password"
                            className="custom-input input-border-color border"
                            placeholder="Old password"
                            {...register("oldPassword")}
                        />
                        <span className="text-red-500 block mt-2">
                            {errors.oldPassword?.message}
                        </span>
                    </div>
                </div>
                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-nowrap sm:flex-wrap flex-wrap items-center mb-5">
                    <div className="input-label calibre-regular">New Password</div>
                    <div className="w-full">
                        <input
                            type="password"
                            className="custom-input input-border-color border"
                            placeholder="New password"
                            {...register("newPassword")}
                        />
                        <span className="text-red-500 block mt-2">
                            {errors.newPassword?.message}
                        </span>
                    </div>
                </div>
                <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-nowrap sm:flex-wrap flex-wrap items-center mb-5">
                    <div className="input-label calibre-regular">Confirm Password</div>
                    <div className="w-full">
                        <input
                            type="password"
                            className="custom-input input-border-color border"
                            placeholder="Confirm password"
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
                        Confirm
                    </button>
                    <button
                        type="submit"
                        className="btn-login calibre-regular tracking-wider font-16 uppercase primary-bg-color text-white mr-3"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
}

export default ChangePassword;
