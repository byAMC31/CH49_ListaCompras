const btnAgregar = document.getElementById("btnAgregar");
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const btnClear = document.getElementById("btnClear");

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

let cont = 0;

let costoTotal = 0;
let totalEnProductos = 0;

let datos = new Array();

function validarCantidad() {
    //Validación de la cantidad

    if (txtNumber.value.length <= 0) {//1. length
        return false;
    }

    if (isNaN(txtNumber.value)) { //2. Número
        return false;
    }

    if (Number(txtNumber.value) <= 0) {  //3. >0
        return false;
    }

    return true;
}//validarCantidad


function getPrecio() {
    //let random= Number(Math.random() * 100).toFixed(2);
    return Math.round((Math.random() * 10000)) / 100;
}//getPrecio


btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    //Bander, al ser true permite agregar los datos a la tabla
    let isValid = true;


    txtName.style.border = "";
    txtNumber.style.border = "";

    txtName.value = txtName.value.trim();;
    txtNumber.value = txtNumber.value.trim();;

    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    if (txtName.value.length < 3) {
        //1. Mostrar la alerta con el error

        //2. Borde de color rojo
        txtName.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML = "<strong>El Nombre del producto no es correcto</strong>";
        alertValidaciones.style.display = "block";
        isValid = false; //bandera
    }//length<3



    if (!validarCantidad()) { // si regresa false
        txtNumber.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += "<br/><strong>La cantidad no es correcta</strong>";
        alertValidaciones.style.display = "block";
        isValid = false; //bandera
    }//!validarCantidad


    if (isValid) {
        //Agregamos Datos a la tabla
        cont++;
        let precio = getPrecio();

        //creamos una nueva fila
        let row =
            `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                </tr>`;

        let elemento = {
            "cont": cont,
            "nombre": txtName.value,
            "cantidad": Number(txtNumber.value),
            "precio": precio
        };

    
        // Agregar el nuevo elemento al array
        datos.push(elemento);


        // Guardar el array actualizado en el localStorage
        localStorage.setItem("datos", JSON.stringify(datos));



        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerHTML = "$ " + costoTotal.toFixed(2);
        contadorProductos.innerHTML = cont;
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;

        localStorage.setItem("costoTotal", costoTotal);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("cont", cont);

        txtName.value = ""
        txtNumber.value = ""
        txtName.focus();
    }//isValid


})



btnClear.addEventListener("click", function (event) {
    event.preventDefault();

    cont = 0;
    costoTotal = 0;
    totalEnProductos = 0;

    precioTotal.innerHTML = "$" + costoTotal;
    contadorProductos.innerHTML = cont;
    productosTotal.innerHTML = totalEnProductos;

    cuerpoTabla.innerHTML = "";

    txtName.style.border = "";
    txtNumber.style.border = "";

    txtName.value = "";
    txtNumber.value = "";

    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtName.focus();


    // Limpia el localStorage
    localStorage.removeItem("datosTabla");
    localStorage.removeItem("costoTotal");
    localStorage.removeItem("totalEnProductos");
    localStorage.removeItem("cont");
    localStorage.removeItem("datos");
});

window.addEventListener("load", function (event) {
    if (this.localStorage.getItem("costoTotal") != null) {
        costoTotal = Number(this.localStorage.getItem("costoTotal"))
    }

    if (this.localStorage.getItem("totalEnProductos") != null) {
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
    }

    if (this.localStorage.getItem("cont") != null) {
        cont = Number(this.localStorage.getItem("cont"));
    }

    if (this.localStorage.getItem("datos") != null) {
        // Recuperar y parsear el array de datos
        datos = JSON.parse(this.localStorage.getItem("datos"));
        
        // Iterar sobre los datos y agregarlos a la tabla
        datos.forEach((elemento) => {
            let row = `
                <tr>
                    <td>${elemento.cont}</td>
                    <td>${elemento.nombre}</td>
                    <td>${elemento.cantidad}</td>
                    <td>${elemento.precio.toFixed(2)}</td>
                </tr>`;
            cuerpoTabla.insertAdjacentHTML("beforeend", row);
        });
    }

    precioTotal.innerHTML = "$ " + costoTotal.toFixed(2);
    contadorProductos.innerHTML = cont;
    productosTotal.innerText = totalEnProductos;



})

