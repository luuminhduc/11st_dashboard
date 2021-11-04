import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { timeStamp } from "../../firebase/config";
import {
  addNewProduct,
  editProduct,
  hideAddProduct,
} from "../../redux/action/productAction/actions";
import { fileListToBase64 } from "../../utils/handleFile";

const AddProduct = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm();
  const { isAdd, selectedProduct } = useSelector(
    (state) => state.productReducer
  );
  const { categoryList } = useSelector((state) => state.categoryReducer);

  const watchCategory = watch("category");

  const [subCategoryArr, setSubCategoryArr] = useState("");

  const [photo, setPhoto] = useState("");

  const watchFile = watch("file");

  useEffect(() => {
    if (watchCategory) {
      setSubCategoryArr(
        categoryList.find((el) => el.name === watchCategory)?.subCategories
      );
    }
  }, [watchCategory, categoryList]);

  useEffect(() => {
    if (categoryList?.length > 0) {
      if (selectedProduct) {
        setValue("category", selectedProduct.category);
      } else {
        if (!watchCategory) {
          setValue("category", categoryList[0].name);
        }
      }
    }
    // eslint-disable-next-line
  }, [categoryList, selectedProduct, setValue]);

  useEffect(() => {
    if (subCategoryArr.length > 0) {
      if (selectedProduct) {
        if (selectedProduct.category === watchCategory) {
          setValue("subCategory", selectedProduct.subCategory);
        } else {
          setValue("subCategory", subCategoryArr[0]);
        }
      } else {
        setValue("subCategory", subCategoryArr[0]);
      }
    }
  }, [watchCategory, subCategoryArr, selectedProduct, setValue]);

  useEffect(() => {
    if (watchFile?.length > 0) {
      fileListToBase64(watchFile).then((res) => {
        setPhoto(res[0]);
      });
    } else {
      setPhoto("");
    }
  }, [watchFile]);

  const submit = (data) => {
    if (selectedProduct) {
      const { time, id } = selectedProduct;
      const editedProduct = { ...data, time, id };
      dispatch(editProduct(editedProduct));
    } else {
      const newProduct = { ...data, time: timeStamp(), reviews: [] };
      dispatch(addNewProduct(newProduct, done));
    }
  };

  const done = () => {
    reset();
    dispatch(hideAddProduct());
  };

  useEffect(() => {
    if (isAdd === false) {
      setValue("file", "");
    }
  }, [isAdd, setValue]);

  // If co product de update thi se setValue cho cac input
  useEffect(() => {
    if (selectedProduct) {
      const { title, price, inventory, description } = selectedProduct;
      setValue("title", title);
      setValue("price", price);
      setValue("inventory", inventory);
      setValue("description", description);
    } else {
      reset();
    }
  }, [selectedProduct, setValue, reset]);

  return isAdd ? (
    <div className="bg-coolGray-900 fixed top-0 left-0 px-3 bg-opacity-40 flex justify-center items-center w-screen h-screen z-20">
      <div className="bg-white shadow-sm p-5 rounded text-sm md:max-w-2xl w-full">
        <div className="flex flex-grow justify-between items-center">
          <h2 className="font-bold">
            {selectedProduct ? "Edit product" : "Add new product"}
          </h2>
          <svg
            onClick={() => {
              reset();
              dispatch(hideAddProduct());
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 cursor-pointer w-5 text-coolGray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <form className="mt-3" onSubmit={handleSubmit((data) => submit(data))}>
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col justify-start items-start">
              <label className="font-semibold">Title</label>
              <input
                {...register("title", { required: true })}
                type="text"
                className={`p-1 w-full focus:outline-none rounded focus:border-sky-700 border border-solid ${
                  errors.title ? "border-red-500" : "border-coolGray-200"
                }`}
              />
              {errors.title && (
                <small className="text-red-500">Title can not be blank</small>
              )}
            </div>
            <div className="flex flex-col justify-start items-start">
              <label className="font-semibold">Price</label>
              <input
                {...register("price", { required: true })}
                type="number"
                className={`p-1 w-full focus:outline-none rounded focus:border-sky-700 border border-solid ${
                  errors.price ? "border-red-500" : "border-coolGray-200"
                }`}
              />
              {errors.price && (
                <small className="text-red-500">Price can not be blank</small>
              )}
            </div>
            <div className="flex flex-col justify-start items-start">
              <label className="font-semibold">Inventory</label>
              <input
                {...register("inventory", { required: true })}
                type="number"
                className={`p-1 w-full focus:outline-none rounded focus:border-sky-700 border border-solid ${
                  errors.inventory ? "border-red-500" : "border-coolGray-200"
                }`}
              />
              {errors.inventory && (
                <small className="text-red-500">
                  Inventory can not be blank
                </small>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-3">
            <div className="flex flex-col justify-start items-start">
              <label className="font-semibold">Category</label>
              <select
                {...register("category", { required: true })}
                className={`p-1 w-full focus:outline-none rounded focus:border-sky-700 border border-solid ${
                  errors.category ? "border-red-500" : "border-coolGray-200"
                }`}
              >
                {categoryList?.length > 0 &&
                  categoryList.map((el, i) => (
                    <option key={i}>{el.name}</option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col justify-start items-start">
              <label className="font-semibold">Sub category</label>
              <select
                {...register("subCategory", { required: true })}
                className={`p-1 w-full focus:outline-none rounded focus:border-sky-700 border border-solid ${
                  errors.subCategory ? "border-red-500" : "border-coolGray-200"
                }`}
              >
                {subCategoryArr?.length > 0 &&
                  subCategoryArr.map((el, i) => <option key={i}>{el}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex flex-col justify-start items-start">
              <label className="font-semibold">Description</label>
              <textarea
                rows="8"
                {...register("description", { required: true })}
                type="text"
                className={`p-1 w-full focus:outline-none rounded focus:border-sky-700 border border-solid ${
                  errors.description ? "border-red-500" : "border-coolGray-200"
                }`}
              />
              {errors.description && (
                <small className="text-red-500">Price can not be blank</small>
              )}
            </div>
          </div>
          {!selectedProduct && (
            <div className="mt-3">
              <label className="font-semibold">Photo</label>

              <div className="flex flex-row justify-start items-start">
                <div className="overflow-hidden relative w-16 cursor-pointer">
                  <button
                    type="button"
                    className={`border border-solid ${
                      errors.file ? "border-red-500" : "border-coolGray-300"
                    } py-3 w-full rounded text-coolGray-400 cursor-pointer font-bold`}
                  >
                    Photo
                  </button>
                  <input
                    accept="image/png, image/jpeg"
                    {...register("file", {
                      required: selectedProduct ? false : true,
                    })}
                    className={`cursor-pointer absolute top-0 left-0 opacity-0 w-full h-full pin-r pin-t`}
                    type="file"
                  />
                </div>

                <small className="text-red-500">
                  {errors.file && errors.file.type === "required"
                    ? "Image can not be blank"
                    : ""}
                </small>

                {photo && (
                  <img
                    className="ml-3 w-40 rounded"
                    alt="product"
                    src={photo}
                  />
                )}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="mt-3 bg-sky-700 hover:bg-sky-800 text-white px-5 py-2 rounded"
          >
            {selectedProduct ? "Edit" : "Add"}
          </button>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default AddProduct;
