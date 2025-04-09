class Caminhao extends Carro {
    constructor(modelo, cor, capacidadeCarga) {
        super(modelo, cor);
        this.capacidadeCarga = capacidadeCarga;
        this.cargaAtual = 0;
    }

    carregar(peso) {
        if (this.cargaAtual + peso <= this.capacidadeCarga) {
            this.cargaAtual += peso;
            console.log(`${this.modelo} carregado com ${peso} kg. Carga atual: ${this.cargaAtual} kg.`);
        } else {
            console.log('Carga excedeu a capacidade máxima!');
        }
    }

    buzinar() {
        console.log('Fom fom!');
    }

    ativarTurbo() {
        if (this.ligado) {
            this.turboAtivado = true;
            this.velocidade += 50;
            console.log(`${this.modelo} turbo ativado! Velocidade aumentada para ${this.velocidade} km/h.`);
        } else {
            console.log('Ligue o carro primeiro!');
        }
    }

    desativarTurbo() {
        this.turboAtivado = false;
        console.log(`${this.modelo} turbo desativado.`);
    }

    buzinar() {
        console.log('Vrum vrum!');
    }
}