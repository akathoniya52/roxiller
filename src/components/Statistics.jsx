"use client";
import { useEffect, useState } from "react";
import HeadingMonth from "./HeadingMonth";
import { getMonthName } from "./data/monthName";
import axios from "axios";

export default function Statistics({ selectMonth }) {
  const [data, setData] = useState("");
  useEffect(() => {
    //
    const fetchData = async (selectMonth) => {
      const response = await axios.get(`/api/statistics?month=${selectMonth}`);
      setData(response.data);
    };
    fetchData(getMonthName(parseInt(selectMonth)));
  }, [selectMonth]);

  return (
    <>
      {data ? (
        <div>
          <HeadingMonth title="Statistics" selectMonth={selectMonth} />
          <div className="md:max-w-[40vw] min-w-[30vw] m-4">
            <div className="bg-[#F8DF8C] p-4 font-medium rounded-sm">
              <div className="flex">
                Total Sale :
                <div className="font-bold">${data.TotalSale.toFixed(2)}</div>
              </div>
              <div className="flex">
                Total Sold Items : <div className="font-bold">{data.Sold}</div>
              </div>
              <div className="flex">
                Total Not Sold Items :{" "}
                <div className="font-bold">{data.NotSold}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No Data Found</div>
      )}
    </>
  );
}
