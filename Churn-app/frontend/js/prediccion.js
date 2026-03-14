// Verificar sesión
if (!localStorage.getItem("login")) {
    window.location = "index.html";
}

async function cargarDashboard() {
    try {
        // Traer clientes desde la API
        let res = await fetch("https://localhost:7139/api/clientes");
        let clientes = await res.json();

        let total = clientes.length;
        let riesgo = 0;
        let estables = 0;

        clientes.forEach(c => {
            if (c.total_Visitas < 3) {
                riesgo++;
            } else {
                estables++;
            }
        });

        let porcentaje = total > 0 ? Math.round((riesgo / total) * 100) : 0;

        //Tarjetas
        document.getElementById("totalClientes").innerText = total;
        document.getElementById("riesgoClientes").innerText = riesgo;
        document.getElementById("establesClientes").innerText = estables;
        document.getElementById("porcentajeRiesgo").innerText = porcentaje + "%";

        // Gráfica
        const ctx = document.getElementById('grafica');
        if (total === 0) {
            if (ctx) ctx.style.display = "none";
        } else if (ctx) {
            ctx.style.display = "block";

            // Destruir gráfica anterior si existe
            if (window.chartInstance) window.chartInstance.destroy();

            window.chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Clientes en Riesgo', 'Clientes Estables'],
                    datasets: [{
                        label: 'Cantidad de Clientes',
                        data: [riesgo, estables],
                        backgroundColor: ['#e74c3c', '#2ecc71']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }

    } catch (err) {
        console.error("Error cargando dashboard:", err);
        alert("Ocurrió un error al cargar los clientes.");
    }
}

// Ejecutar al cargar la página
cargarDashboard();