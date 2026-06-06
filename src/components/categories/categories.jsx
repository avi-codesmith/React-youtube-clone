import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/categoriesSlice";
import { handleType } from "../../store/typeOfVidSlice";
import "./categories.css";

export default function Categories() {
  const { categoriesData } = useSelector((state) => state.categories);
  const { type } = useSelector((state) => state.typeOfVid);
  const dispatch = useDispatch();

  console.log(type);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  function handleCategory(category) {
    dispatch(handleType(category));
  }

  const categoriesName = (
    <ul className="categories">
      {categoriesData?.categories?.map((category) => (
        <li
          onClick={() => handleCategory(category.title)}
          className={type === category.title ? "active" : ""}
          key={category.id}
        >
          {category.title}
        </li>
      ))}
    </ul>
  );
  return <div className="categories-chamber">{categoriesName}</div>;
}
