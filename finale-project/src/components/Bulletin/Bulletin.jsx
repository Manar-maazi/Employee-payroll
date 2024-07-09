import React, { useState, useEffect } from "react";
import PayrollWithPrint from "./FormBulletin";

function Bulletin({ employees }) {
  const [click, setClick] = useState(false);
  const [change, setChange] = useState({ matricule: "", date: "" });
  const [emp, setEmp] = useState({});
 

  const handleClick = (e) => {
    e.preventDefault();
    search();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChange((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const search = () => {
    const found = employees.some((employee) => {
      if (Number(employee.matricul_e) === Number(change.matricule)) {
        setEmp(employee);
        setClick(true);
        return true;
      }
      return false;
    });

    if (!found) {
      setClick(false);
    }
  };

  useEffect(() => {
    console.log("Emp List:", emp);
  }, [emp]);

  return (
    <div className="mx-auto p-4 h-screen  md:w-[50%]">
      <form className="text-center flex justify-evenly">
        <div>
          <div>
            <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="matricule">Matricule</label>
            <input
              onChange={handleChange}
              type="text"
              id="matricule"
              name="matricule"
              placeholder="Matricule d'employee"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-1 w-48"
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm font-bold mb-2" htmlFor="Date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2 ml-9 w-48"
            />
          </div>
        </div>
        <div className="">
          <button
            onClick={handleClick}
            type="submit"
            className="sm:w-auto bg-indigo-500 hover:bg-indigo-700 text-gray-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5 w-60"
          >
            Bulletin
          </button>
        </div>
      </form>

      {click ? (
        <div className="mx-auto overflow-y-auto h-[700px]">
          <PayrollWithPrint emp={emp} change={change} />
        </div>
      ) : (
     null
      )}
    </div>
  );
}

export default Bulletin;