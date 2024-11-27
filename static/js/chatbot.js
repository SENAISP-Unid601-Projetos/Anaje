document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById("chatbotInput");
    const sendButton = document.getElementById("sendButton");
    let messageCount = 0; // Contador para gerar IDs únicos

    function toggleInput(enabled) {
        inputField.disabled = !enabled;
        sendButton.disabled = !enabled;
    }

    async function enviarMensagem() {
        const userMessage = inputField.value.trim();
        const respostaContainer = document.getElementById("chatbotContent");

        if (userMessage !== "") {
            toggleInput(false); // Bloqueia o envio de novas mensagens

            // Criar e exibir a mensagem do usuário
            const userMessageElement = document.createElement("div");
            userMessageElement.classList.add("message", "user-message");
            userMessageElement.textContent = userMessage;
            respostaContainer.appendChild(userMessageElement);

            // Criar a div da resposta do bot com um id único
            const botResponseElement = document.createElement("div");
            botResponseElement.classList.add("message", "bot-message");
            botResponseElement.id = `botResponse-${messageCount}`;
            botResponseElement.textContent = "Carregando resposta...";
            respostaContainer.appendChild(botResponseElement);

            // Incrementar o contador para o próximo par de mensagens
            messageCount++;

            // Limpar o campo de entrada e rolar para o final
            inputField.value = "";
            respostaContainer.scrollTop = respostaContainer.scrollHeight;

            // Enviar a mensagem para o servidor
            const contexto = "Nesta conversa, você será responsável por responder dúvidas sobre a Pousada Quinta do Ypuã. Para isso, vou fornecer informações gerais sobre o local, e você deve utilizá-las para responder às perguntas feitas. A Pousada Quinta do Ypuã oferece um ambiente repleto de natureza e excelente atendimento. Para alugar qualquer um de seus quartos, é necessário fazer uma reserva com antecedência mínima de 2 dias. Veja as opções de hospedagem: Domo: Uma opção inovadora com design geodésico sustentável. Perfeita para quem deseja uma estadia diferenciada. R$ 590,00/noite.Chalé Família: Com dois quartos climatizados, cozinha equipada, churrasqueira e sacada com vista para o mar. R$ 590,00/noite. Charrua: Ônibus remodelado, transformado em um quarto aconchegante, que une o charme da estrada ao conforto. R$ 490,00/noite. Cabana: Localizada em uma área reservada, possui camas confortáveis, cozinha, varanda, deck com churrasqueira e vista para o mar. R$ 490,00/noite. Suíte com Cozinha: Suíte com vista para o mar, cozinha equipada e deck com churrasqueira. R$ 390,00/noite. Estacionamento para Overlanders: Espaço para veículos, com pontos de água, luz, banheiro e churrasqueira. R$ 100,00/noite. Todos os quartos contam com Wi-Fi, TV a cabo, ar-condicionado e cozinha, exceto o estacionamento, que oferece apenas Wi-Fi e ducha."; + "Responda de forma simples e direta.";
            const mensagemCompleta = contexto + userMessage;

            try {
                const response = await fetch("http://localhost:7000/ia", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: mensagemCompleta }),
                });

                if (!response.ok) {
                    throw new Error("Erro na requisição: " + response.statusText);
                }

                const responseText = await response.text();
                try {
                    const data = JSON.parse(responseText);
                    document.getElementById(`botResponse-${messageCount - 1}`).textContent = data.response;
                } catch (error) {
                    document.getElementById(`botResponse-${messageCount - 1}`).textContent = responseText;
                }
            } catch (error) {
                document.getElementById(`botResponse-${messageCount - 1}`).textContent = "Erro ao enviar a mensagem.";
                console.error("Erro:", error);
            } finally {
                toggleInput(true); // Reabilita o envio de mensagens
            }
        }
    }

    // Evento para clicar no botão Enviar
    sendButton.addEventListener("click", enviarMensagem);

    // Evento para pressionar a tecla Enter no campo de entrada
    inputField.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevenir a ação padrão do Enter
            enviarMensagem();
        }
    });

    // Evento para abrir/fechar a janela do chatbot
    document.getElementById("chatbotButton").addEventListener("click", function() {
        var chatbotWindow = document.getElementById("chatbotWindow");
        chatbotWindow.style.display = chatbotWindow.style.display === "block" ? "none" : "block";
        if (chatbotWindow.style.display === "block") {
            toggleInput(true); // Ativa o input quando o chatbot for aberto
        }
    });

    // Evento para fechar a janela do chatbot ao clicar fora
    document.addEventListener("click", function(event) {
        var chatbotWindow = document.getElementById("chatbotWindow");
        var chatbotButton = document.getElementById("chatbotButton");
        if (chatbotWindow.style.display === "block" &&
            !chatbotWindow.contains(event.target) &&
            event.target !== chatbotButton) {
            chatbotWindow.style.display = "none";
        }
    });
});
