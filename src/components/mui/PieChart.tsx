import { PieChart } from "@mui/x-charts/PieChart";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "../redux/Slice/userSlice";

type Speciality = {
  infoTech: number;
  infoSec: number;
  compScience: number;
  compEngineer: number;
};

function BasicPie() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.userSlice.allUser);
  const loading = useSelector((state: any) => state.userSlice.allUserStatus);
  const [speciality, setSpeciality] = useState<Speciality[]>([
    {
      infoTech: 0,
      infoSec: 0,
      compScience: 0,
      compEngineer: 0,
    },
  ]);

  useEffect(() => {
    dispatch(fetchAllUser() as any);
  }, [dispatch]);

  useEffect(() => {
    if (loading === "succeeded") {
      const compEngineer = user.filter(
        (user: any) => user.specialty == "Kompyuter mühəndisliyi"
      ).length;
      const compScience = user.filter(
        (user: any) => user.specialty == "Kompüter Elmləri"
      ).length;
      const infoSec = user.filter(
        (user: any) => user.specialty == "İnformasiya təhlükəsizliyi"
      ).length;
      const infoTech = user.filter(
        (user: any) => user.specialty == "İnformasiya Texnologiyaları"
      ).length;

      setSpeciality([
        {
          infoSec: infoSec,
          compEngineer: compEngineer,
          infoTech: infoTech,
          compScience: compScience,
        },
      ]);
    }
  }, [loading, user]);
  console.log(speciality);
  console.log(user);

  return (
    <PieChart
      series={[
        {
          data: [
            {
              id: 0,
              value: speciality[0].compEngineer,
              label: "Kompyuter Mühəndisliyi",
              color: "#edc949",
            },
            {
              id: 1,
              value: speciality[0].compScience,
              label: "Kompüter Elmləri",
              color: "#e15759",
            },
            {
              id: 2,
              value: speciality[0].infoSec,
              label: "İnformasiya Təhlükəsizliyi",
              color: "#af7aa1",
            },
            {
              id: 3,
              value: speciality[0].infoTech,
              label: "İnformasiya Texnologiyaları",
              color: "#f28e2c",
            },
          ],
        },
      ]}
      width={1000}
      height={450}
    />
  );
}

export default memo(BasicPie);
