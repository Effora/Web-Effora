function aplicarPermisos(rol) {
    const grupos = document.querySelectorAll('.module-group');

    grupos.forEach(grupo => {
        const rolRequerido = grupo.getAttribute('data-role');

        if (rol === 'admin') {
            // El admin ve TODO
            grupo.style.display = 'block';
        } else if (rolRequerido === 'todos' || rolRequerido === rol) {
            // Se muestra si es para todos o si coincide con su rol
            grupo.style.display = 'block';
        } else {
            // Se oculta si no pertenece a su nivel
            grupo.style.display = 'none';
        }
    });
}

// Al cargar la página, si ya estaba logueado, aplicamos los permisos
window.onload = () => {
    const rolGuardado = localStorage.getItem('effora_rol');
    if (rolGuardado) {
        aplicarPermisos(rolGuardado);
    }
};

// Definimos los niveles de acceso
const PERFILES = {
    "asesor_premium": { clave: "effora2026", rol: "asesor" },
    "asistente_pro": { clave: "asistente123", rol: "asistente" },
    "admin_effora": { clave: "master99", rol: "admin" }
};

function intentarLogin(e) {
    e.preventDefault();
    const userIn = document.getElementById('usuario').value;
    const passIn = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-login');

    // Buscamos si el usuario existe y la clave coincide
    if (PERFILES[userIn] && PERFILES[userIn].clave === passIn) {
        const rolAsignado = PERFILES[userIn].rol;
        
        // Guardamos el rol en el navegador
        localStorage.setItem('effora_rol', rolAsignado);
        
        // Aplicamos el filtro de contenido
        aplicarPermisos(rolAsignado);

        // Animación de entrada
        document.getElementById('login-overlay').style.opacity = "0";
        setTimeout(() => {
            document.getElementById('login-overlay').style.display = "none";
            document.getElementById('aula-main').classList.add('active');
        }, 600);
    } else {
        errorMsg.style.display = "block";
    }
}

    // 2. NAVEGACIÓN DINÁMICA (REDRECCIONES INTERNAS)
    function cambiarClase(id, elemento) {
      // Ocultar todos los contenidos
      const contenidos = document.querySelectorAll('.lesson-content');
      contenidos.forEach(c => c.classList.remove('active-content'));

      // Quitar clase activa del sidebar
      const botones = document.querySelectorAll('.lesson');
      botones.forEach(b => b.classList.remove('active'));

      // Mostrar el seleccionado
      document.getElementById(id).classList.add('active-content');
      elemento.classList.add('active');

      // Actualizar título de la barra superior
      document.getElementById('current-clase-title').innerText = elemento.innerText;

      // Scroll arriba
      document.querySelector('.main-content').scrollTop = 0;
    }

    // 3. SEGURIDAD (BLOQUEO F12 / INSPECCIONAR)
    document.addEventListener('keydown', function(e) {
      if(e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J'))) {
        e.preventDefault();
      }
      if(e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'p' || e.key === 'c')) {
        e.preventDefault();
      }
    });

    // Menú móvil (reutilizando tu lógica)
    const sidebar = document.getElementById('sidebar');
    document.getElementById('menuToggle').addEventListener('click', () => sidebar.classList.add('is-open'));