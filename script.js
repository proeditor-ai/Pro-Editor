const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");

generateBtn.addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  if (!prompt.trim()) {
    output.textContent = "⚠️ Please enter a prompt.";
    return;
  }

  output.textContent = "⏳ Generating, please wait...";

  try {
  const response = await fetch("https://proeditor.onrender.com/generate", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    output.textContent = data.output || "❌ Error: No output received.";
  } catch (err) {
    output.textContent = "🚫 Failed to connect to server.";
    console.error(err);
  }
});
