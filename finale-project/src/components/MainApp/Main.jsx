import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import EmpManagement from "../Employee/EmpManagement";
import ManagementContrat from "../Contrat/ManagementContrat";
import ManagementEntreprise from "../Entreprise/ManagementEntreprise";
import ManagementUsers from "../Dashboard/ManagementUsers";
import Bulletin from "../Bulletin/Bulletin";


export default function Main() {
  const [contrat, setContrat] = useState([]);
  const [Entreprise, setEntreprise] = useState([]);
  const [User, setUser] = useState([]);
  const [EmpTotal, setTotalEmp] = useState(0);
  const [usersTotal, setUsersTotal] = useState(0);
  const [EntreTotal, setEntreTotal] = useState(0);
  const [role, setRole] = useState([]);
  const [employees, setEmployees] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/Contrat/getAll")
      .then((response) => {
        setContrat(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };
  // role
  /* const fetchDataRole = () => {
    axios
      .get("http://localhost:8080/Role/getAll")
      .then((response) => {
        setRole(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };*/

  // fecth users
  const fetchDataUsers = () => {
    axios
      .get("http://localhost:8080/Utilisateur/admin/get-all-users")
      .then((response) => {
        setUser(response.data.utilisateursList);
        console.log(response.data);
        setUsersTotal(response.data.utilisateursList.length)
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };
  // get data from database using fetch axios
  const fetchDataEntr = () => {
    axios
      .get("http://localhost:8080/Entreprise/getAll")
      .then((response) => {
        setEntreprise(response.data);
        console.log(response.data);
        setEntreTotal(response.data.length)
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const fetchDataEmp = () => {
    axios
      .get("http://localhost:8080/emp/All_Emp")
      .then((response) => {
        const formattedEmployees = response.data.map((employee) => {
          const formattedEmployee = {
            ...employee,
            dateN_e: employee.dateN_e ? employee.dateN_e.slice(0, 10) : null, // Check if dateN_e is null
          };
          if (employee.dateEmb_e) {
            formattedEmployee.dateEmb_e = employee.dateEmb_e.slice(0, 10); // Update dateEmb_e format if not null
          }
          return formattedEmployee;
        });
        setEmployees(formattedEmployees);
        setTotalEmp(formattedEmployees.length);
        console.log(formattedEmployees);
        console.log(formattedEmployees.length);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchDataEntr();
    fetchDataUsers();
    // fetchDataRole();
    fetchDataEmp();
  }, []);

  return (
    <div className="h-screen w-screen">
      <Routes>
        
        <Route
          path="/dashboard"
          element={
            <ManagementUsers
             fetchDataUsers={fetchDataUsers}
              User={User}
              setUser={setUser}
              EmpTotal={EmpTotal}
              EntreTotal={EntreTotal}
              usersTotal={usersTotal}
             setUsersTotal={setUsersTotal}
              // fetchDataRole={fetchDataRole}
              role={role}
              setRole={setRole}
            />
          }
        ></Route>
      </Routes>
      <Routes>
            <Route
            path="/emp"
            element={
              <EmpManagement
                contrat={contrat}
                Entreprise={Entreprise}
                setTotalEmp={setTotalEmp}
                employees={employees}
                fetchDataEmp={fetchDataEmp}
              />
          }
        />
        <Route
          path="/contrat"
          element={
            <ManagementContrat
              contrat={contrat}
              setContrat={setContrat}
              fetchData={fetchData}
            />
          }
        />
        <Route
          path="/entreprise"
          element={
            <ManagementEntreprise
              fetchDataEntr={fetchDataEntr}
              Entreprise={Entreprise}
              setEntreTotal={setEntreTotal}
            />
          }
        />
          <Route path="/bulletin" element={<Bulletin employees={employees}/>}  />
      </Routes>
    </div>
  );
}
