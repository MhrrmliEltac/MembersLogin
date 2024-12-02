import Button from "../general/Button";
import Input from "../general/Input";
import { TbArrowsSort } from "react-icons/tb";
import { CiCirclePlus } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  fetchAllUser,
  fetchSearchUser,
  filteredUser,
  sendDataUser,
} from "../redux/Slice/userSlice";
import { AppDispatch } from "../redux/store";
import UserAddModal from "../mui/UserAddModal";
import toast from "react-hot-toast";
import { MenuItem, Select } from "@mui/material";

const Banner = () => {
  const members = useSelector((state: any) => state.userSlice.allUser);
  const dispatch = useDispatch<AppDispatch>();
  const [searchInp, setSearchInp] = useState<string | null>("");
  const [open, setOpen] = useState(false);
  const [filterBy, setFilterBy] = useState<string>(""); // Yeni filter state

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  useEffect(() => {
    if (searchInp && searchInp.trim()) {
      dispatch(fetchSearchUser({ searchInp }));
    } else if (searchInp === "") {
      dispatch(fetchSearchUser({ searchInp: null }));
    }
  }, [dispatch, searchInp]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInp(e.target.value);
    },
    []
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddMember = (newMember: any) => {
    dispatch(sendDataUser({ newMember }) as any);
    setOpen(false);
    toast.success("Istifadəçi əlavə olundu");
  };

  useEffect(() => {
    if (filterBy) {
      dispatch(filteredUser({ filterBy }));
    }
  }, [filterBy, dispatch]);

  return (
    <div className="py-3 md:py-5 px-5 md:px-10 flex gap-2 justify-between items-center flex-wrap">
      <div className="text-black flex justify-center items-center md:w-fit w-full font-[roboto] font-semibold text-lg border-b-2 border-black">
        All members ({members && members.length})
      </div>
      <Input
        type="search"
        placeholder="Search members"
        icon={IoSearchOutline}
        onChange={(e) => handleInputChange(e)}
        id="search"
      />
      <Select
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
        displayEmpty
        className="text-[#9F9FA1] md:w-[170px] w-full h-[40px] border border-[#9F9FA1] font-medium text-xs md:text-sm rounded-full flex justify-around items-center"
      >
        <MenuItem value="" disabled>
          Filter by
        </MenuItem>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="surname">Surname</MenuItem>
        <MenuItem value="work">Work</MenuItem>
      </Select>
      <Button
        text="Add member"
        onClick={handleOpen}
        icon={CiCirclePlus}
        addMember
      />
      <UserAddModal
        open={open}
        onClose={handleClose}
        addMember={handleAddMember}
      />
    </div>
  );
};

export default Banner;
