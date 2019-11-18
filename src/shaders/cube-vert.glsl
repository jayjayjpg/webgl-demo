#pragma glslify: import("./textureVaryings.glsl")

void main() {
    // Calculate the varyings
    v_uv = uv;

    // Vertex shader output
    gl_Position = vec4(position, 1.0);
}
