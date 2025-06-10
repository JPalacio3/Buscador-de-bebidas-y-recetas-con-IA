import { z } from "zod";
import { CategoriesAPIResponseSchema } from "../utils/recipies-schema";

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>;
