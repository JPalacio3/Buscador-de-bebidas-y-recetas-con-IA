import { z } from "zod";
import {
  CategoriesAPIResponseSchema,
  SearchFiltersSchema,
} from "../utils/recipies-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFiltersSchema>;
