import { z } from "zod";
import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponse,
  SearchFiltersSchema,
} from "../utils/recipies-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFiltersSchema>;
export type Drinks = z.infer<typeof DrinksAPIResponse>
