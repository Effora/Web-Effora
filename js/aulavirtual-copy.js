const PERFILES = {
            "admin": { clave: "master99", rol: "admin", nombre: "Administrador" },
            "asesor": { clave: "effora2026", rol: "asesor", nombre: "Equipo Asesor" },
            "sol": { clave: "effora222", rol: "asesor", nombre: "Solchis" }
        };

        const CATALOGO = [
            { id: 'modulo1', titulo: 'Programa de Asesores', tag: 'Ventas Premium', rol: 'asesor' },
            { id: 'modulo2', titulo: 'Módulo 2', tag: 'Desarrollo Profesional', rol: 'asesor' },
            { id: 'modulo3', titulo: 'Módulo 3', tag: 'Estrategia de Mercado', rol: 'asesor' },
            { id: 'global', titulo: 'Administración Effora', tag: 'Gestión Integral', rol: 'admin' }

        ];

        function intentarLogin(e) {
            e.preventDefault();
            const u = document.getElementById('usuario').value.trim();
            const p = document.getElementById('password').value.trim();
            if (PERFILES[u] && PERFILES[u].clave === p) {
                localStorage.setItem('effora_rol', PERFILES[u].rol);
                localStorage.setItem('effora_auth', 'true');
                localStorage.setItem('effora_user_name', PERFILES[u].nombre); 
                entrarDashboard();
            } else { document.getElementById('error-login').style.display = "block"; }
        }

        function entrarDashboard() {
            const nombre = localStorage.getItem('effora_user_name');
            const rol = localStorage.getItem('effora_rol');
            
            // Actualizar Bienvenida y Badge
            document.getElementById('welcome-title').innerText = `¡Hola, ${nombre}! 👋`;
            document.getElementById('dash-user-name').innerText = nombre.toUpperCase();
            document.getElementById('user-greeting-top').innerText = `BIENVENIDO, ${nombre}`;

            document.getElementById('login-overlay').style.opacity = "0";
            setTimeout(() => {
                document.getElementById('login-overlay').style.display = "none";
                const dash = document.getElementById('dashboard-view');
                dash.style.display = "block";
                setTimeout(() => dash.style.opacity = "1", 50);
                renderizarCards(rol);
            }, 600);
        }

        function renderizarCards(rol) {
            const grid = document.getElementById('courses-grid');
            grid.innerHTML = '';
            const finalizados = JSON.parse(localStorage.getItem('cursos_finalizados') || '[]');

            CATALOGO.forEach(c => {
                if (rol === 'admin' || c.rol === rol) {
                    const estaTerminado = finalizados.includes(c.id);
                    const card = document.createElement('div');
                    card.className = `course-card ${estaTerminado ? 'is-finished' : ''}`;
                    card.onclick = () => abrirAula(rol, c.id);
                    card.innerHTML = `
                        <div>
                            <div class="tag">${c.tag}</div>
                            <h3>${c.titulo}</h3>
                            <p style="font-size:14px; color:var(--ink-soft); line-height:1.5;">
                                ${estaTerminado ? 'Capacitación completada con éxito. Puedes repasar los módulos.' : 'Formación estratégica diseñada para el equipo de alto rendimiento.'}
                            </p>
                        </div>
                        <div class="btn-enter-course">${estaTerminado ? 'REPASAR CONTENIDO' : 'CONTINUAR FORMACIÓN'}</div>
                    `;
                    grid.appendChild(card);
                }
            });
        }

        function abrirAula(rol, cursoId) {
            localStorage.setItem('current_course_id', cursoId);
            aplicarPermisos(rol);
            document.getElementById('dashboard-view').style.opacity = "0";
            setTimeout(() => {
                document.getElementById('dashboard-view').style.display = "none";
                const aula = document.getElementById('aula-main');
                aula.style.display = "flex";
                setTimeout(() => {
                    aula.classList.add('active');
                    cargarProgreso();
                    actualizarBarraProgreso();
                }, 50);
            }, 600);
        }

        function aplicarPermisos(rol) {
            document.querySelectorAll('.module-group').forEach(g => {
                const req = g.getAttribute('data-role');
                g.style.display = (rol === 'admin' || req === 'todos' || req === rol) ? 'block' : 'none';
            });
        }

        function cambiarClase(id, el) {
            document.querySelectorAll('.lesson-content').forEach(c => c.classList.remove('active-content'));
            document.querySelectorAll('.lesson').forEach(l => l.classList.remove('active'));
            document.getElementById(id).classList.add('active-content');
            el.classList.add('active');
            document.getElementById('current-clase-title').innerText = el.innerText;
        }

        function marcarComoVista(id, boton) {
            const linkSidebar = document.querySelector(`[onclick*="'${id}'"]`);
            if (linkSidebar) {
                linkSidebar.classList.add('completed');
                let comp = JSON.parse(localStorage.getItem('progreso_effora') || '[]');
                if (!comp.includes(id)) {
                    comp.push(id);
                    localStorage.setItem('progreso_effora', JSON.stringify(comp));
                }
                actualizarBarraProgreso();
                boton.innerHTML = "✓ Lección Completada";
                boton.classList.add('done');
                boton.onclick = null;
            }
        }

        function actualizarBarraProgreso() {
            const lessons = Array.from(document.querySelectorAll('.lesson')).filter(l => l.parentElement.style.display !== 'none');
            const comp = JSON.parse(localStorage.getItem('progreso_effora') || '[]');
            const done = lessons.filter(l => {
                const id = l.getAttribute('onclick').match(/'([^']+)'/)[1];
                return comp.includes(id);
            }).length;

            const perc = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0;
            
            document.getElementById('progress-bar').style.width = perc + "%";
            document.getElementById('progress-percent').innerText = perc + "%";

            const btnCert = document.getElementById('btn-certificar');
            const cursoId = localStorage.getItem('current_course_id');
            const finalizados = JSON.parse(localStorage.getItem('cursos_finalizados') || '[]');

            if (perc === 100) {
                btnCert.style.display = "block";
                if (finalizados.includes(cursoId)) {
                    btnCert.innerHTML = "✓ Capacitación Finalizada";
                    btnCert.className = "finalized";
                    btnCert.onclick = null;
                } else {
                    btnCert.innerHTML = "🏆 Finalizar Capacitación";
                    btnCert.className = "ready";
                    btnCert.onclick = finalizarTodo;
                }
            } else {
                btnCert.style.display = "none";
            }
        }

        function finalizarTodo() {
            const cursoId = localStorage.getItem('current_course_id');
            let finalizados = JSON.parse(localStorage.getItem('cursos_finalizados') || '[]');
            if (!finalizados.includes(cursoId)) {
                finalizados.push(cursoId);
                localStorage.setItem('cursos_finalizados', JSON.stringify(finalizados));
            }
            alert("¡Felicitaciones! Has completado el programa de formación EFFORA.");
            actualizarBarraProgreso();
        }

        function volverAlDashboard() {
            document.getElementById('aula-main').classList.remove('active');
            setTimeout(() => {
                document.getElementById('aula-main').style.display = "none";
                entrarDashboard();
            }, 600);
        }

        function cargarProgreso() {
            const comp = JSON.parse(localStorage.getItem('progreso_effora') || '[]');
            comp.forEach(id => {
                const link = document.querySelector(`[onclick*="'${id}'"]`);
                if (link) link.classList.add('completed');
                const contentDiv = document.getElementById(id);
                if (contentDiv) {
                    const btn = contentDiv.querySelector('.btn-finish');
                    if (btn) {
                        btn.innerHTML = "✓ Lección Completada";
                        btn.classList.add('done');
                        btn.onclick = null;
                    }
                }
            });
        }

        function cerrarSesion() { localStorage.clear(); window.location.reload(); }

        window.onload = () => {
            if (localStorage.getItem('effora_auth') === 'true') entrarDashboard();
        };

        // Bloqueos de seguridad
        document.addEventListener('keydown', e => {
            if(e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J'))) e.preventDefault();
        });