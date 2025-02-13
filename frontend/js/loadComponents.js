// Función para cargar un componente
function loadComponent(url, elementId) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
      // Actualizar los enlaces para que funcionen correctamente
      updateLinks();
    })
    .catch(error => console.error('Error loading component:', error));
}

// Función para actualizar los enlaces
function updateLinks() {
  const links = document.querySelectorAll('header a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href.startsWith('/')) {
      // Convertir rutas absolutas en relativas
      const currentPath = window.location.pathname;
      const isInPagesFolder = currentPath.includes('/pages/');
      link.setAttribute('href', isInPagesFolder ? '..' + href : '.' + href);
    }
  });
}

// Cargar el header y el footer
document.addEventListener("DOMContentLoaded", function() {
  loadComponent('../components/header.html', 'header');
  loadComponent('../components/footer.html', 'footer');
});