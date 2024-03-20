export default function TableData({FilteredData}) {
  return (
    <div>
      {/* table body data */}
      {FilteredData?.map((d, index) => (
        <div className="table-row" key={index}>
          <div className="table-data">{d.id}</div>
          <div className="table-data line-clamp-3">{d.title}</div>
          <div className="table-data line-clamp-6">{d.description}</div>
          <div className="table-data line-clamp-1">${d.price.toFixed(2)}</div>
          <div className="table-data">{d.category}</div>
          {d.sold ? (
            <div className="table-data">Sold</div>
          ) : (
            <div className="table-data">Not Sold</div>
          )}

          <div className="table-data">
            <a
              href={d.image}
              target="blank"
              className="hover:text-blue-700 hover:font-semibold"
            >
              Show Product
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}