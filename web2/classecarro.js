class Veiculo {
    constructor(modelo, cor) {
        ;
        this.velocidade = 0;
    }

    acelerar(valor) {
        if (this.ligado) {
            this.velocidade += valor;
            console.log(`${this.modelo} acelerou para ${this.velocidade} km/h.`);
        } else {
            console.log('Ligue o carro primeiro!');
        }
    }

    frear(valor) {
        if (this.velocidade >= valor) {
            this.velocidade -= valor;
            console.log(`${this.modelo} freou para ${this.velocidade} km/h.`);
        } else {
            this.velocidade = 0;
            console.log(`${this.modelo} parou.`);
        }
    }

    buzinar() {
        console.log('Fon fon!');
    }
}