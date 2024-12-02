import UserTable from "../members/UserTable";
import Banner from "../Home/Banner";
import { useSelector } from "react-redux";
import Button from "../general/Button";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Members = () => {
  const searchUser = useSelector((state: any) => state.userSlice.searchUser);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <Banner />
      {searchUser.length > 0 && (
        <div className="w-[600px] bg-white rounded-lg left-40 p-2 absolute">
          {searchUser &&
            searchUser.map((item: any) => (
              <div
                className="w-full flex items-center bg-slate-100 my-2 justify-between p-1 rounded-lg font-[roboto]"
                key={item.id}
              >
                <div className="flex gap-2">
                  <div className="text-lg">{item.name}</div>
                  <div className="text-lg">{item.surname}</div>
                </div>
                <div className="">
                  <Button
                    onClick={() => navigate("/members/" + item.id)}
                    text="VIEW DETAIL"
                    userTable
                    animation
                    icon={FaChevronRight}
                  />
                </div>
              </div>
            ))}
        </div>
      )}

      <UserTable />
    </div>
  );
};

export default Members;
