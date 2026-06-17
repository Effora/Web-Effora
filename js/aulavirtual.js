const PERFILES = {
        "admin": { clave: "master99", rol: "admin" },
        "asesor": { clave: "effora2026", rol: "asesor" },
        "asistente": { clave: "asistente123", rol: "asistente" },
        "sol": { clave: "Sol1881", rol: "admin" },
    };
    function actualizarBarraProgreso() {
    // 1. Contamos todas las lecciones visibles para el rol del usuario
    const todasLasLecciones = document.querySelectorAll('.lesson');
    let leccionesVisibles = 0;
    
    todasLasLecciones.forEach(l => {
        // Solo contamos las que no están ocultas por el filtro de rol
        if (l.parentElement.style.display !== 'none') {
            leccionesVisibles++;
        }
    });

    // 2. Contamos cuántas están completadas
    const completadas = document.querySelectorAll('.lesson.completed').length;

    // 3. Calculamos el porcentaje
    const porcentaje = leccionesVisibles > 0 ? Math.round((completadas / leccionesVisibles) * 100) : 0;

    // 4. Actualizamos el diseño
    const barra = document.getElementById('progress-bar');
    const texto = document.getElementById('progress-percent');
    
    if (barra && texto) {
        barra.style.width = porcentaje + "%";
        texto.innerText = porcentaje + "%";
    }
}
    function intentarLogin(e) {
        e.preventDefault();
        const userIn = document.getElementById('usuario').value.trim();
        const passIn = document.getElementById('password').value.trim();
        const errorMsg = document.getElementById('error-login');

        if (PERFILES[userIn] && PERFILES[userIn].clave === passIn) {
            const rolAsignado = PERFILES[userIn].rol;
            
            // Guardamos todo en el navegador
            localStorage.setItem('effora_rol', rolAsignado);
            localStorage.setItem('effora_auth', 'true');
            localStorage.setItem('effora_user_name', userIn); 
            
            aplicarPermisos(rolAsignado);
            entrarAula(userIn);
        } else {
            errorMsg.style.display = "block";
            errorMsg.innerText = "Usuario o contraseña incorrectos";
        }
    }

    function aplicarPermisos(rol) {
        document.querySelectorAll('.module-group').forEach(grupo => {
            const req = grupo.getAttribute('data-role');
            grupo.style.display = (rol === 'admin' || req === 'todos' || req === rol) ? 'block' : 'none';
        });
    }
/*
    function entrarAula(nombre) {
        // Si no recibimos nombre (al refrescar), lo buscamos en localStorage
        const nombreFinal = nombre || localStorage.getItem('effora_user_name') || "Usuario";
        const nombreFormateado = nombreFinal.charAt(0).toUpperCase() + nombreFinal.slice(1);
        
        document.getElementById('user-greeting').innerText = `BIENVENIDO/A ${nombreFormateado}`;
        
        const overlay = document.getElementById('login-overlay');
        const aula = document.getElementById('aula-main');
        
        overlay.style.opacity = "0";
        setTimeout(() => {
            overlay.style.display = "none";
            aula.style.display = "flex";
            setTimeout(() => aula.classList.add('active'), 50);
            document.body.style.overflow = "auto";
            cargarProgreso(); // Marcamos las lecciones ya vistas
        }, 600);
    }
*/
function entrarAula(nombre) {
    const nombreFinal = nombre || localStorage.getItem('effora_user_name') || "Usuario";
    const nombreFormateado = nombreFinal.charAt(0).toUpperCase() + nombreFinal.slice(1);
    
    document.getElementById('user-greeting').innerText = `Panel de ${nombreFormateado}`;
    
    const overlay = document.getElementById('login-overlay');
    const aula = document.getElementById('aula-main');
    
    overlay.style.opacity = "0";
    setTimeout(() => {
        overlay.style.display = "none";
        aula.style.display = "flex";
        setTimeout(() => aula.classList.add('active'), 50);
        document.body.style.overflow = "auto";

        // --- LAS DOS LLAMADAS CLAVE AQUÍ ---
        cargarProgreso();         // 1. Pone los puntos dorados
        actualizarBarraProgreso(); // 2. Calcula la barra basándose en esos puntos
    }, 600);
}
    function cambiarClase(id, elemento) {
        document.querySelectorAll('.lesson-content').forEach(c => c.classList.remove('active-content'));
        document.querySelectorAll('.lesson').forEach(b => b.classList.remove('active'));

        const target = document.getElementById(id);
        if (target) {
            target.classList.add('active-content');
            elemento.classList.add('active');
            document.getElementById('current-clase-title').innerText = elemento.innerText;
            
            // Guardar progreso
            elemento.classList.add('completed');
            const completadas = JSON.parse(localStorage.getItem('progreso_effora') || '[]');
            if (!completadas.includes(id)) {
                completadas.push(id);
                localStorage.setItem('progreso_effora', JSON.stringify(completadas));
            }
        }
        elemento.classList.add('completed');
    const completadas = JSON.parse(localStorage.getItem('progreso_effora') || '[]');
    if (!completadas.includes(id)) {
        completadas.push(id);
        localStorage.setItem('progreso_effora', JSON.stringify(completadas));
    }

    // LLAMADA CLAVE:
    actualizarBarraProgreso();
    }

    function cargarProgreso() {
        const completadas = JSON.parse(localStorage.getItem('progreso_effora') || '[]');
        completadas.forEach(id => {
            // Buscamos el enlace que activa esa clase y le ponemos el check
            const link = document.querySelector(`[onclick*="'${id}'"]`);
            if (link) link.classList.add('completed');
        });
    }

    function cerrarSesion() {
        localStorage.clear();
        window.location.reload();
    }

    window.onload = () => {
        const auth = localStorage.getItem('effora_auth');
        const rol = localStorage.getItem('effora_rol');
        if (auth === 'true' && rol) {
            aplicarPermisos(rol);
            entrarAula(); // El nombre lo sacará del localStorage automáticamente
        }
    };

    document.addEventListener('keydown', function(e) {
        if(e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J'))) e.preventDefault();
    });