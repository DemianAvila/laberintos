function alerta(){

    var divAlert= document.createElement("div");
    divAlert.setAttribute("class", "alert alert-danger");
    divAlert.setAttribute("role", "alert")
    divAlert.setAttribute("id", "aviso_alerta")
    var textAlert=document.createTextNode("Introduzca un entero mayor a 1 en ambos campos");
    divAlert.appendChild(textAlert);
    var afterButton = document.getElementById("boton_validacion");
    //si el aviso no está en pantalla, muestralo
    if  (document.getElementById("aviso_alerta")==null){
        afterButton.after(divAlert);
        $("#aviso_alerta").fadeOut(1500);
        setTimeout(function(){divAlert.remove();},1500);
    }


}


function valida_valor(){
                var inputRow=document.getElementById("filas");
                var valorRow=inputRow.value;
                var inputCol=document.getElementById("columnas");
                var valorCol=inputCol.value;
                
                if (typeof(parseInt(valorRow))=="number"){
                    valorRow=parseFloat(valorRow);
                    valorCol=parseFloat(valorCol);
                    if ((valorRow%1==0) && (valorCol%1==0) && (valorRow>=1) && (valorCol>=1)){
                        generateLab();
                    }
                    else{
                    alerta()
        
                    }
                }
                else {
                    alerta()
                }
            }

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}