import React, { useEffect , useState } from "react";
import {LeftMenu} from '../Components'
import { Switch } from '@headlessui/react'
import $ from 'jquery';

const CommonPage = (props) => {

    

    useEffect(() => {
        $(".heading-toggle-1").click(function(){
            $(".tab-1").toggleClass('collapsed');
        });

        $(".heading-toggle-2").click(function(){
            $(".tab-2").toggleClass('collapsed');
        });


      }, []);

    return (
        <>
            <div className="">
                <div className="">
                    {/* dashboard boxed */}
                    <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-3 mb-6">
                        <div className="bg-white rounded-lg py-4 px-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="count-title hepta-semibold light-dark-gray-color text-2xl">Providers</h4>
                                    <h2 className="count-total calibre-bold text-6xl text-black">2132</h2>
                                </div>
                                <div>
                                    <img src="/images/count-provider-vector.png" alt="" title=""/>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg py-4 px-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="count-title hepta-semibold light-dark-gray-color text-2xl">Patients</h4>
                                    <h2 className="count-total calibre-bold text-6xl text-black">64780</h2>
                                </div>
                                <div>
                                    <img src="/images/count-patient-vector.png" alt="" title=""/>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg py-4 px-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="count-title hepta-semibold light-dark-gray-color text-2xl">Appointments</h4>
                                    <h2 className="count-total calibre-bold text-6xl text-black">4582</h2>
                                </div>
                                <div>
                                    <img src="/images/count-appointment-vector.png" alt="" title=""/>
                                </div>
                            </div>
                        </div>
                    </div>


                    <h4>Payment Summary</h4>

                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mb-5">
                        <div className="box-header thead-bg p-3">
                        <h5>Invoice</h5>
                        </div>

                        <div className="box-body p-3 bg-white">
                            <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 mb-6">
                                <div>
                                    <h3 className="calibre-bold uppercase text-2xl text-black border-b-2 pb-2 mb-3">Home Address</h3>
                                    <h5 className="calibre-regular text-black text-2xl mb-2">Verbena</h5>
                                    <div className="address w-48 ">
                                        <p className="calibre-regular mid-dark-gray-color font-20">D 103, Verbana Hospital,h
                                        Opposite Town Hall,h
                                        Avenue
                                        New York-10001</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="calibre-bold uppercase text-2xl text-black border-b-2 pb-2 mb-3">Bill To</h3>
                                    <h5 className="calibre-regular text-black text-2xl mb-2">Joe Smith</h5>
                                    <div className="address w-48 ">
                                        <p className="calibre-regular mid-dark-gray-color font-20">D 103, Verbana Hospital,h
                                        Opposite Town Hall,h
                                        Avenue
                                        New York-10001</p>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="overflow-hidden border mb-6">
                                <table className="min-w-full">
                                    <thead className="calibre-regular thead-gray-bg ">
                                        <tr>
                                            <th scope="col" className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider">
                                                Invoice
                                            </th>
                                            <th scope="col" className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider">
                                                Date & Time
                                            </th>
                                            <th scope="col" className="dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    <tr>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            34576819
                                        </td>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            18 April 2021  | 4:40PM
                                        </td>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            <span className="success">Success</span>
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>

                            <div className="overflow-hidden mb-6">
                                <table className="min-w-full">
                                    <thead className="calibre-regular thead-gray-bg border-l border-r">
                                        <tr>
                                            <th scope="col" className="border-t border-b dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider">
                                                #
                                            </th>
                                            <th scope="col" className="border-t border-b dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider">
                                                Detail
                                            </th>
                                            <th scope="col" className="border-t border-b dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider">
                                                Doctor
                                            </th>
                                            <th scope="col" className="border-t border-b dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider">
                                                Appointment Date & Time
                                            </th>
                                            <th scope="col" className="border-t border-b dark-gray-color px-6 py-3 text-center font-18 uppercase tracking-wider">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    <tr>
                                        <td className="border-b border-l border-r px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            1
                                        </td>
                                        <td className="border-b border-l border-r px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            Consultation Charges
                                        </td>
                                        <td className="border-b border-l border-r px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            Dr. Robert
                                        </td>
                                        <td className="border-b border-l border-r px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            18 April 2021  | 4:40PM
                                        </td>
                                        <td className="border-b border-l border-r px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            $20
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            &nbsp;
                                        </td>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            &nbsp;
                                        </td><td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            &nbsp;
                                        </td>
                                        <td className="border-b border-l px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            <strong>Sub Total Amount</strong>
                                        </td>
                                        <td className="border-b border-l border-r px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            $60
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            &nbsp;
                                        </td>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            &nbsp;
                                        </td><td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            &nbsp;
                                        </td>
                                        <td className="border-b border-l px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            <strong>Vat</strong>
                                        </td>
                                        <td className="border-b border-l border-r px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            $10
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            &nbsp;
                                        </td>
                                        <td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            &nbsp;
                                        </td><td className="px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            &nbsp;
                                        </td>
                                        <td className="thead-gray-bg border-l border-b px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            <strong>Total Amount</strong>
                                        </td>
                                        <td className="thead-gray-bg border-l border-r border-b px-6 dark-gray-color py-4 whitespace-nowrap text-center font-18">
                                            $90
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"><i className="fas fa-print"></i> Print</button>
                            </div>

                        </div>
                    </div>


                    <h2 className="hepta-slab xl:text-5xl lg:text-5xl md:text-5xl sm:text-lg text-lg text-center primary-text-color mb-5">
                        Thank You
                    </h2>
                    <p className="text-center mb-12">
                        Your appointment is booked. We have sent it to the
                        Provider for Confirmation. We will send email
                        Confirmation.
                    </p>

                    <div className="bg-white login-box mb-10">
                        <div className="p-10 px-5 py-5 flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap border-b">
                            <div>
                                <div className="doctor-image primary-bg-color rounded-full mr-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-3 mb-3"></div>
                            </div>
                            <div>
                                <h3 className="hepta-slab mb-1 text-xl">
                                    Dr. Rajveer Singh
                                </h3>
                                <h6 className="text-base uppercase mb-3 light-gray-color">
                                    Dermatologist
                                </h6>
                                <div>
                                    <div className="flex">
                                        <div>
                                            <h3 className="calibre-regular leading-none text-base light-dark-gray-color border-r-2 pr-2 mr-2">
                                                <i className="fas fa-calendar mr-2"></i>
                                                3 June 2021
                                            </h3>
                                        </div>
                                        <div>
                                            <h3 className="calibre-regular leading-none text-base light-dark-gray-color">
                                                2:00 PM
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        Joe Smith
                                    </h3>
                                </div>
                            </div>
                            <div className="flex items-center mb-4">
                                <div className="w-36">
                                    <h3 className="leading-none text-lg calibre-regular">
                                        Age
                                    </h3>
                                </div>
                                <div className="w-2.5 mr-4">:-</div>
                                <div className="w-auto">
                                    <h3 className="leading-none text-lg calibre-bold">
                                        29 Years
                                    </h3>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-36">
                                    <h3 className="leading-none text-lg calibre-regular">
                                        Gender
                                    </h3>
                                </div>
                                <div className="w-2.5 mr-4">:-</div>
                                <div className="w-auto">
                                    <h3 className="leading-none text-lg calibre-bold">
                                        Male
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 px-5 py-5">
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                                >
                                    Patient Home
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white login-box mb-10">
                        <div className="p-10 px-8 pt-10 pb-4 border-b">
                            <h2 className="hepta-slab xl:text-5xl lg:text-5xl md:text-5xl sm:text-lg text-lg primary-text-color mb-5">
                                Payment Information
                            </h2>
                            <h6 className="mb-4">
                                Telehealth Appointment & Consultation Fee
                            </h6>
                            <div className="flex items-center mb-4">
                                <div className="dd w-36">
                                    <h3 className="leading-none text-lg calibre-regular">
                                        Consultation
                                    </h3>
                                </div>
                                <div className="w-2.5 mr-4">:-</div>
                                <div className="w-auto">
                                    <h3 className="leading-none text-lg calibre-bold">
                                        $30
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 px-8 pt-10 pb-20 border-b">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <div className="input-label calibre-regular mb-4">
                                        Card Number
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="custom-input input-border-color border text-justify"
                                            placeholder="Enter Card Number"
                                            name=""
                                        />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="input-label calibre-regular mb-4">
                                        Expiration Date
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="custom-input input-border-color border text-justify"
                                            placeholder="Select Date"
                                            name=""
                                        />
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="input-label calibre-regular mb-4">
                                        CVC
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="custom-input input-border-color border text-justify"
                                            placeholder="CVC"
                                            name=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end mt-5">
                                <button
                                    type="button"
                                    className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>

                    <h2 className="hepta-slab xl:text-5xl lg:text-5xl md:text-5xl sm:text-lg text-lg text-center primary-text-color mb-5">
                        Confirmation
                    </h2>
                    <p className="text-center mb-12">
                        Thank you for sharing your Personal Health concern. Your
                        answers will be reviewed before your telehealth
                        visit.Please check and confirm the information below to
                        schedule appointment
                    </p>

                    <div className="bg-white login-box mb-10">
                        <div className="p-10 px-5 py-5 flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap border-b">
                            <div>
                                <div className="doctor-image primary-bg-color rounded-full mr-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-3 mb-3"></div>
                            </div>
                            <div>
                                <h3 className="hepta-slab mb-1 text-xl">
                                    Dr. Rajveer Singh
                                </h3>
                                <h6 className="text-base uppercase mb-3 light-gray-color">
                                    Dermatologist
                                </h6>
                                <div>
                                    <div className="flex">
                                        <div>
                                            <h3 className="calibre-regular leading-none text-base light-dark-gray-color border-r-2 pr-2 mr-2">
                                                <i className="fas fa-calendar mr-2"></i>
                                                3 June 2021
                                            </h3>
                                        </div>
                                        <div>
                                            <h3 className="calibre-regular leading-none text-base light-dark-gray-color">
                                                2:00 PM
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        Joe Smith
                                    </h3>
                                </div>
                            </div>
                            <div className="flex items-center mb-4">
                                <div className="w-36">
                                    <h3 className="leading-none text-lg calibre-regular">
                                        Age
                                    </h3>
                                </div>
                                <div className="w-2.5 mr-4">:-</div>
                                <div className="w-auto">
                                    <h3 className="leading-none text-lg calibre-bold">
                                        29 Years
                                    </h3>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-36">
                                    <h3 className="leading-none text-lg calibre-regular">
                                        Gender
                                    </h3>
                                </div>
                                <div className="w-2.5 mr-4">:-</div>
                                <div className="w-auto">
                                    <h3 className="leading-none text-lg calibre-bold">
                                        Male
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 px-5 py-5 border-b">
                            <div className="flex items-center mb-4">
                                <div className="dd w-36">
                                    <h3 className="leading-none text-lg calibre-regular">
                                        Consultation
                                    </h3>
                                </div>
                                <div className="w-2.5 mr-4">:-</div>
                                <div className="w-auto">
                                    <h3 className="leading-none text-lg calibre-bold">
                                        $30
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 px-5 py-5">
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scheduleded Appointment */}
                    <h2 className="hepta-slab xl:text-5xl lg:text-5xl md:text-5xl sm:text-5xl text-lg mb-12 text-center primary-text-color">
                        Schedule Appointment
                    </h2>

                    <div className="bg-white login-box mb-10">
                        <div className="p-10 px-5 py-5 xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-nowrap border-b">
                            <div>
                                <div className="doctor-image primary-bg-color rounded-full mr-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-3 mb-3"></div>
                            </div>
                            <div>
                                <h3 className="hepta-slab mb-3 text-xl">
                                    Dr. Rajveer Singh
                                </h3>
                                <h6 className="text-base uppercase mb-3 light-gray-color">
                                    Dermatologist
                                </h6>
                                <div className="provider-education flex items-center xl:flex-nowrap md:flex-wrap mb-3 whitespace-nowrap">
                                    <div className="edu-icon mr-3">
                                        <i className="fas fa-graduation-cap"></i>
                                    </div>
                                    <div className="light-gray-color text-base">
                                        MBBS, Diploma in Dermatology
                                    </div>
                                </div>
                                <div className="provider-address flex xl:flex-nowrap md:flex-wrap">
                                    <div className="address-icon mr-3">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="light-gray-color text-base">
                                        79th, 308 E New York, NY 10075 United
                                        States
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 px-5 py-5 border-b">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <div className="input-label calibre-regular mb-4">
                                        Date
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="custom-input input-border-color border text-justify"
                                            placeholder="Select Date"
                                            name=""
                                        />
                                        <i className="fa fa-calendar light-gray-color absolute input-icon calendar"></i>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="input-label calibre-regular mb-4">
                                        Time Slot
                                    </div>
                                    <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-3">
                                        <div className="time-slot text-center rounded-md border px-3 py-3 light-gray-color text-sm uppercase cursor-pointer selected">
                                            10:00 AM
                                        </div>
                                        <div className="time-slot text-center rounded-md border px-3 py-3 light-gray-color text-sm uppercase cursor-pointer">
                                            10:30 AM
                                        </div>
                                        <div className="time-slot text-center rounded-md border px-3 py-3 light-gray-color text-sm uppercase cursor-pointer">
                                            11:00 AM
                                        </div>
                                        <div className="time-slot text-center rounded-md border px-3 py-3 light-gray-color text-sm uppercase cursor-pointer">
                                            11:30 AM
                                        </div>
                                        <div className="time-slot text-center rounded-md border px-3 py-3 light-gray-color text-sm uppercase cursor-pointer">
                                            12:00 PM
                                        </div>
                                        <div className="time-slot text-center rounded-md border px-3 py-3 light-gray-color text-sm uppercase cursor-pointer">
                                            12:30 PM
                                        </div>
                                        <div className="time-slot text-center rounded-md border px-3 py-3 light-gray-color text-sm uppercase cursor-pointer">
                                            01:00 PM
                                        </div>
                                        <div className="time-slot text-center rounded-md border px-3 py-3 light-gray-color text-sm uppercase cursor-pointer">
                                            01:30 PM
                                        </div>
                                        <div className="time-slot text-center rounded-md border px-3 py-3 light-gray-color text-sm uppercase cursor-pointer">
                                            03:00 PM
                                        </div>
                                        <div className="time-slot text-center rounded-md border px-3 py-3 light-gray-color text-sm uppercase cursor-pointer">
                                            03:30 PM
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 px-5 py-5 border-b">
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white create-account mb-10">
                        <div className="form-content xl:px-32 lg:px-32 md:px-16 sm:px-10 px-4 py-10">
                            <div className="flex justify-between mb-10 items-end">
                                <div>
                                    <h1 className="hepta-bold xl:text-4xl lg:text-4xl md:text-2xl sm:text-lg text-lg primary-text-color whitespace-nowrap">
                                        Telehealth Consent Form
                                    </h1>
                                </div>
                            </div>
                            <div className="tele-health-content">
                                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                                    [Name of Patient] (Patient) hereby consent
                                    to engage in Telehealth with [Therapist’s
                                    Name License] (Therapist).j
                                </p>
                                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                                    I understand that Telehealth is a mode of
                                    delivering health care services, including
                                    psychotherapy, via communication
                                    technologies (e.g. Internet or phone) to
                                    facilitate diagnosis consultation,
                                    treatment, education, care management, and
                                    self-management of a patient’s healthcare.
                                </p>
                                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                                    By signing this form, I understand and agree
                                    to the following:
                                </p>
                                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                                    1. I have a right to confidentiality with
                                    regard to my treatment and related
                                    communications via Telehealth under the same
                                    laws that protect the confidentiality of my
                                    treatment information during in-person
                                    psychotherapy. The same mandatory and
                                    permissive exceptions to confidentiality
                                    outlined in the [Informed Consent Form or
                                    Statement of Disclosures] I received from my
                                    thelapist also apply to my Telehealth
                                    services.
                                </p>
                                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                                    {" "}
                                    I understand that there are risks associated
                                    with participating in Telehealth including,
                                    but not limited to, the possibility, despite
                                    reasonable efforts and safeguards on the
                                    part of my therapist, that my psychotherapy
                                    sessions and transmission of my treatment
                                    information could be disrupted or distorted
                                    by technical failures and/or interrupted or
                                    accessed by unauthorized persons, and that
                                    the electronic storage of my treatment
                                    information could be accessed by
                                    unauthorized persons.
                                </p>
                                <p className="dd text-lg caliber-regular mb-4 dark-gray-color">
                                    I understand that miscommunication between
                                    myself and my therapist may occur via
                                    Telehealth.
                                </p>
                                <div className="grid xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Patient Name
                                        </div>
                                        <input
                                            type="text"
                                            className="custom-input ca-width input-border-color border text-justify"
                                            placeholder="Enter Patient Name"
                                            name=""
                                        />
                                    </div>
                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Date
                                        </div>
                                        <input
                                            type="text"
                                            className="custom-input ca-width input-border-color border text-justify mb-5"
                                            placeholder="Select Date"
                                            name=""
                                        />
                                        <input
                                            type="text"
                                            className="custom-input ca-width input-border-color border text-justify"
                                            placeholder="Type Agree to Continue"
                                            name=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-footer px-32 border-t-2 py-10">
                            <div className="flex items-center justify-end">
                                <button
                                    type="button"
                                    className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                                >
                                    Agree
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white create-account mb-10">
                        <div className="form-content xl:px-32 lg:px-32 md:px-16 sm:px-10 px-4 py-10">
                            <div className="flex justify-between mb-10 items-end">
                                <div>
                                    <h1 className="hepta-bold xl:text-4xl lg:text-4xl md:text-2xl sm:text-lg text-lg primary-text-color whitespace-nowrap">
                                        Provider Contact Form
                                    </h1>
                                </div>
                                <div>
                                    <img src="/images/login-vector.png" alt="" title=""/>
                                </div>
                            </div> 
                            
                            <div className="grid xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
                                <div className="col-span-6">
                                    <div className="input-label calibre-regular mb-4">First Name</div>
                                    <input type="text" className="custom-input ca-width input-border-color border text-justify" placeholder="Enter First Name" name=""/>
                                </div>
                                <div className="col-span-6">
                                    <div className="input-label calibre-regular mb-4">Last Name</div>
                                    <input type="text" className="custom-input ca-width input-border-color border text-justify" placeholder="Enter Last Name" name=""/>
                                </div>
                                <div className="col-span-6">
                                    <div className="input-label calibre-regular mb-4">Provider Type</div>
                                    <select className="custom-select ca-width input-border-color border text-justify">
                                        <option>Select</option>
                                    </select>
                                </div>
                                <div className="col-span-6">
                                    <div className="input-label calibre-regular mb-4">Phone</div>
                                    <input type="text" className="custom-input ca-width input-border-color border text-justify" placeholder="Enter Phone" name=""/>
                                </div>
                                <div className="col-span-6">
                                    <div className="input-label calibre-regular mb-4">Email</div>
                                    <input type="text" className="custom-input ca-width input-border-color border text-justify" placeholder="Enter Email" name=""/>
                                </div>
                                <div className="col-span-6">
                                    <div className="input-label calibre-regular mb-4">Speciality</div>
                                    <select className="custom-select ca-width input-border-color border text-justify">
                                        <option>Select Speciality</option>
                                    </select>
                                </div>
                                <div className="col-span-6">
                                    <div className="input-label calibre-regular mb-4">State</div>
                                    <select className="custom-select ca-width input-border-color border text-justify">
                                        <option>Select State</option>
                                    </select>
                                </div>
                                <div className="col-span-6">
                                    <div className="input-label calibre-regular mb-4">Comment</div>
                                    <textarea className="custom-textarea input-border-color border text-justify rounded-md py-3 px-6" placeholder="Type Here"></textarea>
                                </div>
                            </div> 
                        </div>

                        <div className="form-footer px-32 border-t-2 py-10">
                            <div className="flex items-center justify-end">
                                <button type="button" className="btn-login calibre-bold font-18 uppercase primary-light-bg-color primary-text-color mr-3">Cancel</button>
                                <button type="button" className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white">Send</button>
                            </div>
                        </div>

                    </div>



                    <div className="bg-white create-account mb-10">
                        <div className="form-content xl:px-32 lg:px-32 md:px-16 sm:px-10 px-4 py-10">
                            <div className="flex justify-between mb-10 items-end">
                                <div>
                                    <h1 className="hepta-bold primary-text-color whitespace-nowrap">
                                        Your Feedback
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
                                            How was your overall telehealth
                                            experience?
                                        </div>
                                        <div className="feedback-flex flex">
                                            <div className="feedback font-18 cursor-pointer calibre-regular light-gray-color uppercase py-2 px-5 rounded-md border mr-3 selected">
                                                Excellent
                                            </div>
                                            <div className="feedback font-18 cursor-pointer calibre-regular light-gray-color uppercase py-2 px-5 rounded-md border mr-3">
                                                Satisfactory
                                            </div>
                                            <div className="feedback font-18 cursor-pointer calibre-regular light-gray-color uppercase py-2 px-5 rounded-md border mr-3">
                                                Poor
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            How would you rate the quality of
                                            the video?
                                        </div>
                                        <div className="feedback-flex flex">
                                            <div className="feedback font-18 cursor-pointer calibre-regular light-gray-color uppercase py-2 px-5 rounded-md border mr-3 selected">
                                                Excellent
                                            </div>
                                            <div className="feedback font-18 cursor-pointer calibre-regular light-gray-color uppercase py-2 px-5 rounded-md border mr-3">
                                                Satisfactory
                                            </div>
                                            <div className="feedback font-18 cursor-pointer calibre-regular light-gray-color uppercase py-2 px-5 rounded-md border mr-3">
                                                Poor
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            How would you rate the Verbena
                                            platform as it relates to ease,
                                            convenience and overall usage.
                                        </div>
                                        <div className="feedback-flex flex">
                                            <div className="feedback font-18 cursor-pointer calibre-regular light-gray-color uppercase py-2 px-5 rounded-md border mr-3 selected">
                                                Excellent
                                            </div>
                                            <div className="feedback font-18 cursor-pointer calibre-regular light-gray-color uppercase py-2 px-5 rounded-md border mr-3">
                                                Satisfactory
                                            </div>
                                            <div className="feedback font-18 cursor-pointer calibre-regular light-gray-color uppercase py-2 px-5 rounded-md border mr-3">
                                                Poor
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Did you had enough time with your
                                            physician?
                                        </div>
                                        <div className="feedback-flex flex">
                                            <div className="feedback font-18 cursor-pointer calibre-regular light-gray-color uppercase py-2 px-5 rounded-md border mr-3 selected">
                                                Yes
                                            </div>
                                            <div className="feedback font-18 cursor-pointer calibre-regular light-gray-color uppercase py-2 px-5 rounded-md border mr-3">
                                                No
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Would you continue to use telehealth
                                            services in the future?
                                        </div>
                                        <div className="feedback-flex flex">
                                            <div className="feedback font-18 cursor-pointer calibre-regular light-gray-color uppercase py-2 px-5 rounded-md border mr-3 selected">
                                                Yes
                                            </div>
                                            <div className="feedback font-18 cursor-pointer calibre-regular light-gray-color uppercase py-2 px-5 rounded-md border mr-3">
                                                No
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Suggestions
                                        </div>
                                        <textarea
                                            className="custom-textarea border rounded-md p-3"
                                            placeholder="Type Here"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-footer xl:px-32 lg:px-32 md:px-16 sm:px-10 px-4 border-t-2 py-10">
                            <div className="flex items-center justify-end">
                                <button
                                    type="button"
                                    className="btn-login calibre-bold font-18 uppercase primary-light-bg-color primary-text-color mr-3"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                                >
                                    Send Feedback
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6">

                    {/* Upcoming Appointments */}
                    

                    {/* Search Patients */}
                    

                    {/* Provider Appointment Details */}
                    
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12">
                            <h4 className="hepta-slab mb-4">Dotor Details</h4>
                            <div className="bg-white rounded-md mb-3 px-4 py-4">
                                <div className="flex flex-wrap items-center justify-between">
                                    <div>
                                        <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-nowrap">
                                            <div>
                                                <div className="doctor-image primary-bg-color rounded-full mr-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-3 mb-3"></div>
                                            </div>
                                            <div>
                                                <h3 className="hepta-slab mb-2 text-xl leading-none">
                                                    Dr. Rajveer Singh
                                                </h3>
                                                <h6 className="text-base uppercase mb-3 light-dark-gray-color calibre-regular">
                                                    Dermatologist
                                                </h6>
                                                <div className="provider-education calibre-regular flex items-center xl:flex-nowrap md:flex-wrap mb-3 whitespace-nowrap">
                                                    <div className="edu-icon mr-3">
                                                        <i className="fas fa-graduation-cap"></i>
                                                    </div>
                                                    <div className="light-gray-color text-base calibre-regular">
                                                        MBBS, Diploma in
                                                        Dermatology
                                                    </div>
                                                </div>
                                                <div className="provider-address calibre-regular flex xl:flex-nowrap md:flex-wrap">
                                                    <div className="address-icon mr-3">
                                                        <i className="fas fa-map-marker-alt"></i>
                                                    </div>
                                                    <div className="light-gray-color text-base calibre-regular">
                                                        79th, 308 E New York, NY
                                                        10075 United States
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="quick-btn">
                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    className="modal-open btn-ready-visit px-3 py-2 rounded-full uppercase text-white primary-bg-color mr-3"
                                                >
                                                    Ready For Visit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-reschedule px-3 py-2 rounded-full uppercase text-white primary-dim-bg-color mr-3"
                                                >
                                                    Reschedule
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-cancel-meet px-3 py-2 rounded-full uppercase primary-text-color primary-light-bg-color"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4 className="hepta-slab mb-4">Patient Details</h4>
                            <div className="bg-white rounded-md mb-3 px-4 py-4">
                                <div className="flex flex-wrap justify-between">
                                    <div>
                                        <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-nowrap">
                                            <div>
                                                <div className="doctor-image primary-bg-color rounded-full mr-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-3 mb-3"></div>
                                            </div>
                                            <div>
                                                <h3 className="hepta-slab mb-1 text-xl">
                                                    Ramdas Singh
                                                </h3>
                                                <div className="flex flex-nowrap mb-1">
                                                    <div className="font-18 light-dark-gray-color mr-3 pr-3 leading-tight border-r-2">
                                                        Male
                                                    </div>
                                                    <div className="font-18 light-dark-gray-color leading-tight">
                                                        32
                                                    </div>
                                                </div>
                                                <div className="flex flex-nowrap mb-1">
                                                    <div className="font-18 light-dark-gray-color mr-3 pr-3 leading-tight border-r-2">
                                                        3 June 2021
                                                    </div>
                                                    <div className="font-18 light-dark-gray-color leading-tight">
                                                        2:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex flex-nowrap">
                                                    <div className="font-18 light-dark-gray-color">
                                                        Reason for your visit{" "}
                                                        <span className="text-black calibre-bold">
                                                            Pimple Treatment
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 

                            {/* Questionnaire Details */}
                            <h4 className="hepta-slab mb-4 heading-toggle-1 cursor-pointer">Questionnaire Details <span className="float-right"><i className="fas fa-chevron-down"></i></span></h4>
                            <div className="bg-white rounded-md mb-6 tab-1">
                                <div className="health-info border-b-1">
                                    <h3 className="dark-color text-xl px-5 py-2 calibre-regular">
                                        Do you have High Blood Pressure?
                                    </h3>
                                    <p className="px-5 py-2 text-2xl calibre-bold text-2x">
                                        Yes
                                    </p>
                                </div>
                                <div className="health-info border-b-1">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Do you have Heart Disease?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        No
                                    </p>
                                </div>
                                <div className="health-info border-b-1">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Do you suffer from Migraines?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        Yes
                                    </p>
                                </div>
                                <div className="health-info border-b-1">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Did you suffer from any kind of stroke
                                        in your body?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        No
                                    </p>
                                </div>
                                <div className="health-info border-b-1">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Do you suffer from Diabetes?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        Unsure
                                    </p>
                                </div>
                                <div className="health-info">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Do you suffer from Cancer?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        Yes
                                    </p>
                                </div>
                            </div>
                            {/* Basic Health Questionner */}
                            <h4 className="hepta-slab mb-4 heading-toggle-2 cursor-pointer">Basic Health Questionner <span className="p-2 primary-bg-color rounded-2xl text-white font-14">25 Sep 2019</span><span className="float-right"><i className="fas fa-chevron-down"></i></span></h4>
                            <div className="bg-white rounded-md mb-6 tab-2">
                                <div className="health-info border-b-1">
                                    <h3 className="dark-color text-xl px-5 py-2 calibre-regular">
                                        Do you have High Blood Pressure?
                                    </h3>
                                    <p className="px-5 py-2 text-2xl calibre-bold text-2x">
                                        Yes
                                    </p>
                                </div>
                                <div className="health-info border-b-1">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Do you have Heart Disease?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        No
                                    </p>
                                </div>
                                <div className="health-info border-b-1">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Do you suffer from Migraines?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        Yes
                                    </p>
                                </div>
                                <div className="health-info border-b-1">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Did you suffer from any kind of stroke
                                        in your body?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        No
                                    </p>
                                </div>
                                <div className="health-info border-b-1">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Do you suffer from Diabetes?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        Unsure
                                    </p>
                                </div>
                                <div className="health-info">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Do you suffer from Cancer?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        Yes
                                    </p>
                                </div>
                            </div>
                            <h4 className="hepta-slab mb-4">Complaint</h4>
                            <div className="bg-white rounded-md mb p-6 mb-6">
                                <textarea className="w-full p-4 border rounded-md" placeholder="Type Here"></textarea>        
                            </div>
                            <h4 className="hepta-slab mb-4">Diagnosis</h4>
                            <div className="bg-white rounded-md mb p-6 mb-6">
                                <textarea className="w-full p-4 border rounded-md" placeholder="Type Here"></textarea>        
                            </div>
                            <h4 className="hepta-slab mb-4">Lab Test</h4>
                            <div className="bg-white rounded-md mb-6">
                                <div className="content p-6 border-b-1">
                                    <div className="grid grid-cols-12 gap-6 items-center">
                                        <div className="col-span-2">
                                            <input type="text" placeholder="Lab Test Name" className="custom-input w-full border rounded input-border"/>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="relative">
                                                <button type="button" className="btn-reschedule px-3 py-2 rounded-full uppercase text-white primary-dim-bg-color mr-3">Upload Report</button>
                                                {/* <div className="upload-report-input">
                                                    <input type="file" id="upload-report" name="upload"/>
                                                    <label for="upload-report" className="px-3 py-2 rounded-full uppercase text-white primary-dim-bg-color">Upload Report</label>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-footer p-6">
                                    <div className="flex justify-center">
                                        <a href="#"><i className="fas fa-plus-circle primary-text-color align-middle mr-2"></i>ADD MORE TEST</a>
                                    </div>
                                </div>     
                            </div>

                            <h4 className="hepta-slab mb-4">Lab Test</h4>
                            <div className="bg-white rounded-md mb-6">
                                <div className="content">
                                    <div class="p-3 border-b-1 mb-3">
                                        <div className="flex justify-between items-center">
                                            <div className="">
                                                <h2 className="font-16 m-0 calibre-regular"><i className="fas fa-file mr-3"></i>CT Scan</h2>
                                            </div>
                                            <div className="relative">
                                                <button type="button" class="btn-reschedule px-3 py-2 rounded-full uppercase text-white primary-dim-bg-color mr-3">Download Report</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="p-3 border-b-1 mb-3">
                                        <div className="flex justify-between items-center">
                                            <div className="">
                                                <h2 className="font-16 m-0 calibre-regular"><i className="fas fa-file mr-3"></i>Ultra Sound</h2>
                                            </div>
                                            <div className="relative">
                                                <button type="button" class="btn-reschedule px-3 py-2 rounded-full uppercase text-white primary-dim-bg-color mr-3">Download Report</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="p-3 border-b-1 mb-3">
                                        <div className="flex justify-between items-center">
                                            <div className="">
                                                <h2 className="font-16 m-0 calibre-regular"><i className="fas fa-file mr-3"></i>Blood Test</h2>
                                            </div>
                                            <div className="relative">
                                                <button type="button" class="btn-reschedule px-3 py-2 rounded-full uppercase text-white primary-dim-bg-color mr-3">Download Report</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>    
                            </div>


                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mb-10">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50 calibre-regular thead-bg">
                                        <tr>
                                            <th scope="col" class="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider">Medicine Name</th>
                                            <th scope="col" class="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider">Type</th>
                                            <th scope="col" class="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider">Dosage</th>
                                            <th scope="col" class="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider">duration</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white">
                                        <tr>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">Dolo 6</td>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">Crocin</td>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">Paracetamol</td>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">ciprofloxacin</td>
                                        </tr>
                                        <tr>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">Dolo 6</td>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">Crocin</td>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">Paracetamol</td>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">ciprofloxacin</td>
                                        </tr>
                                        <tr>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">Dolo 6</td>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">Crocin</td>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">Paracetamol</td>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">ciprofloxacin</td>
                                        </tr>
                                        <tr>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">Dolo 6</td>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">Crocin</td>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">Paracetamol</td>
                                            <td class="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">ciprofloxacin</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                            <h4 className="hepta-slab mb-4">Medication</h4>
                            <div className="bg-white rounded-md mb-6">
                                <div className="content p-6 border-b-1">
                                    <div className="grid grid-cols-4 gap-6 items-center">
                                        <div className="">
                                            <input type="text" placeholder="Drug Name" className="custom-input w-full border rounded input-border"/>
                                        </div>
                                        <div className="">
                                            <input type="text" placeholder="Drug Type" className="custom-input w-full border rounded input-border"/> 
                                        </div>
                                        <div className="">
                                            <input type="text" placeholder="Dosage" className="custom-input w-full border rounded input-border"/> 
                                        </div>
                                        <div className="">
                                            <input type="text" placeholder="Duration" className="custom-input w-full border rounded input-border"/> 
                                        </div>
                                    </div>
                                </div>
                                <div className="content-footer p-6">
                                    <div className="flex justify-center">
                                        <a href="#"><i className="fas fa-plus-circle primary-text-color align-middle mr-2 uppercase"></i>ADD MORE MEDICINE</a>
                                    </div>
                                </div>     
                            </div>
                            <h4 className="hepta-slab mb-4">Assesment and Plan</h4>
                            <div className="bg-white rounded-md mb p-6 mb-6">
                                <textarea className="w-full p-4 border rounded-md" placeholder="Type Here"></textarea>        
                            </div>

                            <div className="flex items-center justify-center">
                                <button type="button" className="btn-login calibre-bold font-18 uppercase primary-dim-bg-color text-white mr-3">Cancel</button>
                                <button type="button" className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white">Complete Appointment</button>
                            </div>

                        </div>               
                    </div>



                    {/* Appoint ment Detail */}
                    <h2 className="hepta-bold primary-text-color mb-4">
                        Appointment Details
                    </h2>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-4">
                            <h4 className="hepta-slab mb-4">Dotor Details</h4>

                            <div className="bg-white rounded-md mb-3 px-4 py-4">
                                <div className="flex flex-wrap items-center justify-between">
                                    <div>
                                        <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-nowrap">
                                            <div>
                                                <div className="doctor-image primary-bg-color rounded-full mr-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-3 mb-3"></div>
                                            </div>
                                            <div>
                                                <h3 className="hepta-slab mb-2 text-xl leading-none">
                                                    Dr. Rajveer Singh
                                                </h3>
                                                <h6 className="text-base uppercase mb-3 light-dark-gray-color calibre-regular">
                                                    Dermatologist
                                                </h6>
                                                <div className="provider-education calibre-regular flex items-center xl:flex-nowrap md:flex-wrap mb-3 whitespace-nowrap">
                                                    <div className="edu-icon mr-3">
                                                        <i className="fas fa-graduation-cap"></i>
                                                    </div>
                                                    <div className="light-gray-color text-base calibre-regular">
                                                        MBBS, Diploma in
                                                        Dermatology
                                                    </div>
                                                </div>
                                                <div className="provider-address calibre-regular flex xl:flex-nowrap md:flex-wrap">
                                                    <div className="address-icon mr-3">
                                                        <i className="fas fa-map-marker-alt"></i>
                                                    </div>
                                                    <div className="light-gray-color text-base calibre-regular">
                                                        79th, 308 E New York, NY
                                                        10075 United States
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="quick-btn">
                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    className="modal-open btn-ready-visit px-3 py-2 rounded-full uppercase text-white primary-bg-color mr-3"
                                                >
                                                    Ready For Visit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-reschedule px-3 py-2 rounded-full uppercase text-white primary-dim-bg-color mr-3"
                                                >
                                                    Reschedule
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-cancel-meet px-3 py-2 rounded-full uppercase primary-text-color primary-light-bg-color"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h4 className="hepta-slab mb-4">
                                Basic Health Information
                            </h4>
                            <div className="bg-white rounded-md mb-3">
                                <div className="health-info border-b-1">
                                    <h3 className="dark-color text-xl px-5 py-2 calibre-regular">
                                        Do you have High Blood Pressure?
                                    </h3>
                                    <p className="px-5 py-2 text-2xl calibre-bold text-2x">
                                        Yes
                                    </p>
                                </div>
                                <div className="health-info border-b-1">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Do you have Heart Disease?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        No
                                    </p>
                                </div>
                                <div className="health-info border-b-1">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Do you suffer from Migraines?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        Yes
                                    </p>
                                </div>
                                <div className="health-info border-b-1">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Did you suffer from any kind of stroke
                                        in your body?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        No
                                    </p>
                                </div>
                                <div className="health-info border-b-1">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Do you suffer from Diabetes?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        Unsure
                                    </p>
                                </div>
                                <div className="health-info border-b-1">
                                    <h3 className="text-xl dark-color px-5 py-2 calibre-regular">
                                        Do you suffer from Cancer?
                                    </h3>
                                    <p className="text-2xl px-5 py-2 calibre-bold text-2x">
                                        Yes
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <h4 className="hepta-slab mb-4">
                                Patients Details
                            </h4>
                            <div className="bg-white rounded-md mb-3 px-4 py-4">
                                <div className="flex flex-wrap justify-between">
                                    <div>
                                        <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-nowrap">
                                            <div>
                                                <div className="doctor-image primary-bg-color rounded-full mr-5 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-3 mb-3"></div>
                                            </div>
                                            <div>
                                                <h3 className="hepta-slab mb-1 text-xl">
                                                    Ramdas Singh
                                                </h3>
                                                <div className="flex flex-nowrap mb-1">
                                                    <div className="font-18 light-dark-gray-color mr-3 pr-3 leading-tight border-r-2">
                                                        Male
                                                    </div>
                                                    <div className="font-18 light-dark-gray-color leading-tight">
                                                        32
                                                    </div>
                                                </div>
                                                <div className="flex flex-nowrap mb-1">
                                                    <div className="font-18 light-dark-gray-color mr-3 pr-3 leading-tight border-r-2">
                                                        3 June 2021
                                                    </div>
                                                    <div className="font-18 light-dark-gray-color leading-tight">
                                                        2:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex flex-nowrap">
                                                    <div className="font-18 light-dark-gray-color">
                                                        Reason for your visit{" "}
                                                        <span className="text-black calibre-bold">
                                                            Pimple Treatment
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    zzz
                    {/* Welcome Page */}
                    <div className="page-title">
                        <h2 className="hepta-bold text-center primary-text-color mb-2">
                            Visit Reason
                        </h2>
                        <p className="tt text-2xl dark-gray-color text-center mb-10">
                            Please Select the Primary Reason for your
                            Appointment.
                        </p>
                    </div>
                    <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-4">
                        <div className="bg-white reason-box relative py-4 px-3 rounded-full calibre-regular dark-gray-color cursor-pointer selected">
                            Contraception
                        </div>
                        <div className="bg-white reason-box relative py-4 px-3 rounded-full calibre-regular dark-gray-color cursor-pointer">
                            Genetic Screening for Cancer
                        </div>
                        <div className="bg-white reason-box relative py-4 px-3 rounded-full calibre-regular dark-gray-color cursor-pointer">
                            Herpes Simplex(Oral & Genital)
                        </div>
                        <div className="bg-white reason-box relative py-4 px-3 rounded-full calibre-regular dark-gray-color cursor-pointer">
                            Irregular Bleeding/Iregular Periods
                        </div>
                        <div className="bg-white reason-box relative py-4 px-3 rounded-full calibre-regular dark-gray-color cursor-pointer">
                            Menopause
                        </div>
                        <div className="bg-white reason-box relative py-4 px-3 rounded-full calibre-regular dark-gray-color cursor-pointer">
                            Morning After Pill
                        </div>
                        <div className="bg-white reason-box relative py-4 px-3 rounded-full calibre-regular dark-gray-color cursor-pointer">
                            Preconception Counseling & Fertility
                        </div>
                        <div className="bg-white reason-box relative py-4 px-3 rounded-full calibre-regular dark-gray-color cursor-pointer">
                            PMDD and PMS
                        </div>
                        <div className="bg-white reason-box relative py-4 px-3 rounded-full calibre-regular dark-gray-color cursor-pointer">
                            STI
                        </div>
                        <div className="bg-white reason-box relative py-4 px-3 rounded-full calibre-regular dark-gray-color cursor-pointer">
                            Urinary Tract Infection
                        </div>
                        <div className="bg-white reason-box relative py-4 px-3 rounded-full calibre-regular dark-gray-color cursor-pointer">
                            Vaginal Infection
                        </div>
                        <div className="bg-white reason-box relative py-4 px-3 rounded-full calibre-regular dark-gray-color cursor-pointer">
                            Others
                        </div>
                    </div>
                    xxx{" "}
                </div>
            </div>
        </>
    );
};
export default CommonPage;
