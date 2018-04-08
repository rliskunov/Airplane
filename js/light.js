/**
 * @description Cвет
 */

var hemisphereLight, shadowLight, ambientLight;

function createLights() {
    /**
     * @function HemisphereLight - градиентный свет
     * @param hemisphere.skyColor - цвет неба
     * @param hemisphere.groundColor - цвет земли
     * @param hemisphere.instensity - интесивность света
     */
    var hemisphere = {
        skyColor: Colors.white_aluminum,
        groundColor: Colors.black,
        instensity: 0.9
    };
    hemisphereLight = new THREE.HemisphereLight(hemisphere.skyColor, hemisphere.groundColor, hemisphere.instensity);

    /**
     * @function ambientLight - окружающий свет
     * @param ambient.color
     * @param ambient.intensity
     * @description Этот свет освещает все объекты на сцене одинаково.
     * Его нельзя использовать для создания теней, поскольку у него нет направления.
     */
    var ambient = {
        color: Colors.darkSalmon,
        instensity: 0.5,
    };
    ambientLight = new THREE.AmbientLight(ambient.color, ambient.instensity);

    /** 
     * @function DirectionalLight - направленный свет светит в определенном направлении из точки, (как Cолнце).
     * Это значит что продуцируемые лучи параллельны
     * @param direction_light_color
     * @param direction_light_instensity
     * @param position.set - направление света
     * @param castShadow - разрешение отбрасывать тени
     * @param shadow.camera.left
     *      @param shadow.camera.right
     *      @param shadow.camera.top
     *      @param shadow.camera.bottom
     *      @param shadow.camera.near
     *      @param shadow.camera.far - определение видимой область тени
     *      @param shadow.mapSize.width
     *      @param shadow.mapSize.height - разрешение теней. Чем выше значение, тем ниже производительность
     */
    var direction_light = {
        position_x: 150,
        position_y: 350,
        position_z: 350,
        color: Colors.white,
        instensity: 0.9
    };
    shadowLight = new THREE.DirectionalLight(direction_light.color, direction_light.instensity);
    shadowLight.position.set(direction_light.position_x, direction_light.position_y, direction_light.position_z);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    scene.add(hemisphereLight);
    scene.add(shadowLight);
    scene.add(ambientLight);
}