import React, { useState, useEffect } from "react";
import axios from "axios";

//import UserService from '../Service/UserService';
//import { useNavigate } from 'react-router-dom';



export default function UpdateAddUsers({

  onClose,
  setonClose,
  update,
  fetchDataUsers,
  editData,
  role
}) {
  const [dataForm, setDataForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    mode_de_pass: "",
    role: "",
   
  });

  useEffect(() => {
    if (editData) {
      setDataForm(editData);
    }
  }, [editData]);

  // Fetch Add
  const fetchAdd = () => {
    axios
      .post("http://localhost:8080/Utilisateur/auth/register", dataForm)
      .then((resp) => {
        console.log("Utilisateur ajouté:", dataForm);
        console.log(resp.data);
        fetchDataUsers();
      })
      .catch((err) => {
        console.error("Erreur lors de l'ajout:", err);
      });
  };

  // Fetch Update
  const fetchUpdate = () => {
    axios
      .put(`http://localhost:8080/Utilisateur/admin/update/${dataForm.id}`, dataForm)
      .then((resp) => {
        console.log("Utilisateur mis à jour:", dataForm);
        console.log(resp.data);
        fetchDataUsers();
      })
      .catch((err) => {
        console.log("DTAAFORM:", dataForm);
        console.error("Erreur lors de la mise à jour:", err);
      });
  };

  // Handle Submit
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

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") {
      setDataForm({
        ...dataForm,
        [name]: value
      });
    } else if (name === "id") {
      setDataForm({
        ...dataForm
      });
    } else {
      setDataForm((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  if (!onClose) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="max-w-lg mx-auto p-4 sm:p-6 lg:p-8 flex justify-center items-center transition-colors mt-32">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:max-w-md md:max-w-lg lg:max-w-xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Nom"
                value={dataForm.nom}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prenom">
                Prenom
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                placeholder="Prenom"
                value={dataForm.prenom}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={dataForm.email}
                onChange={handleChange}
                placeholder="Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mot_de_pass">
                Mot de pass
              </label>
              <input
                type="password"
                id="mot_de_pass"
                name="mot_de_pass"
                value={dataForm.mot_de_pass}
                onChange={handleChange}
                placeholder="Mot de pass"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
             
              // value={dataForm.role || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value=""  >
                Select Role
              </option>
              <option key="ADMIN" value="ADMIN">
                ADMIN
              </option>
              <option key="COMPTABLE" value="COMPTABLE">
                COMPTABLE
              </option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-around">
            <button
              type="submit"
              className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 sm:mb-0"
            >
              {update ? "Modifier" : "Ajouter"}
            </button>
            <button
              onClick={() => setonClose(false)}
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
