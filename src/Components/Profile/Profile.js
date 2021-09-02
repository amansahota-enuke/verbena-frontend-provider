import React, { Fragment, useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { UserActions } from "../../redux/slice/user.slice";
import selector from "../../redux/selector";
import statusConstants from "../../constants/status.constants";
import { Loader, ButtonLoader } from "..";
import { CommonService } from "../../services";

const validationSchema = Yup.object({
    first_name: Yup.string().required("Firstname is a required field"),
    last_name: Yup.string().required("Lastname is a required field"),
    provider_type: Yup.number()
        .required("Type is a required field")
        .min(1, "Type is a required field"),
    provider_speciality: Yup.number()
        .required("Speciality is a required field")
        .min(1, "Speciality is a required field"),
    email: Yup.string()
        .required("Email is a required field")
        .email("Invalid email"),
    mobile_number: Yup.string().required("Mobile number is a required field"),
    hospital_affiliations: Yup.string().required(),
    board_certifications: Yup.string().required(),
    awards_publications: Yup.array()
        .of(
            Yup.object()
                .shape({
                    value: Yup.string().required(),
                })
                .required()
        )
        .min(1),
    languages_spoken: Yup.array()
        .of(
            Yup.object()
                .shape({
                    value: Yup.string().required(),
                })
                .required()
        )
        .min(1),
    consultation_fee: Yup.number().required(),
    address_line1: Yup.string().required("Address is a required field"),
    address_line2: Yup.string().nullable(),
    city: Yup.string().required("City is a required field"),
    state: Yup.string().required("State is a required field"),
    zipcode: Yup.string().required("Zipcode is a required field"),
});

const Profile = () => {
    const dispatch = useDispatch();

    const [loader, setLoader] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [types, setTypes] = useState([]);
    const [speciality, setSpeciality] = useState([]);

    const [profileLogo, setProfileLogo] = useState("");
    const [profileLogoUrl, setProfileLogoUrl] = useState("");

    const [practiceLogo, setPracticeLogo] = useState("");
    const [practiceLogoUrl, setPracticeLogoUrl] = useState("");

    const user = useSelector(selector.user);
    const userStatus = useSelector(selector.userStatus);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            provider_type: 0,
            provider_speciality: 0,
            email: "",
            mobile_number: "",
            hospital_affiliations: "",
            board_certifications: "",
            awards_publications: [{}],
            languages_spoken: [{ value: "English" }],
            consultation_fee: "",
            address_line1: "",
            address_line2: "",
            city: "",
            state: "",
            zipcode: "",
        },
        resolver: yupResolver(validationSchema),
    });

    const setFormValues = useCallback(() => {
        for (const key in user) {
            if (["provider_type", "provider_speciality"].includes(key)) {
                setValue(key, Number(user[key]));
            }

            if (
                [
                    "first_name",
                    "last_name",
                    "email",
                    "mobile_number",
                    "hospital_affiliations",
                    "board_certifications",
                    "consultation_fee",
                ].includes(key)
            ) {
                setValue(key, user[key]);
            }

            if (["awards_publications", "languages_spoken"].includes(key)) {
                setValue(key, JSON.parse(user[key]));
            }

            if (key === "address") {
                for (const addressKey in user.address) {
                    if (
                        [
                            "address_line1",
                            "address_line2",
                            "city",
                            "state",
                            "zipcode",
                        ].includes(addressKey)
                    ) {
                        setValue(addressKey, user.address[addressKey]);
                    }
                }
            }
        }
    }, [setValue, user]);

    const fetchTypesAndSpeciality = async () => {
        try {
            const responseType = await CommonService.getTypes();
            setTypes(responseType.data.data);

            const responseSpeciality = await CommonService.getSpeciality();
            setSpeciality(responseSpeciality.data.data);

            setLoader(false);
        } catch (error) {
            toast.error(error);
            setLoader(false);
        }
    };

    useEffect(() => {
        dispatch(UserActions.getProfile());
        fetchTypesAndSpeciality();
    }, [dispatch]);

    useEffect(() => {
        if (user.profile_logo) {
            setProfileLogoUrl(
                process.env.REACT_APP_API_SERVER_URL + user.profile_logo
            );
        }
        if (user.practice_logo) {
            setPracticeLogoUrl(
                process.env.REACT_APP_API_SERVER_URL + user.practice_logo
            );
        }
        if (Object.keys(user).length > 0) {
            setFormValues();
        }
    }, [user, setFormValues]);

    const languagesSpoken = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "languages_spoken", // unique name for your Field Array
        // keyName: "id", default to "id", you can change the key name
    });

    const awardsPublications = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "awards_publications", // unique name for your Field Array
        // keyName: "id", default to "id", you can change the key name
    });

    const update = async (payload) => {
        setProcessing(true);
        const formData = new FormData();

        for (const key in payload) {
            if (["awards_publications", "languages_spoken"].includes(key)) {
                formData.append(key, JSON.stringify(payload[key]));
            } else {
                formData.append(key, payload[key]);
            }
        }

        if (profileLogo)
            formData.append("profile_logo", profileLogo, profileLogo.name);
        if (practiceLogo)
            formData.append("practice_logo", practiceLogo, practiceLogo.name);

        const actionResult = await dispatch(
            UserActions.updateProfile(formData)
        );
        setProcessing(false);
        if (!actionResult.hasOwnProperty("error")) {
            dispatch(UserActions.getProfile());
        }
    };

    const handleImage = (e, type) => {
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onloadend = function (e) {
            if (type === "profile") {
                setProfileLogo(file);
                setProfileLogoUrl(reader.result);
            } else {
                setPracticeLogo(file);
                setPracticeLogoUrl(reader.result);
            }
        };

        reader.readAsDataURL(file);
    };

    return (
        <>
            {(userStatus === statusConstants.PENDING || loader) && <Loader />}
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
                                    disabled={processing}
                                    type="text"
                                    className="disabled:opacity-50 custom-input ca-width input-border-color border"
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
                                    disabled={processing}
                                    type="text"
                                    className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                    placeholder="Enter Last Name"
                                    {...register("last_name")}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.last_name?.message}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    Provider Type
                                </div>
                                <Controller
                                    name="provider_type"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            disabled={processing}
                                            className="disabled:opacity-50 input-border-color ca-width border custom-select"
                                            {...field}
                                        >
                                            <option value={0}>
                                                Select Type
                                            </option>
                                            {types.map((type) => (
                                                <option
                                                    key={type.id}
                                                    value={type.id}
                                                >
                                                    {type.type}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.provider_type?.message}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    Profile Logo
                                </div>
                                <div className="profile-image-upload">
                                    <div className="flex items-center">
                                        <div className="mr-3">
                                            <img
                                                className={
                                                    profileLogoUrl
                                                        ? "w-24"
                                                        : "h-14"
                                                }
                                                src={
                                                    profileLogoUrl
                                                        ? profileLogoUrl
                                                        : "images/profile-dummy.png"
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <div className="upload-image-input">
                                                <input
                                                    disabled={processing}
                                                    type="file"
                                                    id="profile-image"
                                                    onChange={(e) =>
                                                        handleImage(
                                                            e,
                                                            "profile"
                                                        )
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
                                    Practice Logo
                                </div>
                                <div className="profile-image-upload">
                                    <div className="flex items-center">
                                        <div className="mr-3">
                                            <img
                                                className={
                                                    practiceLogoUrl
                                                        ? "w-24"
                                                        : "h-14"
                                                }
                                                src={
                                                    practiceLogoUrl
                                                        ? practiceLogoUrl
                                                        : "images/card-dummy.png"
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <div className="upload-image-input">
                                                <input
                                                    disabled={processing}
                                                    type="file"
                                                    id="practice-image"
                                                    onChange={(e) =>
                                                        handleImage(
                                                            e,
                                                            "practice"
                                                        )
                                                    }
                                                />
                                                <label htmlFor="practice-image">
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
                                <Controller
                                    name="mobile_number"
                                    control={control}
                                    render={({ field }) => (
                                        <PhoneInput
                                            disabled={processing}
                                            className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                            {...field}
                                        />
                                    )}
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
                                    disabled={processing}
                                    type="text"
                                    className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                    placeholder="Enter Mail"
                                    {...register("email")}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.email?.message}
                                </span>
                            </div>
                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    Provider Speciality
                                </div>
                                <Controller
                                    name="provider_speciality"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            disabled={processing}
                                            className="disabled:opacity-50 input-border-color ca-width border custom-select"
                                            {...field}
                                        >
                                            <option value={0}>
                                                Select Speciality
                                            </option>
                                            {speciality.map((special) => (
                                                <option
                                                    key={special.id}
                                                    value={special.id}
                                                >
                                                    {`${special.name}(${special.code})`}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.provider_speciality?.message}
                                </span>
                            </div>
                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    Hospital Affiliations
                                </div>
                                <input
                                    disabled={processing}
                                    type="text"
                                    className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                    placeholder="Enter Hospital Affiliations"
                                    {...register("hospital_affiliations")}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.hospital_affiliations?.message}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    Board Certifications
                                </div>
                                <input
                                    disabled={processing}
                                    type="text"
                                    className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                    placeholder="Enter Board Certifications"
                                    {...register("board_certifications")}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.board_certifications?.message}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    Awards Publications
                                </div>
                                {awardsPublications.fields.map(
                                    (field, index) => (
                                        <Fragment key={field.id}>
                                            <input
                                                disabled={processing}
                                                type="text"
                                                className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                                placeholder="Enter Awards Publications"
                                                {...register(
                                                    `awards_publications.${index}.value`
                                                )}
                                            />
                                            <button
                                                disabled={processing}
                                                className="disabled:opacity-50 btn-create-account calibre-bold font-18 uppercase primary-text-color mr-3"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    awardsPublications.remove(
                                                        index
                                                    );
                                                }}
                                            >
                                                -
                                            </button>
                                            <span className="text-red-500 block mt-2">
                                                {errors.awards_publications &&
                                                    errors.awards_publications[
                                                        index
                                                    ]?.value?.message}
                                            </span>
                                        </Fragment>
                                    )
                                )}

                                <button
                                    disabled={processing}
                                    className="disabled:opacity-50 btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        awardsPublications.append({});
                                    }}
                                >
                                    +
                                </button>
                                <span className="text-red-500 block mt-2">
                                    {errors.awards_publications?.message}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    Languages spoken
                                </div>
                                {languagesSpoken.fields.map((field, index) => (
                                    <Fragment key={field.id}>
                                        <input
                                            disabled={processing}
                                            type="text"
                                            className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                            placeholder="Enter Languages spoken"
                                            {...register(
                                                `languages_spoken.${index}.value`
                                            )}
                                        />
                                        <button
                                            disabled={processing}
                                            className="disabled:opacity-50 btn-create-account calibre-bold font-18 uppercase primary-text-color mr-3"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                languagesSpoken.remove(index);
                                            }}
                                        >
                                            -
                                        </button>
                                        <span className="text-red-500 block mt-2">
                                            {errors.languages_spoken &&
                                                errors.languages_spoken[index]
                                                    ?.value?.message}
                                        </span>
                                    </Fragment>
                                ))}

                                <button
                                    disabled={processing}
                                    className="disabled:opacity-50 btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        languagesSpoken.append({});
                                    }}
                                >
                                    +
                                </button>
                                <span className="text-red-500 block mt-2">
                                    {errors.languages_spoken?.message}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    Consultation Fee
                                </div>
                                <input
                                    disabled={processing}
                                    type="text"
                                    className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                    placeholder="Enter Consultation Fee"
                                    {...register("consultation_fee")}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.consultation_fee?.message}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    Address Line 1
                                </div>
                                <input
                                    disabled={processing}
                                    type="text"
                                    className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                    placeholder="Enter Address Line 1"
                                    {...register("address_line1")}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.address_line1?.message}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    Address Line 2
                                </div>
                                <input
                                    disabled={processing}
                                    type="text"
                                    className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                    placeholder="Enter Address Line 2"
                                    {...register("address_line2")}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.address_line2?.message}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    City
                                </div>
                                <input
                                    disabled={processing}
                                    type="text"
                                    className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                    placeholder="Enter City"
                                    {...register("city")}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.city?.message}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    State
                                </div>
                                <input
                                    disabled={processing}
                                    type="text"
                                    className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                    placeholder="Enter State"
                                    {...register("state")}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.state?.message}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    Zip Code
                                </div>
                                <input
                                    disabled={processing}
                                    type="text"
                                    className="disabled:opacity-50 custom-input ca-width input-border-color border"
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
                            disabled={processing}
                            type="button"
                            className="btn-create-account calibre-bold font-18 uppercase primary-text-color mr-3"
                            to="/home/dashboard"
                        >
                            Cancel
                        </Link>
                        <button
                            disabled={processing}
                            type="submit"
                            className="disabled:opacity-50 btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                        >
                            <span>
                                {processing ? <ButtonLoader /> : "Update"}
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Profile;
