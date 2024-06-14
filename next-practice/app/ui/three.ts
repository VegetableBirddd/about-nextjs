import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function initThree(dom: any) {
    //获取 屏幕宽高
    let w = window.innerWidth -1;
    let h = window.innerHeight -1;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.01, 1000);
    camera.position.set(0, 0, 1.5);
    camera.lookAt(new THREE.Vector3());

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    renderer.setClearColor(0xe6fcf5, 1);

    dom.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    //定点着色器
    const vertex = /* GLSL */ `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            
            // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    //片元着色器
    const fragment = /* GLSL */ `
        varying vec2 vUv;

        void main() {
            // 红色
            // gl_FragColor = vec4(vUv, 0.0, 1.0);
            vec3 color = vec3(step(0.5, fract(vUv.x * 3.0)));
            gl_FragColor = vec4(color, 1.0);
        }
    `;

    // Mesh = Geometry + Material 网格 = 几何体 + 材质
    const geometry = new THREE.PlaneGeometry(1, 1);

    // const material = new THREE.MeshBasicMaterial({
    //     color: 0x0ca678,
    //     // wireframe: true
    // });

    const material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        // wireframe: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // let time = 0;
    let clock = new THREE.Clock();
    function render() {
        // time += 0.05;
        // material.uniforms.uTime.value += time;
        let time = clock.getElapsedTime();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    render();

    function resize() {
        w = window.innerWidth-1;
        h = window.innerHeight-1;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", resize);
}
