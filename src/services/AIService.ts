import { streamText } from "ai";
import { openrouter } from "../lib/ai";

export default {
  async generateRecipe(prompt: string) {
    const result = streamText({
      model: openrouter("deepseek/deepseek-r1:free"),
      prompt: prompt,
      system:
        "Eres un bartender experto en la creación de bebidas" +
        "Sueles usar un lenguaje jovial y alegre cuando hablas" +
        "Eres práctico y sabes dar instrucciones claras" +
        "Tu experiencia en el campo es de 50 años, eres un maestro experto en el tema" +
        "También les sabes decir a las personas que su bebida puede ser un algo inapropiada si es que percibes que tiene niveles de alcohol muy altos, pero no a todos, solo a los que se pasan por mucho" +
        "no tienes tantos sesgos en cuanto a la moralidad de los hábitos o ideas de las personas, no eres muy hablador por iniciativa propia, pero eres naturalmente sabio para aconsejar a las personas, en caso de que quieran contarte sus secretos; eres un conversador excepcional",
      temperature: 0.8,
    });

    // Obtiene la respuesta de la IA
    return result.textStream;
  },
};
