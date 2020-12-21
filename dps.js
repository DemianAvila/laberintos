//depth first search -> algoritmo de busqueda profunda

//posibles parametros: laberinto, puntero, salida, stack

var removeItemFromArr = ( arr, item ) => {
    return arr.filter( e => e !== item );
};


function dps() {
	actualizaCuadricula(ent_c,ent_r, anchoCuadro, largoCuadro, "#2EFE2E");
	//salida roja
	actualizaCuadricula(sal_c,sal_r, anchoCuadro, largoCuadro, "#FF0000");
	
	if (pilaMovimientos.is_empty()==false){
		lastElm=pilaMovimientos.top();
		puntero=[(pilaMovimientos.top().row), (pilaMovimientos.top().col)];
		//console.log(lastElm);
		//console.log(pilaMovimientos.size())
		function etapaRecorrido(row, col){
			this.row=row;
			this.col=col;
			this.valor=laberinto.get_item(row, col);
			this.movDisp=['up', 'right', 'down', 'left'];
			}
		}
	setTimeout(function(){

		//intenta moverte hacia arriba
		var tryUp=laberinto.up(puntero[0], puntero[1]);
		//derecha
		var tryRight=laberinto.right(puntero[0], puntero[1]);
		var tryDown=laberinto.down(puntero[0], puntero[1]);
		var tryLeft=laberinto.left(puntero[0], puntero[1]);
		//si el primer movimiento de la lista de movimientos disponibles,  no está disponible, borralo de la lista de elementos disponibles, 
		//si si está disponible, añadirlo a la cola y actualiza el puntero
		if (lastElm.movDisp[0]=='up'){
			if ((tryUp.value==undefined)||(tryUp.value==null)||(tryUp.value=='x')){
				lastElm.movDisp=removeItemFromArr(lastElm.movDisp, 'up');
			}
			else{
				laberinto.set_item(lastElm.row, lastElm.col, 'x');
				//la celda recorrida, pintala de amarillo
				actualizaCuadricula(lastElm.col,lastElm.row, anchoCuadro, largoCuadro, "#FFFF00");
				var movUp=new etapaRecorrido(tryUp.row, tryUp.col);
				pilaMovimientos.push(movUp);
			}
		}

		else if (lastElm.movDisp[0]=='right'){
			if ((tryRight.value==undefined)||(tryRight.value==null)||(tryRight.value=='x')){
				lastElm.movDisp=removeItemFromArr(lastElm.movDisp, 'right');
			}
			else{
				laberinto.set_item(lastElm.row, lastElm.col, 'x');
				actualizaCuadricula(lastElm.col,lastElm.row, anchoCuadro, largoCuadro, "#FFFF00");
				var movRight=new etapaRecorrido(tryRight.row, tryRight.col);
				pilaMovimientos.push(movRight);
			}
		}

		
		else if (lastElm.movDisp[0]=='down'){
			if ((tryDown.value==undefined)||(tryDown.value==null)||(tryDown.value=='x')){
				lastElm.movDisp=removeItemFromArr(lastElm.movDisp, 'down');
			}
			else{
				laberinto.set_item(lastElm.row, lastElm.col, 'x');
				actualizaCuadricula(lastElm.col,lastElm.row, anchoCuadro, largoCuadro, "#FFFF00");
				var movDown=new etapaRecorrido(tryDown.row, tryDown.col);
				pilaMovimientos.push(movDown);
			}
		}

		else if (lastElm.movDisp[0]=='left'){
			if ((tryLeft.value==undefined)||(tryLeft.value==null)||(tryLeft.value=='x')){
				lastElm.movDisp=removeItemFromArr(lastElm.movDisp, 'left');
			}
			else{
				laberinto.set_item(lastElm.row, lastElm.col, 'x');
				actualizaCuadricula(lastElm.col,lastElm.row, anchoCuadro, largoCuadro, "#FFFF00");
				var movLeft=new etapaRecorrido(tryLeft.row, tryLeft.col);
				pilaMovimientos.push(movLeft);
			}
		}



		
		//si la pila se queda vacia, o si el puntero es igual a la salida, termina el algoritmo
		if ((pilaMovimientos.is_empty()==true)||((puntero[0]==salida[0])&&(puntero[1]==salida[1]))){
			return 0;
		}

		//si el tope de la pila se queda sin movimientos disponibles, quita el tope de la pila
		else if (lastElm.movDisp.length==0){
			//cambia los espacios no disponibles como un punto
			laberinto.set_item(lastElm.row, lastElm.col, 'x');
			//pinta los espacios no disponibles de negro
			actualizaCuadricula(lastElm.col,lastElm.row, anchoCuadro, largoCuadro, "#000000");
			pilaMovimientos.pop();
			dps()
		}
		else{
			dps()
		}

	},1);
	
}