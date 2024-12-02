import { BarChart } from "@mui/x-charts/BarChart";
import { memo, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "../redux/Slice/userSlice";
import Loaders from "../mui/Loaders";

interface AgeProps {
  bachelor: [];
  master: [];
  graduate: [];
}

function BasicBars() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.userSlice.allUser);
  const loading = useSelector((state: any) => state.userSlice.allUserStatus);
  const [age, setAge] = useState<AgeProps[]>([
    {
      bachelor: [],
      master: [],
      graduate: [],
    },
  ]);
  useLayoutEffect(() => {
    dispatch(fetchAllUser() as any);
  }, [dispatch]);
  useEffect(() => {
    if (loading === "succeeded") {
      const bachelorAges = user
        .filter((item: any) => item.higher_education === "Bakalavr")
        .map((item: any) => item.age);

      const masterAges = user
        .filter((item: any) => item.higher_education === "Magistr")
        .map((item: any) => item.age);

      const graduateAges = user
        .filter((item: any) => item.higher_education === "Məzun")
        .map((item: any) => item.age);

      setAge((prevAge) =>
        prevAge.map((ageItem) => ({
          ...ageItem,
          bachelor: bachelorAges,
          master: masterAges,
          graduate: graduateAges,
        }))
      );
    }
  }, [loading, user]);

  const bachelorSum = age[0].bachelor.reduce((acc, item) => acc + item, 0);
  const masterSum = age[0].master.reduce((acc, item) => acc + item, 0);
  const graduateSum = age[0].graduate.reduce((acc, item) => acc + item, 0);
  const sum = [bachelorSum, masterSum, graduateSum];
  const avarageNum = (bachelorSum + masterSum + graduateSum) / 3;

  return (
    <div className="flex items-center w-[80%] justify-between">
      <div className="shadow-lg ">
        {user && user.length > 0 ? (
          <BarChart
            xAxis={[
              { scaleType: "band", data: ["Bakalavr", "Magistr", "Məzun"] },
            ]}
            series={[
              { data: sum, label: "cəm", id: "countId", color: "#DB2C59" },
            ]}
            width={500}
            height={300}
          />
        ) : (
          <Loaders open />
        )}
      </div>
      <div className="border flex flex-col p-5 rounded-lg shadow-lg w-[300px] h-[200px] justify-center items-center gap-5">
        <p className="text-lg font-[roboto] font-medium md:text-xl w-1/2">
          Bakalavr: {bachelorSum}
        </p>
        <p className="text-lg font-[roboto] font-medium md:text-xl w-1/2">
          Magistr: {masterSum}
        </p>
        <p className="text-lg font-[roboto] font-medium md:text-xl w-1/2">
          Məzun: {graduateSum}
        </p>
      </div>
      <div className="border flex flex-col p-5 rounded-lg shadow-lg w-[200px] h-[200px] justify-center items-center gap-5">
        <p className="text-lg font-[roboto] font-medium md:text-lg">
          Ortalama Yaş: {avarageNum.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default memo(BasicBars);
