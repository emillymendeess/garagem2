const carroImagem = document.getElementById('carro-imagem');
const velocidadeElemento = document.getElementById('velocidade');
const botaoLigarDesligar = document.getElementById('ligar-desligar');
const botaoAcelerar = document.getElementById('acelerar');

// Obtém os elementos de áudio
const somLigar = document.getElementById('som-ligar');
const somAcelerar = document.getElementById('som-acelerar');

// Classe para representar o carro
class Carro {
    constructor(modelo, cor) {
        this.modelo = modelo;
        this.cor = cor;
        this.ligado = false;
        this.velocidade = 0;
    }

    ligar() {
        if (!this.ligado) { // Verifica se o carro já está ligado
            this.ligado = true;
            botaoLigarDesligar.textContent = 'Desligar';
            console.log('Carro ligado!');

            // Toca o som de ligar
            somLigar.play();

        } else {
            this.desligar();  // Se já estiver ligado, desliga
        }
    }

    desligar() {
        this.ligado = false;
        this.velocidade = 0;
        this.atualizarVelocidadeNaTela();
        botaoLigarDesligar.textContent = 'Ligar';
        console.log('Carro desligado!');

        // Para o som de acelerar (se estiver tocando)
        somAcelerar.pause();
        somAcelerar.currentTime = 0; // Volta o som para o início

    }

    acelerar() {
        if (this.ligado) {
            this.velocidade += 10;
            this.atualizarVelocidadeNaTela();
            console.log('Acelerando! Velocidade: ' + this.velocidade + ' km/h');

            //Ajusta o volume do som de acelerar
            const volume = Math.min(this.velocidade / 100, 1); // Volume máximo de 1
            somAcelerar.volume = volume;


            //Toca o som de acelerar, ou reinicia se já estiver tocando
            if (somAcelerar.paused) {
                somAcelerar.play();
            }

        } else {
            alert('O carro precisa estar ligado para acelerar!');
        }
    }

    atualizarVelocidadeNaTela() {
        velocidadeElemento.textContent = 'Velocidade: ' + this.velocidade + ' km/h';
    }
}



// Adiciona os listeners de eventos aos botões
botaoLigarDesligar.addEventListener('click', function () {
    meuCarro.ligar(); // Agora chama diretamente o método ligar, que já cuida de ligar/desligar
});

botaoAcelerar.addEventListener('click', function () {
    meuCarro.acelerar();
});

// Carro Esportivo


function atualizarCarroEsportivoStatus() {
    document.getElementById('carroEsportivoStatus').textContent = `Modelo: ${meuCarroEsportivo.modelo}, Cor: ${meuCarroEsportivo.cor}, Ligado: ${meuCarroEsportivo.ligado}, Velocidade: ${meuCarroEsportivo.velocidade} km/h, Turbo: ${meuCarroEsportivo.turboAtivado ? 'Ativado' : 'Desativado'}`;
}


function atualizarCaminhaoStatus() {
    const caminhaoStatusElement = document.getElementById('caminhaoStatus');
    if (caminhaoStatusElement) {
        caminhaoStatusElement.textContent = `Modelo: ${meuCaminhao.modelo}, Cor: ${meuCaminhao.cor}, Ligado: ${meuCaminhao.ligado}, Velocidade: ${meuCaminhao.velocidade} km/h, Carga Atual: ${meuCaminhao.cargaAtual} kg, Capacidade Máxima: ${meuCaminhao.capacidadeCarga} kg`;
    } else {
        console.error('Elemento com ID "caminhaoStatus" não encontrado no HTML.');
    }
}