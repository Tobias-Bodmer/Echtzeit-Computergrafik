/* ======== Erzeugung eines WebGL Kontext ======== */
var canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

const gl = canvas.getContext('webgl2');

gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);

if (!gl) {
    console.log('WebGL nicht verfügbar!');
} else {
    console.log('WebGL verfügbar!');
}

/* ==== Definition und Speicherung von Geometrie ==== */
/* ==== Definition von Vertices ==== */

// Würfeloptimierung
// v6----- v5
// /|       /|
// v1------v0|
// | |     | |
// | |v7---|-|v4
// |/      |/
// v2------v3

var w_vertices = [
    1, 1, 1, 1, 1, 1,
    -1, 1, 1, 1, 0, 0,
    -1, -1, 1, 0, 1, 0,
    1, -1, 1, 0, 0, 1,
    1, -1, -1, 0, 1, 1,
    1, 1, -1, 1, 1, 0,
    -1, 1, -1, 1, 0, 1,
    -1, -1, -1, 0, 0, 0
];

/* ==== Definition des Element Puffers ==== */
const vertex_buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(w_vertices), gl.STATIC_DRAW);

var w_indices = [
    0, 1, 2, 0, 2, 3, // Front
    0, 3, 4, 0, 4, 5, // Rechts
    0, 5, 6, 0, 6, 1, // Oben
    1, 6, 7, 1, 7, 2, // Links
    7, 4, 3, 7, 3, 2, // Unten
    4, 7, 6, 4, 6, 5 // Hinten
];

/* ==== Definition des Element Puffers ==== */
const indexBuffer = gl.createBuffer();

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(w_indices), gl.STATIC_DRAW);

/* ======== Shader ======== */
/* ==== Definition der Shader-Quelle ==== */
const vertex_source = `

attribute vec4 wuerfel_position;
attribute vec3 wuerfel_eingabefarbwerte;
varying vec4 wuerfel_farbwerte;
uniform mat4 model_view_matrix;
uniform mat4 projection_matrix;

void main(){

    gl_Position = projection_matrix * model_view_matrix * wuerfel_position;
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
/* ==== glMatrix-Objekt Dekonstruktion ==== */
const { mat2, mat3, mat4, vec2, vec3, vec4 } = glMatrix;

/* ==== Definition einer perspektivischen Projektionsmatrix ====*/
const field_of_View = 45 * Math.PI / 180;
const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
const z_near = 0.1;
const z_far = 100.0;
const projection_mat = mat4.create();

mat4.perspective(projection_mat, field_of_View, aspect, z_near, z_far);
const projectUniform = gl.getUniformLocation(shader_program, "projection_matrix");

gl.uniformMatrix4fv(projectUniform, false, projection_mat);

/* ==== Definition einer Transformationsmatrix ==== */
const view = mat4.create();
var translation = vec3.create();

vec3.set(translation, 0, 0, -6.0);
mat4.translate(view, view, translation);

const viewUniform = gl.getUniformLocation(shader_program, "model_view_matrix");


/* ======== Rendering ======== */
/* ==== Zeichnung der Punkte auf den Bildschirm ==== */
gl.clearColor(1, 1, 1, 1);

requestAnimationFrame(t => loop(gl, t));

let then = 0;

function loop(gl, t) {

    t *= 0.001;
    let deltaTime = t-then;
    then = t;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    /* == Transformationsmatrix == */
    var rotation =+ deltaTime;
    
    mat4.rotate(view, view, rotation, [0.5, 0, 1]);
    
    gl.uniformMatrix4fv(viewUniform, false, view); 

    /* == - == */
    const mode = gl.TRIANGLES;
    const first = 0;
    const count = w_indices.length;
    const offset = 0;
    var indexType = gl.UNSIGNED_SHORT;

    gl.drawElements(mode, count, indexType, offset);

    requestAnimationFrame(t => loop(gl, t));
}