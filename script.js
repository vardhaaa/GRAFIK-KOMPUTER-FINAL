window.addEventListener('DOMContentLoaded', () => {
    // Ambil canvas dan buat engine
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    // Tambah kamera
    const camera = new BABYLON.ArcRotateCamera("Camera",
        Math.PI / 2, Math.PI / 2.5, 10,
        BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Tambah cahaya
    const light = new BABYLON.HemisphericLight("light",
        new BABYLON.Vector3(0, 1, 0), scene);

    // Load model .glb atau .gltf
    BABYLON.SceneLoader.Append(
        "model/",      // Folder
        "bixler.obj",   // File .glb (atau ganti dengan .gltf)
        scene,
        function () {
            console.log("✅ Model glTF berhasil dimuat!");
        },
        null,
        function (scene, message) {
            console.error("❌ Gagal load glTF:", message);
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
