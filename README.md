<h1 align="center">Binary Image Shader</h1>
<strong>Binary Image</strong> is a digital image where each pixel can have only one of two possible values, typically represented as black and white, corresponding to the binary digits 0 and 1.But, we taking this concept to a step ahead that means instead of always using black and white Colors. I am going to use two different colors for creating it.

<br/>

# Step-1:

Firstly, I am not discussing any initial setup you can set your work environment. But, I am using React+vite for development.

But I tell to install this dependencies for React.

```bash
npm install three @react-three/fiber @react-three/drei
```

After installing add Canvas and some mesh to the scene. If you not familiar follow this [guide](https://github.com/Bharath-2101/3D-Printing-Shaders?tab=readme-ov-file#step-2).

<br/>

# Step-2:

After that create two files with below names and code in it.

### Fragment.js

```javascript
const Fragment = `
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(vUv.x,vUv.y,0.,1.);
}
`;

export { Fragment };
```

### Vertex.js

```javascript
const Vertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export { Vertex };
```

We will use above files for our shader material.

<br/>

# Step-3:

We are going to need three constraints.

<ol>
<li><strong>Highlight Color</strong> - For Light color places.</li>
<li><strong>Shadow Color </strong>- For Dark color Places.</li>
<li><strong>Bias</strong> - To set which is Light color and Dark color </li>
</ol>
So, If you want you can hardcode them in your code or get them through uniforms. I am giving first explaination in this if you want second you can see my repo.

Firstly,we take a image texture from the uniforms and make into grayscale usin this code.

```javascript
    vec4 texColor=texture2D(u_texture,vUv);
    const vec3 GREY_WEIGHTS = vec3(0.299, 0.587, 0.114);
    float greyscaleValue = dot(texColor.rgb, GREY_WEIGHTS);
    gl_FragColor = vec4(greyscaleValue);
```

After this we can able to see a greyscaled image on the plane.

now,we going to use the bias for differentating the dark and light color. Following code will do that with two colors

```javascript
float greyscaleValue = dot(texColor.rgb, GREY_WEIGHTS);
texColor.rgb = greyscaleValue > bias ? highlight : shadow;
```

Now, by applying whole code at one place we get a binary image.

```javascript
const Fragment = `
varying vec2 vUv;
uniform sampler2D u_texture;
const vec3 shadow=vec3(0.,1.,0.,1.);
const vec3 highlight=vec3(1.,1.,1.,1.);
const float bias=0.3;

void main() {
    vec4 texColor=texture2D(u_texture,vUv);
    const vec3 GREY_WEIGHTS = vec3(0.299, 0.587, 0.114);
    float greyscaleValue = dot(texColor.rgb, GREY_WEIGHTS);
    texColor.rgb = greyscaleValue > bias ? highlight : shadow;gl_FragColor = vec4(texColor);
}
`;

export { Fragment };
```

For now I make it simple for faster and adaptable explaination.

<br/>

<h1 align='center'>If i miss anything to explain notice to me I will try.</h1>
