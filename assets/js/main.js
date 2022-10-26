//Juego de Azar Basico

let insertDOMcontent = document.querySelector("#insertDOMcontent");
let insertDOMPlayers = document.querySelector('#insertDOMPlayers');
error_players.style.display = 'none'
error_max.style.display = 'none'
let jugadores = 0;
let numeros = 0;
let tabla = [];    

function sincronizarConLocalStorage(){
    config = JSON.parse(localStorage.getItem("configuracion")) || [];
};

if( typeof window === 'object' ){

	// INICIO DEL DOMContentLoaded
	window.addEventListener('DOMContentLoaded', function(){

        sincronizarConLocalStorage();

        let formulario = document.querySelector('#formulario')
        let infoConfig = document.querySelector('#alerta')
        let infoTabla = document.querySelector('#alerta1')
        let botonLlenarCarton = document.querySelector('#llenarCarton');
        let botonReset = document.querySelector('#reset');

        infoConfig.style.display = 'none';
        infoTabla.style.display = 'none';
        botonLlenarCarton.style.display = 'none';
        botonReset.style.display = 'none';

        let error_players = document.querySelector('#error_players')
        let error_max = document.querySelector('#error_max')
    
        const checkNumero = (val) =>{
            let number = parseInt( val )
            if( /[^0-9]/g.test(number) && typeof number === 'number' ){
                return false;
            }
            return true;
        }

        const checkRangoUno = (val) =>{
            let number = parseInt( val )
            if( number > 1 && number < 5 ){
                return true;
            }
            return false;
        }

        const checkRangoDos = (val) =>{
            let number = parseInt( val )
            if( number > 0 && number < 6 ){
                return true;
            }
            return false;
        }




        if( window.localStorage.length !== 0 ){
            formulario.style.display = 'none'
            botonLlenarCarton.style.display = 'block'
            botonReset.style.display = 'block'
            carton();
            infoPlayers.innerHTML = config.players
            infoMax.innerHTML = config.max
            infoConfig.style.display = 'block'
        }

        // Validamos el campo Players
        players.addEventListener('input', (e)=>{
            jugadores = e.target.value;
            let validaNumero = checkNumero( e.target.value )
            let validaRangoUno = checkRangoUno( e.target.value )

            if( validaNumero ){
                if( validaRangoUno ){
                    error_players.style.display = "none";
                    error_players.innerHTML = ``
                }else{
                    error_players.style.display = "block";
                    error_players.innerHTML = `Debe ingresar numero del 2 al 4`  
                }
            }else{
                error_players.style.display = "block";
                error_players.innerHTML = `Debe ingresar sólo numeros`   
            }
        })

        // Validamos el campo Max
        max.addEventListener('input', (e)=>{
            numeros = e.target.value
            let validaNumero = checkNumero( e.target.value )
            let validaRangoDos = checkRangoDos( e.target.value )
            
            if( validaNumero ){
                if( validaRangoDos ){
                    error_max.style.display = "none";
                    error_max.innerHTML = ``
                }else{
                    error_max.style.display = "block";
                    error_max.innerHTML = `Debe ingresar numero del 1 al 5`  
                }
            }else{
                error_max.style.display = "block";
                error_max.innerHTML = `Debe ingresar sólo numeros`   
            }
        })

        

        // INICIO DEL ENVIO
        formulario.addEventListener('submit', function(e){

            e.preventDefault()

            function game( players, max ){
                this.players = players;
                this.max = max;
            }

            // guardamos datos que ingresamos en los input
            let players = document.querySelector('#players').value
            let max = document.querySelector('#max').value
            let validaNumero1 = checkNumero( players )
            let validaNumero2 = checkNumero( max )

            if( players && max ){
                if( validaNumero1 && validaNumero2 ) {

                    let config = new game (players,max);

                    const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
                    guardarLocal("configuracion", JSON.stringify(config));

                    formulario.style.display = 'none'
                    botonLlenarCarton.style.display = 'block'
                    botonReset.style.display = 'block'

                    infoPlayers = document.querySelector('#infoPlayers'),
                    infoMax = document.querySelector('#infoMax'),

                    infoPlayers.innerHTML = `${players}`
                    infoMax.innerHTML = `${max}`
                    infoConfig.style.display = 'block'
                    
                } else {
                    error_max.style.display = "block";
                    error_players.style.display = "block";
                    error_max.innerHTML = `Debe Validar los datos`  
                    error_players.innerHTML = `Debe Validar los datos`   
                }   
            } else {
                error_max.style.display = "block";
                error_players.style.display = "block";
                error_max.innerHTML = `Debe llenar los campos`  
                error_players.innerHTML = `Debe llenar los campos`     
            }
            
        })

        let llenarCarton = document.getElementById('llenarCarton')
        let reset = document.getElementById('reset')

        llenarCarton.addEventListener('click', carton)
        reset.addEventListener('click', resetiar)

        function carton( e ) {
            let formHtml = '';
            sincronizarConLocalStorage();

            for ( let i=1; i <= config.players; i++ ){
                formHtml += `<form action="" method="POST" id="player${i}" onsubmit="return false;"> 
                <div class="mb-3">
                    <label for="nick">Nombre Jugador</label>
                    <input type="text" class="form-control" id="nick">
                    <div class="alert alert-danger my-2" role="alert" id="error_nick" style="display:none">
                    </div>
                </div>`
                for ( let j=1; j <= config.max; j++ ) {
                    formHtml+= `<div class="mb-3">
                        <label for="number${j}">Numero ${j} </label>
                        <input type="text" class="form-control" id="number${j}">
                        <div class="alert alert-danger my-2" role="alert" id="error_number${j}" style="display:none" >
                        </div>
                    </div>`
                }
                formHtml += `<input type="submit" value="Cargar" id="submit${i}" class="btn btn-primary">
                </form></br>`
            }           
            insertDOMcontent.innerHTML = formHtml

            let buttonCarton = document.querySelectorAll("#insertDOMcontent form");

            buttonCarton.forEach((element) => {
                element.addEventListener("submit", (e) => {
                    e.preventDefault();

                    let jugador = new Object();
                    jugador.nick = '';
                    jugador.numeros = [];

                    let error_nick = document.querySelector(`#${element.id} #error_nick`)
                    nick = document.querySelector(`#${element.id} #nick`).value;

                    if( nick != '' ){
                        jugador.nick = nick
 

                        for ( let j=1; j <= config.max; j++ ) {
                            let error_number = document.querySelector(`#${element.id} #error_number${j}`)
                            let botonCarga = document.querySelector(`#${element.id}`)
                            number = document.querySelector(`#${element.id} #number${j}`).value
                            let validaNumero = checkNumero( number )

                            if( number != '' && validaNumero ){
                                jugador.numeros.push(number);
                                error_number.style.display = "none";
                            }else{
                                error_number.style.display = "block";
                                error_number.innerHTML = `Debe ingresar un numero` 
                            }
                            
                            if( jugador.numeros.length == config.max ){
                                tabla.push(jugador)
                                botonCarga.style.display = 'none'
                                if(tabla.length == config.players){

                                    tabla.forEach(( element, index ) => {
                                        insertDOMPlayers.innerHTML += `<p class="font-weight-bold">
                                        Jugador: <span class="font-weight-light">${element.nick}</span>
                                        </p>
                            
                                        <p class="font-weight-bold">
                                            Numeros: <span class="font-weight-light" >${element.numeros}</span>
                                        </p>`

                                    });

                                    infoTabla.style.display = 'block';
                                    botonLlenarCarton.style.display = 'none'
                                    const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
                                    guardarLocal("jugadores", JSON.stringify(tabla));
                                }

                            }
                            
                        }
                    }else{
                        error_nick.style.display = "block";
                        error_nick.innerHTML = `Debe ingresar un nombre`  
                    }
                    


       
          

                });
            });
        }

        function resetiar( e ) {
            insertDOMcontent.innerHTML = '';
            localStorage.removeItem('configuracion');
            localStorage.removeItem('jugadores');
            location.reload();
        }





    })
// CIERRE DEL DOMContentLoaded
}
