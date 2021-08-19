import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";

import { UserActions } from "../../redux/slice/user.slice";
import moment from "moment";

const SignUpForm = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const validationSchema = Yup.object({
        first_name: Yup.string().required("Firstname is required field"),
        last_name: Yup.string().required("Lastname is required field"),
        dob: Yup.date().required("DOB is required field"),
        gender: Yup.string().required("Gender is required field"),
        email: Yup.string()
            .required("Email is required field")
            .email("Invalid email"),
        password: Yup.string().required("Password is required field"),
        confirmPassword: Yup.string()
            .required("Passsword is required field")
            .oneOf([Yup.ref("password"), null], "Password must match"),
        zipcode: Yup.string().required("Zipcode is required field"),
        mobile_number: Yup.string().required("Mobile number is required field"),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            dob: new Date(),
            gender: "",
            email: "",
            password: "",
            confirmPassword: "",
            zipcode: "",
            mobile_number: "",
        },
        resolver: yupResolver(validationSchema),
    });

    const signUp = async (payload) => {
        const formData = new FormData(); // Currently empty

        for (const key in payload) {
            if (key === "dob") {
                formData.append(key, moment(payload[key]).format("YYYY-MM-DD"));
            } else {
                formData.append(key, payload[key]);
            }
        }

        if (image) formData.append("profile_image_path", image, image.name);

        const actionResult = await dispatch(UserActions.signUp(formData));
        if (!actionResult.hasOwnProperty("error")) {
            history.push("/home/basic-health");
        }
    };

    const handleImage = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onloadend = function (e) {
            setImage(file);
            setImageUrl(reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <>
            <div className="">
                <div className="bg-white create-account mb-10">
                    <form onSubmit={handleSubmit(signUp)}>
                        <div className="form-content xl:px-32 lg:px-32 md:px-10 sm:px-5 px-4 py-10">
                            <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap justify-between items-end mb-16">
                                <div>
                                    <h1 className="hepta-bold primary-text-color lh-40">
                                        Create An Account
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

                            <div>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            First Name
                                        </div>
                                        <input
                                            type="text"
                                            className="custom-input ca-width input-border-color border"
                                            placeholder="Enter First Name"
                                            {...register("first_name")}
                                        />
                                        <span className="text-red-500 block mt-2">
                                            {errors.first_name?.message}
                                        </span>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Last Name
                                        </div>
                                        <input
                                            type="text"
                                            className="custom-input ca-width input-border-color border"
                                            placeholder="Enter Last Name"
                                            {...register("last_name")}
                                        />
                                        <span className="text-red-500 block mt-2">
                                            {errors.last_name?.message}
                                        </span>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Date of Birth
                                        </div>
                                        <Controller
                                            name="dob"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    className="custom-input ca-width input-border-color border"
                                                    maxDate={new Date()}
                                                    selected={field.value}
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        <span className="text-red-500 block mt-2">
                                            {errors.dob?.message}
                                        </span>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Gender
                                        </div>
                                        <select
                                            className="input-border-color ca-width border custom-select"
                                            {...register("gender")}
                                        >
                                            <option value="">
                                                Select gender
                                            </option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                        <span className="text-red-500 block mt-2">
                                            {errors.gender?.message}
                                        </span>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Profile Image
                                        </div>
                                        <div className="profile-image-upload">
                                            <div className="flex items-center">
                                                <div className="mr-3">
                                                    <img
                                                        className={
                                                            imageUrl
                                                                ? "w-24"
                                                                : "h-14"
                                                        }
                                                        src={
                                                            imageUrl
                                                                ? imageUrl
                                                                : "images/profile-dummy.png"
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <div className="upload-image-input">
                                                        <input
                                                            type="file"
                                                            id="profile-image"
                                                            onChange={
                                                                handleImage
                                                            }
                                                        />
                                                        <label htmlFor="profile-image">
                                                            Upload
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Phone
                                        </div>
                                        <input
                                            type="text"
                                            className="custom-input ca-width input-border-color border"
                                            placeholder="Enter Phone"
                                            {...register("mobile_number")}
                                        />
                                        <span className="text-red-500 block mt-2">
                                            {errors.mobile_number?.message}
                                        </span>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Email
                                        </div>
                                        <input
                                            type="text"
                                            className="custom-input ca-width input-border-color border"
                                            placeholder="Enter Mail"
                                            {...register("email")}
                                        />
                                        <span className="text-red-500 block mt-2">
                                            {errors.email?.message}
                                        </span>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Zip Code
                                        </div>
                                        <input
                                            type="text"
                                            className="custom-input ca-width input-border-color border"
                                            placeholder="Enter Zip Code"
                                            {...register("zipcode")}
                                        />
                                        <span className="text-red-500 block mt-2">
                                            {errors.zipcode?.message}
                                        </span>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Password
                                        </div>
                                        <input
                                            type="password"
                                            className="custom-input ca-width input-border-color border"
                                            placeholder="Enter Password"
                                            {...register("password")}
                                        />
                                        <span className="text-red-500 block mt-2">
                                            {errors.password?.message}
                                        </span>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Confirm Password
                                        </div>
                                        <input
                                            type="password"
                                            className="custom-input ca-width input-border-color border"
                                            placeholder="Enter Confrim Password"
                                            {...register("confirmPassword")}
                                        />
                                        <span className="text-red-500 block mt-2">
                                            {errors.confirmPassword?.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-footer xl:px-32 lg:px-32 md:px-10 sm:px-5 px-4 border-t-2 xl:py-10 lg:py-10 md:py-4 sm:py-4 py-4">
                            <div className="flex items-center justify-end">
                                <button
                                    type="button"
                                    className="btn-create-account calibre-bold font-18 uppercase primary-text-color mr-3"
                                    onClick={() => history.goBack()}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;
