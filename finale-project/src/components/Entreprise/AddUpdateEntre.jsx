import axios from "axios";
import React, { useState, useEffect } from "react";

export default function AddUpdateEntre({onClose,setonClose,update,fetchDataEntr,editData}) {
  const [dataForm, setDataForm] = useState({
    desg_entr: "",
    email_entr: "",
    adresse_entr: "",
    tele_ent: "",
    fax_ent: "",
    logo_entr: null,
    amo_entr: "",
    cimr_entr: "",
    cnss_entr: ""
  });
  const [imagePreview, setImagePreview] = useState("");
  useEffect(() => {
    if (editData) {
      setDataForm(editData);
    }
  }, [editData]);
  // Fetch Add
  const fetchAdd = () => {
    axios
      .post("http://localhost:8080/Entreprise/insert", dataForm)
      .then((resp) => {
        console.log(dataForm);
        console.log(resp.data);

        fetchDataEntr();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Fetch Update
  const fetchUpdate = async () => {
    try {
      // Update enterprise details
      const updateResponse = await axios.put(
        "http://localhost:8080/Entreprise/update",
        dataForm
      );
      console.log(updateResponse.data);
      fetchDataEntr();

      // If a new logo is selected
      if (dataForm.logo_entr) {
        const formData = new FormData();
        formData.append("file", dataForm.logo_entr);
        formData.append("upload_preset", "fxddebs5");

        const enterpriseID = dataForm.id; // Assuming enterprise ID is present in dataForm
        const publicID = `enterprise_${enterpriseID}_logo`; // Construct public ID

        // Upload new logo to Cloudinary
        const logoResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            params: {
              public_id: publicID // Set public ID with enterprise ID
            }
          }
        );

        // Update dataForm with the new logo URL
        setDataForm((prevData) => ({
          ...prevData,
          logo_entr: logoResponse.data.secure_url
        }));
      }
    } catch (error) {
      console.error("Error updating enterprise:", error);
    }
  };
  //handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (update) {
      fetchUpdate();
      setonClose(false);
    } else {
      fetchAdd();
      setonClose(false);
    }
  };
  //logo

  const CLOUDNAME = "dlua6kceg";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "fxddebs5");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        setDataForm((prevData) => ({
          ...prevData,
          logo_entr: response.data.secure_url
        }));

        setImagePreview(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  if (!onClose) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm  ">
      <div className="max-w-lg mx-auto p-4 sm:p-6 lg:p-8 flex justify-center items-center transition-colors mt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:max-w-md md:max-w-lg lg:max-w-xl"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Logo
            </label>
            <input
              type="file"
              id="logo_entr"
              name="logo_entr"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Logo Preview"
                className="mt-2"
                style={{ width: "100px", height: "100px" }}
              />
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="designation"
              >
                Designation
              </label>
              <input
                type="text"
                id="desg_entr"
                name="desg_entr"
                value={dataForm.desg_entr}
                onChange={handleChange}
                placeholder="Designation"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email_entr"
                name="email_entr"
                placeholder="Email"
                value={dataForm.email_entr}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nTele"
              >
                Numero Telephone
              </label>
              <input
                type="text"
                id="tele_ent"
                name="tele_ent"
                value={dataForm.tele_ent}
                onChange={handleChange}
                placeholder="Numero Telephone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="adress"
              >
                Adress
              </label>
              <input
                type="text"
                id="adresse_entr"
                name="adresse_entr"
                placeholder="Adress"
                value={dataForm.adresse_entr}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fax"
              >
                Fax
              </label>
              <input
                type="text"
                id="fax_ent"
                name="fax_ent"
                placeholder="Fax"
                value={dataForm.fax_ent}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="amo"
              >
                Amo
              </label>
              <input
                type="number"
                id="amo_entr"
                name="amo_entr"
                placeholder="Amo"
                value={dataForm.amo_entr}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cnss"
              >
                Cnss
              </label>
              <input
                type="number"
                id="cnss_entr"
                name="cnss_entr"
                value={dataForm.cnss_entr}
                onChange={handleChange}
                placeholder=" Cnss"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cimr"
              >
                Cimr
              </label>
              <input
                type="number"
                id="cimr_entr"
                name="cimr_entr"
                value={dataForm.cimr_entr}
                onChange={handleChange}
                placeholder=" Cimr"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around">
            <button
              type="submit"
              className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 sm:mb-0"
            >
              {update ? "Modifier" : "Ajouter"}
            </button>
            <button
              onClick={() => {
                setonClose(false);
              }}
              type="button"
              className="w-full sm:w-auto bg-indigo-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}