class Usuario {
    constructor (nombre, apellido){
        this.nombre = nombre
        this.apellido = apellido
        this.mascotas = []
        this.libros = []
    }
    
    getFullName(){
        console.log(`Mi nombre es ${this.nombre} ${this.apellido}`)
    }
    addMascotas(...nombre) {
        this.mascotas.push(...nombre)
    }
    countMascotas(){
       console.log (`cantidad de mascotas ${this.mascotas.length}`)
    }
    addBook(titulo,autor){
        this.libros.push({titulo,autor})
    }
    getBookNames(){
        let book=this.libros.map((libro)=>{
            return libro.titulo
            })
            
            console.log(`Los titulos de mis libros son: ${book}`)
    }
}
const user = new Usuario ("Facundo", "Agudo")
user.getFullName()
user.addMascotas("perro", "loro", "gato","Hamster")

console.log(user.mascotas)
user.countMascotas()
user.addBook("Harry Potter", "Rowling")
user.addBook("1984", "Orwell")
console.log(user.libros)
user.getBookNames()



