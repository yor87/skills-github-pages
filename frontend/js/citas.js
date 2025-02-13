const API_URL = "http://localhost:3000/api/citas";
const token = localStorage.getItem("token");

// Verificar si el usuario está autenticado
if (!token) {
    window.location.href = "login.html";
}

// Cerrar sesión
document.getElementById("logout")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});

// Función para cargar citas del usuario
const loadCitas = async () => {
    try {
        const response = await fetch(`${API_URL}/my`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (response.ok) {
            const citasList = document.getElementById("citasList");
            citasList.innerHTML = "";

            data.forEach(citas => {
                const li = document.createElement("li");
                li.classList.add("list-group-item");
                li.innerHTML = `<strong>${new Date(citas.date).toLocaleString()}</strong>: ${citas.description}`;
                citasList.appendChild(li);
            });
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("❌ Error cargando citas:", error);
    }
};

// Crear nueva cita
document.getElementById("citasForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;

    try {
        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ date, description })
        });

        const data = await response.json();
        if (response.ok) {
            alert("✅ Cita creada con éxito");
            loadCitas(); // Recargar la lista de citas
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("❌ Error creando cita:", error);
    }
});

// Cargar citas al entrar en la página
document.addEventListener("DOMContentLoaded", loadCitas);
