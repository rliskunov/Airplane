/**
 * @description Пилот
 */

Pilot = function () {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "pilot";

    /**
     * @param angleHairs - свойство, используемое для анимации волос
     */
    this.angleHairs = 0;

    /**
     * @description тело пилота
     */
    var bodyCube = {
        width: 15,
        height: 15,
        depth: 15,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        position_x: 2,
        position_y: -12,
        position_z: 0,
    }
    var bodyGeom = new THREE.BoxGeometry(bodyCube.width, bodyCube.height, bodyCube.depth, bodyCube.widthSegments, bodyCube.heightSegments, bodyCube.depthSegments);
    var bodyMat = new THREE.MeshPhongMaterial({
        color: Colors.brown,
        shading: THREE.FlatShading
    });
    var body = new THREE.Mesh(bodyGeom, bodyMat);
    body.position.set(bodyCube.position_x, bodyCube.position_y, bodyCube.position_z);
    this.mesh.add(body);

    /**
     * @description лицо пилота
     */
    var faceCube = {
        width: 10,
        height: 10,
        depth: 10,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
    }
    var faceGeom = new THREE.BoxGeometry(faceCube.width, faceCube.height, faceCube.depth, faceCube.widthSegments, faceCube.heightSegments, faceCube.depthSegments);
    var faceMat = new THREE.MeshLambertMaterial({
        color: Colors.pink
    });
    var face = new THREE.Mesh(faceGeom, faceMat);
    this.mesh.add(face);

    /**
     * @description волосы пилота
     */
    var hairCube = {
        width: 4,
        height: 4,
        depth: 4,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        lowPosition_x: 0,
        lowPosition_y: 2,
        lowPosition_z: 0,
        position_x: -5,
        position_y: 5,
        position_z: 0,
    }
    var hairGeom = new THREE.BoxGeometry(hairCube.width,
        hairCube.height,
        hairCube.depth,
        hairCube.widthSegments,
        hairCube.heightSegments,
        hairCube.depthSegments);
    var hairMat = new THREE.MeshLambertMaterial({
        color: Colors.brown
    });
    var hair = new THREE.Mesh(hairGeom, hairMat);
    // Присваивание формы волос к нижней границе, чтобы облегчить задачу с подбором размеров
    hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(hairCube.lowPosition_x,
        hairCube.lowPosition_y,
        hairCube.lowPosition_z));

    // Создание контейнера для волос
    var hairs = new THREE.Object3D();

    // Создание контейнера для волос в верхней части головы (те из них, которые будут анимированы)
    this.hairsTop = new THREE.Object3D();

    // Создание волос в верхней части головы и расположение их на сетке 3 х 4
    var coefficientAnimationHair = {
        volume: 12,
        column_X: 3,
        spaceColumn: 4,
        row_Y: 3,
        spaceRow: 4,
        startPosition_z: -4,
        startPosition_x: -4,
    }
    for (var i = 0; i < coefficientAnimationHair.volume; i++) {
        var animationHair = hair.clone();
        var col = i % coefficientAnimationHair.column_X;
        var row = Math.floor(i / coefficientAnimationHair.row_Y);
        animationHair.position.set(coefficientAnimationHair.startPosition_x + row * coefficientAnimationHair.spaceRow,
            0,
            coefficientAnimationHair.startPosition_z + col * coefficientAnimationHair.spaceColumn);
        this.hairsTop.add(animationHair);
    }
    hairs.add(this.hairsTop);

    // Создание волосы на лице (борода)
    var hairSideCube = {
        width: 12,
        height: 4,
        depth: 2,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        position_x: -6,
        position_y: 0,
        position_z: 0,
        leftPosition_x: 8,
        leftPosition_y: -2,
        leftPosition_z: -6,
        rightPosition_x: 8,
        rightPosition_y: -2,
        rightPosition_z: 6,
    }
    var hairSideGeom = new THREE.BoxGeometry(hairSideCube.width,
        hairSideCube.height,
        hairSideCube.depth,
        hairSideCube.widthSegments,
        hairSideCube.heightSegments,
        hairSideCube.depthSegments);
    hairSideGeom.applyMatrix(new THREE.Matrix4().makeTranslation(hairSideCube.position_x,
        hairSideCube.position_y,
        hairSideCube.position_z));
    var hairSideR = new THREE.Mesh(hairSideGeom, hairMat);
    var hairSideL = hairSideR.clone();
    hairSideR.position.set(hairSideCube.rightPosition_x,
        hairSideCube.rightPosition_y,
        hairSideCube.rightPosition_z);
    hairSideL.position.set(hairSideCube.leftPosition_x,
        hairSideCube.leftPosition_y,
        hairSideCube.leftPosition_z);
    hairs.add(hairSideR);
    hairs.add(hairSideL);

    // Создание волос на задней части головы
    var hairBackCube = {
        width: 2,
        height: 8,
        depth: 10,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        position_x: -1,
        position_y: -4,
        position_z: 0,
    }
    var hairBackGeom = new THREE.BoxGeometry(hairBackCube.width,
        hairBackCube.height,
        hairBackCube.depth,
        hairBackCube.widthSegments,
        hairBackCube.heightSegments,
        hairBackCube.depthSegments);
    var hairBack = new THREE.Mesh(hairBackGeom, hairMat);
    hairBack.position.set(hairBackCube.position_x,
        hairBackCube.position_y,
        hairBackCube.position_z)
    hairs.add(hairBack);
    hairs.position.set(hairCube.position_x,
        hairCube.position_y,
        hairCube.position_z);
    this.mesh.add(hairs);

    // Создание очков
    var glassCube = {
        width: 5,
        height: 5,
        depth: 5,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        position_x: 6,
        position_y: 0,
        position_z: 3,
    }
    var glassGeom = new THREE.BoxGeometry(glassCube.width,
        glassCube.height,
        glassCube.depth,
        glassCube.widthSegments,
        glassCube.heightSegments,
        glassCube.depthSegments);
    var glassMat = new THREE.MeshLambertMaterial({
        color: Colors.roseGold
    });
    var glassR = new THREE.Mesh(glassGeom, glassMat);
    glassR.position.set(glassCube.position_x,
        glassCube.position_y,
        glassCube.position_z);
    var glassL = glassR.clone();
    glassL.position.z = -glassR.position.z

    // Создание душек очков
    var pairGlassesCube = {
        width: 10,
        height: 2,
        depth: 10,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
    }
    var pairGlassesGeom = new THREE.BoxGeometry(pairGlassesCube.width,
        pairGlassesCube.height,
        pairGlassesCube.depth,
        pairGlassesCube.widthSegments,
        pairGlassesCube.heightSegments,
        pairGlassesCube.depthSegments);
    var pairGlasses = new THREE.Mesh(pairGlassesGeom, glassMat);
    this.mesh.add(glassR);
    this.mesh.add(glassL);
    this.mesh.add(pairGlasses);

    // Создание носа
    var earCube = {
        width: 2,
        height: 3,
        depth: 2,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        position_x: 0,
        position_y: 0,
        position_z: 6,
    }
    var earGeom = new THREE.BoxGeometry(earCube.width,
        earCube.height,
        earCube.depth,
        earCube.widthSegments,
        earCube.heightSegments,
        earCube.depthSegments);
    var earL = new THREE.Mesh(earGeom, faceMat);
    earL.position.set(earCube.position_x, earCube.position_y, -earCube.position_z);
    var earR = earL.clone();
    earR.position.set(earCube.position_x, earCube.position_y, earCube.position_z);
    this.mesh.add(earL);
    this.mesh.add(earR);
};

// Анимация волос
Pilot.prototype.updateHairs = function () {
    // Получение волос
    var hairs = this.hairsTop.children;
    // Обновление в соответствии с углом angleHairs
    for (var i = 0; i < hairs.length; i++) {
        var hairsPilot = hairs[i];
        var hairsHeight = 0.75,
            hairsChange = 0.25,
            row = 3;
        // каждый элемент волос масштабируется от 75% до 100% от исходного размера
        hairsPilot.scale.y = hairsHeight + Math.cos(this.angleHairs + i / row) * hairsChange;
    }
    // Увеличение угла для следующего кадра
    this.angleHairs += 0.16;
};