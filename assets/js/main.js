//Juego de Azar Basico

const juego = () => {

    let players = parseInt( prompt(`Ingrese la cantidad de jugadores.`) );
    let max = parseInt( prompt(`Ingrese la cantidad de numeros por jugador.`) );
    let tabla = [];    

    for ( let i=1; i <= players; i++ ){
        let nick = prompt(`Jugador ${i}, ingrese su nick.`);
        if ( isNaN( nick ) ) {
            tabla.push(nick);
            tabla[1][i] = llenarCarton(tabla,max);
        }
    }

    console.table(tabla);

}

const llenarCarton = (jugador,max) => {
    for ( let j=1; j <= max; j++ ) {
        let num = parseInt( prompt(`Ingrese el ${j} numero.`) );
        if ( verificarNumero(num) == true ) {
            jugador.push(num);
        }
    }   
    
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