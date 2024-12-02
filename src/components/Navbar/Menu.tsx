import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const [menu, setMenu] = useState<string>("Dashboard");
  const location = useLocation();

  const changeColor = (menu: string) => {
    setMenu(menu);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setMenu("Dashboard");
    else if (path === "/members") setMenu("Members");
    else if (path === "/events") setMenu("Events");
    else if (path === "/tickets") setMenu("Tickets");
  }, [location]);

  return (
    <div>
      <ul className="md:flex hidden justify-between md:w-[400px] w-full">
        <Link
          to={"/"}
          className={`${
            menu === "Dashboard"
              ? "text-[#fff] border-b-2 font-medium  border-white"
              : "text-[#c9c9c9]"
          } cursor-pointer text-md font-[roboto]`}
          onClick={() => changeColor("Dashboard")}
        >
          Dashboard
        </Link>
        <Link
          to={"/members"}
          className={`${
            menu === "Members"
              ? "text-[#fff] border-b-2 font-medium border-white"
              : "text-[#c9c9c9]"
          } cursor-pointer text-md font-[roboto]`}
          onClick={() => changeColor("Members")}
        >
          Members
        </Link>
        <Link
          to={"/events"}
          className={`${
            menu === "Events"
              ? "text-[#fff] border-b-2 font-medium border-white"
              : "text-[#c9c9c9]"
          } cursor-pointer text-md font-[roboto]`}
          onClick={() => changeColor("Events")}
        >
          Events
        </Link>
        <Link
          to={"/tickets"}
          className={`${
            menu === "Tickets"
              ? "text-[#fff] border-b-2 font-medium border-white"
              : "text-[#c9c9c9]"
          } cursor-pointer text-md font-[roboto]`}
          onClick={() => changeColor("Tickets")}
        >
          Tickets
        </Link>
      </ul>
    </div>
  );
};

export default Menu;
