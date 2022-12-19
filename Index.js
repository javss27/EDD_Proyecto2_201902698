// Login
function login() {  
    var usuario = document.getElementById("exampleInputEmail1").value;
    var password = document.getElementById("exampleInputPassword1").value;
    var checked = document.getElementById("exampleCheck1").checked;
    if(checked){
        if(usuario == "" && password ==""){
            document.getElementById("divLogin").style.display = "none";
            document.getElementById("divCliente").style.display = "none";
            document.getElementById("divAdmin").style.display = "grid";
        }else{
            alert("Password incorrecta administrador");
        }
    }else{
        if(listaClientes.login(usuario,password)){
            document.getElementById("divLogin").style.display = "none";
            document.getElementById("divCliente").style.display = "grid";
            document.getElementById("divAdmin").style.display = "none";
        }else{
            alert("Password incorrecta cliente");
        }
    }
}

function cerrarSesion() {
    document.getElementById("divLogin").style.display = "flex";
    document.getElementById("divAdmin").style.display = "none";
    document.getElementById("divCliente").style.display = "none";
}
// Cargar archivos
function openFile(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function() {
      var text = reader.result;
      var json = JSON.parse(text);
      json.forEach(function(cliente) {
        var nuevoCliente = new Cliente(cliente.dpi, cliente.nombre_completo, cliente.nombre_usuario, cliente.correo, cliente.contrasenia, cliente.telefono);
        listaClientes.agregarClientes(nuevoCliente)
    });
    };
    reader.readAsText(input.files[0]);
}

//Lista simple
class Nodo {
    constructor(_PersonajeMK) {
        this.PersonajeMK = _PersonajeMK
        this.siguiente = null
    }
}

class Listasimple{
    constructor() {
        this.cabecera = null
    }
    agregarClientes(_objetoPersonaje) {
        var tempo = new Nodo(_objetoPersonaje)
        tempo.siguiente = this.cabecera
        this.cabecera = tempo
    }

    login(_nombre_usuario, _contrasenia){
        var temporal = this.cabecera
        while (temporal != null) {
            if(_nombre_usuario == temporal.PersonajeMK.nombre_usuario && _contrasenia == temporal.PersonajeMK.contrasenia){
                return true;
            }
            temporal.PersonajeMK.nombre_usuario
            temporal = temporal.siguiente         
        }
        return false;
    }

    graficarlistaPersonajesMarioKart(){
        var codigodot = "digraph G{\nlabel=\" Clientes \";\nnode [shape=box];\n graph [rankdir = LR];";
        var temporal = this.cabecera
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        while (temporal != null) {
            nodos+=  "N" + numnodo + "[label=\"" + temporal.PersonajeMK.nombre_usuario + "\" ];\n"
            if(temporal.siguiente != null){
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
            }
            temporal = temporal.siguiente
            numnodo++;            
        }
        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += "{\n"+conexiones+"\n}\n}"
        d3.select("#lienzo").graphviz()
            .width(900)
            .height(500)
            .renderDot(codigodot)
    }
}

class Cliente{
    constructor(_dpi,_nombre_completo,_nombre_usuario,_correo,_contrasenia,_telefono){
        this.dpi = _dpi
        this.nombre_completo = _nombre_completo
        this.nombre_usuario = _nombre_usuario
        this.correo = _correo
        this.contrasenia = _contrasenia
        this.telefono = _telefono
    }
}

function render() {  
    listaClientes.graficarlistaPersonajesMarioKart()    
}

var listaClientes = new Listasimple();