const canvas = document.getElementById('my_canvas');
const gl = canvas.getContext('webgl2');

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

/* ==== Definition von Front-Face Puffern ==== */

const rechteck_puffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, rechteck_puffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rechteck_01), gl.STATIC_DRAW);

/* ======== Shader ======== */

/* ==== Definition der Shader-Quelle ==== */

const vertex_source = `

    attribute vec4 rechteck_position;

    void main(){

        gl_Position = rechteck_position;

    }

`;

const fragment_source = `
    
    void main() {
       
        gl_FragColor = vec4(1,0,0,1);
    
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

/* ==== Erzeugung des Shader-Programms ==== */

const shader_program = gl.createProgram();

gl.attachShader(shader_program, vertex_shader);
gl.attachShader(shader_program, fragment_shader);

/* ==== Linking des Shader-Programms ==== */

gl.linkProgram(shader_program);
gl.useProgram(shader_program);

/* ==== Verknüpfung der Attribute mit dem Vertex Shader ==== */

const position_attribut = gl.getAttribLocation(shader_program, "rechteck_position");

gl.bindBuffer(gl.ARRAY_BUFFER, rechteck_puffer);
gl.vertexAttribPointer(position_attribut, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(position_attribut);

/* ======== Rendering ======== */
/* ==== Zeichnung der Punkte auf den Bildschirm ==== */

gl.clearColor(1,1,1,1);
gl.clear(gl.COLOR_BUFFER_BIT);

const mode = gl.TRIANGLES;
const first = 0;
const count = 6;

gl.drawArrays(mode,first,count);