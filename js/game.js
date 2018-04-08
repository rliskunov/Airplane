/**
 * @description переменные используемые для THREEJS
 */
var scene;
scene = new THREE.Scene();
var fieldOfView = 70,
    aspectRatio = WIDTH / HEIGHT,
    nearPlane = 1,
    farPlane = 10000,
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    ),
    renderer,
    container;

const AIRPLANE_POSITION_X = 0.25,
    AIRPLANE_POSITION_Y = 0.25,
    AIRPLANE_POSITION_Z = 0.25;

const PERSPECTIVE_CAMERA_POSITION_X = 0,
    PERSPECTIVE_CAMERA_POSITION_Y = 100,
    PERSPECTIVE_CAMERA_POSITION_Z = 200,

    PERSPECTIVE_CAMERA_ROTATION_X = 0,
    PERSPECTIVE_CAMERA_ROTATION_Y = 0,
    PERSPECTIVE_CAMERA_ROTATION_Z = 0,

    SECOND_PERSON_CAMERA_POSITION_X = 0,
    SECOND_PERSON_CAMERA_POSITION_Y = 100,
    SECOND_PERSON_CAMERA_POSITION_Z = 200,

    THIRD_PERSON_CAMERA_POSITION_X = -100,
    THIRD_PERSON_CAMERA_POSITION_Y = 200,
    THIRD_PERSON_CAMERA_POSITION_Z = 0,

    THIRD_PERSON_CAMERA_ROTATION_X = -Math.PI / 2,
    THIRD_PERSON_CAMERA_ROTATION_Y = -Math.PI / 3,
    THIRD_PERSON_CAMERA_ROTATION_Z = -Math.PI / 2;

/**
 * @description переменные используемые для экрана и событий мыши. Ширина и высота сцены используются для установки размера и пропорций камеры, а также для размера финального рендера
 */
var HEIGHT = window.innerHeight,
    WIDTH = window.innerWidth;

/**
 * @function createScene
 * @description инициализируем THREEJS, экран и событий мыши
 */
function createScene() {
    /**
     * @function .fog
     * @description добавление эффекта тумана
     */
    var fog = {
        color: Colors.yellow_peach,
        near: 50,
        far: 950,
    };
    scene.fog = new THREE.Fog(fog.color, fog.near, fog.far);
    camera.position.set(PERSPECTIVE_CAMERA_POSITION_X, PERSPECTIVE_CAMERA_POSITION_Y, PERSPECTIVE_CAMERA_POSITION_Z);

    renderer = new THREE.WebGLRenderer({
        /**
         * @param alpha
         * @description разрешение прозрачности для сцены, чтобы увидеть градиентное небо */
        alpha: true,
        /**
         * @param antialias
         * @description активизация сглаживания. Это может снизить производительность!
         */
        antialias: true
    });
    /**
     * @function .setSize
     * @description размер рендера
     */
    renderer.setSize(WIDTH, HEIGHT);
    /**
     * @function .shadowMap.enabled
     * @description рендер теней
     */
    renderer.shadowMap.enabled = true;
    /**
     * @function .getElementById
     * @description обращение к DOM - элементу с идентификатором world для рендера в него сцены
     */
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
    /**
     * @function addEventListener
     * @description Отслеживаем изменения размера экрана. В случае изменения запускаем функцию handleWindowResize(), чтобы обновить камеру и рендер.
     */
    window.addEventListener('resize', handleWindowResize, false);
}

/**
 * @function handleWindowResize - обработка событий экрана. Обновление высоты, ширины камеры и рендера
 */
function handleWindowResize() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

// 3D модели
var sea, airplane, sky;

function createPlane() {
    airplane = new AirPlane();
    airplane.mesh.scale.set(AIRPLANE_POSITION_X, AIRPLANE_POSITION_Y, AIRPLANE_POSITION_Z);
    airplane.mesh.position.y = 100;
    scene.add(airplane.mesh);
}

function createSea() {
    sea = new Sea();
    sea.mesh.position.y = -600;
    scene.add(sea.mesh);
}

function createSky() {
    sky = new Sky();
    sky.mesh.position.y = -600;
    scene.add(sky.mesh);
}

function loop() {
    updatePlane();
    moveCamera();
    updateGUI();
    sea.moveWaves();
    sky.mesh.rotation.z += 0.01;
    airplane.propeller.rotation.x += 0.03;
    airplane.pilot.updateHairs();
    /**
     * @description просчитывание рендера сцены
     */
    changeRender();

    requestAnimationFrame(loop);
}

function changeRender() {
    renderer.render(scene, camera);
}


function init(event) {
    createScene();
    createLights();
    createPlane();
    createSea();
    createSky();
    createGUI();
    loop();
}

window.addEventListener('load', init, false);

var updateGUI;

function createGUI() {
    var Settings = function () {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.cameraX = 0;
        this.cameraY = 0;
        this.cameraZ = 0;
        this.camera = 0;
    };
    var Settings = new Settings(),
        gui = new dat.GUI();
    gui.add(Settings, 'x', -300, 300).listen();
    gui.add(Settings, 'y', 0, 200).listen();
    gui.add(Settings, 'z', -200, 500).listen();
    gui.add(Settings, 'cameraX', -300, 300).listen();
    gui.add(Settings, 'cameraY', 0, 200).listen();
    gui.add(Settings, 'cameraZ', -500, 500).listen();
    updateGUI = function () {
        Settings.x = airplane.mesh.position.x;
        Settings.y = airplane.mesh.position.y;
        Settings.z = airplane.mesh.position.z;
        Settings.cameraX = camera.position.x;
        Settings.cameraY = camera.position.y;
        Settings.cameraZ = camera.position.z;
    }
}