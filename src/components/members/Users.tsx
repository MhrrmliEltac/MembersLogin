import { useSelector } from "react-redux";
import Button from "../general/Button";
import Loaders from "../mui/Loaders";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { RootState } from "../redux/store";

const Users = () => {
  const navigate = useNavigate();
  const { user, filterUser } = useSelector(
    (state: RootState) => state.userSlice
  );

  // Filter logic
  const usersToShow = filterUser && filterUser.length > 0 ? filterUser : user;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {usersToShow && usersToShow.length > 0 ? (
        usersToShow.map((item: any, index: number) => (
          <motion.div
            className="flex flex-col justify-between w-full bg-white p-4 my-0 mx-auto font-[900] font-[roboto] text-lg rounded-xl hover:shadow-md transition-all duration-300"
            key={item.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex w-full mb-2 md:text-xl text-xs">
              <div className="w-1/4 flex justify-center items-center">
                <FaUser />
              </div>
              <div className="w-1/2 flex items-center md:justify-start justify-center">
                {item.name}
              </div>
              <div className="w-1/2 flex items-center md:justify-start justify-center">
                {item.surname}
              </div>
              <div className="w-1/2 flex items-center md:justify-start justify-center">
                {item.work}
              </div>
              <div className="w-1/2 flex items-center md:justify-start justify-center">
                {item.age}
              </div>
              <div className="w-1/3">
                <Button
                  onClick={() => navigate("/members/" + item.id)}
                  text="VIEW DETAIL"
                  userTable
                  animation
                  icon={FaChevronRight}
                />
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <Loaders open />
      )}
    </>
  );
};

export default Users;
