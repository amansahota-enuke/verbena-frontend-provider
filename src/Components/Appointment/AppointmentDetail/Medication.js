import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { AppointmentService } from "../../../services";
import { AppointmentActions } from "../../../redux/slice/appointment.slice";
import { PlusIcon } from "@heroicons/react/solid";

function Medication({ appointmentId, oldMedication, setOldMedication, fetchAppointment }) {
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
      fetchAppointment()
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
      <h4 className="hepta-slab px-4 py-3 rounded-md mb-2 bg-white">
        Medication{" "}
        <button
          className="rounded-full p-2 w-8 h-8 calibre-bold font-18 uppercase primary-bg-color text-white"
          onClick={() => addMedication()}
        >
          <PlusIcon />
        </button>
      </h4>

      <div className="mb-10">
        <div className="shadow border-gray-200 mb-3 sm:rounded-lg overflow-hidden">
          {medication.length + oldMedication.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 calibre-regular thead-bg">
                  <tr>
                    <th
                      scope="col"
                      className="dark-gray-color px-6 py-3 text-left font-16 uppercase tracking-wider"
                    >
                      Medicine Name
                    </th>
                    <th
                      scope="col"
                      className="dark-gray-color px-6 py-3 text-left font-16 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="dark-gray-color px-6 py-3 text-left font-16 uppercase tracking-wider"
                    >
                      Dosage
                    </th>
                    <th
                      scope="col"
                      className="dark-gray-color px-6 py-3 text-left font-16 uppercase tracking-wider"
                    >
                      duration
                    </th>
                    <th
                      scope="col"
                      className="text-center dark-gray-color px-6 py-3 font-16 uppercase tracking-wider"
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
                          onChange={(e) => handleChange(e, index, "old")}
                        />
                      </td>
                      <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                        <input
                          className="custom-input input-border-color border"
                          value={medicine.type}
                          name="type"
                          onChange={(e) => handleChange(e, index, "old")}
                        />
                      </td>
                      <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                        <input
                          className="custom-input input-border-color border"
                          value={medicine.dosage}
                          name="dosage"
                          onChange={(e) => handleChange(e, index, "old")}
                        />
                      </td>
                      <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                        <input
                          className="custom-input input-border-color border"
                          value={medicine.duration}
                          name="duration"
                          onChange={(e) => handleChange(e, index, "old")}
                        />
                      </td>
                      <td className="text-center">
                        <button
                          className="font-14 calibre-bold"
                          onClick={() => removeMedication(index, "old")}
                        >
                          REMOVE
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
                          onChange={(e) => handleChange(e, index)}
                        />
                      </td>
                      <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                        <input
                          className="custom-input input-border-color border"
                          value={medicine.type}
                          name="type"
                          onChange={(e) => handleChange(e, index)}
                        />
                      </td>
                      <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                        <input
                          className="custom-input input-border-color border"
                          value={medicine.dosage}
                          name="dosage"
                          onChange={(e) => handleChange(e, index)}
                        />
                      </td>
                      <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                        <input
                          className="custom-input input-border-color border"
                          value={medicine.duration}
                          name="duration"
                          onChange={(e) => handleChange(e, index)}
                        />
                      </td>
                      <td className="text-center">
                        <button
                          className="calibre-bold font-14"
                          onClick={() => removeMedication(index)}
                        >
                          REMOVE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {medication.length + oldMedication.length > 0 && (
          <div className="justify-center">
            <button
              className="btn-login calibre-regular font-18 uppercase primary-bg-color text-white"
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
