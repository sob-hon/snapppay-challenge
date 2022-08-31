import { useSearchParams } from "react-router-dom";

const getInitialSelectOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = JSON.parse(searchParams.get("where"));
  if (!queryParams)
    return {
      initialSearchOption: "first_name",
      initialSearchValue: "",
      initialOrder: "ASC",
    };
  const initialSearchOption = Object.keys(
    JSON.parse(searchParams.get("where"))
  )[0];
  const initialSearchValue = JSON.parse(searchParams.get("where"))[
    initialSearchOption
  ]["contains"];
  const initialOrder = searchParams.get("sort").slice(10);
  return { initialSearchOption, initialSearchValue, initialOrder };
};

export default getInitialSelectOption;