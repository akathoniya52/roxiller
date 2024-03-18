"use client";
import { useState } from "react";

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function DashBoard() {
  const [searchInput, setSearchInput] = useState("");
  const [selectMonth, setSelectMonth] = useState("");
  console.log(selectMonth);

  return (
    <div className="flex flex-col items-center py-[4%] lg:mx-[10%] bg-[#EDF6F6] gap-8">
      {/* for heading */}
      <div className="p-[50px] bg-[white] rounded-full">
        <h1 className="text-[2rem] font-semibold ">
          Transaction <br />
          DashBoard
        </h1>
      </div>
      <div className="flex justify-around w-full">
        <div className="p-2 bg-[#F8DF8C] rounded-full font-semibold">
          <input
            className="bg-[#F8DF8C] pl-4 outline-none text-black placeholder:text-[#414140]"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search transaction"
          />
        </div>
        <div>
          <select
            className="px-8 font-semibold overflow-scroll w-full border-none overflow-y-auto bg-[#EBB840] p-2 rounded-md focus:outline-none "
            name="dropdown"
            id="dropdown"
            value={selectMonth}
            onChange={(e) => setSelectMonth(e.target.value)}
          >
            <option className="font-semibold border-none" hidden>
              Select Month
            </option>
            {monthList.map((month, index) => (
              <option
                className=" text-[10px] font-semibold border-none"
                value={`${index + 1 < 10 ? "0" + (index + 1) : index + 1}`}
              >
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>Table Data</div>
    </div>
  );
}
