import React, {   useState  } from "react";
import axios from "axios";
import EmpAdd from "./EmpAdd";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";

export default function EmpManagement({ Entreprise, contrat , 
  fetchDataEmp,employees}) {

  const [searchQuery, setSearchQuery] = useState("");
  const [contratFilter, setContratFilter] = useState("");
  const [entrepriseFilter, setEntrepriseFilter] = useState("");
  const [onClose, setOnClose] = useState(false);
  const [ifUpdate, setUpdate] = useState(false);
  const [editData, setEditData] = useState(null);


  //fetch data
  // const fetchData = useCallback(() => {
  //   axios
  //     .get("http://localhost:8080/emp/All_Emp")
  //     .then((response) => {
  //       setEmployees(response.data);
  //       setTotalEmp(response.data.length);
  //       console.log(response.data);
  //       console.log(response.data.length);
        
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the data!", error);
  //     });
  // }, [setTotalEmp]);
//fetch data




   
  //handle delete
  const handleDelete = async (id, imgURL) => {
    try {
      // Delete enterprise
      await axios.delete(`http://localhost:8080/emp/delete_emp?id=${id}`);
      fetchDataEmp();
      // If a logo exists, delete it from Cloudinary
      if (imgURL) {
        const publicID = imgURL.substring(
          imgURL.lastIndexOf("/") + 1,
          imgURL.lastIndexOf(".")
        );
        await axios.delete(
          `https://api.cloudinary.com/v1_1/dlua6kceg/image/destroy`,
          {
            params: {
              public_id: publicID
            }
          }
        );
        console.log(
          ` Deleted image from Cloudinary with public ID: ${publicID}`
        );
      }

      setOnClose(false);
    } catch (error) {
      console.error("Error deleting enterprise:", error);
    }
  };
  //handle update
  const handleEdit = (employee) => {
    setEditData(employee);
    setOnClose(true);
    setUpdate(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleContratFilterChange = (e) => {
    setContratFilter(e.target.value);
  };

  const handleEntrepriseFilterChange = (e) => {
    setEntrepriseFilter(e.target.value);
  };

  //
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = Object.values(employee).some((v) =>
      String(v).toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesContrat =
      contratFilter === "" || employee.contrat.nameContrat === contratFilter;
    const matchesDepartement =
      entrepriseFilter === "" ||
      employee.entreprise.desg_entr === entrepriseFilter;
    return matchesSearch && matchesContrat && matchesDepartement;
  });

  return (
    <>
      <div className=" mx-auto p-4 max:sm:p-6 max-lg:p-4 overflow-x-auto max-lg:w-[w-4/5 ] max-md:w-4/5  w-full">
        <div className="mb-4 flex flex-col sm:flex-row sm:justify-between items-center ">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className=" max-sm:w-56  shadow appearance-none border rounded w-full sm:w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 sm:mb-0
          hover:cursor-pointer focus:border-spacing-1
          hover:shadow-stone-400"
          />
          <div className="flex flex-wrap justify-center sm:justify-start ">
            <select
              value={contratFilter  || ""}
              onChange={handleContratFilterChange}
              className=" max-sm:w-56 shadow appearance-none border rounded w-full sm:w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 sm:mb-0 sm:ml-4  
                          hover:cursor-pointer focus:border-spacing-1
                        hover:shadow-stone-400"
            >
              <option value="">Filtrage par Contrat</option>
              {contrat.map((item) => (
                <option key={item.id} value={item.nameContrat}>
                  {item.nameContrat}
                </option>
              ))}
            </select>
            <select
              value={entrepriseFilter  || ""}
              onChange={handleEntrepriseFilterChange}
              className="  max-sm:w-56 shadow appearance-none border rounded w-full sm:w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:ml-4  
            hover:cursor-pointer focus:border-spacing-1
            hover:shadow-stone-400"
            >
              <option value="">Filtrage par Entreprise</option>
              {Entreprise.map((item) => (
                <option key={item.id_entr} value={item.desg_entr}>
                  {item.desg_entr}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              setOnClose(true);
              setEditData(null);
              setUpdate(false);
            }}
            type="button"
            className="w-full sm:w-auto max-sm:w-48  m-2 text-center bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline sm:ml-4"
          >
            Ajouter Employee
          </button>
        </div>
        <div className="overflow-x-auto shadow-md">
          <table className="min-w-full shadow-md bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Matricule
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Image
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Nom
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Prenom
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left w-48">
                  Numero Telephone
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left w-48">
                  Date de naissance
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Cin
                </th>
             
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Base
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Dedut
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Fonction
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                Date Embauche
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Contrat
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Entreprise
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                
                <tr key={employee.id_e} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 ">
                    {employee.matricul_e}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 w-10 h-10">
                    <img className="rounded-full" alt="" src={employee.image} />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.nom_e}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.prenom_e}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 w-48">
                    {employee.tele_e}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 w-48">
                    {employee.dateN_e}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.cin_e}
                  </td>
                 
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.base}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.nd_e}
                  </td>
                 <td className="border border-gray-300 px-4 py-2 w-48">
                    {employee.fonction_e}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 w-48">
                    {employee.dateEmb_e}
                  </td>
                 
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.contrat.nameContrat}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {employee.entreprise.desg_entr}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <RiEditLine
                      onClick={() => handleEdit(employee)}
                      className="mx-auto text-xl text-yellow-400 hover:cursor-pointer hover:text-yellow-600"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <RiDeleteBinLine
                      onClick={() =>
                        handleDelete(employee.id_e, employee.image)
                      }
                      className="mx-auto text-xl text-red-400 hover:cursor-pointer hover:text-red-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {onClose && (
          <EmpAdd
            onClose={onClose}
            setclose={(x) => {
              setOnClose(x);
            }}
            contrat={contrat}
            ifUpdate={ifUpdate}
            editData={editData}
            Entreprise={Entreprise}
            fetchData={fetchDataEmp}
          />
        )}
      </div>
    </>
  );
}