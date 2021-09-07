import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { AppointmentService } from "../../../services";
import { AppointmentActions } from "../../../redux/slice/appointment.slice";

function Medication({ appointmentId, oldMedication, setOldMedication }) {
    const dispatch = useDispatch();
    const [medication, setMedication] = useState([]);

    const addMedication = () => {
        setMedication([
            ...medication,
            { name: "", type: "", dosage: "", duration: "" },
        ]);
    };

    const removeMedication = (index, type) => {
        if (type === "old") {
            let fileArr = [...oldMedication];
            fileArr.splice(index, 1);
            setOldMedication(fileArr);
        } else {
            let fileArr = [...medication];
            fileArr.splice(index, 1);
            setMedication(fileArr);
        }
    };

    const saveMedication = async () => {
        try {
            await AppointmentService.saveAppointmentMedication(appointmentId, {
                create: medication,
                update: oldMedication,
            });
            toast.success("Medication saved successfully");
            dispatch(AppointmentActions.fetchAppointmentDetail(appointmentId));
            setMedication([]);
        } catch (error) {
            toast.error("Error Saving Medication");
        }
    };

    const handleChange = (event, index, type) => {
        let fileArr = [];
        if (type === "old") {
            fileArr = [...oldMedication];
        } else {
            fileArr = [...medication];
        }

        fileArr[index] = {
            ...fileArr[index],
            [event.target.name]: event.target.value,
        };
        if (type === "old") {
            setOldMedication(fileArr);
        } else {
            setMedication(fileArr);
        }
    };

    return (
        <>
            <h4 className="hepta-slab mb-4">Medication</h4>
            <button
                className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                onClick={() => addMedication()}
            >
                +
            </button>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mb-10">
                {medication.length + oldMedication.length > 0 && (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 calibre-regular thead-bg">
                            <tr>
                                <th
                                    scope="col"
                                    className="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider"
                                >
                                    Medicine Name
                                </th>
                                <th
                                    scope="col"
                                    className="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider"
                                >
                                    Type
                                </th>
                                <th
                                    scope="col"
                                    className="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider"
                                >
                                    Dosage
                                </th>
                                <th
                                    scope="col"
                                    className="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider"
                                >
                                    duration
                                </th>
                                <th
                                    scope="col"
                                    className="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider"
                                >
                                    action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {oldMedication.map((medicine, index) => (
                                <tr key={index}>
                                    <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        <input
                                            className="custom-input input-border-color border"
                                            value={medicine.name}
                                            name="name"
                                            onChange={(e) =>
                                                handleChange(e, index, "old")
                                            }
                                        />
                                    </td>
                                    <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        <input
                                            className="custom-input input-border-color border"
                                            value={medicine.type}
                                            name="type"
                                            onChange={(e) =>
                                                handleChange(e, index, "old")
                                            }
                                        />
                                    </td>
                                    <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        <input
                                            className="custom-input input-border-color border"
                                            value={medicine.dosage}
                                            name="dosage"
                                            onChange={(e) =>
                                                handleChange(e, index, "old")
                                            }
                                        />
                                    </td>
                                    <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        <input
                                            className="custom-input input-border-color border"
                                            value={medicine.duration}
                                            name="duration"
                                            onChange={(e) =>
                                                handleChange(e, index, "old")
                                            }
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className="btn-create-account calibre-bold font-18 uppercase primary-text-color mr-3"
                                            onClick={() =>
                                                removeMedication(index, "old")
                                            }
                                        >
                                            -
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {medication.map((medicine, index) => (
                                <tr key={index}>
                                    <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        <input
                                            className="custom-input input-border-color border"
                                            value={medicine.name}
                                            name="name"
                                            onChange={(e) =>
                                                handleChange(e, index)
                                            }
                                        />
                                    </td>
                                    <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        <input
                                            className="custom-input input-border-color border"
                                            value={medicine.type}
                                            name="type"
                                            onChange={(e) =>
                                                handleChange(e, index)
                                            }
                                        />
                                    </td>
                                    <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        <input
                                            className="custom-input input-border-color border"
                                            value={medicine.dosage}
                                            name="dosage"
                                            onChange={(e) =>
                                                handleChange(e, index)
                                            }
                                        />
                                    </td>
                                    <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                                        <input
                                            className="custom-input input-border-color border"
                                            value={medicine.duration}
                                            name="duration"
                                            onChange={(e) =>
                                                handleChange(e, index)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className="btn-create-account calibre-bold font-18 uppercase primary-text-color mr-3"
                                            onClick={() =>
                                                removeMedication(index)
                                            }
                                        >
                                            -
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {medication.length + oldMedication.length > 0 && (
                    <div className="justify-center">
                        <button
                            className="btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                            onClick={() => saveMedication()}
                        >
                            save
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Medication;
