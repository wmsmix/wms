import React from "react";
import RunningText from "./RunningText";

interface TableColumn {
  header: string;
  key: string;
  unit?: string;
}

type TableRow = Record<string, number | string>;

interface ProductSpecTableProps {
  title: string;
  columns: TableColumn[];
  rows: TableRow[];
  runningText?: string;
  isPrimaryBackground?: boolean;
  className?: string;
}

const ProductSpecTable: React.FC<ProductSpecTableProps> = ({
  title,
  columns,
  rows,
  runningText,
  isPrimaryBackground = false,
  className = "",
}) => {
  return (
    <div className={`mt-24 w-full ${isPrimaryBackground ? 'bg-blue-primary' : 'bg-white-10'} ${isPrimaryBackground ? 'pb-12' : ''} ${className}`}>
      <div className={`container max-w-full bg-white-10 `}>
        <h2 className="mb-8 text-center font-noto text-2xl px-10 text-black md:text-4xl mt-[-1px]">
          {title}
        </h2>

        <div className="relative w-full overflow-x-auto bg-transparent text-blue-light mt-[-1px]">
          <div className="relative overflow-x-auto rounded-t-lg">
            <table className="w-full whitespace-nowrap min-w-[640px] border-collapse relative">
              <thead className="relative">
                <tr className="bg-white">
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className={`border-b border-t border-gray-300 px-4 py-2 text-center font-normal 
                        ${index !== 0 ? "border-l" : ""} 
                        ${index !== columns.length - 1 ? "border-r" : ""}
                        ${index === 0 ? "sticky left-0 bg-white z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" : ""}
                      `}
                      style={index === 0 ? { backgroundColor: "white" } : {}}
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border-b border-t border-gray-300 px-4 py-2 text-center 
                          ${colIndex !== 0 ? "border-l" : ""} 
                          ${colIndex !== columns.length - 1 ? "border-r" : ""}
                          ${colIndex === 0 ? "sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]" : ""}
                        `}
                        style={colIndex === 0 ? { backgroundColor: rowIndex % 2 === 0 ? "#F9FAFB" : "white" } : {}}
                      >
                        {column.unit ? (
                          <>
                            <span className="font-bold text-blue-primary">
                              {row[column.key]}
                            </span>
                            {` ${column.unit}`}
                          </>
                        ) : (
                          row[column.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {runningText && (
          <div className={`mt-0 ${isPrimaryBackground ? 'pb-10 bg-blue-primary' : ''}`}>
            <RunningText
              text={runningText}
              backgroundColor={"bg-gray-200"}
              textColor={"text-blue-primary"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSpecTable;
