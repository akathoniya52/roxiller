export default function MonthList({ monthName }) {
  return (
    <>
      {monthName.map((month, index) => (
        <option
          key={index}
          className=" text-[10px] font-light border-none"
          value={`${index + 1 < 10 ? "0" + (index + 1) : index + 1}`}
        >
          {month[index + 1]}
        </option>
      ))}
    </>
  );
}