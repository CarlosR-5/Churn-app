let clientes = [];

async function cargarClientes() {
    try {
        let res = await fetch("https://localhost:7139/api/clientes");
        clientes = await res.json();
        cargarTabla();
    } catch (err) {
        console.error("Error al cargar clientes:", err);
    }
}

cargarClientes();

let indiceEditar = null;

// Cargar la tabla con los datos
function cargarTabla() {
    let tbody = document.querySelector("#tablaClientes tbody");
    tbody.innerHTML = "";

    clientes.forEach((c, i) => {
        tbody.innerHTML += `
        <tr>
            <td>${c.nombre}</td>
            <td>${c.email}</td>
            <td>${c.total_Visitas}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editar(${i})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminar(${i})">Eliminar</button>
                <button class="btn btn-info btn-sm" onclick="predecir(${i})">Predecir</button>
            </td>
        </tr>
        `;
    });
}

// Eliminar cliente
async function eliminar(i) {
    if (confirm("¿Eliminar cliente?")) {
        try {
            let id = clientes[i].idClient;
            await fetch(`https://localhost:7139/api/clientes/${id}`, { method: "DELETE" });
            cargarClientes();
        } catch (err) {
            console.error("Error al eliminar cliente:", err);
        }
    }
}

// Predicción simple según total de visitas
function predecir(i) {
    let c = clientes[i];
    let riesgo = c.total_Visitas < 3 ? "⚠ Cliente en riesgo de abandono" : "✅ Cliente estable";
    alert(riesgo);
}

// Abrir modal para agregar cliente
function abrirModal() {
    indiceEditar = null;
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("compras").value = "";

    let modal = new bootstrap.Modal(document.getElementById("modalCliente"));
    modal.show();
}

// Guardar cliente (POST o PUT)
async function guardarCliente() {
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let compras = parseInt(document.getElementById("compras").value);

    if (nombre === "" || email === "" || isNaN(compras)) {
        alert("Complete todos los campos");
        return;
    }

    try {
        if (indiceEditar == null) {
            // AGREGAR NUEVO CLIENTE (POST)
            let cliente = {
                nombre: nombre,
                email: email,
                total_Visitas: compras,
                // Para los demás campos opcionales puedes inicializarlos como quieras
                telefono: "",
                fecha_Registro: new Date().toISOString(),
                ultima_Visita: new Date().toISOString(),
                total_Gastos: 0,
                ultimo_Pedido: new Date().toISOString(),
                total_Pedidos: 0
            };

            await fetch("https://localhost:7139/api/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cliente)
            });

        } else {
            // EDITAR CLIENTE EXISTENTE (PUT)
            let clienteOriginal = clientes[indiceEditar];

            let cliente = {
                IdClient: clienteOriginal.idClient,  // importante
                nombre: nombre,
                email: email,
                total_Visitas: compras,
                // Usamos los valores existentes para los campos que no se editan
                telefono: clienteOriginal.telefono || "",
                fecha_Registro: clienteOriginal.fecha_Registro || new Date().toISOString(),
                ultima_Visita: clienteOriginal.ultima_Visita || new Date().toISOString(),
                total_Gastos: clienteOriginal.total_Gastos || 0,
                ultimo_Pedido: clienteOriginal.ultimo_Pedido || new Date().toISOString(),
                total_Pedidos: clienteOriginal.total_Pedidos || 0
            };

            await fetch(`https://localhost:7139/api/clientes/${clienteOriginal.idClient}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cliente)
            });
        }

        // Recargar tabla y cerrar modal
        await cargarClientes();
        bootstrap.Modal.getInstance(document.getElementById("modalCliente")).hide();

    } catch (err) {
        console.error("Error al guardar cliente:", err);
        alert("Ocurrió un error al guardar el cliente.");
    }
}

// Editar cliente: asigna valores y abre modal
function editar(i) {
    indiceEditar = i;
    let c = clientes[i];

    document.getElementById("nombre").value = c.nombre;
    document.getElementById("email").value = c.email;
    document.getElementById("compras").value = c.total_Visitas; // se muestra como Compras

    let modal = new bootstrap.Modal(document.getElementById("modalCliente"));
    modal.show();
}

// Buscador de clientes
function buscarCliente() {
    let input = document.getElementById("buscador").value.toLowerCase();
    let filas = document.querySelectorAll("#tablaClientes tbody tr");

    filas.forEach(f => {
        f.style.display = f.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}