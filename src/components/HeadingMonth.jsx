import { getMonthName } from './data/monthName'
export default function HeadingMonth({ title,selectMonth }) {
  return (
    <>
      <sub className="font-semibold text-[36px]">
        {title} - {getMonthName(parseInt(selectMonth))}
      </sub>
      <sup> (select month from dropdown) </sup>
    </>
  );
}