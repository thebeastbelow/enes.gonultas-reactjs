import { useState } from "react";
import toast from "react-hot-toast";
import {
  goto,
  PAGES,
  PAGE_IDS,
} from "../../features/navigation/navigationSlice";
import {
  editProduct,
  saveProduct,
  setSelectedProductId,
} from "../../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { EMAIL_REGEXP, URL_REGEXP } from "../../utils/constants";
import { FormInput } from "../FormInput/FormInput";
import { PageTemplate } from "../PageTemplate/PageTemplate";

export const AddProduct = ({ editMode }: { editMode?: boolean }) => {
  const dispatch = useAppDispatch();
  const { selectedProduct } = useAppSelector((state) => state.products);

  const [name, setName] = useState(
    (editMode ? selectedProduct?.name : "") || ""
  );
  const [nameError, setNameError] = useState("");
  const [category, setCategory] = useState(
    (editMode ? selectedProduct?.category : "") || ""
  );
  const [categoryError, setCategoryError] = useState("");
  const [avatar, setAvatar] = useState(
    (editMode ? selectedProduct?.avatar : "") || ""
  );
  const [avatarError, setAvatarError] = useState("");
  const [price, setPrice] = useState(
    (editMode ? selectedProduct?.price : 0) || 0
  );
  const [priceError, setPriceError] = useState("");
  const [developerEmail, setDeveloperEmail] = useState(
    (editMode ? selectedProduct?.developerEmail : "") || ""
  );
  const [developerEmailError, setDeveloperEmailError] = useState("");
  const [description, setDescription] = useState(
    (editMode ? selectedProduct?.description : "") || ""
  );
  const [descriptionError, setDescriptionError] = useState("");

  const generateTextInputHandler =
    (setValue: Function, setError?: Function) =>
    ({ target: { value } }: { target: { value: string } }) => {
      setValue(value);
      if (setError) {
        setError("");
      }
    };

  const validateForm = () => {
    let result = true;
    if (!name.length) {
      setNameError("Please enter a value!");
      result = false;
    }
    if (!category.length) {
      setCategoryError("Please enter a value!");
      result = false;
    }
    if (!description.length) {
      setDescriptionError("Please enter a value!");
      result = false;
    }
    if (!URL_REGEXP.test(avatar)) {
      setAvatarError("Please enter a valid image url!");
      result = false;
    }
    if (!EMAIL_REGEXP.test(developerEmail)) {
      setDeveloperEmailError("Please enter a valid email address!");
      result = false;
    }
    if (!Number.isFinite(price) || price < 0) {
      setPriceError("Please enter a valid non-negative number!");
      result = false;
    }

    return result;
  };

  return (
    <PageTemplate
      pageName={
        PAGES[PAGE_IDS[editMode ? "PRODUCT_DETAIL" : "ADD_PRODUCT"]].name
      }
    >
      <div className="flex w-full flex-col rounded border p-8 shadow md:shadow-md lg:shadow-lg">
        <FormInput
          label="Name"
          type="text"
          value={name}
          error={nameError}
          onChange={generateTextInputHandler(setName, setNameError)}
        />
        <FormInput
          label="Category"
          type="text"
          value={category}
          error={categoryError}
          onChange={generateTextInputHandler(setCategory, setCategoryError)}
        />
        <FormInput
          label="Image"
          type="text"
          value={avatar}
          error={avatarError}
          onChange={generateTextInputHandler(setAvatar, setAvatarError)}
        />
        <FormInput
          label="Price"
          type="text"
          value={price}
          error={priceError}
          onChange={({ target: { value } }: { target: { value: string } }) => {
            const newValue = Number(value);
            if (!isNaN(newValue)) {
              setPrice(newValue);
              setPriceError("");
            }
          }}
        />
        <FormInput
          label="Email"
          type="text"
          value={developerEmail}
          error={developerEmailError}
          onChange={generateTextInputHandler(
            setDeveloperEmail,
            setDeveloperEmailError
          )}
        />
        <FormInput
          label="Description"
          type="textarea"
          rows={5}
          value={description}
          error={descriptionError}
          onChange={generateTextInputHandler(
            setDescription,
            setDescriptionError
          )}
        />

        <div className="flex justify-end">
          <button
            onClick={() => {
              dispatch(goto(PAGE_IDS.HOME));
              dispatch(setSelectedProductId(null));
            }}
            className="text mt-8 mr-4 h-full whitespace-nowrap rounded-lg bg-red-700 px-4 py-2 text-lg text-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (validateForm()) {
                const createdAt = Date.now();
                dispatch(
                  (editMode ? editProduct : saveProduct)({
                    _id: selectedProduct?._id || createdAt.toString(),
                    createdAt:
                      selectedProduct?.createdAt || new Date(createdAt),
                    name,
                    category,
                    price,
                    developerEmail,
                    avatar,
                    description,
                  })
                );
                toast(
                  editMode
                    ? "Product updated succesfully!"
                    : "New product saved successfully!",
                  {
                    style: {
                      backgroundColor: "#3c3",
                      color: "#eee",
                    },
                  }
                );
                dispatch(goto(PAGE_IDS.HOME));
                dispatch(setSelectedProductId(null));
              }
            }}
            className="text mt-8 h-full whitespace-nowrap rounded-lg bg-sky-900 px-4 py-2 text-lg text-slate-100"
          >
            {`${editMode ? "Update" : "Save"} Product`}
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};
