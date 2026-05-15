document.addEventListener("DOMContentLoaded", () => {
    // ================================================================
    // ELEMENTOS DA TELA
    // ================================================================
    const telaInicio = document.getElementById("tela-inicio");
    const telaQuiz = document.getElementById("tela-quiz");
    const telaResultado = document.getElementById("tela-resultado");

    const btnJogar = document.getElementById("btn-jogar");
    const campoNome = document.getElementById("nome-aluno");
    const campoEscola = document.getElementById("escola");
    const btnIdades = document.querySelectorAll(".btn-idade");

    const btnSomInicio = document.getElementById("btn-som");
    const btnSomQuiz = document.getElementById("btn-som-quiz");
    const musicaFundo = document.getElementById("musica-fundo");
    
    const btnProximo = document.getElementById("btn-proximo");
    const textoPergunta = document.getElementById("pergunta");
    const textoPlaca = document.querySelector(".texto-placa");
    const pontuacaoFinal = document.getElementById("pontuacao-final");

    // ================================================================
    // ESTADO DO JOGO
    // ================================================================
    let idadeSelecionada = "";
    let perguntaAtual = 0;
    let acertos = 0;
        let narracaoAtual = null;
    musicaFundo.volume = 0.1; 

    // ================================================================
    // BANCO DE PERGUNTAS (Sua lista original)
    // ================================================================
    const listaPerguntas = [
        {
            titulo: "Qual é o animalzinho que dá nome à festa mais famosa de Brusque, a Fenarreco?",
            audio: "./assets/audios_perguntas/pergunta-1.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_1/imgLeao.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_1/imgMarreco.png", eCorreta: true },
                {foto: "assets/img-tela-quiz/pergunta_1/imgPato.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_1/imgVaca.png", eCorreta: false },
            ]
        },
        {
            titulo: "Em Brusque, existe um lugar com muitas estátuas de pedras brancas. Qual o nome desse parque?",
            audio: "./assets/audios_perguntas/pergunta-2.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_2/imgParqueAquatico.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_2/imgParquedasArvores.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_2/imgParquedasEsculturas.png", eCorreta: true },
                {foto: "assets/img-tela-quiz/pergunta_2/imgParqueSaoLeopoldo.png", eCorreta: false },
            ]
        },
        {
            titulo: "Brusque é conhecida como a cidade que faz muitas roupas. Qual o material que usamos para fazer camisetas e tecidos?",
            audio: "assets/audios_perguntas/pergunta-3.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_3/imgAcucar.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_3/imgCordas.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_3/imgFiosdeAlgodao.png", eCorreta: true },
                {foto: "assets/img-tela-quiz/pergunta_3/imgPlastico.png", eCorreta: false },
            ]
        },
        {
            titulo: "Como se chama o rio que passa no meio da nossa cidade?",
            audio: "assets/audios_perguntas/pergunta-4.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_4/imgRioItajaiMirim.png", eCorreta: true },
                {foto: "assets/img-tela-quiz/pergunta_4/imgRioNegro.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_4/imgRioNovaTrento.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_4/imgRioTijucas.png", eCorreta: false },
            ]
        },
        {
            titulo: "Muitas pessoas que moram em Brusque vieram de um país longe chamado…",
            audio: "assets/audios_perguntas/pergunta-5.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_5/imgAlemanha.png", eCorreta: true },
                {foto: "assets/img-tela-quiz/pergunta_5/imgBrasil.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_5/imgItalia.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_5/imgRussia.png", eCorreta: false },
            ]
        },
        {
            titulo: "No Zoobotânico de Brusque, qual desses animais nós podemos visitar?",
            audio: "assets/audios_perguntas/pergunta-6.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_6/imgDinossauro.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_6/imgGirafa.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_6/imgLeao02.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_6/imgMacaco.png", eCorreta: true },
            ]
        },
        {
            titulo: "Se você for na Fenarreco, qual roupa típica os meninos e meninas usam?",
            audio: "assets/audios_perguntas/pergunta-7.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_7/imgFantasiadeHalloween.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_7/imgRoupaAlema.png", eCorreta: true },
                {foto: "assets/img-tela-quiz/pergunta_7/imgRoupaSocial.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_7/imgTernoGravata.png", eCorreta: false },
            ]
        },
        {
            titulo: "Na Fenarreco, as pessoas gostam de comer um repolho que tem uma cor diferente do normal. Que cor é essa?",
            audio: "assets/audios_perguntas/pergunta-8.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_8/imgAzul.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_8/imgRosa.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_8/imgRoxo.png", eCorreta: true },
                {foto: "assets/img-tela-quiz/pergunta_8/imgVermelho.png", eCorreta: false },
            ]
        },
        {
            titulo: "Na festa da Fenarreco. Qual é o nome do prato típico mais conhecido?",
            audio: "assets/audios_perguntas/pergunta-9.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_9/imgCachorroQuente.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_9/imgFeijoada.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_9/imgMarrecocomRepolho.png", eCorreta: true },
                {foto: "assets/img-tela-quiz/pergunta_9/imgMinestra.png", eCorreta: false },
            ]
        },
        {
            titulo: "Quando a cidade de Brusque-SC faz aniversário?",
            audio: "assets/audios_perguntas/pergunta-10.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_10/img04.png", eCorreta: true },
                {foto: "assets/img-tela-quiz/pergunta_10/img17.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_10/img25.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_10/img27.png", eCorreta: false },
            ]
        },
        {
            titulo: "Em qual ano foi fundada a cidade de Brusque?",
            audio: "assets/audios_perguntas/pergunta-11.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_11/img1860.png", eCorreta: true },
                {foto: "assets/img-tela-quiz/pergunta_11/img1945.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_11/img1991.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_11/img2010.png", eCorreta: false },
            ]
        },
        {
            titulo: "Como se chama o lugar onde podemos ver muitos animais e árvores no centro de Brusque?",
            audio: "assets/audios_perguntas/pergunta-12.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_12/imgAnimais.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_12/imgBotanico.png", eCorreta: true },
                {foto: "assets/img-tela-quiz/pergunta_12/imgFlores.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_12/imgSantos.png", eCorreta: false },
            ]
        },
        {
            titulo: "Se você olhar para a bandeira de Brusque, qual cor representa as nossas matas?",
            audio: "assets/audios_perguntas/pergunta-13.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_13/imgAmarelo.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_13/imgBranco.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_13/imgVerde.png", eCorreta: true },
                {foto: "assets/img-tela-quiz/pergunta_13/imgVermelhof.png", eCorreta: false },
            ]
        },
        {
            titulo: "Brusque é como uma fábrica gigante que faz muitos paninhos coloridos. Você sabe o nome desse material que serve para costurar nossas camisetas?",
            audio: "assets/audios_perguntas/pergunta-14.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_14/imgCordas2.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_14/imgMelancia.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_14/imgSapato.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_14/imgTecidos.png", eCorreta: true },
            ]
        },
        {
            titulo: "Quantos anos a cidade de Brusque-SC tem ?",
            audio: "assets/audios_perguntas/pergunta-15.m4a",
            alternativas: [
                {foto: "assets/img-tela-quiz/pergunta_15/img145.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_15/img160.png", eCorreta: false },
                {foto: "assets/img-tela-quiz/pergunta_15/img165.png", eCorreta: true },
                {foto: "assets/img-tela-quiz/pergunta_15/img180.png", eCorreta: false },
            ]
        }
    ];

    // ================================================================
    // FUNÇÕES DE LÓGICA
    // ================================================================
    
    const embaralhar = (lista) => {
        for (let i = lista.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lista[i], lista[j]] = [lista[j], lista[i]];
        }
        return lista;
    };

    const alterarSom = () => {
        if(musicaFundo.paused) {
            musicaFundo.play();
            btnSomInicio.style.opacity = "1";
            btnSomQuiz.style.opacity = "1";
        } else {
            musicaFundo.pause();
            btnSomInicio.style.opacity = "0.5";
            btnSomQuiz.style.opacity = "0.5";
        }
    };

    const renderizarPergunta = () => {
        const dados = listaPerguntas[perguntaAtual];
        const botoes = document.querySelectorAll(".opcao");

        if (narracaoAtual) {
            narracaoAtual.pause();
            narracaoAtual.currentTime = 0;
        }

        textoPergunta.innerText = dados.titulo;
        textoPlaca.innerText = `PERGUNTA ${perguntaAtual + 1} DE ${listaPerguntas.length}`;

        // --- ATUALIZAÇÃO DA BARRA DE PROGRESSO ---
    const barraVerde = document.getElementById("barra-progresso");
    if (barraVerde) {
        const porcentagem = ((perguntaAtual + 1) / listaPerguntas.length) * 100;
        barraVerde.style.width = `${porcentagem}%`;
    }

        const alternativasMisturadas = embaralhar([...dados.alternativas]);

        narracaoAtual = new Audio(dados.audio);
        narracaoAtual.play();

        botoes.forEach((botao, index) => {
            botao.classList.remove("correta", "errada");
            botao.disabled = false;
            const imgAnimal = botao.querySelector("img:not(.feedback-icon)");
            imgAnimal.src = alternativasMisturadas[index].foto;
            botao.dataset.correta = alternativasMisturadas[index].eCorreta;
            botao.onclick = () => verificarResposta(botao);
        });

        btnProximo.style.visibility = "hidden";
    };

    const verificarResposta = (botaoClicado) => {
        const acertou = botaoClicado.dataset.correta === "true";
        const todosBotoes = document.querySelectorAll(".opcao");

        todosBotoes.forEach(btn => btn.disabled = true);

        if (acertou) {
            botaoClicado.classList.add("correta");
            acertos++;
        } else {
            botaoClicado.classList.add("errada");
            todosBotoes.forEach(btn => {
                if (btn.dataset.correta === "true") btn.classList.add("correta");
            });
        }
        btnProximo.style.visibility = "visible";
    };

    // ================================================================
    // EVENTOS DE CLIQUE
    // ================================================================

    btnSomInicio.addEventListener("click", (e) => { e.stopPropagation(); alterarSom(); });
    btnSomQuiz.addEventListener("click", (e) => { e.stopPropagation(); alterarSom(); });

    btnIdades.forEach(botao => {
        botao.addEventListener("click", () => {
            idadeSelecionada = botao.textContent;
            btnIdades.forEach(b => b.style.backgroundColor = "#3498db");
            botao.style.backgroundColor = "#2ecc71";
        });
    });

    btnJogar.addEventListener("click", () => {
        const nome = campoNome.value.trim();
        const escola = campoEscola.value.trim();

        if(nome === "" || escola === "" || idadeSelecionada === "") {
            alert("Por favor, preencha tudo!");
        } else {
            embaralhar(listaPerguntas);
            telaInicio.style.display = "none";
            telaQuiz.style.display = "flex";
            telaQuiz.classList.add("fade-in");

            setTimeout(() => {
                telaQuiz.classList.remove("fade-in")}, 800);

            musicaFundo.play();
            renderizarPergunta();
        }
    });

    btnProximo.addEventListener("click", () => {
        perguntaAtual++;
        if (perguntaAtual < listaPerguntas.length) {
            renderizarPergunta();
        } else {
            telaQuiz.style.display = "none";
            telaResultado.style.display = "flex";
            telaResultado.classList.add("fade-in");
            pontuacaoFinal.innerText = `${acertos} de ${listaPerguntas.length} PERGUNTAS`;

            setTimeout(() => {
                telaResultado.classList.remove("fade-in");
            }, 800);
        }
    });

    const btnReiniciar = document.getElementById("btn-menu-principal"); 
    document.getElementById("barra-progresso-preenchimento").style.width = "0%";

    if(btnReiniciar) {
        btnReiniciar.addEventListener("click", () => {
            perguntaAtual = 0;
            acertos = 0;
            embaralhar(listaPerguntas);
            document.getElementById("nome-aluno").value = "";
            document.getElementById("escola").value = "";
            telaResultado.style.display = "none";
            telaInicio.classList.remove("fade-in");
            telaInicio.style.display = "none";
            setTimeout(() => {
                telaInicio.style.display = "flex";
                telaInicio.classList.add("fade-in");
            }, 20); 

            
            setTimeout(() => {
                telaInicio.classList.remove("fade-in");
            }, 1000);
        });
}
});