// Propiedades del objeto "tareas"

// {
//     id: 1,
//     texto: "Estudiar JavaScript",
//     completada: false
// }


// Comenzamos generando un array vacío para la lista de tareas y el contador para el ID
// Usamos Local Storage para recuperar las tareas que se hayan guardado, o comenzamos con un array vacío

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

let contador = 1;


// Traigo los elementos del index.html

const botonAgregarTarea = document.getElementById("botonAgregarTarea")
const listaDeTareas = document.getElementById("listaDeTareas")


// Genero la función para asignar al evento

const agregarTarea = () => {

    let textoTarea = prompt("Ingresa la tarea que quieres agregar")

    let tarea = {
        id: contador,
        texto: textoTarea,
        completada: false
    }

    tareas.push(tarea)
    contador++
    renderizarTareas();
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

botonAgregarTarea.addEventListener("click", agregarTarea)


// Genero las funciones para utilizarlas dentro de los botones y tener código más limpio

const marcarComoCompletada = (elemento) => {
    const tareaEncontrada = tareas.find((tarea) => tarea.id === elemento.id)
    tareaEncontrada.completada = !tareaEncontrada.completada
    renderizarTareas();
    localStorage.setItem("tareas", JSON.stringify(tareas))
}

const eliminarTarea = (elemento) => {
    tareas = tareas.filter(tarea => tarea.id !== elemento.id)
    renderizarTareas();
    localStorage.setItem("tareas", JSON.stringify(tareas))
}


// Genero una función para reutilizar a la hora de renderizar

const renderizarTareas = () => {
    listaDeTareas.innerHTML = "";

    tareas.forEach((elemento) => {
        let item = document.createElement("li");
        item.className = "tarjeta"
        if(elemento.completada === true){
            item.classList.add("completada")
        }
        item.innerHTML = `<span>${elemento.texto}</span>
        <button class="botonSwitch">${elemento.completada === false ? "No completada" : "Completada"}</button>
        <button class="botonBorrar">Borrar</button>`;


        // Guardo los botones de completar y de borrar en variables y genero las funciones
        
        const botonDeSwitch = item.querySelector(".botonSwitch")
        const botonDeBorrar = item.querySelector(".botonBorrar")

        botonDeSwitch.addEventListener("click", () => {
            marcarComoCompletada(elemento);
        });

        botonDeBorrar.addEventListener("click", () => {
           eliminarTarea(elemento);
        });

        listaDeTareas.appendChild(item);

    });
};

// Renderizo las tareas al momento del montaje

renderizarTareas();