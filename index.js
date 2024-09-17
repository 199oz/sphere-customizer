var $fgKEp$three = require("three");
var $fgKEp$threeexamplesjsmcontrolsOrbitControlsjs = require("three/examples/jsm/controls/OrbitControls.js");
var $fgKEp$datgui = require("dat.gui");




function $650934f729b0bf11$var$init() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    const scene = new $fgKEp$three.Scene();
    // create a camera, which defines where we're looking at
    const camera = new $fgKEp$three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    // tell the camera where to look
    camera.position.set(0, 0, 10);
    // create a render and set the size
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    const renderer = new $fgKEp$three.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    // add the output of the render function to the HTML
    document.body.appendChild(renderer.domElement);
    // function for re-rendering/animating the scene
    let IcosahedronGeometry = new $fgKEp$three.IcosahedronGeometry(3, 2);
    const icosahedronMaterial = new $fgKEp$three.MeshStandardMaterial({
        color: "yellow",
        flatShading: true
    });
    const icosahedronGlowMaterial = new $fgKEp$three.MeshStandardMaterial({
        color: "black",
        wireframe: true
    });
    let icosahedronMesh = new $fgKEp$three.Mesh(IcosahedronGeometry, icosahedronMaterial);
    const glowMesh = new $fgKEp$three.Mesh(IcosahedronGeometry, icosahedronGlowMaterial);
    glowMesh.scale.addScalar(0.0003);
    icosahedronMesh.add(glowMesh);
    scene.add(icosahedronMesh);
    const Light = new $fgKEp$three.HemisphereLight(0xffffff, 0x444444, 2);
    Light.position.set(0, 200, 0);
    scene.add(Light);
    const gui = new $fgKEp$datgui.GUI();
    const options = {
        radius: 3,
        detail: 2,
        skyColor: Light.color.getHex(),
        groundColor: Light.groundColor.getHex()
    };
    gui.add(options, "radius", 1, 10).name("Radius").onChange(updateGeometry);
    gui.add(options, "detail", 0, 10).name("Details").step(1).onChange(updateGeometry);
    gui.addColor(options, "skyColor").onChange((value)=>{
        Light.color.setHex(value);
    });
    gui.addColor(options, "groundColor").onChange((value)=>{
        Light.groundColor.setHex(value);
    });
    function updateGeometry() {
        scene.remove(icosahedronMesh);
        // Create a new geometry with updated parameters
        icosahedronGeometry = new $fgKEp$three.IcosahedronGeometry(options.radius, options.detail);
        // Create a new mesh and add it to the scene
        icosahedronMesh = new $fgKEp$three.Mesh(icosahedronGeometry, icosahedronMaterial);
        glowMesh.scale.addScalar(0.03);
        // Re-add the glowMesh to the icosahedronMesh
        icosahedronMesh.add(glowMesh);
        scene.add(icosahedronMesh);
    }
    const controls = new (0, $fgKEp$threeexamplesjsmcontrolsOrbitControlsjs.OrbitControls)(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    function tick() {
        controls.update();
        requestAnimationFrame(tick);
        renderer.render(scene, camera);
    }
    window.addEventListener("resize", onResize, false);
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    tick();
}
$650934f729b0bf11$var$init();


//# sourceMappingURL=index.js.map
