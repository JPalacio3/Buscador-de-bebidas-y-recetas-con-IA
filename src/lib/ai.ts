import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const openrouter = createOpenRouter({
  apiKey:
    import.meta.env.VITE_OPENROUTER_KEY ||
    import.meta.env.VITE_OPENROUTER_KEY2 ||
    import.meta.env.VITE_OPENROUTER_KEY3
});
