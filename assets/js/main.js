//Juego de Azar Basico

const juego = () => {

    function game( players, max ){
        this.players = players;
        this.max = max;
    }
    
    let players = parseInt( prompt(`Ingrese la cantidad de jugadores.`) );
    let max = parseInt( prompt(`Ingrese la cantidad de numeros por jugador.`) );

    let config = new game (players,max);
    
    let tabla = [];    

    console.log(config);

    for ( let i=1; i <= config.players; i++ ){
        let nick = prompt(`Jugador ${i}, ingrese su nick.`);
        if ( isNaN( nick ) ) {
            tabla.push(llenarCarton(nick,config));
        }
    }

    console.log(tabla);

}

const llenarCarton = (nick,config) => {

    let jugador = new Object();
    jugador.nick = nick;
    jugador.numeros = [];

    for ( let j=1; j <= config.max; j++ ) {
        let num = parseInt( prompt(`Ingrese el ${j} numero.`) );
        if ( verificarNumero(num) == true ) {
            jugador.numeros.push(num);
        }
    }   

    console.log(jugador);    
    return jugador;
}


const verificarNumero = num => {
    if ( !isNaN( num) ) {
        return true;    
    } else {
        alert("No ingreso un numero.")
        return false;    
    }
}

juego();