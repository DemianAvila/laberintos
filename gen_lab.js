//tamaño de la pantalla, el laberinto deberá ser responsivo
var ancho=parseFloat((window.innerWidth)-7);
var largo=parseFloat((window.innerHeight)-7);

function elemAleatorioLista(lista) {
	var longitud=lista.length
	return Math.floor(Math.random() * (longitud - 0)) +0;
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}


function generateLab(){
	//guarda el formulario por si se quiere volver a ejecutar
	var oldWebSite=document.getElementById("formulario");

	var inputRow=document.getElementById("filas");
    var valorRow=inputRow.value;
    var inputCol=document.getElementById("columnas");
    var valorCol=inputCol.value;
    valorRow=(valorRow*2)+1;
    valorCol=(valorCol*2)+1;


    //borra todo, para escribir el laberinto
    $("#formulario").remove();
    //el valor del laberinto debe ser 2n+1 tomando en cuenta las paredes
    //generar un arreglo de dos dimensiones
    laberinto=new Array2D(valorRow, valorCol);
    generaCuadricula(valorRow, valorCol);

	anchoCuadro=ancho/valorCol;
	anchoCuadro=anchoCuadro;
	largoCuadro=largo/valorRow;
	largoCuadro=largoCuadro;

    //genera las celdas por donde se puede pasar
    var counterFreeStep=0;
    var listaCeldas=[];
    for (a=0; a<valorRow;a++){
    	for (b=0; b<laberinto.get_num_cols();b++){
			if ((a%2!=0)&&(b%2!=0)){
				actualizaCuadricula(b,a, anchoCuadro, largoCuadro, "#FFFFFF");
				laberinto.set_item(a,b,counterFreeStep);
				listaCeldas.push(counterFreeStep);
				counterFreeStep++
			}
		}
	}
	finDibujo=false;
	laberinto=kruzcal(laberinto,listaCeldas, anchoCuadro, largoCuadro);
	//define entrada y salida
	//entrada
	ent_r=0;
	ent_c=0;
	while(laberinto.get_item(ent_r, ent_c)==null){
		ent_r=getRandomInt(0, (laberinto.get_num_rows()));
		ent_c=getRandomInt(0, (laberinto.get_num_cols()));
	}
	var entrada=[ent_r, ent_c];
	laberinto.set_item(ent_r,ent_c,'e');
	//salida
	sal_r=0;
	sal_c=0;
	while(laberinto.get_item(sal_r, sal_c)==null){
		sal_r=getRandomInt(0, (laberinto.get_num_rows()));
		sal_c=getRandomInt(0, (laberinto.get_num_cols()));
	}
	salida=[sal_r, sal_c];
	laberinto.set_item(sal_r,sal_c,'s');

	//visualización
	var a=0;  
	var b=0;
	var back_col=laberinto.get_num_cols();
	var back_row=laberinto.get_num_rows();
	contador=0;
	function update() { 
	  setTimeout(function() { 
	  	//console.log(back_row + "   "+ back_col);
		if (laberinto.get_item(a,b)!=null){
			actualizaCuadricula(b,a, anchoCuadro, largoCuadro, "#FFFFFF");
			//entrada verde
		    actualizaCuadricula(ent_c,ent_r, anchoCuadro, largoCuadro, "#2EFE2E");
		    //salida roja
		    actualizaCuadricula(sal_c,sal_r, anchoCuadro, largoCuadro, "#FF0000");
		}
//		else if (laberinto.get_item(back_row,back_col)!=null){
//			actualizaCuadricula(back_col,back_row, anchoCuadro, largoCuadro, "#FFFFFF");
//		}
		
	    b++;
//	    back_col--;
	    if (b==(laberinto.get_num_cols())&& ((a<=valorRow))){
	    	b=0;
//	    	back_col=laberinto.get_num_cols();
//	    	back_row--;
	    	a++;
	    }
	    if ((a<=valorRow)&&(b<=laberinto.get_num_cols())) { 
	      update(); 
	    }
	    else{
	    	finDibujo=true;
	    	contador++;
	    }
	    if ((finDibujo==true)&&(contador==1)){
	    	//pila de los movimientos
			//la pila almacena el valor de la celda y los posibles movimientos
			function etapaRecorrido(row, col){
				this.row=row;
				this.col=col;
				this.valor=laberinto.get_item(row, col);
				this.movDisp=['up', 'right', 'down', 'left'];
			}
			//inicial el puntero en la entrada del laberinto
			punteroInicial= new etapaRecorrido(entrada[0], entrada[1])
			pilaMovimientos=new Stack();
			//iniciar ese puntero
			pilaMovimientos.push(punteroInicial);
			puntero=[(pilaMovimientos.top().row), (pilaMovimientos.top().col)];
			lastElm=pilaMovimientos.top();
			//empezar el depth first search
			dps();
		
	    }

	  }, 1)
	}
	update();


}	


//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------


//visualización
function generaCuadricula(row, col) {
	//-----valores------
	//valores de pantalla y de  cuadros
	//los cuadros deben ser responsivos, todos deben caber en la pantalla
	var anchoCuadro=ancho/col;
	anchoCuadro=anchoCuadro;
	var largoCuadro=largo/row;
	largoCuadro=largoCuadro;
	//-------------
	//areaLaberinto define todas las especificaciones del canvas
	areaLaberinto.inicio();
	//llenar el area de cuadros
	var pos_x=0;
	var pos_y=0;
	for (i=0; i<laberinto.get_num_rows();i++){
		for (j=0; j<laberinto.get_num_cols();j++){
			//las paredes que sean color gris
			if (laberinto.get_item(i,j)==null){
				sq= new cuadro(anchoCuadro, largoCuadro, "#000080", pos_x, pos_y);
			}
			pos_x+=(anchoCuadro);
		}
		pos_y+=(largoCuadro);
		pos_x=0;
	}
}
function limpia(){
	areaLaberinto.limpiarPantalla();
}
//inserta un cuadro de otro color encima del ya establecido
//ac=anchoCuadro, lc= largo cuadro, x=numero de fila, y=numero de columna
//color= color del cuadro a sobreescribir
function actualizaCuadricula(x,y,aC,lC, color){
	overwriteX=x*aC;
	overwriteY=y*lC;
	sq= new cuadro(aC, lC, color, overwriteX, overwriteY);
}




var areaLaberinto = {
	canvas : document.createElement("canvas"),
	inicio: function() {
    	this.canvas.width = ancho;
    	this.canvas.height = largo;
    	this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
	limpiarPantalla : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
}


function cuadro(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  ctx = areaLaberinto.context;
  ctx.fillStyle = color;
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

//---------------------------------------------------------------
//-------------------------------------------------------------------
//Kruzcal para generación de laberinto
//recibe lista de las celdas disponibles en el laberinto, 
//recibe al laberinto en si mismo

function kruzcal(laberinto, listaCeldas,anchoCuadro, largoCuadro){
	row=laberinto.get_num_rows();
	col=laberinto.get_num_cols();
	listaC=listaCeldas;
	listaMovimientos=['up', 'down', 'left', 'right'];
	puntero=[null, null, null];
	randMov=null;
	//obtener un elemento aleatorio de una lista

	//juntar las celdas, repetir hasta que la lista de celdas tenga un solo numero
	while (listaC.length!=1){
		//console.log(listaC.length)
		//una celda aleatoria
		//solo celdas impares
		randRow=getRandomInt(0,row);
		randCol=getRandomInt(0, col);
		puntero[0]=randRow;
		puntero[1]=randCol;
		puntero[2]=laberinto.get_item(randRow, randCol);
		if ((randRow%2==0) || (randCol%2==0)){
			while ((randRow%2==0) || (randCol%2==0)){
				randRow=getRandomInt(0,row);
				randCol=getRandomInt(0, col);
				puntero[0]=randRow;
				puntero[1]=randCol;
			}
		}
		puntero[2]=laberinto.get_item(randRow, randCol);
		//console.log(puntero);
		//elegir algun movimiento aleatorio
		randMov=listaMovimientos[elemAleatorioLista(listaMovimientos)];
		//console.log(randMov)
		//movimiento disponible
		function movDisp(laberinto, movimiento, puntero){
			if (movimiento=='up'){
				if (((puntero[0]+1)>0) && (laberinto.up(puntero[0],puntero[1]).value==null)){
					var nuevo_puntero=laberinto.up(puntero[0],puntero[1]);
					if (laberinto.up(nuevo_puntero.row,nuevo_puntero.col)!=undefined){
						nuevo_puntero=laberinto.up(nuevo_puntero.row,nuevo_puntero.col);
						return nuevo_puntero;
					}
					else {
						return undefined;
					}
			}
				else{
					return undefined;
				}
			}

			else if (movimiento=='down'){
				if (((puntero[0]+1)<laberinto.get_num_rows())&&(laberinto.down(puntero[0],puntero[1]).value==null)){
					var nuevo_puntero=laberinto.down(puntero[0],puntero[1]);
					if (laberinto.down(nuevo_puntero.row,nuevo_puntero.col)!=undefined){
						nuevo_puntero=laberinto.down(nuevo_puntero.row,nuevo_puntero.col);
						return nuevo_puntero;
					}
					else {
						return undefined;
					}
			}
				else{
					return undefined;
				}
			}

			else if (movimiento=='left'){
				if (((puntero[1]-1)>0)&&(laberinto.left(puntero[0],puntero[1]).value==null)){
					var nuevo_puntero=laberinto.left(puntero[0],puntero[1]);
					if (laberinto.left(nuevo_puntero.row,nuevo_puntero.col)!=undefined){
						nuevo_puntero=laberinto.left(nuevo_puntero.row,nuevo_puntero.col);
						return nuevo_puntero;
					}
					else {
						return undefined;
					}
			}
				else{
					return undefined;
				}
			}

			else if (movimiento=='right'){
				if (((puntero[1]+1)<laberinto.get_num_cols())&&(laberinto.right(puntero[0],puntero[1]).value==null)){
					var nuevo_puntero=laberinto.right(puntero[0],puntero[1]);
					if (laberinto.right(nuevo_puntero.row,nuevo_puntero.col)!=undefined){
						nuevo_puntero=laberinto.right(nuevo_puntero.row,nuevo_puntero.col);
						return nuevo_puntero;
					}
					else {
						return undefined;
					}
			}
				else{
					return undefined;
				}
			}
		}
		//fin función
		
		mover= movDisp(laberinto, randMov, puntero);
		//console.log(mover);
		//si el movimiento elegido está disponible, cambia el muro y el destino al numero de origen
		//elimina el numero destino de la lista
		if (mover!=undefined){
			//borrar elemento de la lista de celdas disponibles
			deleteThisIndex= listaC.indexOf(mover.value);
			listaC.splice(deleteThisIndex,1);
			//cambiar el numero del muro y del destino
			//arriba
			if (randMov=='up'){
				var arriba=laberinto.up(puntero[0],puntero[1]);
				laberinto.set_item(arriba.row, arriba.col, puntero[2]);
				laberinto.set_item(mover.row,mover.col,puntero[2]);
			}
			//abajo
			else if (randMov=='down'){
				var abajo=laberinto.down(puntero[0],puntero[1]);
				laberinto.set_item(abajo.row, abajo.col, puntero[2]);
				laberinto.set_item(mover.row,mover.col,puntero[2]);
			}
			//izquierda
			else if (randMov=='left'){
				var izquierda=laberinto.left(puntero[0],puntero[1]);
				laberinto.set_item(izquierda.row, izquierda.col, puntero[2]);
				laberinto.set_item(mover.row,mover.col,puntero[2]);
			}
			//derecha
			else if (randMov=='right'){
				var derecha=laberinto.right(puntero[0],puntero[1]);
				laberinto.set_item(derecha.row, derecha.col, puntero[2]);
				laberinto.set_item(mover.row,mover.col,puntero[2]);
			}
		}
	}

	return laberinto;	
}
