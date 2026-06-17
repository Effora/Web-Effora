// 1. FUNCIONALIDAD DEL MENÚ MÓVIL
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('closeBtn');

    menuToggle.addEventListener('click', () => {
      sidebar.classList.add('is-open');
    });

    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
    });

    // 2. SEGURIDAD: Bloqueo avanzado de teclado
    document.addEventListener('keydown', function(e) {
      // Bloquear F12 (Herramientas de desarrollo)
      if(e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      
      // Bloquear atajos con Ctrl
      if(e.ctrlKey || e.metaKey) { // metaKey es para Mac (Cmd)
        // Ctrl+Shift+I o J (Consola / Inspector)
        if(e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) {
          e.preventDefault();
          return false;
        }
        // Ctrl+U (Ver código fuente)
        // Ctrl+S (Guardar página)
        // Ctrl+P (Imprimir)
        // Ctrl+C (Copiar)
        if(e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P' || e.key === 'c' || e.key === 'C') {
          e.preventDefault();
          return false;
        }
      }
    });

    // 3. SEGURIDAD: Evitar que abran la consola con clic derecho e Inspeccionar
    // (Ya cubierto en el HTML con oncontextmenu="return false;", pero lo reforzamos)
    document.addEventListener('contextmenu', event => event.preventDefault());