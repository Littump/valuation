import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function FormObserver({ values, number }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "graphs/setFilters", number, filters: values });
  }, [values, number]);

  return null;
}
