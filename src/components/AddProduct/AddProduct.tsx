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
  const [category, setCategory] = useState(
    (editMode ? selectedProduct?.category : "") || ""
  );
  const [avatar, setAvatar] = useState(
    (editMode ? selectedProduct?.avatar : "") || ""
  );
  const [avatarError, setAvatarError] = useState(false);
  const [price, setPrice] = useState(
    (editMode ? selectedProduct?.price : 0) || 0
  );
  const [priceError, setPriceError] = useState(false);
  const [developerEmail, setDeveloperEmail] = useState(
    (editMode ? selectedProduct?.developerEmail : "") || ""
  );
  const [developerEmailError, setDeveloperEmailError] = useState(false);
  const [description, setDescription] = useState(
    (editMode ? selectedProduct?.description : "") || ""
  );

  const generateTextInputHandler =
    (setValue: Function, setError?: Function) =>
    ({ target: { value } }: { target: { value: string } }) => {
      setValue(value);
      if (setError) {
        setError(false);
      }
    };

  const validateForm = () => {
    let result = true;
    if (!URL_REGEXP.test(avatar)) {
      setAvatarError(true);
      result = false;
    }
    if (!EMAIL_REGEXP.test(developerEmail)) {
      setDeveloperEmailError(true);
      result = false;
    }
    if (!Number.isFinite(price) || price < 0) {
      setPriceError(true);
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
          onChange={generateTextInputHandler(setName)}
        />
        <FormInput
          label="Category"
          type="text"
          value={category}
          onChange={generateTextInputHandler(setCategory)}
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
              setPriceError(false);
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
          onChange={generateTextInputHandler(setDescription)}
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
