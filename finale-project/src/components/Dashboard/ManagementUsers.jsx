import React, {  useState } from "react";
import axios from "axios";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import imgEmp from "../../img/employee.png";
import imgEntre from "../../img/entreprise.png";
import imgAdmn from "../../img/admin.png";

import { Link } from "react-router-dom";
import UpdateAddUsers from "./UpdateAddUsers";


export default function ManagementUsers({User, fetchDataUsers,EmpTotal,EntreTotal,usersTotal,role}) {
  //const CLOUDNAME = "dlua6kceg";
  const [searchQuery, setSearchQuery] = useState("");
  const [onClose, setOnClose] = useState(false);
  const [update, setUpdate] = useState(true);
  const [editData, setEditData] = useState("");
  //handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  //handle fillter
  const filter = Array.isArray(User)
    ? User.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];
    console.log("TOtal Manag"+EmpTotal)
  //delete
  const handleDelete =(id)=>{
    if (window.confirm("Supprimer cet utilisateur ?")){
    axios.delete(`http://localhost:8080/Utilisateur/admin/delete/${id}`)
    .then(resp=>{
      console.log(resp)
      fetchDataUsers();
    })
    .catch(err=>{
      console.error(err)
    })
  }}
  // const handleDelete = async (id, logoURL) => {
  //   try {
  //     // Delete enterprise
  //     await axios.delete(`http://localhost:8080/Entreprise/delete?id=${id}`);
  //     fetchDataUsers();

  //     // If a logo exists, delete it from Cloudinary
  //     if (logoURL) {
  //       const publicID = logoURL.substring(
  //         logoURL.lastIndexOf("/") + 1,
  //         logoURL.lastIndexOf(".")
  //       );
  //       await axios.delete(
  //         `https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/destroy`,
  //         {
  //           params: {
  //             public_id: publicID
  //           }
  //         }
  //       );
  //       console.log(
  //         `Deleted image from Cloudinary with public ID: ${publicID}`
  //       );
  //     }

  //     setOnClose(false);
  //   } catch (error) {
  //     console.error("Error deleting enterprise:", error);
  //   }
  // };
  

  return (
    <>
      <div className="sm:max-w-6xl mx-auto p-2 max:sm:p-6 lg:p-4 overflow-x-auto max-lg:w-[800px] max-md:w-[600px]">
        <div className="flex justify-center">
          <Link to="/emp">
            {/* <div className=" bg-indigo-500 p-3 rounded-md w-48 my-1 hover:cursor-pointer hover:bg-indigo-700 shadow-md">
              <p className="text-center pt-1 text-slate-200 border-b-2 pb-1">Employee</p>
              { <img className=" text-center w-20 mx-auto mt-2" src={imgEmp} alt="" /> }
               <div className="h-20"></div>
              <p className="text-center text-slate-200 p-3"><b>Total :</b>  {EmpTotal}</p>
            </div> */}
            <div className=" bg-indigo-500 p-3 rounded-md w-48 my-1 hover:cursor-pointer hover:bg-indigo-700 shadow-md">
              <p className="text-center pt-1 text-slate-200 border-b-2 pb-1">Employee</p>
              <img className=" text-center w-20 mx-auto mt-2" src={imgEmp} alt="" />
             
              <p className="text-center text-slate-200 p-3"><b>Total :</b>  {EmpTotal}</p>
            </div>
          </Link>
          <Link to="/entreprise">
            {/* <div className="bg-indigo-500 p-3 rounded-md w-48 m-1 hover:cursor-pointer hover:bg-indigo-700 shadow-md">
              <p className="text-center pt-1 text-slate-200 border-b-2 pb-1">Entreprise</p>
              { <img className="text-center w-20 mx-auto mt-2" src={imgEntre} alt="" />
               }
                <div className="h-20"></div>
              <p className="text-center text-slate-200 p-3"><b>Total :</b>  {EntreTotal}</p>
            </div> */}
            <div className="bg-indigo-500 p-3 rounded-md w-48 m-1 hover:cursor-pointer hover:bg-indigo-700 shadow-md">
              <p className="text-center pt-1 text-slate-200 border-b-2 pb-1">Entreprise</p>
              <img className="text-center w-20 mx-auto mt-2" src={imgEntre} alt="" />
              
             
              <p className="text-center text-slate-200 p-3"><b>Total :</b>  {EntreTotal}</p>
            </div>
          </Link>

          <div className="bg-indigo-500 p-3 rounded-md w-48 my-1 hover:cursor-pointer hover:bg-indigo-700 shadow-md">
            <p className="text-center pt-1 text-slate-200 border-b-2 pb-1 ">Utilisateur</p>
            <img className="text-center w-20 mx-auto mt-2 text-"  src={imgAdmn} alt="" />
        
            <p className="text-center text-slate-200 p-3"><b>Total :</b>  {usersTotal}</p>
          </div>
        </div>
        <div className="border-2 mt-10 shadow-md"></div>
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
            Ajouter Utilisateur
          </button>
        
        </div>
        <div className="overflow-x-auto bg-white shadow-md overflow-y-auto max-h-[820px]">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left ">
                  Prenom
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left ">
                  Nom
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Email
                </th>
             
                {/* <th className="border border-gray-300 px-4 py-2 text-left">
                Mot de pass
                </th> */}
                <th className="border border-gray-300 px-4 py-2 text-left">
                
                  Role
                </th>
              
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filter.map((User) => (
                <tr key={User.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {User.nom}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {User.prenom}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {User.email}
                  </td>
                  {/* <td className="border border-gray-300 px-4 py-2">
                    {User.mot_de_pass}
                  </td> */}
                  <td className="border border-gray-300 px-4 py-2">
                    {User.role}
                  </td>
               
                  <td className="border border-gray-300 px-4 py-2">
                    <RiEditLine
                      onClick={() => {
                        setUpdate(true);
                        setOnClose(true);
                        setEditData(User);
                      }}
                      className="mx-auto text-xl text-yellow-400 hover:cursor-pointer hover:text-yellow-600"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <RiDeleteBinLine
                      onClick={() => {
                        handleDelete(
                          User.id,
                          //User.logo_entr
                        );
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
        <UpdateAddUsers
          onClose={onClose}
          setonClose={setOnClose}
          update={update}
          setUpdate={setUpdate}
          fetchDataUsers={fetchDataUsers}
          editData={editData}
          role={role}
        />
      )}
    </>
  );
}
