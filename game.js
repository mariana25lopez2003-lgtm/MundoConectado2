// ==========================================
// 🌎 MUNDO CONECTADO
// Primer prototipo 3D
// ==========================================

import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";


// ------------------------------------------
// ESCENA
// ------------------------------------------

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);


// ------------------------------------------
// CÁMARA
// ------------------------------------------

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 3, 8);


// ------------------------------------------
// RENDERIZADOR
// ------------------------------------------

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.shadowMap.enabled = true;

document
    .getElementById("juego")
    .appendChild(renderer.domElement);


// ------------------------------------------
// LUCES
// ------------------------------------------

const luz = new THREE.DirectionalLight(
    0xffffff,
    2
);

luz.position.set(10, 20, 10);

luz.castShadow = true;

scene.add(luz);


const luzSuave =
    new THREE.AmbientLight(
        0xffffff,
        0.6
    );

scene.add(luzSuave);


// ------------------------------------------
// MATERIALES
// ------------------------------------------

const pasto = new THREE.MeshLambertMaterial({
    color: 0x4caf50
});

const tierra = new THREE.MeshLambertMaterial({
    color: 0x8b5a2b
});

const piedra = new THREE.MeshLambertMaterial({
    color: 0x777777
});

const madera = new THREE.MeshLambertMaterial({
    color: 0x8b4513
});

const hojas = new THREE.MeshLambertMaterial({
    color: 0x228b22
});


// ------------------------------------------
// BLOQUE
// ------------------------------------------

const bloque =
    new THREE.BoxGeometry(
        1,
        1,
        1
    );


// ------------------------------------------
// CREAR BLOQUE
// ------------------------------------------

function crearBloque(
    x,
    y,
    z,
    material
) {

    const cubo =
        new THREE.Mesh(
            bloque,
            material
        );

    cubo.position.set(
        x,
        y,
        z
    );

    cubo.castShadow = true;

    cubo.receiveShadow = true;

    scene.add(cubo);

    return cubo;
}


// ------------------------------------------
// CREAR TERRENO
// ------------------------------------------

for (
    let x = -15;
    x <= 15;
    x++
) {

    for (
        let z = -15;
        z <= 15;
        z++
    ) {

        crearBloque(
            x,
            0,
            z,
            pasto
        );

        crearBloque(
            x,
            -1,
            z,
            tierra
        );

    }

}


// ------------------------------------------
// CREAR ÁRBOL
// ------------------------------------------

function crearArbol(x, z) {

    // Tronco

    for (
        let y = 1;
        y <= 3;
        y++
    ) {

        crearBloque(
            x,
            y,
            z,
            madera
        );

    }


    // Hojas

    for (
        let dx = -1;
        dx <= 1;
        dx++
    ) {

        for (
            let dz = -1;
            dz <= 1;
            dz++
        ) {

            crearBloque(
                x + dx,
                4,
                z + dz,
                hojas
            );

        }

    }

}


// ------------------------------------------
// ÁRBOLES
// ------------------------------------------

crearArbol(-6, -5);
crearArbol(6, -4);
crearArbol(-8, 5);
crearArbol(8, 6);
crearArbol(3, -8);


// ------------------------------------------
// PIEDRAS
// ------------------------------------------

crearBloque(
    -3,
    1,
    -3,
    piedra
);

crearBloque(
    4,
    1,
    2,
    piedra
);

crearBloque(
    7,
    1,
    -7,
    piedra
);


// ------------------------------------------
// JUGADOR
// ------------------------------------------

const jugadorMaterial =
    new THREE.MeshLambertMaterial({
        color: 0xff69b4
    });

const jugadorGeometria =
    new THREE.BoxGeometry(
        0.7,
        1.8,
        0.7
    );

const jugador =
    new THREE.Mesh(
        jugadorGeometria,
        jugadorMaterial
    );

jugador.position.set(
    0,
    1.9,
    5
);

jugador.castShadow = true;

scene.add(jugador);


// ------------------------------------------
// CONTROLES
// ------------------------------------------

const teclas = {};

window.addEventListener(
    "keydown",
    function(event) {

        teclas[
            event.key.toLowerCase()
        ] = true;

    }
);


window.addEventListener(
    "keyup",
    function(event) {

        teclas[
            event.key.toLowerCase()
        ] = false;

    }
);


// ------------------------------------------
// MOVIMIENTO
// ------------------------------------------

function moverJugador() {

    const velocidad = 0.08;


    if (teclas["w"]) {

        jugador.position.z -= velocidad;

    }


    if (teclas["s"]) {

        jugador.position.z += velocidad;

    }


    if (teclas["a"]) {

        jugador.position.x -= velocidad;

    }


    if (teclas["d"]) {

        jugador.position.x += velocidad;

    }


    // La cámara sigue al jugador

    camera.position.x =
        jugador.position.x;

    camera.position.y =
        jugador.position.y + 3;

    camera.position.z =
        jugador.position.z + 7;


    camera.lookAt(
        jugador.position
    );

}


// ------------------------------------------
// CAMBIO DE TAMAÑO
// ------------------------------------------

window.addEventListener(
    "resize",
    function() {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);


// ------------------------------------------
// ANIMACIÓN
// ------------------------------------------

function animar() {

    requestAnimationFrame(
        animar
    );

    moverJugador();

    renderer.render(
        scene,
        camera
    );

}

animar();