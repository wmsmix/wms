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
}

const ProductSpecTable: React.FC<ProductSpecTableProps> = ({
  title,
  columns,
  rows,
  runningText,
  isPrimaryBackground = false,
}) => {
  return (
    <div className={`mt-10 w-full ${isPrimaryBackground ? 'bg-blue-primary' : 'bg-white-10'} ${isPrimaryBackground ? 'pb-12' : ''}`}>
      <div className={`container max-w-full bg-white-10`}>
        <h2 className="mb-8 text-center font-noto text-2xl text-black md:text-4xl">
          {title}
        </h2>

        <div className="relative w-full overflow-x-auto bg-transparent text-blue-light">
          <div className="relative overflow-x-auto rounded-t-lg">
            <table className="w-full whitespace-nowrap min-w-[640px]">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className={`border-b border-t border-gray-300 px-4 py-2 text-center font-normal ${index !== 0 ? "border-l" : ""} ${index !== columns.length - 1 ? "border-r" : ""} `}
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border-b border-t border-gray-300 px-4 py-2 text-center ${colIndex !== 0 ? "border-l" : ""} ${colIndex !== columns.length - 1 ? "border-r" : ""} `}
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
