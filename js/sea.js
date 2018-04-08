Sea = function () {
    /**
     * @function CylinderGeometry - геометрие цилиндра
     * @param cylinder_radiusTop - верхний радиус
     * @param cylinder_radiusBottom - нижний радиус
     * @param cylinder_height - высота
     * @param cylinder_radiusSegments - количество сегментов по окружности
     * @param cylinder_heightSegments - количество сегментов по вертикали
     * @param cylinder_thetaStart - начальный угол первого сегмента
     * @param cylinder_thetaLength - центральный угол
     * @method appleMatrix - поворот объекта
     * @param MeshPhongMaterial - материал объекта
     * @method .mesh - меш - совокупность созданных ранее геометрии и материалов
     * @method .receiveShadow - разрешение отбрасывать тени
     * @method .mergeVertices() - слияние вершин (обеспечение непрерывности волн)
     */
    var seaCylinder = {
        radiusTop: 600,
        radiusBottom: 600,
        height: 800,
        radiusSegments: 40,
        heightSegments: 10,
        angel: Math.PI / 2,
        tipTop: 15,
        waveHeight: 5,
        waveChangeVelocity: 0.016,
        waveTravelSpeed: 0.032,
    };
    var geom = new THREE.CylinderGeometry(seaCylinder.radiusTop,
        seaCylinder.radiusBottom,
        seaCylinder.height,
        seaCylinder.radiusSegments,
        seaCylinder.heightSegments);
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-seaCylinder.angel));
    geom.mergeVertices();
    // Получение вершин
    var lengthWaves = geom.vertices.length;
    // Создание массива для хранения новых данных, связанных с каждой вершиной
    this.waves = [];
    for (var i = 0; i < lengthWaves; i++) {
        // Получение каждой вершины
        var verticesWaves = geom.vertices[i];
        // Сохраннение данных, связанных с нею
        this.waves.push({
            y: verticesWaves.y,
            x: verticesWaves.x,
            z: verticesWaves.z,
            randomAngel: Math.random() * seaCylinder.angel,
            randomDistance: seaCylinder.waveHeight + Math.random() * seaCylinder.tipTop,
            randomSpeed: seaCylinder.waveChangeVelocity + Math.random() * seaCylinder.waveTravelSpeed,
        });
    };
    // Безтекстурный объект
    var mat = new THREE.MeshPhongMaterial({
        color: Colors.blue,
        transparent: true,
        opacity: 0.8,
        shading: THREE.FlatShading,
    });
    // Текстурный объект
    /* var texture = new THREE.TextureLoader().load('img/sea.jpg');
    var mat = new THREE.MeshBasicMaterial({
        color: Colors.blue,
        transparent: true,
        opacity: 0.8,
        shading: THREE.FlatShading,
        map: texture,
        overdraw: true
    }); */
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
}
/**
 * @description Чтобы создать волны, будем вращать каждую отдельную вершину цилиндра вокруг их изначальных позиций
 * со случайной скоростью и дистанцией (радиусом вращения).
 */

Sea.prototype.moveWaves = function () {
    // получить вершины
    var verts = this.mesh.geometry.vertices;
    for (var i = 0; i < verts.length; i++) {
        var geometryWaves = verts[i];
        // получить данные, связанные с ними
        var dataWaves = this.waves[i];
        // обновить положение вершины
        geometryWaves.x = dataWaves.x + Math.cos(dataWaves.randomAngel) * dataWaves.randomDistance;
        geometryWaves.y = dataWaves.y + Math.sin(dataWaves.randomAngel) * dataWaves.randomDistance;
        // увеличение угла для следующего кадра
        dataWaves.randomAngel += dataWaves.randomSpeed;

    }
    // Сообщение визуализатору, что геометрия моря изменилась.
    // Чтобы поддерживать оптимальный уровень производительности,
    // three.js кэширует геометрию и игнорирует любые изменения, если не добавить эту строку
    this.mesh.geometry.verticesNeedUpdate = true;

    sea.mesh.rotation.z += 0.004;
}