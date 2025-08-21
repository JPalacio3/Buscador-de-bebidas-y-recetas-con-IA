import { useState, useEffect, useRef } from "react";
import { useAppStore } from "../stores/useAppStore";

export default function GenerateAI() {
  const Notification = useAppStore((state) => state.showNotification);
  const generateRecipe = useAppStore((state) => state.generateRecipe);
  const isGenerating = useAppStore((state) => state.isGenerating);

  const [history, setHistory] = useState<
    { prompt: string; response: string }[]
  >([]);
  const [streamingText, setStreamingText] = useState("");
  const [currentStream, setCurrentStream] = useState<{
    prompt: string;
    response: string;
  } | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem("aiHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (currentStream) {
      setStreamingText(""); // Reset for new response
      const responseText = currentStream.response;
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < responseText.length) {
          setStreamingText((prev) => prev + responseText.charAt(index));
          index++;
        } else {
          clearInterval(intervalId);
          // Streaming finished, update history
          const newEntry = {
            prompt: currentStream.prompt,
            response: currentStream.response,
          };
          const updatedHistory = [newEntry, ...history];
          setHistory(updatedHistory);
          localStorage.setItem("aiHistory", JSON.stringify(updatedHistory));
          setCurrentStream(null); // Reset stream state
        }
      }, 25); // Typing speed

      return () => clearInterval(intervalId);
    }
  }, [currentStream, history]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [streamingText]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const prompt = form.get("prompt") as string;

    if (prompt.trim() === "" || prompt.trim().length < 2) {
      Notification({
        text: "La búsqueda no puede estar vacía o ser demasiado corta.",
        error: true,
      });
      return;
    }

    // Limpiar el input inmediatamente después de enviar
    if (e.currentTarget) {
      e.currentTarget.reset();
    }

    let response = await generateRecipe(prompt);
    if (!response || typeof response !== "string") {
      response = "Error al generar la receta.";
    }
    setCurrentStream({ prompt, response });
  };

  // Formatea la respuesta de la IA para mejorar la visualización
  function formatAIResponse(text: string) {
    return text
      .replace(/####/g, "")
      .replace(/###/g, "")
      .replace(/\*\*/g, "")
      .replace(/\\n/g, "");
  }

  return (
    <>
      <h1 className="text-center text-3xl xl:text-6xl font-extrabold">
        Generar Receta con IA
      </h1>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 py-10">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <input
              name="prompt"
              id="prompt"
              className="border bg-white p-4 rounded-lg w-full border-slate-800"
              placeholder="Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa"
            />
            <button
              type="submit"
              aria-label="Enviar"
              className={`cursor-pointer p-2 bg-slate-800 rounded-lg
              ${
                isGenerating || currentStream
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={isGenerating || !!currentStream}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        </form>
        {/* Inhabilitar el botón de generar respuesta mientras se genera una */}
        {isGenerating && !currentStream && (
          <div className="text-gray-300 animate-pulse m-2 p-0">
            <p>Generando receta...</p>
          </div>
        )}

        {/* Historial de recetas generadas */}
        <div
          ref={chatContainerRef}
          className="space-y-4 max-h-[60vh] overflow-y-auto p-4 rounded-lg bg-white"
        >
          {currentStream && (
            <div className="p-4 border rounded-lg bg-blue-100 shadow-sm">
              <p className="text-right font-bold">🔸 Tú:</p>
              <p className="text-right text-gray-700">{currentStream.prompt}</p>
              <p className="text-left font-bold mt-2">🔹 Barman AI:</p>
              <p style={{ whiteSpace: "pre-line" }}>
                {formatAIResponse(streamingText)}
                <span className="inline-block w-2 h-4 bg-slate-800 animate-pulse ml-1"></span>
              </p>
            </div>
          )}
          {history.map((entry, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-blue-100 shadow-sm"
            >
              <p className="text-right font-bold">🔸 Tú:</p>
              <p className="text-right text-gray-700">{entry.prompt}</p>
              <p className="text-left font-bold mt-2">🔹 Barman AI:</p>
              <p style={{ whiteSpace: "pre-line" }}>
                {formatAIResponse(entry.response)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
