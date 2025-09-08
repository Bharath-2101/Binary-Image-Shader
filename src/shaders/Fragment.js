const Fragment = `
varying vec2 vUv;
uniform sampler2D u_texture;
uniform float u_time;
uniform float u_speed;
uniform vec3 shadow;
uniform vec3 highlight;
uniform float bias;

void main() {
    vec4 texColor=texture2D(u_texture,vUv);
    const vec3 GREY_WEIGHTS = vec3(0.299, 0.587, 0.114);
    float greyscaleValue = dot(texColor.rgb, GREY_WEIGHTS);
    	
    texColor.rgb = greyscaleValue > bias ? highlight : shadow;

    gl_FragColor = vec4(texColor);
}
    `;

export { Fragment };
