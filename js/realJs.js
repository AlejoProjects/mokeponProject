const $ = selector => document.getElementById(selector);
let slideIndex = 1;
const para = document.createElement("p");
const lineBreak = document.createElement('br');
/** the mascota class defines a new pet 
*nombre = string
*elemento = string
*hp = float
*df = float
*/
class mascotas {
    constructor(nombre,elmento,hp,df){
            this.nombre = nombre;
            this.elemento = elmento;
            this.hp = hp;
            this.df = df;
               
    }
    setNombre(name){
        this.nombre = name;
    }
    setElemento(element){
        this.elemento = element;
    }
    setHp(vida){
        this.hp = vida;
    }
    setDf(defense){
        this.df = defense;
    }

    getNombre(){
        return(this.nombre)
    }
    getHp(){
        return(this.hp);
    }
    
    getDf(){
        return(this.df);
    }
    
    getElemento(){
        return(this.elemento);
    }
    
    /**La función ataque genera un valor aleatorio entre 1 y 3*/
    ataque(){
        let valorAtaque = aleatorio(1,3);
        return(valorAtaque);
    }
    /**La función ataqueElemento genera un valor aleatorio entre 2 y 6*/
    ataqueElemento(){
        let ataqueElemento = aleatorio(2,6);
        return(ataqueElemento);
    }
    /**La función sanación añade 2.5 puntos de vida a la vida base de la mascota*/
    sanacion(){
        let valorSanado = this.hp + 2.5;
        this.setHp(valorSanado)
        console.log("te has sanado");
        
    }
/**La función recibirAtaque le quita vida a la vida base de la mascota usando la función ataque*/
    recibirAtaque(){
        let vida = this.hp;
        let valorAtaque = this.ataque();
        let absorcion = (1/4)*this.df;
        vida = vida -(valorAtaque-absorcion);
        this.setHp(vida);
    }
    /**La función recibirAtaqueElemental  le quita vida a la vida base según el elemento de la mascota atacante */
    recibirAtaqueELemental(ataque){
    let vida = this.getHp();
    let elementoMensajero = ataque[0];
    let valorDeAtaque = ataque[1];
    let elementoReceptor = this.getElemento();
    let porcentaje = aleatorio(0.1,0.5);
    let resultado = this.tablaDeComparacion(elementoMensajero,elementoReceptor);
    switch(resultado){
        case "igual":
            vida -= valorDeAtaque;
            this.setHp(vida);
        break;
        case "menor":
            vida -= valorDeAtaque -(porcentaje*valorDeAtaque);
            this.setHp(vida);
        break;
        case "mayor":
            vida -= valorDeAtaque +(porcentaje*valorDeAtaque);
            this.setHp(vida);
        break;
    }

    }
    /** la función tablaDeComparación identifica que tan debil es un elemento de una mascota comparado con el de otro para poder calcular el valor de daño elemental */
    tablaDeComparacion(elementoMensajero,elementoReceptor){
        let tabla;
        let valor;
        let elementoValor;
        if(elementoReceptor == 'fuego'){elementoValor = 0}
        else if(elementoReceptor == 'agua'){elementoValor = 1}
        else if(elementoReceptor == 'aire'){elementoValor = 2}
        else if(elementoReceptor == 'tierra'){elementoValor = 3}
        
        switch(elementoMensajero){
            case 'fuego':
                tabla = ["igual","mayor","igual","menor"];
                valor = tabla[elementoValor];
                return(valor);
            break;
            case 'agua':
                tabla = ["menor","igual","mayor","igual"];
                valor = tabla[elementoValor];
                return(valor);
            break;
            case 'aire':
                tabla = ["igual","menor","normal","mayor"];
                valor = tabla[elementoValor];
                return(valor);
            break;
            case 'tierra':
                tabla = ["mayor","igual","menor","igual"];
                valor = tabla[elementoValor];
                return(valor);
            break;
            
        }

    }
}
let player = new mascotas("","",10,2);
let enemy = new mascotas("","",10,2);
/*inicio de la pagina */
function startGame(){
    let boton = $("startButton");
    boton.addEventListener("click",botonIniciar);
    let petButton = $("spb");
    petButton.addEventListener("click",enfrentamiento)
  
}
/**La función botonIniciar muestra la ventana donde se escogera la mascota del jugador*/
function botonIniciar(){
    let sectionStart = $("start");
    let petSelection = $("petSelection");
    let petButton = $("selectPetButton");
    petSelection.disabled =false;
    petSelection.style.display = "flex";
    sectionStart.style.display = "none";
    sectionStart.style.disabled = true;
    showSlides(slideIndex);


}
/*PET SELECTION */
/** a función aleatorio genera un valor aleatorio entre un valor minimo y maximo*/
function aleatorio(min,max){
    let difference = max -min;
    let rand = Math.random();
    rand = Math.floor(rand*difference);
    rand = rand + min;
    return rand;
}
/**Son los botones de desplazamineto del carrousel para escoger la mascota*/
function plusSlides(n) {
  showSlides(slideIndex += n);
}
// Thumbnail image controls
/**Son los botones de desplazamineto del carrousel para escoger la mascota*/
function currentSlide(n) {
  showSlides(slideIndex = n);
}
/**La función showSlides muestra cada una de las mascotas del carrousel*/
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("petSlide");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}
    /**La función createPet crea un elemento de la clase mascota al seleccionarla en el carrousel*/
function createPet(){
    let n = slideIndex;
    let health = 10;
    let defense = 2;
    let name;
    let elemento;
    switch(n){
        case 1:
            name ="capipepo";
            elemento = "tierra";
            player.setNombre(name);
            player.setElemento(elemento);
           
        break;
        case 2:
            name = "hipodoge";
            elemento = "agua";
            player.setNombre(name);
            player.setElemento(elemento);
  
        break;
        case 3:
            name = "ratigueya";
            elemento = "fuego";
            player.setNombre(name);
            player.setElemento(elemento);
        break;
    }
    
}
/**La función enfrentamiento esconde la sección de petSelection y muestra la sección de la batalla*/
function enfrentamiento(){
    let petSelection = $("petSelection");
    let petButton = $("selectPetButton");
    let sectionBattle = $("battleSection");
    let atackButton = $("atackButtons");
    atackButton.style.display = "flex";
    atackButton.disabled = false;
    sectionBattle.style.display = "flex";
    sectionBattle.disabled = false;
    petSelection.disabled =true;
    petSelection.style.display ="none";
    enemyPet();
    mostrarJugador();
    displayStats();
    playerAttacks();

}
/*BATTLE SECTION */

/**La función enemyPet selecciona uno de los pokemones aleatoriamente*/
function enemyPet(){
    let n = slideIndex;
    let health = 10;
    let defense = 2;
    let name;
    let elemento;
    let valor = aleatorio(1,3);
    console.log(valor)
    enemy.setDf(2);
    enemy.setHp(10);
    switch(valor){
        case 1:
            name ="capipepo";
            elemento = "tierra";
            enemy.setNombre(name);
            enemy.setElemento(elemento);
           
        break;
        case 2:
            name = "hipodoge";
            elemento = "agua";
            enemy.setNombre(name);
            enemy.setElemento(elemento);
  
        break;
        case 3:
            name = "ratigueya";
            elemento = "fuego";
            enemy.setNombre(name);
            enemy.setElemento(elemento);
        break;
    }
    

}
/**Muestra las imagenes de la mascota seleccionada*/
function mostrarJugador(){
   let playerPicture  = document.getElementsByClassName("petDisplay");
   let playerPet = player.nombre;
   let enemyPet = enemy.nombre;
   
   switch (playerPet){
    case "capipepo":
        playerPicture[0].style.display = "flex";
    break;
    case "hipodoge":
        playerPicture[1].style.display = "flex";
    break;
    case "ratigueya":
        playerPicture[2].style.display = "flex";
    break;
   }
   switch (enemyPet){
    case "capipepo":
        playerPicture[3].style.display = "flex";
    break;
    case "hipodoge":
        playerPicture[4].style.display = "flex";
    break;
    case "ratigueya":
        playerPicture[5].style.display = "flex";
    break;
   }
}
/**La función playerAttacks muestra los tipos de ataque de la mascota del jugador*/
function playerAttacks(){
    let botonNormalAttack = $("ataque");
    let botonElementalAttack =$("ataqueElemental");
    let Botonsanacion = $("sanar");
    botonNormalAttack.addEventListener("click",normalAttack);
    botonElementalAttack.addEventListener("click",elementalAttack);
    Botonsanacion.addEventListener("click",heal);
}
function addText(texto){
    const node = document.createTextNode(texto);
    para.appendChild(node);
    const element = document.getElementById("textoBatalla");
    element.appendChild(lineBreak);
    element.appendChild(para);
    element.appendChild(lineBreak);
}
/**la función normalAttack ataca al enemigo del jugador con un ataque normal*/
function normalAttack(){
    enemy.recibirAtaque();
    updateStats("enemy");
    enemyAttack();
    addText("\nel Jugador ha realizado un ataque normal\n");
}
/**la función elementalAttack ataca al enemigo del jugador con un ataque elemental*/
function elementalAttack(){
    let texto = "\n el Jugador ha realizado un ataque normal \n ";
    let attackMatrix = [player.getElemento(),player.ataqueElemento()];
    enemy.recibirAtaqueELemental(attackMatrix);
    updateStats("enemy");  
    enemyAttack();
    addText(texto);

}
/**la función heal sana al jugador 2.5 puntos de vida*/
function heal(){
    let texto = "\n el Jugador se ha sanado \n ";
    player.sanacion();
    updateStats("player");
    enemyAttack();
    addText(texto);

}
/**La función enemyAttack genera una de las tres acciones disponibles aleatoriamente para atacar al jugador o sanarse a si mismo,*/
function enemyAttack(){
    let texto;
    let valorAtaque = aleatorio(0,2);
    let matrix = [enemy.getElemento(),enemy.ataqueElemento()];
    let ataqueRealizado = $("ataques_realizados");
    switch (valorAtaque){
        case 0:
            player.recibirAtaque();
            updateStats("player");
            texto = "el Enemigo ha realizado un ataque normal";
            addText(texto);
        break;
        case 1:
            player.recibirAtaqueELemental(matrix);
            updateStats("player");
            texto = "\nel Enemigo ha realizado un ataque elemental\n ";
            addText(texto);
        break;
        case 2:
            enemy.sanacion();
            updateStats("enemy");
            texto = "\nel Enemigo se ha sanado\n";
            addText(texto);
    }
}
/**La función displayStats muestra los atributos del jugador*/
function displayStats(){
    let playerHealth = player.getHp();
    let enemyHealth = enemy.getHp();
    let playerDf = player.getDf();
    let enemyDf = enemy.getDf();
    let hpPlayerVisual = $("displayPlayerHp");
    let dfPlayerVisual = $("displayPlayerDf");
    let elementPlayerVisual = $("displayPlayerElement");
    let hpenemyPlayerVisual = $("displayEnemyHp");
    let dfenemyPlayerVisual = $("displayEnemyDf");
    let elementEnemyPlayerVisual = $("displayEnemyElement");
    hpPlayerVisual.innerHTML = playerHealth.toString();
    dfPlayerVisual.innerHTML = playerDf.toString();
    elementPlayerVisual.innerHTML = player.elemento;
    hpenemyPlayerVisual.innerHTML = enemyHealth.toString();
    dfenemyPlayerVisual.innerHTML = enemyDf.toString();
    elementEnemyPlayerVisual.innerHTML = enemy.elemento;
}
function updateStats(turn){
    let playerHealth = player.getHp();
    let enemyHealth = enemy.getHp();
    let hpPlayerVisual = $("displayPlayerHp");
    let hpenemyPlayerVisual = $("displayEnemyHp");
    let winnerText = $("whoWon");
    if(turn == "player"){hpPlayerVisual.innerHTML = playerHealth.toString();}
    else if(turn == "enemy"){hpenemyPlayerVisual.innerHTML = enemyHealth.toString();}
    if(playerHealth <= 0 & enemyHealth <= 0){
        hideAndShowBattleMessages();
        winnerText.innerHTML = "empate"
    }
    else if(playerHealth <= 0){
        hideAndShowBattleMessages();
        winnerText.innerHTML = "has perdido"
    }
    else if(enemyHealth <= 0){
        hideAndShowBattleMessages();
        winnerText.innerHTML = "has ganado"
    }
    

}
function hideAndShowBattleMessages(){
    let restartButton = $("restart");
    let attackButtons = $("atackButtons");
    let textoBatalla = $("textoBatalla");
    let winnerParagraph = $("whoWon");
    attackButtons.style.display = "none";
    textoBatalla.style.display = "none";
    winnerParagraph.style.display = "flex";
    attackButtons.disabled = true;
    restartButton.style.display = "flex";
    restartButton.disabled = false;

}
function restart(){
    location.reload();
    
  }
window.addEventListener("load",startGame())
