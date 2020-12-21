/*
array 2D
array2D(rows,cols)
get_num_rows()---->regresa numero de filas
get_num_cols()---->regresa nuemero de columnas
clearing (value)---->inicializa
set_item(row, col, val)-----> cambia valor
get_item(row,col)
*/

class Array2D {
    constructor(width, height) {
        this.height = height;
        this.width = width;
        var x = 0, y = 0;
        this.array2d = [];
        if (this.height <= 0 || this.width <= 0) {
            document.write("Error, no se pueden crear matrices vacias <br\>")
        }
        else {
            for (x = 0; x < this.width; x += 1) {
                this.array2d.push([]);
                for (y = 0; y < this.height; y += 1) {
                    this.array2d[x].push(null);
                }
            }
        }
    }

    to_string() {
        for (var x = 0; x < this.width; x += 1) {
            for (var y = 0; y < this.height; y += 1) {
                document.write(this.array2d[x][y] + "&nbsp;&nbsp;&nbsp;&nbsp;");
            }
            document.write("<br\>");
        }
    }

    get_num_cols() {
        return (this.height);
    }

    get_num_rows() {
        return (this.width);
    }

    clearing(value) {
        for (var x = 0; x < this.width; x += 1) {
            for (var y = 0; y < this.height; y += 1) {
                this.array2d[x][y] = value;
            }
        }
    }

    get_item(row, col){
        if (col>=this.height || row>=this.width){
            return(undefined);
        }
        else if (col<0 || row<0){
            return(undefined);
        }
        else {
            return(this.array2d[row][col]);
        }
    }

    set_item(row, col, value){
        if (col>=this.height || row>=this.width){
            return(undefined);
        }
        else if (col<0 || row<0){
            return(undefined);
        }
        else {
            this.array2d[row][col]=value;
        }  
    }

    up (row, col){
        var pointer=row-1;
        if (pointer<0){
            return undefined
        }
        else if ((col<0) || (col>=this.get_num_cols())){
            return undefined
        }
        else{
            return {row: pointer , col: col, value: this.get_item(pointer, col)};
        }
    }

    down (row, col){
        var pointer=row+1;
        if (pointer>=this.get_num_rows()){
            return undefined
        }
        else if ((col<0) || (col>=this.get_num_cols)){
            return undefined
        }
        else{
            return {row: pointer , col: col, value: this.get_item(pointer, col)};
        }
    }

    left (row, col){
        var pointer=col-1;

        if (pointer<0){
            return undefined
        }
        else if ((row<0) || (row>=this.get_num_rows())){
            return undefined
        }
        else{
            return {row: row , col: pointer, value:this.get_item(row, pointer)};
        }
    }

    right (row, col){
        var pointer=col+1;
        if (pointer>=this.get_num_cols()){
            return undefined
        }
        else if ((row<0) || (row>=this.get_num_rows())){
            return undefined
        }
        else{
            return {row: row , col: pointer, value:this.get_item(row, pointer)};
        }
    }
}




/*

//Prueba del adt

matriz_error = new Array2D(-2, 0);
matriz = new Array2D(2, 6);
matriz.to_string();
matriz.clearing(1234);
matriz.to_string();
document.write(matriz.get_num_cols() + "<br\>")
document.write(matriz.get_num_rows() + "<br\>")
document.write(matriz.get_item(0,0) + "<br\>");
document.write(matriz.get_item(-1,0) + "<br\>");
document.write(matriz.get_item(6,0) + "<br\>");
matriz.set_item(0,4, "Hola");
matriz.set_item(1,4, "Adios");
matriz.to_string();
document.write(matriz.up(1,4).value);
document.write(matriz.right(0,3).value);
document.write(matriz.left(0,5).value);
document.write(matriz.down(0,4).value);


*/
