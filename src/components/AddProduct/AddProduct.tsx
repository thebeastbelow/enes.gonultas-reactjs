import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  goto,
  PAGES,
  PAGE_IDS,
} from "../../features/navigation/navigationSlice";
import { setShouldReloadProducts } from "../../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useSaveNewProductMutation } from "../../services/product";
import { EMAIL_REGEXP, URL_REGEXP } from "../../utils/constants";
import { FormInput } from "../FormInput/FormInput";
import { PageTemplate } from "../PageTemplate/PageTemplate";

export const AddProduct = ({ readOnly }: { readOnly?: boolean }) => {
  const dispatch = useAppDispatch();
  const { selectedProduct } = useAppSelector((state) => state.products);
  const [saveProduct, response] = useSaveNewProductMutation();

  const [name, setName] = useState(
    (readOnly ? selectedProduct?.name : "") || ""
  );
  const [category, setCategory] = useState(
    (readOnly ? selectedProduct?.category : "") || ""
  );
  const [avatar, setAvatar] = useState(
    (readOnly ? selectedProduct?.avatar : "") || ""
  );
  const [avatarError, setAvatarError] = useState(false);
  const [price, setPrice] = useState(
    (readOnly ? selectedProduct?.price : 0) || 0
  );
  const [priceError, setPriceError] = useState(false);
  const [developerEmail, setDeveloperEmail] = useState(
    (readOnly ? selectedProduct?.developerEmail : "") || ""
  );
  const [developerEmailError, setDeveloperEmailError] = useState(false);
  const [description, setDescription] = useState(
    (readOnly ? selectedProduct?.description : "") || ""
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

  useEffect(() => {
    if (response.isSuccess) {
      const {
        data: { message },
      } = response;

      if (message === "Success") {
        toast("New product saved successfully!", {
          style: {
            backgroundColor: "#3c3",
            color: "#eee",
          },
        });
        dispatch(setShouldReloadProducts(true));
        dispatch(goto(PAGE_IDS.HOME));
      } else {
        toast(message, {
          style: {
            backgroundColor: "#c33",
            color: "#eee",
          },
        });
      }
    }
  }, [response]);

  return (
    <PageTemplate
      pageName={
        PAGES[PAGE_IDS[readOnly ? "PRODUCT_DETAIL" : "ADD_PRODUCT"]].name
      }
    >
      <div className="flex w-full flex-col rounded border p-8 shadow md:shadow-md lg:shadow-lg">
        <FormInput
          label="Name"
          type="text"
          value={name}
          onChange={generateTextInputHandler(setName)}
          disabled={readOnly}
        />
        <FormInput
          label="Category"
          type="text"
          value={category}
          onChange={generateTextInputHandler(setCategory)}
          disabled={readOnly}
        />
        <FormInput
          label="Image"
          type="text"
          value={avatar}
          error={avatarError}
          onChange={generateTextInputHandler(setAvatar, setAvatarError)}
          disabled={readOnly}
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
          disabled={readOnly}
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
          disabled={readOnly}
        />
        <FormInput
          label="Description"
          type="textarea"
          rows={5}
          value={description}
          onChange={generateTextInputHandler(setDescription)}
          disabled={readOnly}
        />

        {!readOnly && (
          <div className="flex justify-end">
            <button
              onClick={() => {
                if (validateForm()) {
                  saveProduct({
                    name,
                    category,
                    price,
                    developerEmail,
                    avatar,
                    description,
                  });
                }
              }}
              className="text mt-8 h-full whitespace-nowrap rounded-lg bg-sky-900 px-4 py-2 text-lg text-slate-100"
            >
              Save Product
            </button>
          </div>
        )}
      </div>
    </PageTemplate>
  );
};
