/* class Usuario {
    // lo ideal es que el constructor reciba todos los parámetros y no solo nombre y apellido
    constructor (nombre, apellido, mascotas = [], libros =[]){
        this.nombre = nombre
        this.apellido = apellido
        this.mascotas = mascotas
        this.libros = libros
    }

     /* Cuando la consigna pida "devolver", siempre hace referencia a return. El console.log() se podría poner antes pero no es necesario. Además se pedía utilizar "template strings" 
    
    Para esta primera función podría ser...

    getFullName(){
        console.log(`${this.nmbre} ${this.apellido}`) ---> Esta línea no es necesaria, solo sería un extra
        return `${this.nombre} ${this.apellido}`
    }
    
    
    
    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascotas(...nombre) {
        this.mascotas.push(...nombre)
    }

    // misma aclaración que antes para return vs console.log()
    countMascotas(){
       return (`cantidad de mascotas ${this.mascotas.length}`)
    }
    addBook(titulo,autor){
        this.libros.push({titulo,autor})
    }
    getBookNames(){
        let book=this.libros.map((libro)=>{
            return libro.titulo
            })
            // misma aclaración que antes para return vs console.log()
            return(`Los titulos de mis libros son: ${book}`)
    }
}
const user = new Usuario ("Facundo", "Agudo")
user.getFullName()
user.addMascotas("Perro", "Loro", "Gato","Hamster", "Conejo")

console.log(user.mascotas)
console.log(user.countMascotas())
user.addBook("Harry Potter", "Rowling")
user.addBook("1984", "Orwell")
console.log(user.libros)
user.getBookNames()


 */


/* const moment = require("moment")


function calcularTiempo(){
    console.log (moment("19940622", "YYYYMMDD").fromNow())
    
    
}
calcularTiempo()

var fecha1 = moment('1994-06-22');
var fecha2 = moment('2022-05-30');
console.log(fecha2.diff(fecha1, 'year'), ' años han pasado de mi nacimiento ');
console.log(fecha2.diff(fecha1, 'month'), ' meses han pasado de mi nacimiento');
console.log(fecha2.diff(fecha1, 'day'), ' dias han pasado de mi nacimiento');
console.log(fecha2.diff(fecha1, 'hour'), ' horas han pasado de mi nacimiento'); */


//Desafio 2


/* const fs = require('fs')

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
        this.countID = 0
        this.content = []
    }
    async write() {
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.content))
    }
    save(object) {
        this.countID++ 
        object["id"] = this.countID 
        this.content.push(object) 
        this.write() 
        return `El id del objeto añadido es ${this.countID}` 
    }
    async getAll() { 
        return this.content
    }

    getById(id) { 
        let result
        if (this.content !== []) {
            result = this.content.find(x => x.id === id)
            if (result === undefined) {
                result = null
            }
        } else {
            result = 'El archivo está vacío'
        }
        return result
    }
    deleteById(id) { 
        let result
        if (this.content !== []) {
            let newContent = this.content.filter(x => x.id !== id)
            this.content = newContent
            this.write() 
            result = 'OK'
        } else {
            result = `El archivo está vacío`
        }
        return result
    }

    async deleteAll() {
        this.content = this.content.splice(0, this.content.length)
        this.write()
    }
} */
/* const Contenedor =require('./index.js') */

/* const cargarProds = async function(){
    let cont= new Contenedor('productos.txt')
    cont.save({
        title: "Pelota",
        price: 150,
        thumbnail: "https://ep01.epimg.net/verne/imagenes/2015/09/11/articulo/1441988783_165642_1442161238_sumario_normal.jpg"
    })
    cont.save({
        title: "remera",
        price: 250,
        thumbnail: "https://d2r9epyceweg5n.cloudfront.net/stores/001/205/102/products/remera-lisa-vi-rj1-122009f0e7fe0bfa3715906956218434-480-0.jpg"
    })
    cont.save({
        title: "celular",
        price: 500,
        thumbnail: "https://images.fravega.com/f300/13890bd15f4f552457d38251e9ac7fab.jpg.webp"
    })
    console.log(cont.getById(1));
    console.log(cont.getById(5));
    console.log(cont.getAll());
    console.log(cont.deleteById(1));
    console.log(cont.deleteById(6));
    console.log(cont.getAll());
    cont.deleteAll();
    console.log(cont.getAll());
}

cargarProds() */

//Desafio 3
const fs = require('fs');

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    async obtenerTodo() {
        try {
            const data = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async obtenerPorId(id) {
        try {
            const data = await this.obtenerTodo();
            const resultado = data.find((item) => item.id === id);
            if (resultado) {
                return resultado;
            } else {
                return null;
            }
        } catch (error) {
            console.log('Error al obtener un producto por ID: ' + error);
        }
    }

}
const express = require('express');

const app = express();



const productos = new Contenedor('productos.txt');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1 style="color: blue">Bienvenidos al Servidor Express. Podes ver las rutas /productos y /productoRandom</h1>');
});

app.get('/productos', async (req, res) => {
    res.send(await productos.obtenerTodo());
});

app.get('/productoRandom', async (req, res) => {
    const data = await productos.obtenerTodo();
    const numeroRandom = Math.floor(Math.random() * data.length);
    res.send(await productos.obtenerPorId(parseInt(numeroRandom + 1)));
});

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: ${PORT}`);
});

server.on('error', error => console.log(`Error en el servidor http: ${error}`));