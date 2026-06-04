import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/categoriesSlice";
import "./categories.css";

export default function Categories({ handleCategory, categoryName }) {
  const { categoriesData } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  console.log(categoriesData);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categoriesName = (
    <ul className="categories">
      {categoriesData?.categories?.map((category) => (
        <li
          onClick={() => handleCategory(category.title)}
          className={categoryName === category.title ? "active" : ""}
          key={category.id}
        >
          {category.title}
        </li>
      ))}
    </ul>
  );
  return <div className="categories-chamber">{categoriesName}</div>;
}
