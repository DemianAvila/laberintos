class Stack {
  constructor(b=[]) {
    this.pila=b;
  }

  is_empty(){
    if (((this.pila).length)==0){
      return true;
    }
    else {
      return false;
    }
  }

  to_string(){
    if (this.is_empty()==true){
      document.write("<br>La pila esta vacia<br>");
    }
    else {
      document.write("<br>"+this.pila+"<br>");
    }
  }

  pop(){
    if (this.is_empty()){
      return null;
    }
    else {
      this.pila.pop();
    }
  }

  push(value){
    this.pila.push(value);
  }

  clear_stack(){
    if (this.is_empty()==true){
      
    }
    else{
      this.pila=[];
    }
  }

  
  size(){
    if (this.is_empty()==true){
      return 0;
    }
    else {
      return this.pila.length;
    }
  }

  top(){
    if (this.is_empty()==true){
      return (null);
    }
    else{
      return (this.pila[(this.pila.length)-1]);
    }
  }
}

/*
//pruebas del adt
pila=new Stack([])
document.write(pila.is_empty()+"<br>");
pila.to_string();
pila.pop();
pila.push(3);
pila.to_string();
pila.push('a');
pila.to_string();
pila.clear_stack();
pila.to_string();
document.write("<br>"+pila.get_elem(2)+"<br>");
pila.push(3);
document.write("<br>"+pila.get_elem(2)+"<br>");
document.write("<br>"+pila.get_elem(1)+"<br>");
document.write("<br>"+pila.get_elem(0)+"<br>");
document.write("<br>"+pila.size()+"<br>");
document.write("<br>"+pila.top()+"<br>");
document.write("<br>"+"<br>"+"<br>");
//fin de la prueba
*/