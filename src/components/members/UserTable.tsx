import { useEffect, useState } from "react";
import PaginationRounded from "../mui/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/Slice/userSlice";
import Users from "../members/Users";
import { motion } from "framer-motion";

const UserTable = () => {
  const users = useSelector((state: any) => state.userSlice.allUser);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const ITEMS_PER_PAGE = 4;
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  useEffect(() => {
    dispatch(fetchUsers({ from, to }) as any);
  }, [dispatch, page]);

  const animationVariants = {
    hidden: { opacity: 0, x: -50 }, 
    visible: { opacity: 1, x: 0 }, 
    exit: { opacity: 0, x: 50 }, 
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="py-3 md:py-5 px-5 md:px-10 flex gap-2 justify-between items-center flex-wrap"
    >
      <motion.div
        variants={animationVariants}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex w-full bg-white p-4 my-0 mx-auto font-[900] font-[roboto] text-lg rounded-xl hover:shadow-md transition-all duration-300"
      >
        <div className="w-1/4"></div>
        <div className="w-1/2 flex items-center md:justify-start justify-center">
          Ad
        </div>
        <div className="w-1/2 flex items-center md:justify-start justify-center">
          Soyad
        </div>
        <div className="w-1/2 flex items-center md:justify-start flex-wrap justify-center">
          İş
        </div>
        <div className="w-1/2 flex items-center md:justify-start justify-center">
          Yaş
        </div>
        <div className="w-1/3"></div>
      </motion.div>
      <Users />
      <div className="w-full flex justify-end">
        <PaginationRounded count={totalPages} onChange={handlePageChange} />
      </div>
    </motion.div>
  );
};
export default UserTable;
