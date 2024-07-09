import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { FaRegFilePdf } from "react-icons/fa6";

const FormBulletin = React.forwardRef(({ emp, change }, ref) => {
  const [yearsWorked, setYearsWorked] = useState(0);
  const [hoursWork, setHourseWork] = useState({
    nombreHeures: "",
    heureSupp96Normal: "",
    heureSupp69Normal: "",
    heureSuppJourFerie: ""
  });
  useEffect(() => {
    // Parse the employee's start date and the current date
    const startDateObj = new Date(emp.dateEmb_e);
    const currentDateObj = new Date(change.date);

    // Calculate the difference in years
    const yearsDiff = currentDateObj.getFullYear() - startDateObj.getFullYear();

    // Adjust for the case where the current month/day is before the start month/day
    const isBeforeStartMonthAndDay =
      currentDateObj.getMonth() < startDateObj.getMonth() ||
      (currentDateObj.getMonth() === startDateObj.getMonth() &&
        currentDateObj.getDate() < startDateObj.getDate());

    const adjustedYearsDiff = isBeforeStartMonthAndDay
      ? yearsDiff - 1
      : yearsDiff;

    // Set the result to state
    setYearsWorked(adjustedYearsDiff);
  }, [emp.dateEmb_e, change.date]);

  const pointageHeures = (matricule) => {
    axios
      .get(
        `http://localhost:8081/api/nombreHeures?matricule=${matricule}`)
      .then((response) => {
        console.log("hours work" + response.data);
        setHourseWork((prev) => ({
          ...prev,
          nombreHeures: response.data
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const heure25 = (matricule) => {
    axios
      .get(
        `http://localhost:8081/api/heureSupp96Normal?matricule=${matricule}`)
      .then((response) => {
        console.log("hours work" + response.data);
        setHourseWork((prev) => ({
          ...prev,
          heureSupp96Normal: response.data
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const heure50 = (matricule) => {
    axios
      .get(
        `http://localhost:8081/api/heureSupp69Normal?matricule=${matricule}`)
      .then((response) => {
        console.log("hours work" + response.data);
        setHourseWork((prev) => ({
          ...prev,
          heureSupp69Normal: response.data
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const heure100 = (matricule) => {
    axios
      .get(
        `http://localhost:8081/api/heureSuppJourFerie?matricule=${matricule}`)
      .then((response) => {
        console.log("hours work" + response.data);
        setHourseWork((prev) => ({
          ...prev,
          heureSuppJourFerie: response.data
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    pointageHeures(emp.matricul_e);
    heure25(emp.matricul_e);
    heure50(emp.matricul_e);
    heure100(emp.matricul_e);
  }, [emp.matricul_e]);
  //calculate anciennete
  const p = (yw) => {
    if (yw <= 5) {
      return 5/100;
    } else if (yw <= 10) {
      return 10/100;
    } else if (yw <= 15) {
      return 15/100;
    } else if (yw <= 20) {
      return 20/100;
    } else if (yw <= 25) {
      return 25;
    } else {
      return 0;
    }
  };

  const nomberHours = Number(hoursWork.nombreHeures);
  const GainheureSupp96Normal =
    Number(hoursWork.heureSupp96Normal) * (emp.base + 25);
  const GainheureSupp69Normal =
    Number(hoursWork.heureSupp69Normal) * (emp.base + 25);
  const GainheureSuppJourFerie =
    Number(hoursWork.heureSuppJourFerie) * (emp.base + 100);


  const slaireBrut =
    nomberHours * emp.base +
    GainheureSuppJourFerie +
    GainheureSupp96Normal +
    GainheureSupp69Normal +
    (( (nomberHours * emp.base) + GainheureSuppJourFerie + GainheureSupp96Normal + GainheureSupp69Normal) ) *
      Number(p(yearsWorked));

  const payrollData = {
    name: emp.prenom_e + " " + emp.nom_e,
    position: emp.fonction_e,
    employeeId: emp.matricul_e,
    contractType: emp.contrat.nameContrat,
    dateOfHire: emp.dateEmb_e,
    cnssNumber: "199180996",
    dateOfBirth: emp.dateN_e,
    Sf: emp.sf_e,
    dependents: emp.nd_e,
    payPeriod: change.date,
    details: [
      {
        label: "SALAIRE HORAIRE",
        base: emp.base,
        rate: nomberHours,
        gain: nomberHours * emp.base
      },
      {
        label: "HEURES SUPP. 25%",
        base: hoursWork.heureSupp96Normal,
        rate: "25%",
        gain: GainheureSupp96Normal
      },
      {
        label: "HEURES SUPP. 50%",
        base: hoursWork.heureSupp69Normal,
        rate: "50%",
        gain: GainheureSupp69Normal
      },
      {
        label: "HEURES SUPP. 100%",
        base: hoursWork.heureSuppJourFerie,
        rate: "100%",
        gain: GainheureSuppJourFerie
      },
      {
        label: "ANCIENNETE",
        base: "",
        rate: Number(p(yearsWorked))*100 + "%",
        gain: ((nomberHours * emp.base +
          GainheureSuppJourFerie +
          GainheureSupp96Normal +
          GainheureSupp69Normal) * Number(p(yearsWorked)))
      },
      { label: "CONGES PAYE", base: "", rate: "", gain: "" },
      { label: "REP/CONGE PAYE", base: "", rate: "", gain: "" },
      { label: "13E MOIS", base: "", rate: "", gain: "" },
      {
        label: "SALARE BRUT IMP.",
        base: Number(slaireBrut) + (slaireBrut * Number(p(yearsWorked))) / 100,
        rate: "",
        gain: ""
      },
      {
        label: "C.N.S.S",
        base: "",
        rate: emp.ncnss_e + "%",
        gain: "",
        retenue: (slaireBrut * emp.ncnss_e) / emp.base
      },
      {
        label: "CIMR",
        base: "",
        rate: emp.cimr + "%",
        gain: "",
        retenue: (slaireBrut * emp.cimr) / emp.base
      },
      {
        label: "AMO",
        base: "",
        rate: emp.amo + "%",
        gain: "",
        retenue: (slaireBrut * emp.amo) / emp.base
      },
      { label: "SALARE NET IMP.", base: "", rate: "", gain: "" }
      // { label: "IR NET", base: "", rate: "", gain: "" },
      // { label: "PRIME DE TRANSPORT", base: "", rate: "", gain: "" },
      // { label: "AVANCE SUR SALAIRE", base: "", rate: "", gain: "" }
    ],
    totals: {
      workDays: 29,
      baseTaxable:
        Number(slaireBrut) + (slaireBrut * Number(p(yearsWorked))) / 100,
      totalDeductions:
        (slaireBrut * emp.cimr) / emp.base +
        (slaireBrut * emp.ncnss_e) / emp.base +
        (slaireBrut * emp.amo) / emp.base,
      totalGains:
        Number(slaireBrut) + (slaireBrut * Number(p(yearsWorked))) / 100,
      netPayable:
        Number(slaireBrut) -
      (  (slaireBrut * emp.cimr) / emp.base +
        (slaireBrut * emp.ncnss_e) / emp.base +
        (slaireBrut * emp.amo) / emp.base)
    }
  };

  return (
    <div ref={ref} className="container mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">Bulletin de Paie</h1>
      <div className="mb-4 text-sm">
        <div>
          <strong>Raison Sociale:</strong>
          {emp.entreprise.desg_entr}
        </div>
        <div>
          <strong>Siège Social:</strong> {emp.entreprise.adresse_entr}
        </div>
        <div>
          <strong>Email</strong> {emp.entreprise.email_entr}
        </div>
        <div>
          <strong>Fax</strong> {emp.entreprise.fax_ent}
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 text-sm mb-4">
        <thead>
          <tr className="bg-slate-200">
            <th className="py-2 border border-gray-200 ">Nom et Prénom</th>
            <th className="py-2 border border-gray-200">Fonction</th>
            <th className="py-2 border border-gray-200">Matricule</th>
            <th className="py-2 border border-gray-200">Type de Contrat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.name}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.position}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.employeeId}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.contractType}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="min-w-full bg-white border border-gray-200 text-sm mb-4">
        <thead>
          <tr className="bg-slate-200">
            <th className="py-2 border border-gray-200">Date d'Embauche</th>
            <th className="py-2 border border-gray-200">N° CNSS</th>
            <th className="py-2 border border-gray-200">Date Naissance</th>
            <th className="py-2 border border-gray-200">SF</th>
            <th className="py-2 border border-gray-200">Dedut</th>
            <th className="py-2 border border-gray-200">Période de Paie</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.dateOfHire}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.cnssNumber}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.dateOfBirth}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.Sf}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.dependents}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.payPeriod}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="min-w-full bg-white border border-gray-200 text-sm mb-4">
        <thead>
          <tr className="bg-slate-200">
            <th className="py-2 border border-gray-200">Rubrique</th>
            <th className="py-2 border border-gray-200">Base</th>
            <th className="py-2 border border-gray-200">Taux</th>
            <th className="py-2 border border-gray-200">Gain</th>
            <th className="py-2 border border-gray-200">Retenue</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.details.map((detail, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border border-gray-200">
                {detail.label}
              </td>
              <td className="py-2 px-4 border border-gray-200">
                {detail.base}
              </td>
              <td className="py-2 px-4 border border-gray-200">
                {detail.rate}
              </td>
              <td className="py-2 px-4 border border-gray-200">
                {detail.gain}
              </td>
              <td className="py-2 px-4 border border-gray-200">
                {detail.retenue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="min-w-full bg-white border border-gray-200 text-sm mb-4">
        <thead>
          <tr className="bg-slate-200">
            <th className="py-2 border border-gray-200">Cumul Jours Travail</th>
            <th className="py-2 border border-gray-200">
              Cumul Base Imposable
            </th>
            <th className="py-2 border border-gray-200">Cumul Retenue</th>
            <th className="py-2 border border-gray-200">Cumul Retenue IR</th>
            <th className="py-2 border border-gray-200">Total Gain</th>
            <th className="py-2 border border-gray-200">Total Retenues</th>
            <th className="py-2 border border-gray-200">Net à Payer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.totals.workDays}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.totals.baseTaxable}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.totals.totalDeductions}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {/* {payrollData.totals.totalDeductions} */}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.totals.totalGains}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.totals.totalDeductions}
            </td>
            <td className="py-2 px-4 border border-gray-200">
              {payrollData.totals.netPayable}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

const PayrollWithPrint = ({ emp, change }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: auto;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
        .container {
          width: 100%;
        }
        table {
          width: 100%;
        }
      }
    `
  });

  return (
    <div className="container mx-auto p-4">
      <FormBulletin ref={componentRef} emp={emp} change={change} />
      <button
        onClick={handlePrint}
        className="mx-auto flex mb-4 bg-indigo-500 hover:bg-indigo-800 hover:text-indigo-100 text-white p-2 rounded"
      >
        <p className="mx-1">Generate PDF</p>
        <FaRegFilePdf className="text-2xl mx-2" />
      </button>
    </div>
  );
};

export default PayrollWithPrint;