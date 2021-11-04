import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/action/modalAction/actions";
import {
  deleteProduct,
  selectProduct,
  switchSort,
} from "../../redux/action/productAction/actions";
import ArrowSort from "../ArrowSort";

const ProductTable = ({ list }) => {
  const { sortTerm } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  return (
    <table className="items-center bg-transparent w-full border-collapse ">
      <thead>
        <tr>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            Photo
          </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            <div className="flex flex-row justify-start items-center">
              <p className="mr-3">Title</p>
              <ArrowSort
                switchSort={switchSort}
                term={"title"}
                sortTerm={sortTerm}
              />
            </div>
          </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            <div className="flex flex-row justify-start items-center">
              <p className="mr-3">Price</p>
              <ArrowSort
                switchSort={switchSort}
                term={"price"}
                sortTerm={sortTerm}
              />
            </div>
          </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            <div className="flex flex-row justify-start items-center">
              <p className="mr-3">Category</p>
              <ArrowSort
                switchSort={switchSort}
                term={"category"}
                sortTerm={sortTerm}
              />
            </div>
          </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
            <div className="text-left flex justify-end items-end">Action</div>
          </th>
        </tr>
      </thead>

      <tbody>
        {list.length > 0 &&
          list.map((item, idx) => (
            <tr className="hover:bg-coolGray-50" key={idx}>
              <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                <img src={item.photo} className="w-12" alt="" />
              </th>

              <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                <p className="w-44 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {item.title}
                </p>
              </td>
              <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {item.price} $
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {item.category}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div className="flex flex-row justify-end items-center">
                  <button
                    onClick={() => dispatch(selectProduct(item))}
                    className="ml-3 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      dispatch(
                        showModal({
                          title: "Delete product",
                          content:
                            "Are you sure you want to delete this product",
                          action: () => dispatch(deleteProduct(item.id)),
                        })
                      )
                    }
                    className="ml-3 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
