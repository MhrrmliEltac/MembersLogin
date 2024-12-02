import BasicBars from "../mui/BarChart";
import BasicPie from "../mui/PieChart";

const Chart = () => {
  return (
    <div className="w-[100%] flex flex-col justify-center items-center md:mt-10 mt-3">
      <BasicBars />
      <div className="w-full md:my-10 my-3">
        <BasicPie />
      </div>
    </div>
  );
};

export default Chart;
