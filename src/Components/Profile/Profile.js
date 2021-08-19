import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import { UserActions } from "../../redux/slice/user.slice";
import selector from "../../redux/selector";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import moment from "moment";
import statusConstants from "../../constants/status.constants";
import Loader from "../Common/Loader";

const validationSchema = Yup.object({
    first_name: Yup.string().required("Firstname is required field"),
    last_name: Yup.string().required("Lastname is required field"),
    dob: Yup.string().required("DOB is required field"),
    gender: Yup.string().required("Gender is required field"),
    email: Yup.string()
        .required("Email is required field")
        .email("Invalid email"),
    zipcode: Yup.string().required("Zipcode is required field"),
    mobile_number: Yup.string().required("Mobile number is required field"),
});

const Profile = () => {
    const user = useSelector(selector.user);
    const userStatus = useSelector(selector.userStatus);
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (user.profile_image_path) {
            setImageUrl(
                process.env.REACT_APP_API_SERVER_URL + user.profile_image_path
            );
        }
    }, [user]);

    const dispatch = useDispatch();

    const initialValues = {
        first_name: "",
        last_name: "",
        dob: new Date(),
        gender: "",
        email: "",
        zipcode: "",
        mobile_number: "",
    };

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        dispatch(UserActions.getProfile());
    }, []);

    useEffect(() => {
        for (const key in user) {
            if (key === "dob") {
                setValue(key, new Date(user[key]));
            }
            if (
                [
                    "first_name",
                    "last_name",
                    "gender",
                    "email",
                    "zipcode",
                    "mobile_number",
                ].includes(key)
            ) {
                setValue(key, user[key]);
            }
        }
    }, [user]);

    const update = async (payload) => {
        const formData = new FormData();
        for (const key in payload) {
            if (key === "dob") {
                formData.append(key, moment(payload[key]).format("YYYY-MM-DD"));
            } else {
                formData.append(key, payload[key]);
            }
        }
        if (image) formData.append("profile_image_path", image, image.name);

        const actionResult = await dispatch(
            UserActions.updateProfile(formData)
        );
        if (!actionResult.hasOwnProperty("error")) {
            dispatch(UserActions.getProfile());
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
            {userStatus === statusConstants.PENDING && <Loader />}
            <form
                className="bg-white create-account mb-10"
                onSubmit={handleSubmit(update)}
            >
                <div className="form-content xl:px-32 lg:px-32 md:px-16 sm:px-10 px-4 py-10">
                    <div className="flex justify-between mb-10 items-end">
                        <div>
                            <h1 className="hepta-bold primary-text-color whitespace-nowrap">
                                Edit Profile
                            </h1>
                        </div>
                        <div>
                            <img
                                src="/images/login-vector.png"
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
                                    DOB
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
                                                    imageUrl ? "w-24" : ""
                                                }
                                                src={
                                                    imageUrl
                                                        ? imageUrl
                                                        : "/images/card-dummy.png"
                                                }
                                            />
                                        </div>
                                        <div>
                                            <div className="upload-image-input">
                                                <input
                                                    type="file"
                                                    id="profile-image"
                                                    onChange={handleImage}
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
                        </div>
                    </div>
                </div>

                <div className="form-footer xl:px-32 lg:px-32 md:px-16 sm:px-10 px-4 border-t-2 py-10">
                    <div className="flex items-center justify-end">
                        <Link
                            type="button"
                            className="btn-create-account calibre-bold font-18 uppercase primary-text-color mr-3"
                            to="/home/dashboard"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Profile;
