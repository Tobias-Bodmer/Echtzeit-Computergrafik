/* ======== Erzeugung eines WebGL Kontext ======== */

const canvas = document.getElementById('my_canvas');
const gl = canvas.getContext('webgl2');

gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);

if (!gl) {
    console.log('WebGL nicht verfügbar!');
} else {
    console.log('WebGL verfügbar!');
}


/* ==== Definition und Speicherung von Geometrie ==== */

/* ==== Definition von Front-Face Vertices ==== */

const rechteck_01 = [

    -0.25, -0.25, -0.25,
    0.25, -0.25, -0.25,
    0.25, 0.25, -0.25,

    -0.25, -0.25, -0.25,
    -0.25, 0.25, -0.25,
    0.25, 0.25, -0.25
];

/* ==== Definition von Cube Vertices ==== */

const wuerfel = new Float32Array([
    // FRONT
    /* pos = */ -1, -1, 1, /* color = */ 1, 0, 0,
    /* pos = */ 1, -1, 1, /* color = */ 1, 0, 0,
    /* pos = */ 1, 1, 1, /* color = */ 1, 0, 0,
    /* pos = */ -1, -1, 1, /* color = */ 1, 0, 0,
    /* pos = */ 1, 1, 1, /* color = */ 1, 0, 0,
    /* pos = */ -1, 1, 1, /* color = */ 1, 0, 0,

    // RECHTS
    /* pos = */ 1, -1, -1, /* color = */ 0, 1, 0,
    /* pos = */ 1, 1, -1, /* color = */ 0, 1, 0,
    /* pos = */ 1, 1, 1, /* color = */ 0, 1, 0,
    /* pos = */ 1, -1, -1, /* color = */ 0, 1, 0,
    /* pos = */ 1, 1, 1, /* color = */ 0, 1, 0,
    /* pos = */ 1, -1, 1, /* color = */ 0, 1, 0,

    // RÜCKSEITE
    /* pos = */ 1, -1, -1, /* color = */ 0, 0, 1,
    /* pos = */ -1, -1, -1, /* color = */ 0, 0, 1,
    /* pos = */ -1, 1, -1, /* color = */ 0, 0, 1,
    /* pos = */ 1, -1, -1, /* color = */ 0, 0, 1,
    /* pos = */ -1, 1, -1, /* color = */ 0, 0, 1,
    /* pos = */ 1, 1, -1, /* color = */ 0, 0, 1,

    // LINKS
    /* pos = */ -1, -1, -1, /* color = */ 1, 1, 0,
    /* pos = */ -1, -1, 1, /* color = */ 1, 1, 0,
    /* pos = */ -1, 1, 1, /* color = */ 1, 1, 0,
    /* pos = */ -1, -1, -1, /* color = */ 1, 1, 0,
    /* pos = */ -1, 1, 1, /* color = */ 1, 1, 0,
    /* pos = */ -1, 1, -1, /* color = */ 1, 1, 0,

    // OBEN
    /* pos = */ 1, 1, -1, /* color = */ 1, 0, 1,
    /* pos = */ -1, 1, -1, /* color = */ 1, 0, 1,
    /* pos = */ -1, 1, 1, /* color = */ 1, 0, 1,
    /* pos = */ 1, 1, -1, /* color = */ 1, 0, 1,
    /* pos = */ -1, 1, 1, /* color = */ 1, 0, 1,
    /* pos = */ 1, 1, 1, /* color = */ 1, 0, 1,

    // UNTEN
    /* pos = */ -1, -1, -1, /* color = */ 0, 1, 1,
    /* pos = */ 1, -1, -1, /* color = */ 0, 1, 1,
    /* pos = */ 1, -1, 1, /* color = */ 0, 1, 1,
    /* pos = */ -1, -1, -1, /* color = */ 0, 1, 1,
    /* pos = */ 1, -1, 1, /* color = */ 0, 1, 1,
    /* pos = */ -1, -1, 1, /* color = */ 0, 1, 1,
]);

/* ==== Definition von Front-Face Puffern ==== */

const vertex_buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, wuerfel, gl.STATIC_DRAW);

/* ======== Shader ======== */

/* ==== Definition der Shader-Quelle ==== */

const vertex_source = `

    attribute vec4 wuerfel_position;
    attribute vec3 wuerfel_eingabefarbwerte;
    varying vec4 wuerfel_farbwerte;
    uniform mat4 transformation;
    uniform mat4 projektion;

    void main(){

        gl_Position = projektion * transformation * wuerfel_position;
        wuerfel_farbwerte = vec4(wuerfel_eingabefarbwerte, 1);

    }
`;

const fragment_source = `

    precision lowp float;
    varying vec4 wuerfel_farbwerte;

    void main() {

        gl_FragColor = wuerfel_farbwerte;

    }
`;

/* ==== Erzeugung Shader ==== */

const vertex_shader = gl.createShader(gl.VERTEX_SHADER);
const fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex_shader, vertex_source);
gl.shaderSource(fragment_shader, fragment_source);

/* ==== Shader Kompilierung ==== */

gl.compileShader(vertex_shader);
gl.compileShader(fragment_shader);

if (!gl.getShaderParameter(vertex_shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(vertex_shader));
    throw new Error(Error("Fehler beim Kompilieren des Vertex Shader"));
}

if (!gl.getShaderParameter(fragment_shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(fragment_shader));
    throw new Error(Error('Fehler beim Kompilieren des Fragment Shader'));
}

/* ==== Erzeugung des Shader-Programms ==== */

const shader_program = gl.createProgram();

gl.attachShader(shader_program, vertex_shader);
gl.attachShader(shader_program, fragment_shader);

/* ==== Linking des Shader-Programms ==== */

gl.linkProgram(shader_program);

if (!gl.getProgramParameter(shader_program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(shader_program));
    throw new Error(Error("Fehler beim Linken des Shader Programms"));
}

gl.useProgram(shader_program);

/* ==== Verknüpfung der Attribute mit dem Vertex Shader ==== */

const positions_attribut = gl.getAttribLocation(shader_program, 'wuerfel_position');
gl.vertexAttribPointer(positions_attribut, 3, gl.FLOAT, false, 24, 0);
gl.enableVertexAttribArray(positions_attribut);

const farb_attribut = gl.getAttribLocation(shader_program, 'wuerfel_eingabefarbwerte');
gl.vertexAttribPointer(farb_attribut, 3, gl.FLOAT, false, 24, 12);
gl.enableVertexAttribArray(farb_attribut);

/* ==== Definition einer perspektivischen Projektionsmatrix ==== */

const f = 100;
const n = 0.1;
const t = n * Math.tan(Math.PI / 8);
const b = -t;
const r = t * gl.canvas.clientWidth / gl.canvas.clientHeight;
const l = -r;

const projektion = new Float32Array([
    2 * n / (r - l), 0, 0, 0,
    0, 2 * n / (t - b), 0, 0,
    (r + l) / (r - l), (t + b) / (t - b), -(f + n) / (f - n), -1,
    0, 0, -2 * f * n / (f - n), 0,
]);

const uniform_projection = gl.getUniformLocation(shader_program, "projektion");
gl.uniformMatrix4fv(uniform_projection, false, projektion);

/* ======== Rendering ======== */
/* ==== Zeichnung der Punkte auf den Bildschirm ==== */

gl.clearColor(1, 1, 1, 1);

const uniform_transformation = gl.getUniformLocation(shader_program, "transformation");

requestAnimationFrame(t => loop(gl, t));

function loop(gl, t) {

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    /* == Transformationsmatrix == */

    const a = t * Math.PI / 4000;
    const c = Math.cos(a);
    const s = Math.sin(a);
    const x = 2;
    const tz = -9;

    const transformation = new Float32Array([
        c * x, s * s * x, -c * s * x, 0,
        0, c * x, s * x, 0,
        s * x, -c * s * x, c * c * x, 0,
        0, 0, tz, 1,
    ]);

    gl.uniformMatrix4fv(uniform_transformation, false, transformation);
    
    /* == - == */
    
    const mode = gl.TRIANGLES;
    const first = 0;
    const count = (3 * 2 * 6);
    
    gl.drawArrays(mode, first, count);
    
    requestAnimationFrame(t => loop(gl, t));
}


const mode = gl.TRIANGLES;
const first = 0;
const count = (3 * 2 * 6);

gl.drawArrays(mode, first, count);