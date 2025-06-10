import axios from "axios";
import { CategoriesAPIResponseSchema } from "../utils/recipies-schema";

export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const { data } = await axios.get(url);
  const result = CategoriesAPIResponseSchema.safeParse(data);

  console.log("getCategories result", result);

  if (result.success) {
    return result.data;
  }
}
