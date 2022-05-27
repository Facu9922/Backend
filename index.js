class Usuario {
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
    
    */
    
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


