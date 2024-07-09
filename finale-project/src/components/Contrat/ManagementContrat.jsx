import React, {  useState } from "react";
import axios from "axios";
import AddContrat from "./AddContrat";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";

export default function ManagementContrat({setContrat,contrat,fetchData}) {
  
  //const [contrat, setContrat] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [onClose, setOnClose] = useState(false);
  const [ifUpdate, setUpdate] = useState(false);
  const [editData, setEditData] = useState(null);


  const deleteFetch = (id) => {
    axios
      .delete(`http://localhost:8080/Contrat/delete?id=${id}`)
      .then((response) => {
        console.log(response);
        fetchData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    deleteFetch(id);
  };

  // Open AddContrat component for editing
  const handleEdit = (contratItem) => {
    setEditData(contratItem);
    setOnClose(true);
    setUpdate(true);
  };



  // Search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredContrat = Array.isArray(contrat)
    ? contrat.filter((contratItem) =>
        Object.values(contratItem).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [{nameContrat:"note data yet"}];

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-4 overflow-x-auto">
        <div className="mb-4 flex flex-col sm:flex-row sm:justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="max-sm:w-56 shadow appearance-none border rounded w-full sm:w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 sm:mb-0 hover:cursor-pointer focus:border-spacing-1 hover:shadow-stone-400"
          />
          <button
            onClick={() => {
              setEditData(null);
              setOnClose(true);
              setUpdate(false);
            }}
            type="button"
            className="w-full sm:w-auto max-sm:w-48 m-2 text-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline sm:ml-4"
          >
            Ajouter Contrat
          </button>
        </div>
        <div className="overflow-x-auto bg-white shadow-md overflow-y-auto max-h-[820px]">
          <table className="min-w-full bg-white shadow-md border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Contrat
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredContrat.map((contratItem) => (
                <tr key={contratItem.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {contratItem.nameContrat}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <RiEditLine
                      onClick={() => handleEdit(contratItem)}
                      className="mx-auto text-xl text-yellow-400 hover:cursor-pointer hover:text-yellow-600"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <RiDeleteBinLine
                      onClick={() => handleDelete(contratItem.id)}
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
        <AddContrat
          ifUpdate={ifUpdate}
          onClose={onClose}
          setclose={setOnClose}
          fetchData={fetchData}
          editData={editData}
          setUpdate={setUpdate}
        />
      )}
    </>
  );
}
