import React, { useEffect, useState } from "react";

const ProductPagination = ({ numOfPag, currentPage, setCurrentPage }) => {
  const [pagArr, setPagArr] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= numOfPag; i++) {
      arr.push(i);
    }
    setPagArr(arr);
  }, [numOfPag]);

  return (
    <div className="p-6 flex flex-row border-t border-solid border-coolGray-200 justify-between items-center">
      <div></div>

      <div className="flex flex-row justify-end items-center">
        {pagArr.map((el, i) => (
          <p
            onClick={() => setCurrentPage(el)}
            className={`h-8 w-8 ml-3 rounded-full ${
              currentPage === el
                ? "bg-sky-700 text-white"
                : "bg-coolGray-100 text-coolGray-500 hover:bg-sky-700 hover:text-white"
            }  flex justify-center items-center cursor-pointer text-sm`}
            key={i}
          >
            {el}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductPagination;
