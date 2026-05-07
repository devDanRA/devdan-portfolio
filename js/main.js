// ===== MAPA =====
function initMapa() {
    // Coordenadas por defecto (MasterD Madrid)
    const masterD = { lat: 40.44151075229779, lng: -3.697385022740063 };

    const mapa = new google.maps.Map(document.getElementById("mapa"), {
        zoom: 15,
        center: masterD,
        styles: [
            { elementType: "geometry", stylers: [{ color: "#0A0A0A" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#FF6B9D" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#0A0A0A" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#1A1A1A" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] }
        ]
    });

    const marker = new google.maps.Marker({
        position: masterD,
        map: mapa
    });

    // Intentar geolocalización
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                mapa.setCenter(userPos);
                new google.maps.Marker({
                    position: userPos,
                    map: mapa
                });
            },
            () => {
                // Si rechaza permisos muestra MasterD
                mapa.setCenter(masterD);
            }
        );
    }
}
// ===== VALIDACIÓN FORMULARIO =====
const formulario = document.getElementById('formulario-contacto');

if (formulario) {
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        let valido = true;

        // Nombre: solo letras y espacios, 3-40 caracteres
        const nombre = document.getElementById('nombre').value.trim();
        const errorNombre = document.getElementById('error-nombre');
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,40}$/.test(nombre)) {
            errorNombre.textContent = 'El nombre debe tener entre 3 y 40 letras.';
            valido = false;
        } else {
            errorNombre.textContent = '';
        }

        // Apellidos: solo letras y espacios, 4-60 caracteres
        const apellidos = document.getElementById('apellidos').value.trim();
        const errorApellidos = document.getElementById('error-apellidos');
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{4,60}$/.test(apellidos)) {
            errorApellidos.textContent = 'Los apellidos deben tener entre 4 y 60 letras.';
            valido = false;
        } else {
            errorApellidos.textContent = '';
        }

        // Email
        const email = document.getElementById('email').value.trim();
        const errorEmail = document.getElementById('error-email');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorEmail.textContent = 'Introduce un email válido.';
            valido = false;
        } else {
            errorEmail.textContent = '';
        }

        // Teléfono: exactamente 9 números
        const telefono = document.getElementById('telefono').value.trim();
        const errorTelefono = document.getElementById('error-telefono');
        if (!/^\d{9}$/.test(telefono)) {
            errorTelefono.textContent = 'El teléfono debe tener exactamente 9 números.';
            valido = false;
        } else {
            errorTelefono.textContent = '';
        }

        if (valido) {
            alert('¡Mensaje enviado correctamente!');
            formulario.reset();
        }
    });
}
