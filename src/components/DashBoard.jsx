"use client";
import { useEffect, useState } from "react";
import { monthName } from "./data/monthName";
import TableHeading from "./TableHeading";
import MonthList from "./MonthList";
import TableData from "./TableData";
import axios from "axios";
import Statistics from "./Statistics";
import BarChart from "./Bar-Chart";

const ITEMS_PER_PAGE = 10;

export default function DashBoard() {
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [selectMonth, setSelectMonth] = useState("03");
  const [data, setData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const FilteredData = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > FilteredData.length / 10) return;
    setCurrentPage(pageNumber);
  };

  // console.log(selectMonth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data");

        // console.log(response.data.data);
        setData(response.data.data);

        FilterDataFunction(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Set data to an empty array or any other appropriate default value
      }
    };

    fetchData();
    setLoading(false);
  }, []);

  const FilterDataFunction = (productData) => {
    let response = productData.filter(
      (product) =>
        (product.title.toLowerCase().includes(searchInput) ||
          product.description.toLowerCase().includes(searchInput) ||
          product.price.toString().includes(searchInput)) &&
        product.dateOfSale.split("-")[1] === selectMonth
    );
    setFilteredData(response);
  };

  useEffect(() => {
    if (data && data.length > 1) {
      FilterDataFunction(data);
    }
  }, [selectMonth, searchInput]);

  if (loading) {
    return <div>Loading....!</div>;
  }

  return (
    <div className="flex flex-col items-center py-[4%] lg:mx-[10%] bg-[#EDF6F6] gap-8">
      {/* for heading */}
      <div className="p-[50px] bg-[white] rounded-full">
        <h1 className="text-[2rem] font-semibold ">
          Transaction <br />
          DashBoard
        </h1>
      </div>
      <div className="flex justify-around w-full flex-col gap-4 px-8 md:flex-row">
        <div className="p-2 bg-[#F8DF8C] rounded-full font-semibold shadow-md ">
          <input
            className="bg-[#F8DF8C] pl-4 outline-none text-black placeholder:text-[#414140]"
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              FilterDataFunction(data);
            }}
            placeholder="Search transaction"
          />
        </div>
        <div>
          <select
            className="px-8  shadow-md font-semibold overflow-scroll w-full border-none overflow-y-auto bg-[#EBB840] p-2 rounded-md focus:outline-none "
            name="dropdown"
            id="dropdown"
            value={selectMonth}
            onChange={(e) => setSelectMonth(e.target.value)}
          >
            <option className="font-semibold border-none" hidden>
              Select Month
            </option>
            <MonthList monthName={monthName} />
          </select>
        </div>
      </div>
      {filteredData.length >= 1 ? (
        <div className="w-full  xl:px-8 md:px-4 rounded-lg">
          {/* table */}
          <div className="flex flex-col bg-[#F8DF8C] rounded-lg">
            {/* table heading */}
            <TableHeading />
            {/* table body */}
            <TableData FilteredData={FilteredData} />
          </div>
          {/* pagination */}
          <div className="flex justify-between p-2 text-[24px] font-semibold">
            <div>Page No. {currentPage}</div>
            <div className="cursor-pointer">
              <button onClick={() => paginate(currentPage + 1)}>Next</button> -{" "}
              <button onClick={() => paginate(currentPage - 1)}>
                Previous
              </button>
            </div>
            <div>Per Page : 10</div>
          </div>
        </div>
      ) : (
        <div>Not Transaction Fount</div>
      )}
      {/* for statistics */}
      <hr className="border-[2px] border-black w-[75vw]" />
      <Statistics selectMonth={selectMonth} />
      <hr className="border-[2px] border-black w-[75vw]" />
      <BarChart selectMonth={selectMonth} />
      <hr className="border-[2px] border-black w-[75vw]" />
    </div>
  );
}
