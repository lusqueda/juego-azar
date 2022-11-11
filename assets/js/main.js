//Juego de Azar Basico

let insertDOMcontent = document.querySelector("#insertDOMcontent");
let insertDOMPlayers = document.querySelector('#insertDOMPlayers');
let insertDOMWinners = document.querySelector('#insertDOMWinners');
const contentSpinnerLoading = document.querySelector('.contentSpinnerLoading')
contentSpinnerLoading.style.display = 'none';
error_players.style.display = 'none'
error_max.style.display = 'none'
let jugadores = 0;
let numeros = 0;
let tabla = [];    

function sincronizarConLocalStorage(){
    config = JSON.parse(localStorage.getItem("configuracion")) || [];
    npcs = JSON.parse(localStorage.getItem("jugadores")) || [];
};

if( typeof window === 'object' ){

	// INICIO DEL DOMContentLoaded
	window.addEventListener('DOMContentLoaded', function(){

        sincronizarConLocalStorage();
        carton();

        let formulario = document.querySelector('#formulario')
        let infoConfig = document.querySelector('#alerta')
        let infoTabla = document.querySelector('#alerta1')
        let botonReset = document.querySelector('#reset');

        infoConfig.style.display = 'none';
        infoTabla.style.display = 'none';
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
            if( number > 1 && number < 7 ){
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

        const checkRangoTres = (val) =>{
            let number = parseInt( val )
            if( number > 0 && number < 101 ){
                return true;
            }
            return false;
        }

        if( window.localStorage.length !== 0 ){
            formulario.style.display = 'none'
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
                    error_players.innerHTML = `Debe ingresar numero del 2 al 6`  
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

        //
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
                    botonReset.style.display = 'block'

                    infoPlayers = document.querySelector('#infoPlayers'),
                    infoMax = document.querySelector('#infoMax'),

                    infoPlayers.innerHTML = `${players}`
                    infoMax.innerHTML = `${max}`
                    infoConfig.style.display = 'block'
                    carton();
                    
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

        // FUNCION CARGA DE DATOS CARTONES
        function carton( e ) {
            let formHtml = '';
            sincronizarConLocalStorage();

            for ( let i=1; i <= config.players; i++ ){
                formHtml += `
                <div class="col">
                    <div class="p-3 border bg-light">
                        <div class="card">
                            <h5 class="card-header">CARTON ${i}</h5>
                            <div class="card-body">
                                <form action="" method="POST" id="player${i}" onsubmit="return false;"> 
                                    <div class="mb-3">
                                        <label for="nick">Nombre Jugador</label>
                                        <input type="text" class="form-control" id="nick">
                                        <div class="alert alert-danger my-2" role="alert" id="error_nick" style="display:none">
                                        </div>
                                    </div>`
                for ( let j=1; j <= config.max; j++ ) {
                    formHtml+= `    <div class="mb-3">
                                        <label for="number${j}">Numero ${j} </label>
                                        <input type="text" class="form-control" id="number${j}">
                                        <div class="alert alert-danger my-2" role="alert" id="error_number${j}" style="display:none" >
                                        </div>
                                    </div>`
                }
                formHtml += `      <input type="submit" value="Cargar" id="submit${i}" class="button-blue">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>`
            }           
            insertDOMcontent.innerHTML = formHtml


            //BOTON CARGA CARTON
            let buttonCarton = document.querySelectorAll("#insertDOMcontent form");
            buttonCarton.forEach((element) => {
                element.addEventListener("submit", (e) => {
                    e.preventDefault();

                    let jugador = new Object()
                    jugador.nick = ''
                    jugador.numeros = []
                    jugador.match = 0
                    jugador.win = 0

                    let error_nick = document.querySelector(`#${element.id} #error_nick`)
                    nick = document.querySelector(`#${element.id} #nick`).value;

                    if( nick != '' ){
                        jugador.nick = nick
 
                        for ( let j=1; j <= config.max; j++ ) {
                            let error_number = document.querySelector(`#${element.id} #error_number${j}`)
                            let botonCarga = document.querySelector(`#${element.id}`)
                            number = document.querySelector(`#${element.id} #number${j}`).value
                            let validaNumero = checkNumero( number )
                            let validaRangoTres = checkRangoTres( number )

                            if( number != '' && validaNumero ){
                                if( validaRangoTres ){
                                    jugador.numeros.push(number);
                                    error_number.style.display = "none";
                                }else{
                                    error_number.style.display = "block";
                                    error_number.innerHTML = `Debe ingresar un numero del 1 al 100` 
                                }    
                            }else{
                                error_number.style.display = "block";
                                error_number.innerHTML = `Debe ingresar un numero` 
                            }
                            
                            if( jugador.numeros.length == config.max ){
                                tabla.push(jugador)
                                botonCarga.style.display = 'none'

                                if(tabla.length == config.players){
                                    tabla.forEach(( element, index ) => {

                                        let result = ''
                                        let resultString = ''
                                        element.numeros.forEach((item, index) => { 
                                            result += item
                                            result += ' - '
                                            resultString = result.substring(0, result.length - 2);
                                        })     

                                        insertDOMcontent.innerHTML = '';
                                        insertDOMPlayers.innerHTML += `
                                        <div class="col">
                                            <div class="p-3 border bg-light">
                                                <div class="card">
                                                    <div class="card-header">
                                                        JUGADOR: <strong>${element.nick.toUpperCase()}</strong>
                                                    </div>
                                                    <div class="card-body">
                                                        <h5 class="card-title">NUMEROS: <strong>${resultString}</strong></h5>
                                                    </div>
                                                </div> 
                                            </div> 
                                        </div>`
                                    });

                                    infoTabla.style.display = 'block';
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

        // BOTON RESET
        let reset = document.getElementById('reset')
        reset.addEventListener('click', resetiar)

        function resetiar( e ) {
            insertDOMcontent.innerHTML = '';
            localStorage.removeItem('configuracion');
            localStorage.removeItem('jugadores');
            location.reload();
        }

        // BOTON VOLVER
        let volver = document.getElementById('volver')
        volver.addEventListener('click', back)

        function back( e ) {
            insertDOMcontent.innerHTML = '';
            localStorage.removeItem('jugadores');
            location.reload();
        }

        // BOTON JUGAR
        let play = document.getElementById('play')
        play.addEventListener('click', jugar)
  
        function jugar( e ) {
            contentSpinnerLoading.style.display = 'flex';
            sincronizarConLocalStorage();

            let lista = [];
            let repetido;
            let winn = false;

            for (let i = 0; i < 100; i++) {
                while (!lista[i]) {
                    if ( winn == true ) {
                        break;
                    } 
                    repetido = true;
                    while (repetido == true) {
                        let random = Math.random();
                        random = random * 100 + 1;
                        random = Math.trunc(random);

                        for (let j = 0; j < lista.length; j++) {
                            if (lista[j] == random) {
                                repetido = true;
                                break;
                            } else {
                                repetido = false;
                            }
                        }
                        
                        lista[i] = random; 

                        if( repetido == false ) {
                            npcs.forEach(( element ) => {
                                element.numeros.forEach(( item ) => { 
                                    if( item == random ){
                                        element.match += 1 
                                    }
                                })
                                if( element.match == element.numeros.length) {
                                    element.win = 1
                                    winn = true
                                }
                            })   
                        }    
                    }
                }
            }

            insertDOMWinners.innerHTML = '';
            count = 0
            winner = ''
            npcs.forEach(( element ) => {
                const { nick, win } = element
                if( win == 1) {
                    winner += nick + ' '
                    count += 1 
                }
            })   

            setTimeout(() => {
                ganador( winner, count , lista)  
            }, 2000);

        }

        const mensajeModal = ( info )=>{
            mensaje.innerHTML =`${info}`
        }

        const ganador = async ( winner, count, lista )=>{
            try {
                    const response = await fetch(`http://worldtimeapi.org/api/timezone/America/Argentina/Jujuy`)
                    
                    if (!response.ok) {
                         throw new Error(`HTTP error! status: ${response.status}`);
                    }
    
                    const data = await response.json()
                    const { datetime }  = data 
                    today  = new Date(datetime);

                    let result = ''
                    let resultString = ''
                    lista.forEach((item) => { 
                        result += item
                        result += ' - '
                        resultString = result.substring(0, result.length - 2);
                    })   

                    if( count == 1 ){
                        mensajeModal(`
                            <div class="p-2 mb-4 sm-light rounded-3">
                                <picture>
                                    <img src="./assets/img/ganador.png" alt="ganador">
                                </picture>
                                <div class="container-fluid py-2">
                                    <h1 class="display-4 fw-bold">${winner.toUpperCase()}</h1>
                                    <h2 class="display-5 fw-bold">FECHA: ${today.toLocaleDateString("en-US")}</h2>
                                </div>
                            </div>`
                        )
                        $('#mensajeModal').modal('toggle'); 
                        insertDOMWinners.innerHTML += `
                        <div class="p-3 mb-3 bg-light rounded-3 text-center">
                            <picture>
                                <img src="./assets/img/ganador.png" alt="ganador" class="small" >
                            </picture>
                            <div class="container-fluid py-2">
                                <h1 class="display-4 fw-bold">${winner.toUpperCase()}</h1>
                                <h2 class="display-5 fw-bold">FECHA: ${today.toLocaleDateString("en-US")}</h2>
                            </div>
                            <div class="container-fluid py-3">                        
                                <h1 class="display-5 fw-bold"><strong>LISTA DE NUMEROS</strong></h1>
                                <div class="col-md-13 fs-3"><strong>${resultString}</strong></div>     
                            </div>
                        </div>`                      
                    }else{
                        mensajeModal(`
                            <div class="p-2 mb-4 sm-light rounded-3">
                                <picture>
                                    <img src="./assets/img/empate.png" alt="empate" >
                                </picture>                                
                                <div class="container-fluid py-2">
                                    <h1 class="display-4 fw-bold">EMPATE </br>${winner.toUpperCase()}</h1>
                                    <h2 class="display-5 fw-bold">FECHA: ${today.toLocaleDateString("en-US")}</h2>
                                </div>
                            </div>`
                        )
                        $('#mensajeModal').modal('toggle');

                        insertDOMWinners.innerHTML += `
                        <div class="p-3 mb-3 bg-light rounded-3 text-center">
                            <picture>
                                <img src="./assets/img/empate.png" alt="empate" class="small" >
                            </picture>                                
                            <div class="container-fluid py-2">
                                <h1 class="display-4 fw-bold">EMPATE </br>${winner.toUpperCase()}</h1>
                                <h2 class="display-5 fw-bold">FECHA: ${today.toLocaleDateString("en-US")}</h2>
                            </div>
                            <div class="container-fluid py-3">                        
                                <h1 class="display-5 fw-bold"><strong>LISTA DE NUMEROS</strong></h1>
                                <div class="col-md-13 fs-3"><strong>${resultString}</strong></div>     
                            </div>
                        </div>`
                    }     
                    
                    contentSpinnerLoading.style.display = 'none';
                    
            } catch (error) {
                mensajeModal(`<p>${error}</p>`)
                $('#mensajeModal').modal('toggle');
                setTimeout(() => {
                    $('#mensajeModal').modal('toggle');
                }, 3000);
                contentSpinnerLoading.style.display = 'none';
            }
        }    

    })
// CIERRE DEL DOMContentLoaded
}
