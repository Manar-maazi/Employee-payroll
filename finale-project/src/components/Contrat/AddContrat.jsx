import axios from "axios";
import React, { useState, useEffect } from "react";

export default function AddContrat({
  onClose,
  setclose,
  fetchData,
  ifUpdate,
  editData
}) {
  const [formData, setFormData] = useState({nameContrat:""});
  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ifUpdate) {
      updateFetch();
    } else {
      fetchAdd();
    }
  };

// Add new contract
  const fetchAdd = () => {
    axios
      .post("http://localhost:8080/Contrat/insert", formData)
      .then((response) => {
        console.log(response.data);
        fetchData(); // Refresh the data
        setclose(false); // Close the modal
      })
      .catch((err) => {
        console.error("Error adding contract:", err);
      });
  };

  // Update existing contract
  const updateFetch = () => {
    axios
      .put(`http://localhost:8080/Contrat/update`, formData)
      .then((response) => {
        console.log(response.data);
        fetchData();
        setclose(false);
      })
      .catch((err) => {
        console.error("Error updating contract:", err);
      });
  };

  // View the modal
  if (!onClose) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nameContrat"
            >
              Contrat
            </label>
            <input
              type="text"
              id="nameContrat"
              name="nameContrat"
              placeholder="Contrat"
              value={formData.nameContrat}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-around">
            <button
              type="submit"
              className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 sm:mb-0"
            >
              {ifUpdate ? "Modifier" : "Ajouter"}
            </button>
            <button
              onClick={() => setclose(false)}
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
