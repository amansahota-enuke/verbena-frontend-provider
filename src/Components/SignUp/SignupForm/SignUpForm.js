import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PhoneInput from "react-phone-number-input/input";
import { isPossiblePhoneNumber } from "react-phone-number-input";

import { UserActions } from "../../../redux/slice/user.slice";
import { CommonService } from "../../../services";
import { Loader } from "../..";
import ButtonLoader from "../../Common/ButtonLoader";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router";
import queryString from "query-string";

const SignUpForm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loader, setLoader] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [types, setTypes] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [states, setStates] = useState([]);

  const [profileLogo, setProfileLogo] = useState("");
  const [profileLogoUrl, setProfileLogoUrl] = useState("");

  const [practiceLogo, setPracticeLogo] = useState("");
  const [practiceLogoUrl, setPracticeLogoUrl] = useState("");

  const [test, setTest] = useState(false);

  const location = useLocation();

  const token = queryString.parse(location.search)._key;

  const [validToken, setToken] = useState("");

  const ratingNumbers = [1, 2, 3, 4, 5];

  const [password, showPassword] = useState(false);

  const [confirmPassword, showConfirmPassword] = useState(false);

  const fetchReferenceData = async () => {
    try {
      const responseType = await CommonService.getTypes();
      setTypes(responseType.data.data);

      const responseSpeciality = await CommonService.getSpeciality();
      setSpeciality(responseSpeciality.data.data);

      const responseStates = await CommonService.getStates();
      setStates(responseStates.data.data);

      setLoader(false);
    } catch (error) {
      toast.error(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchReferenceData();
    setToken(token);
  }, []);

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
    mobile_number: Yup.string().test(
      "check-number",
      "Number is not valid",
      function (value) {
        const { path, createError } = this;
        if (!value) {
          return createError({
            path,
            message: "Mobile number is a required field",
          });
        }
        const checkNumber = isPossiblePhoneNumber(value);
        if (checkNumber) {
          return true;
        } else {
          return createError({
            path,
            message: "Mobile Number is not valid",
          });
        }
      }
    ),
    hospital_affiliations: Yup.array()
      .of(
        Yup.object()
          .shape({
            value: Yup.string().required(
              "Hospital affiliations field must have at least 1 items"
            ),
          })
          .required("Hospital affiliations field must have at least 1 items")
      )
      .min("1"),
    board_certifications: Yup.array()
      .of(
        Yup.object()
          .shape({
            value: Yup.string().required(
              "Board certifications field must have at least 1 items"
            ),
          })
          .required("Board certifications field must have at least 1 items")
      )
      .min("1"),
    awards_publications: Yup.array().of(
      Yup.object()
        .shape({
          value: Yup.string(),
        })
        .required()
    ),
    languages_spoken: Yup.array()
      .of(
        Yup.object()
          .shape({
            value: Yup.string().required(),
          })
          .required()
      )
      .min(1),
    patient_testimonial: Yup.array().of(
      Yup.object()
        .shape({
          value: Yup.string().nullable(),
          rating: Yup.number().nullable(),
          patient_name: Yup.string().nullable(),
        })
        .required()
    ),
    bio: Yup.string().nullable(),
    address_line1: Yup.string().required("Address is a required field"),
    address_line2: Yup.string(),
    city: Yup.string().required("City is a required field"),
    state_id: Yup.number()
      .required("State is a required field")
      .min(1, "State is a required field"),
    zipcode: Yup.string().required("Zipcode is a required field"),
    password: Yup.string()
      .required("Password is a required field")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
      ),
    confirmPassword: Yup.string()
      .required("Passsword is a required field")
      .oneOf([Yup.ref("password"), null], "Password must match"),
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
      provider_type: 0,
      provider_speciality: 0,
      email: "",
      mobile_number: "",
      hospital_affiliations: [{}],
      board_certifications: [{}],
      awards_publications: [{}],
      languages_spoken: [{ value: "English" }],
      patient_testimonial: [{}],
      bio: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state_id: 0,
      zipcode: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });

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

  const hospitalAffiliations = useFieldArray({
    control,
    name: "hospital_affiliations",
  });

  const boardCertifications = useFieldArray({
    control,
    name: "board_certifications",
  });

  const patientTestimonial = useFieldArray({
    control,
    name: "patient_testimonial",
  });

  const signUp = async (payload) => {
    setProcessing(true);
    const formData = new FormData(); // Currently empty

    for (const key in payload) {
      if (
        [
          "awards_publications",
          "languages_spoken",
          "hospital_affiliations",
          "board_certifications",
          "patient_testimonial",
        ].includes(key)
      ) {
        formData.append(key, JSON.stringify(payload[key]));
      } else {
        formData.append(key, payload[key]);
      }
    }

    if (profileLogo)
      formData.append("profile_logo", profileLogo, profileLogo.name);
    if (practiceLogo)
      formData.append("practice_logo", practiceLogo, practiceLogo.name);
    if (validToken) formData.append("token", validToken);

    const actionResult = await dispatch(UserActions.signUp(formData));
    setProcessing(false);
    if (!actionResult.hasOwnProperty("error")) {
      history.push("/signup/privacy-policy");
    } else {
      setTest(true);
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

  const handleShowPassword = () => {
    if (password === false) {
      showPassword(true);
    } else {
      showPassword(false);
    }
  };

  const handleShowConfirmPassword = () => {
    if (confirmPassword === false) {
      showConfirmPassword(true);
    } else {
      showConfirmPassword(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="">
        <div className="bg-white create-account mb-10">
          <form onSubmit={handleSubmit(signUp)}>
            <div className="form-content xl:px-32 lg:px-32 md:px-10 sm:px-5 px-4 py-10">
              <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap justify-between items-end mb-16">
                <div>
                  <h1 className="hepta-bold primary-text-color lh-40 font-32">
                    Provider Contact Form
                  </h1>
                </div>
                <div>
                  <img src="images/login-vector.png" alt="" title="" />
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
                      {errors.first_name ? `*${errors.first_name.message}` : ""}
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
                      {errors.last_name ? `*${errors.last_name.message}` : ""}
                    </span>
                  </div>

                  {/* <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Provider Type
                                        </div>
                                        <select
                                            disabled={processing}
                                            className="disabled:opacity-50 input-border-color ca-width border custom-select"
                                            {...register("provider_type")}
                                        >
                                            <option value={0}>
                                                Select Type
                                            </option>
                                            {types.map((type) => (
                                                <option
                                                    key={type.id}
                                                    value={type.id}
                                                >
                                                    {`${type.type}(${type.short_form})`}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="text-red-500 block mt-2">
                                            {errors.provider_type?.message}
                                        </span>
                                    </div> */}

                  <div className="col-span-6">
                    <div className="input-label calibre-regular mb-4">
                      Profile Logo
                    </div>
                    <div className="profile-image-upload">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <img
                            className={profileLogoUrl ? "w-24" : "h-14"}
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
                              onChange={(e) => handleImage(e, "profile")}
                            />
                            <label htmlFor="profile-image">Upload</label>
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
                            className={practiceLogoUrl ? "w-24" : "h-14"}
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
                              onChange={(e) => handleImage(e, "practice")}
                            />
                            <label htmlFor="practice-image">Upload</label>
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
                          country="US"
                          disabled={processing}
                          className="disabled:opacity-50 custom-input ca-width input-border-color border"
                          placeholder="Enter Phone"
                          {...field}
                        />
                      )}
                    />
                    <span className="text-red-500 block mt-2">
                      {errors.mobile_number
                        ? `*${errors.mobile_number.message}`
                        : ""}
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
                      {errors.email ? `*${errors.email.message}` : ""}
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
                      {errors.address_line1
                        ? `*${errors.address_line1.message}`
                        : ""}
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
                      {errors.address_line2
                        ? `*${errors.address_line2.message}`
                        : ""}
                    </span>
                  </div>
                  <div className="col-span-6">
                    <div className="input-label calibre-regular mb-4">
                      State
                    </div>
                    <select
                      disabled={processing}
                      className="disabled:opacity-50 input-border-color ca-width border custom-select"
                      {...register("state_id")}
                    >
                      <option value={0}>Select State</option>
                      {states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.state_name}
                        </option>
                      ))}
                    </select>
                    <span className="text-red-500 block mt-2">
                      {errors.state_id ? `*${errors.state_id.message}` : ""}
                    </span>
                  </div>
                  <div className="col-span-6">
                    <div className="input-label calibre-regular mb-4">City</div>
                    <input
                      disabled={processing}
                      type="text"
                      className="disabled:opacity-50 custom-input ca-width input-border-color border"
                      placeholder="Enter City"
                      {...register("city")}
                    />
                    <span className="text-red-500 block mt-2">
                      {errors.city ? `*${errors.city.message}` : ""}
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
                      {errors.zipcode ? `*${errors.zipcode.message}` : ""}
                    </span>
                  </div>
                  <div className="col-span-6">
                    <div className="input-label calibre-regular mb-4">
                      Provider Type
                    </div>
                    <select
                      disabled={processing}
                      className="disabled:opacity-50 input-border-color ca-width border custom-select"
                      {...register("provider_type")}
                    >
                      <option value={0}>Select Type</option>
                      {types.map((type) => (
                        <option key={type.id} value={type.id}>
                          {`${type.type} (${type.short_form})`}
                        </option>
                      ))}
                    </select>
                    <span className="text-red-500 block mt-2">
                      {errors.provider_type
                        ? `*${errors.provider_type.message}`
                        : ""}
                    </span>
                  </div>

                  <div className="col-span-6">
                    <div className="input-label calibre-regular mb-4">
                      Provider Speciality
                    </div>
                    <select
                      disabled={processing}
                      className="disabled:opacity-50 input-border-color ca-width border custom-select"
                      {...register("provider_speciality")}
                    >
                      <option value={0}>Select Speciality</option>
                      {speciality.map((special) => (
                        <option key={special.id} value={special.id}>
                          {`${special.name}(${special.code})`}
                        </option>
                      ))}
                    </select>
                    <span className="text-red-500 block mt-2">
                      {errors.provider_speciality
                        ? `*${errors.provider_speciality.message}`
                        : ""}
                    </span>
                  </div>

                  <div className="col-span-6">
                    <div className="input-label calibre-regular mb-4">
                      Hospital Affiliations
                      <button
                        disabled={processing}
                        className="disabled:opacity-50 w-6 h-6 text-white primary-bg-color rounded-full calibre-bold font-18 ml-3"
                        onClick={(e) => {
                          e.preventDefault();
                          hospitalAffiliations.append({});
                        }}
                      >
                        +
                      </button>
                    </div>
                    {hospitalAffiliations.fields.map((field, index) => (
                      <Fragment key={field.id}>
                        <input
                          disabled={processing}
                          type="text"
                          className="disabled:opacity-50 custom-input ca-width input-border-color border"
                          placeholder="Enter Hospital Affiliations"
                          {...register(`hospital_affiliations.${index}.value`)}
                        />
                        <button
                          disabled={processing}
                          className="disabled:opacity-50 ml-3"
                          onClick={(e) => {
                            e.preventDefault();
                            hospitalAffiliations.remove(index);
                          }}
                        >
                          Remove
                        </button>
                        <span className="text-red-500 block mt-2">
                          {errors.hospital_affiliations &&
                          errors.hospital_affiliations[index]?.value
                            ? `*${errors.hospital_affiliations[index].value.message}`
                            : ""}
                        </span>
                      </Fragment>
                    ))}
                    <span className="text-red-500 block mt-2">
                      {errors.hospital_affiliations?.message}
                    </span>
                  </div>

                  <div className="col-span-6">
                    <div className="input-label calibre-regular mb-4">
                      Board Certifications
                      <button
                        disabled={processing}
                        className="disabled:opacity-50 ml-3"
                        onClick={(e) => {
                          e.preventDefault();
                          boardCertifications.append({});
                        }}
                      >
                        +
                      </button>
                    </div>
                    {boardCertifications.fields.map((field, index) => (
                      <Fragment key={field.id}>
                        <input
                          disabled={processing}
                          type="text"
                          className="disabled:opacity-50 custom-input ca-width input-border-color border"
                          placeholder="Enter Board Certifications"
                          {...register(`board_certifications.${index}.value`)}
                        />
                        <button
                          disabled={processing}
                          className="disabled:opacity-50 ml-3"
                          onClick={(e) => {
                            e.preventDefault();
                            boardCertifications.remove(index);
                          }}
                        >
                          Remove
                        </button>
                        <span className="text-red-500 block mt-2">
                          {errors.board_certifications &&
                          errors.board_certifications[index]?.value
                            ? `*${errors.board_certifications[index].value.message}`
                            : ""}
                        </span>
                      </Fragment>
                    ))}
                    <span className="text-red-500 block mt-2">
                      {errors.board_certifications?.message}
                    </span>
                  </div>

                  <div className="col-span-6">
                    <div className="input-label calibre-regular mb-4">
                      Awards Publications
                      <button
                        disabled={processing}
                        className="disabled:opacity-50 w-6 h-6 text-center leading-none calibre-bold p-1 rounded-full text-white primary-bg-color font-18 ml-3"
                        onClick={(e) => {
                          e.preventDefault();
                          awardsPublications.append({});
                        }}
                      >
                        +
                      </button>
                    </div>
                    {awardsPublications.fields.map((field, index) => (
                      <Fragment key={field.id}>
                        <input
                          disabled={processing}
                          type="text"
                          className="disabled:opacity-50 custom-input ca-width input-border-color border"
                          placeholder="Enter Awards Publications"
                          {...register(`awards_publications.${index}.value`)}
                        />
                        <button
                          disabled={processing}
                          className="disabled:opacity-50 ml-3"
                          onClick={(e) => {
                            e.preventDefault();
                            awardsPublications.remove(index);
                          }}
                        >
                          Remove
                        </button>
                        <span className="text-red-500 block mt-2">
                          {errors.awards_publications &&
                          errors.awards_publications[index]?.value
                            ? `*${errors.awards_publications[index].value.message}`
                            : ""}
                        </span>
                      </Fragment>
                    ))}
                    <span className="text-red-500 block mt-2">
                      {errors.awards_publications?.message}
                    </span>
                  </div>

                  <div className="col-span-6">
                    <div className="input-label calibre-regular mb-4">
                      Languages spoken
                      <button
                        disabled={processing}
                        className="disabled:opacity-50 w-6 h-6 text-center leading-none calibre-bold p-1 rounded-full text-white primary-bg-color font-18 ml-3"
                        onClick={(e) => {
                          e.preventDefault();
                          languagesSpoken.append({});
                        }}
                      >
                        +
                      </button>
                    </div>
                    {languagesSpoken.fields.map((field, index) => (
                      <Fragment key={field.id}>
                        <input
                          disabled={processing}
                          type="text"
                          className="disabled:opacity-50 custom-input ca-width input-border-color border"
                          placeholder="Enter Languages spoken"
                          {...register(`languages_spoken.${index}.value`)}
                        />
                        <button
                          disabled={processing}
                          className="disabled:opacity-50 ml-3"
                          onClick={(e) => {
                            e.preventDefault();
                            languagesSpoken.remove(index);
                          }}
                        >
                          Remove
                        </button>
                        <span className="text-red-500 block mt-2">
                          {errors.languages_spoken &&
                          errors.languages_spoken[index]?.value
                            ? `*${errors.languages_spoken[index].value.message}`
                            : ""}
                        </span>
                      </Fragment>
                    ))}
                    <span className="text-red-500 block mt-2">
                      {errors.languages_spoken?.message}
                    </span>
                  </div>

                  <div className="col-span-6">
                    <div className="input-label calibre-regular mb-4">Bio</div>
                    <textarea
                      {...register("bio")}
                      disabled={processing}
                      className="disabled:opacity-50 rounded-md ca-width input-border-color border h-28 p-4 font-18"
                    ></textarea>
                    <span className="text-red-500 block mt-2">
                      {errors.bio ? `*${errors.bio.message}` : ""}
                    </span>
                  </div>

                  <div className="col-span-6">
                    <div className="input-label calibre-regular mb-4">
                      Patient Testimonial
                      {patientTestimonial.fields.length < 3 ? (
                        <button
                          disabled={processing}
                          className="disabled:opacity-50 w-6 h-6 text-white primary-bg-color rounded-full calibre-bold font-18 ml-3"
                          onClick={(e) => {
                            e.preventDefault();
                            patientTestimonial.append({});
                          }}
                        >
                          +
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    {patientTestimonial.fields.map((field, index) => (
                      <Fragment key={field.id}>
                        <input
                          disabled={processing}
                          type="text"
                          className="disabled:opacity-50 custom-input ca-width input-border-color border mt-6"
                          placeholder="Enter patient testimonials"
                          {...register(`patient_testimonial.${index}.value`)}
                        />
                        <button
                          disabled={processing}
                          onClick={(e) => {
                            e.preventDefault();
                            patientTestimonial.remove(index);
                          }}
                        >
                          &ensp; Remove
                        </button>
                        <span className="text-red-500 block mt-2">
                          {errors.patient_testimonial &&
                          errors.patient_testimonial[index]?.value
                            ? `*${errors.patient_testimonial[index].value.message}`
                            : ""}
                        </span>
                        <div className="input-label calibre-regular mb-4">
                          Testimonial
                        </div>
                        <Controller
                          name={`patient_testimonial.${index}.rating`}
                          control={control}
                          render={({ field }) => (
                            <select
                              disabled={processing}
                              className="disabled:opacity-50 input-border-color ca-width border custom-select"
                              {...field}
                            >
                              <option value={0}>Rating</option>
                              {ratingNumbers.map((number) => (
                                <option>{number}</option>
                              ))}
                            </select>
                          )}
                        />
                        <div className="input-label calibre-regular mb-4">
                          Rating
                        </div>
                        <input
                          disabled={processing}
                          type="text"
                          className="disabled:opacity-50 custom-input ca-width input-border-color border"
                          placeholder="Enter patient testimonials"
                          {...register(
                            `patient_testimonial.${index}.patient_name`
                          )}
                        />
                        <div className="input-label calibre-regular mb-4">
                          Patient Name
                        </div>
                      </Fragment>
                    ))}
                    <span className="text-red-500 block mt-2">
                      {errors.patient_testimonial?.message}
                    </span>
                  </div>

                  <div className="col-span-6">
                    <div className="input-label calibre-regular mb-4">
                      Password
                    </div>
                    <div className="relative">
                    <input
                      disabled={processing}
                      type={password ? "text" : "password"}
                      className="disabled:opacity-50 custom-input ca-width input-border-color border"
                      placeholder="Enter Password"
                      {...register("password")}
                    />
                    <span className="text-red-500 block mt-2">
                      {errors.password ? `*${errors.password.message}` : ""}
                    </span>
                    <span
                      className="cursor-pointer eye absolute xl:right-40 lg:right-40 md:right-10 sm:right-10 right-10 top-4"
                      onClick={handleShowPassword}
                    >
                      <i
                        className={password ? "fas fa-eye-slash" : "fas fa-eye"}
                      ></i>
                    </span>
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div className="input-label calibre-regular mb-4">
                      Confirm Password
                    </div>
                    <div className="relative">
                    <input
                      disabled={processing}
                      type={confirmPassword ? "text" : "password"}
                      className="disabled:opacity-50 custom-input ca-width input-border-color border"
                      placeholder="Enter Confirm Password"
                      {...register("confirmPassword")}
                    />
                    <span className="text-red-500 block mt-2">
                      {errors.confirmPassword
                        ? `*${errors.confirmPassword.message}`
                        : ""}
                    </span>
                    <span
                      className="cursor-pointer eye absolute xl:right-40 lg:right-40 md:right-10 sm:right-10 right-10 top-4"
                      onClick={handleShowConfirmPassword}
                    >
                      <i
                        className={confirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                      ></i>
                    </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-footer xl:px-32 lg:px-32 md:px-10 sm:px-5 px-4 border-t-2 xl:py-10 lg:py-10 md:py-4 sm:py-4 py-4">
              <div className="flex items-center justify-start">
                <button
                  disabled={processing}
                  type="button"
                  className="disabled:opacity-50 btn-create-account calibre-regular tracking-wider font-16 uppercase primary-text-color mr-3"
                  onClick={() => history.goBack()}
                >
                  Cancel
                </button>
                <button
                  disabled={processing}
                  type="submit"
                  className="disabled:opacity-50 btn-login calibre-regular tracking-wider font-16 uppercase primary-bg-color text-white"
                >
                  <span className="calibre-regular">
                    {processing ? <ButtonLoader /> : "Register"}
                  </span>
                </button>
              </div>
            </div>
            {test ? <ToastContainer /> : ""}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
