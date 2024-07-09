import React, { useState } from "react";
import { SlArrowLeft, SlLogout } from "react-icons/sl";
import { PiUsersThree, PiMoneyWavy } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiContractLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { PiBuildingOfficeLight } from "react-icons/pi";
import UserService from '../Service/UserService';

export default function SideBar() {
  const [open, setOpen] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const selectMenuItem = (index) => {
    setSelectedMenuItem(index);
  };


  let Menus = [
    {
      title: "TableauBord",
      icon: <LuLayoutDashboard />,
      gap: true,
      link: "/app/dashboard"
    },
    {
      title:"Entreprise",
      icon:<PiBuildingOfficeLight/>,
      gap:true,
      link:"/app/entreprise"
    },
    {
      title: "Employee",
      icon: <PiUsersThree />,
      link: "/app/emp",
      gap: true
    },
    {
      title: "Contrat",
      icon: <RiContractLine />,
      gap: true,
      link: "/app/contrat"
    },
    {
      title: "Bulletin",
      icon: <PiMoneyWavy />,
      gap: true,
      link: "/app/bulletin"
    },
    {
      title: "Déconnecté",
      icon: <SlLogout />,
      gap: true,
      link: "/login"
    },
  ];

  if(UserService.isComptable()){
    Menus = [
      {
        title: "Employee",
        icon: <PiUsersThree />,
        link: "/app/emp",
        gap: true
      },
      {
        title: "Bulletin",
        icon: <PiMoneyWavy />,
        gap: true,
        link: "/app/bulletin"
      },
      {
        title: "Déconnecté",
        icon: <SlLogout />,
        gap: true,
        link: "/login"
      },
    ];
  }

  return (
    <div
      className={`${open ? "w-72" : "w-20"} bg-indigo-500 h-screen relative p-5 px-2 duration-300`}
    >
      <SlArrowLeft
        onClick={toggleMenu}
        className={`absolute cursor-pointer text-3xl top-9 -right-3 border-2 border-slate-50 rounded-full bg-indigo-500 text-slate-50 rotate-180 duration-500 ${open && "rotate-[360deg]"}`}
      />
      <ul className="pt-10">
        {Menus.map((Menu, index) => (
          <li key={index}>
            <div
              className={`flex rounded-md p-3 cursor-pointer hover:bg-indigo-400 text-gray-100 text-md items-center gap-x-6 ${Menu.gap ? "mt-9" : "mt-2"} ${
                selectedMenuItem === index ? "bg-indigo-700" : ""
              } ${index === Menus.length - 1 && "hover:bg-red-500"}`}
              onClick={() => selectMenuItem(index)}
            >
              <Link to={Menu.link} className="flex gap-3">
                <span className="text-2xl">{Menu.icon}</span>
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
