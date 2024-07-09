import React, { useState } from "react";
import axios from "axios";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import AddUpdateEntre from "./AddUpdateEntre";

export default function ManagementEntreprise({
  fetchDataEntr,
  Entreprise,
  
  
}) {
  const CLOUDNAME="dlua6kceg"
  const [searchQuery, setSearchQuery] = useState("");
  const [onClose, setOnClose] = useState(false);
  const [update, setUpdate] = useState(true);
  const [editData, setEditData] = useState("");
  //handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  //handle fillter
  const filter = Array.isArray(Entreprise)
    ? Entreprise.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  //delete
  const handleDelete = async (id, logoURL) => {

    try {
      if (window.confirm("Supprimer cet entreprise ?")){
         // Delete enterprise
      await axios.delete(`http://localhost:8080/Entreprise/delete?id=${id}`);
      fetchDataEntr();
      
      // If a logo exists, delete it from Cloudinary
      if (logoURL) {
        const publicID = logoURL.substring(logoURL.lastIndexOf('/') + 1, logoURL.lastIndexOf('.'));
        await axios.delete(`https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/destroy`, {
          params: {
            public_id: publicID
          }
        });
        console.log(`Deleted image from Cloudinary with public ID: ${publicID}`);
      }
      }
     

      setOnClose(false);
    } catch (error) {
      console.error("Error deleting enterprise:", error);
    }
  };
 
  return (
    <>
      <div
        className=" mx-auto p-4 max:sm:p-6 overflow-x-auto max-lg:w-[w-4/5 ]  w-full
     "   
      >
        <div className="mb-4 flex flex-col sm:flex-row sm:justify-between items-center ">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="max-sm:w-56 shadow appearance-none border rounded w-full sm:w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 sm:mb-0 hover:cursor-pointer focus:border-spacing-1 hover:shadow-stone-400"
          />
          <button
            onClick={() => {
              setOnClose(true);
              setUpdate(false);
            }}
            type="button"
            className="w-full sm:w-auto max-sm:w-48 m-2 text-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline sm:ml-4"
          >
            Ajouter Entreprise
          </button>
        </div>
        <div className="overflow-x-auto bg-white shadow-md overflow-y-auto max-h-[820px]">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left ">
                  Logo
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left ">
                  designation
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Email
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Adress
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Telephone
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  FAX
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  CNSS
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                   AMO
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  CIMR
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filter.map((entrepriseItem) => (
                <tr key={entrepriseItem.id_entr} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 w-10 h-10">
                    <img
                      className="rounded-full"
                      alt=""
                      src={entrepriseItem.logo_entr}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entrepriseItem.desg_entr}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entrepriseItem.email_entr}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entrepriseItem.adresse_entr}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entrepriseItem.tele_ent}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entrepriseItem.fax_ent}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entrepriseItem.cnss_entr}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entrepriseItem.amo_entr}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {entrepriseItem.cimr_entr}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <RiEditLine
                      onClick={() => {
                        setUpdate(true);
                        setOnClose(true);
                        setEditData(entrepriseItem);
                      }}
                      className="mx-auto text-xl text-yellow-400 hover:cursor-pointer hover:text-yellow-600"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <RiDeleteBinLine
                      onClick={() => {
                        handleDelete(entrepriseItem.id_entr,entrepriseItem.logo_entr);
                      }}
                      className="mx-auto text-xl text-red-400 hover:cursor-pointer hover:text-red-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {onClose && (
        <AddUpdateEntre
          onClose={onClose}
          setonClose={setOnClose}
          update={update}
          setUpdate={setUpdate}
          fetchDataEntr={fetchDataEntr}
          editData={editData}
        />
      )}
    </>
  );
}