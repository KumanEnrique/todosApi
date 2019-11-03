const contenedorDatos = [];
const contenedorHTML = document.getElementById("contenedorHTML");
const formulario = document.getElementById("formu");
let contador = 1;

function buscar (id){
    for (let i = 0;i<contenedorDatos[0].length;i++){
        if(contenedorDatos[0][i].id === id){
            return contenedorDatos[0][i];
        }
    }
}

fetch("https://jsonplaceholder.typicode.com/todos")
    .then(res=>res.json())
    .then(datos=>{
        contenedorDatos.push(datos);   
        pintar();
    });

function pintar() {
    contenedorHTML.innerHTML = " ";
    contenedorDatos[0].map((elemento)=>{
        contenedorHTML.innerHTML += `
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mt-2">
                <div class="card">
                    <div class="card-body">
                        <h4>${elemento.title}</h4>
                        <input type="checkbox" ${elemento.completed?"checked":" "}/>
                        <label class="form-check-label">Checked</label>
                        <h6>ID:${elemento.id}</h6>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-danger" onclick="eliminar(${elemento.id})">Eliminar</button>
                        <button class="btn btn-warning" onclick="actualizar(${elemento.id})" data-toggle="modal" data-target="#Modal">Actualizar</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function agregar(e){
    e.preventDefault();
    const tareas = {
        title:document.getElementById("titulo").value,
        completed:false,
        id:contenedorDatos[0][contenedorDatos[0].length-1].id + 1
    };
    contenedorDatos[0].push(tareas);
    pintar();
    formulario.reset();
}

function eliminar(id){
    for (let i = 0;i<contenedorDatos[0].length;i++){
        if(contenedorDatos[0][i].id === id){
            contenedorDatos[0].splice(i,1);
        }
    }
    pintar();
}

function actualizar(id){
    const tituloA = document.getElementById("tituloActualizado");
    const select = document.getElementById("select");
    const idA = document.getElementById("id");
    temporal = {};
    temporal = buscar(id);
    idA.value = temporal.id;
    select.value = temporal.completed;
    tituloA.value = temporal.title;

    if (contador === 1){/* no se que hize,pero quise evitar que se ejecutara mas veses el submit*/
        formularioA = document.getElementById("formuA");
        formularioA.addEventListener("submit", (e) => {
            e.preventDefault();
            temporal.id = Number(idA.value)
            temporal.title = tituloA.value;
            if(select.value == "true"){
                temporalBolean = true;
                temporal.completed = temporalBolean;
            }else if(select.value == "false"){
                temporalBolean = false;
                temporal.completed = temporalBolean;
            }
            pintar();
        })
    }
    contador++;
}

formulario.addEventListener("submit",agregar);
