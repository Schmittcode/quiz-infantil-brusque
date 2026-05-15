document.addEventListener("DOMContentLoaded", () => {
    // Pegando as telas
    const telaInicio = document.getElementById("tela-inicio");
    const telaQuiz = document.getElementById("tela-quiz");

    // Pegando o botão e os campos de texto
    const btnJogar = document.getElementById("btn-jogar");
    const campoNome = document.getElementById("nome-aluno");
    const campoEscola = document.getElementById("escola");
    
    // Pegando os botões de idade
    const btnIdades = document.querySelectorAll(".btn-idade");

    // Controles de som
    const btnSomInicio = document.getElementById("btn-som");
    const btnSomQuiz = document.getElementById("btn-som-quiz");
    const musicaFundo = document.getElementById("musica-fundo");
    
    // Configuração inicial do som (bem baixinho)
    musicaFundo.volume = 0.1; 
    
    let idadeSelecionada = "";

    // Função para ligar/desligar som manualmente
    const alterarSom = () => {
        if(musicaFundo.paused) {
            musicaFundo.play().catch(e => console.log("O navegador bloqueou o som. Clique em Jogar primeiro!"));
            btnSomInicio.style.opacity = "1";
            btnSomQuiz.style.opacity = "1";
        } else {
            musicaFundo.pause();
            btnSomInicio.style.opacity = "0.5";
            btnSomQuiz.style.opacity = "0.5";
        }
    };

    // Eventos dos botões de som (Clique manual)
    btnSomInicio.addEventListener("click" , (e) => {
        e.stopPropagation();
        alterarSom();
    });

    btnSomQuiz.addEventListener("click" , (e) => {
        e.stopPropagation();
        alterarSom();
    });

    // Lógica das idades
    btnIdades.forEach(botao => {
        botao.addEventListener("click", () => {
            idadeSelecionada = botao.textContent;
            btnIdades.forEach(b => b.style.backgroundColor = "#3498db");
            botao.style.backgroundColor = "#2ecc71";
        });
    });

    // Lógica de iniciar o jogo e COMEÇAR A MÚSICA
    btnJogar.addEventListener("click", () => {
        const nome = campoNome.value.trim();
        const escola = campoEscola.value.trim();

        if(nome === "" || escola === "" || idadeSelecionada === "") {
            alert("Por favor, preencha seu nome, sua escola e selecione sua idade.");
        } else {
            // Esconde início e mostra quiz
            telaInicio.style.display = "none";
            telaQuiz.style.display = "flex";

            // A MÚSICA COMEÇA AQUI! 
            // Como houve um clique no botão, o som é liberado pelo navegador.
            musicaFundo.play().then(() => {
                btnSomInicio.style.opacity = "1";
                btnSomQuiz.style.opacity = "1";
            }).catch(error => {
                console.log("Erro ao iniciar som:", error);
            });
        }
    });
});