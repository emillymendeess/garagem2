class Veiculo {
    constructor(modelo, cor) {
        this.modelo = modelo;
        this.cor = cor;
        this.ligado = false;
    }

    ligar() {
        this.ligado = true;
        console.log(`${this.modelo} ligado!`);
    }

    desligar() {
        this.ligado = false;
        console.log(`${this.modelo} desligado!`);
    }

    buzinar() {
        console.log('Bi bi!');
    }
}