class CarroEsportivo extends Carro {
    constructor(modelo, cor) {
        super(modelo, cor);
        this.turboAtivado = false;
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