// Gerador de Estrelas para o Fundo
const starBg = document.getElementById('star-background');
for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
    starBg.appendChild(star);
}

const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatHistory = document.getElementById('chat-history');

function scrollChatToBottom() {
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function addUserMessage(text) {
const outerDiv = document.createElement('div');
outerDiv.className = "flex justify-end fade-in mb-4";

const bubbleDiv = document.createElement("div");
bubbleDiv.className = "bg-gradient-to-br from-red-500 to-red-600 text-white rounded-tr-none px-5 py-3 rounded-3xl shadow-md max-w-[85%]";

const textP = document.createElement("p");
textP.className = "text-sm font-medium";
textP.textContent = text;

bubbleDiv.appendChild(textP);
outerDiv.appendChild(bubbleDiv);
chatHistory.appendChild(outerDiv);
scrollChatToBottom();
}

function addLilieMessage(text) {
const outerDivLilie = document.createElement("div");
outerDivLilie.className = "flex justify-start fade-in mb-4";

const bubbleDivLilie = document.createElement("div");
bubbleDivLilie.className = "bg-white/95 text-red-900 border border-red-50 border-l-4 border-l-red-400 px-5 py-3 rounded-3xl rounded-tl-none shadow-md max-w-[85%]";

const textPLilie = document.createElement("p");
textPLilie.className = "text-sm font-medium";
textPLilie.textContent = text;

bubbleDivLilie.appendChild(textPLilie);
outerDivLilie.appendChild(bubbleDivLilie);
chatHistory.appendChild(outerDivLilie);
scrollChatToBottom();

return textPLilie;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = '';

    const lilieTextEl = addLilieMessage("Lilie está digitando...");

    const response = await fetch('/chat', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
    });

const data = await response.json();
    lilieTextEl.textContent = data.reply;
});