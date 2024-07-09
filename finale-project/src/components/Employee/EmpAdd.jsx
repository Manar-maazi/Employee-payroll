import axios from "axios";
import React, { useState, useEffect } from "react";

export default function EmpAdd({
  onClose,
  setclose,
  contrat,
  Entreprise,
  fetchData,
  ifUpdate,
  editData,
 
}) {
  const [formData, setFormData] = useState({
    nom_e: "",
    prenom_e: "",
    tele_e: "",
    cin_e: "",
    ncnss_e: "",
    dateN_e: "",
    dateEmb_e: "",
    matricul_e: "",
    fonction_e: "",
    image: "",
    base: 0,
    cimr: "",
    amo: "",
    sf_e: "",
    nd_e: 1,
    contrat: { id: "" },
    entreprise: { id_entr: "" }
  });
  const [imagePreview, setImagePreview] = useState("");
  const CLOUDNAME = "dlua6kceg";

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
  
    const { name, value } = e.target;
    if (name === "contrat") {
      setFormData({ ...formData, [name]: { id: Number(value) } });
    } else if (name === "entreprise") {
      setFormData({ ...formData, [name]: { id_entr: Number(value) } });
    } else if (name === "matricul_e" || name === "nd_e" || name === "base") {
      setFormData({ ...formData, [name]: Number(value) });
    }  
   
    
    
    else {
      setFormData({ ...formData, [name]: value });
      console.log(name,value);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", "fxddebs5");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/upload`,
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        setFormData({ ...formData, image: response.data.secure_url });
        setImagePreview(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const fetchAdd = () => {
    axios
      .post("http://localhost:8080/emp/add_emp", formData)
      .then((response) => {
        console.log(response.data);
        fetchData(); // Refresh the data
        setclose(false);
       // Close the modal
      })
      .catch((err) => {
        console.error("Error adding emp:", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ifUpdate) {
      fetchUpdate();
    } else {
      console.log(formData);
      fetchAdd();
    }
    console.log("hhhh",formData)
    setclose(false);
  };

  const fetchUpdate = async () => {
    try {
      const updateResponse = await axios.put(
        "http://localhost:8080/emp/Update",
        formData
      );
      console.log(updateResponse.data);
      fetchData();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  if (!onClose) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
      <div
        className="max-w-lg mx-auto   flex justify-center items-center transition-colors 
       mt-20
      overflow-y-auto"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-10 pb-8  mx-auto  mt-2 "
        >
          {" "}
          <div className="flex -mx-3 mb-3">
            <div className="w-full md:w-1/2  mb-4 md:mb-0">
               <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Logo Preview"
                  className="mt-1"
                  style={{ width: "50px", height: "50px" }}
                />
              )}
            </div>
            <div className="w-full md:w-1/2 px-3">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="matricul_e"
              >
                Matricule
              </label>
              <input
                type="number"
                id="matricul_e"
                name="matricul_e"
                value={formData.matricul_e}
                placeholder="matricule"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fonction_e"
              >
                Fonction
              </label>
              <input
                type="text"
                id="fonction_e"
                name="fonction_e"
                value={formData.fonction_e}
                placeholder="Fonction"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
         
          <div className="flex -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nom_e"
              >
                Nom
              </label>
              <input
                type="text"
                id="nom_e"
                name="nom_e"
                placeholder="Nom"
                value={formData.nom_e}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="prenom_e"
              >
                Prenom
              </label>
              <input
                type="text"
                id="prenom_e"
                name="prenom_e"
                placeholder="Prenom"
                value={formData.prenom_e}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tele_e"
              >
                Numero Telephone
              </label>
              <input
                type="text"
                id="tele_e"
                name="tele_e"
                placeholder="Numero Telephone"
                value={formData.tele_e}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        
          <div className="flex -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="SF_e"
              >
                Situation familiale
              </label>
              <select
                id="sf_e"
                name="sf_e"
                value={formData.sf_e}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >         
                <option value="">
                  Select </option>
                <option value="C">Celibataire
                </option>
                <option value="M">Marié 
                </option>
                <option value="D">divorcé 
                </option>
              </select>
            </div>
            <div className="w-full md:w-1/2 px-3">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cin_e"
              >
                Cin
              </label>
              <input
                type="text"
                id="cin_e"
                name="cin_e"
                placeholder="Cin"
                value={formData.cin_e}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
         
            </div>
            <div className="w-full md:w-1/2 px-3">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dedut"
              >
                Dedut
              </label>
              <input
                type="number"
                id="dedut"
                name="nd_e"
                placeholder="Dedut"
                value={formData.nd_e}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          
        
       
       
       
          <div className="flex -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="amo"
              >
                Taux Amo
              </label>
              <input
                type="text"
                id="amo"
                name="amo"
                placeholder="Taux Amo"
                value={formData.amo}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cnss"
              >
               Taux Cnss
              </label>
              <input
                type="text"
                id="Ncnss_e"
                name="ncnss_e"
                placeholder="Taux Cnss"
                value={formData.ncnss_e}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cimr"
              >
                Taux Cimr
              </label>
              <input
                type="text"
                id="cimr"
                name="cimr"
                placeholder="Taux Cimr"
                value={formData.cimr}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="flex -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dateN_e"
              >
                Date de naissance
              </label>
              <input
                type="date"
                id="dateN_e"
                name="dateN_e"
                value={formData.dateN_e}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dateEmb_e"
              >
                Date d'embauche
              </label>
              <input
                type="date"
                id="dateEmb_e"
                name="dateEmb_e"
                value={formData.dateEmb_e}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="base"
              >
                Base
              </label>
              <input
                type="number"
                id="base"
                name="base"
                placeholder="Base"
                value={formData.base}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        
          <div className="flex -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="contrat"
              >
                Contrat
              </label>
              <select
                id="contrat"
                name="contrat"
                value={formData.contrat.id}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option>Select Contrat</option>
                {contrat.map((itemcontrat) => (
                  <option key={itemcontrat.id} value={itemcontrat.id}>
                    {itemcontrat.nameContrat}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="entreprise"
              >
                Entreprise
              </label>
              <select
                id="entreprise"
                name="entreprise"
                value={formData.entreprise.id_entr}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option>Select Entreprise</option>
                {Entreprise.map((item) => (
                  <option key={item.id_entr} value={item.id_entr}>
                    {item.desg_entr}
                  </option>
                ))}
              </select>
            </div>
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