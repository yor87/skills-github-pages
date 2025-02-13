const API_URL = "http://localhost:3000/api/comentarios";
const token = localStorage.getItem("token");

document
  .getElementById("comentarioForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que el formulario se recargue

    const nombreText = document.getElementById("nombre").value; // Obtiene el comentario del usuario
    const commentText = document.getElementById("comentario").value; // Obtiene el comentario del usuario

    if (!commentText.trim()) {
      alert("⚠ El comentario no puede estar vacío.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"Authorization": `Bearer ${token}` // Token de autenticación
        },
        body: JSON.stringify({ nombre: nombreText, mensaje: commentText }), // Enviar el comentario como JSON
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Comentario agregado con éxito");
        document.getElementById("commentText").value = ""; // Limpia el campo de texto
        loadComments(); // Recargar la lista de comentarios
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("❌ Error agregando comentario:", error);
    }
  });

// Función para cargar y mostrar los comentarios desde la API
// async function loadComments() {
//     try {
//         const response = await fetch(${API_URL}/comments);
//         const comments = await response.json();

//         const commentsContainer = document.getElementById("comments");
//         commentsContainer.innerHTML = ""; // Limpiar la lista antes de agregar los nuevos comentarios

//         comments.forEach(comment => {
//             const commentDiv = document.createElement("div");
//             commentDiv.classList.add("comment", "p-2", "border", "mt-2");
//             commentDiv.innerHTML = <p>${comment.text}</p>;
//             commentsContainer.appendChild(commentDiv);
//         });
//     } catch (error) {
//         console.error("❌ Error cargando comentarios:", error);
//     }
// }

// Cargar comentarios al inicio
//document.addEventListener("DOMContentLoaded", loadComments);
