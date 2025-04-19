window.addEventListener('DOMContentLoaded', () => {
    // Ambil canvas dan buat engine
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // Warna latar belakang (biru gelap)
    scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.2);

    // Tambah kamera
    const camera = new BABYLON.ArcRotateCamera("Camera",
        Math.PI / 2, Math.PI / 2.5, 20,
        BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Cahaya utama (atas)
    const hemiLight = new BABYLON.HemisphericLight("hemiLight",
        new BABYLON.Vector3(0, 1, 0), scene);
    hemiLight.intensity = 0.5;

    // Cahaya directional untuk bayangan
    const dirLight = new BABYLON.DirectionalLight("dirLight",
        new BABYLON.Vector3(-1, -2, -1), scene);
    dirLight.position = new BABYLON.Vector3(10, 10, 10);

    // Generator bayangan
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, dirLight);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;

    // Tambah alas (ground)
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {
        width: 100,
        height: 100
    }, scene);
    ground.receiveShadows = true;

    // Load model .obj
    BABYLON.SceneLoader.Append(
        "model/",        // Folder model
        "bixler.obj",    // Nama file model
        scene,
        function () {
            console.log("✅ Model .obj berhasil dimuat!");

            // Tambahkan semua mesh model ke shadow caster
            scene.meshes.forEach(mesh => {
                if (mesh.name !== "ground") {
                    // Mengatur posisi mesh, misalnya menaikkannya 5 unit di sumbu Y
                mesh.position.y = 5;
                shadowGenerator.addShadowCaster(mesh);
                }
            });
        },
        null,
        function (scene, message) {
            console.error("❌ Gagal load model:", message);
        }
    );

    // Jalankan render loop
    engine.runRenderLoop(() => {
        scene.render();
    });

    // Resize otomatis
    window.addEventListener("resize", () => {
        engine.resize();
    });
});
