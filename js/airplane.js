var AirPlane = function () {
    /**
     * @param cube_width - ширина
     * @param cube_height - высота
     * @param cube_depth - глубина
     * @param cube_widthSegments - количество сегментов по ширине
     * @param cube_heightSegments - количество сегментов по высоте
     * @param cube_depthSegments - количество сегментов по глубине
     */
    this.mesh = new THREE.Object3D();
    this.mesh.name = "airPlane";
    /**
     * @description создание кабины 
     */
    var cockpitCube = {
        width: 80,
        height: 50,
        depth: 50,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        coefficientPosition_x: 0,
        coefficientNearPosition_y: 10,
        coefficientFarPosition_y: 30,
        coefficientPosition_z: 20,
    };
    var geomCockpit = new THREE.BoxGeometry(cockpitCube.width, cockpitCube.height, cockpitCube.depth, cockpitCube.widthSegments, cockpitCube.heightSegments, cockpitCube.depthSegments);
    // Безтекстурный объект
    var matCockpit = new THREE.MeshPhongMaterial({
        color: Colors.red,
        shading: THREE.FlatShading,
    });
    /**
     * @method .vertices - получение доступа к определённой вершине формы через данный массив
     */
    geomCockpit.vertices[4].y -= cockpitCube.coefficientNearPosition_y;
    geomCockpit.vertices[4].z += cockpitCube.coefficientPosition_z;
    geomCockpit.vertices[5].y -= cockpitCube.coefficientNearPosition_y;
    geomCockpit.vertices[5].z -= cockpitCube.coefficientPosition_z;
    geomCockpit.vertices[6].y += cockpitCube.coefficientFarPosition_y;
    geomCockpit.vertices[6].z += cockpitCube.coefficientPosition_z;
    geomCockpit.vertices[7].y += cockpitCube.coefficientFarPosition_y;
    geomCockpit.vertices[7].z -= cockpitCube.coefficientPosition_z;

    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);

    /**
     * @description создаём двигатель
     */
    var engine_cube = {
        width: 20,
        height: 50,
        depth: 50,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
    };
    var geomEngine = new THREE.BoxGeometry(engine_cube.width, engine_cube.height, engine_cube.depth, engine_cube.widthSegments, engine_cube.heightSegments, engine_cube.depthSegments);
    var matEngine = new THREE.MeshPhongMaterial({
        color: Colors.white,
        shading: THREE.FlatShading
    });
    var engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 50;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);

    /**
     * @description создаём хвост
     */
    var tailPlane_cube = {
        width: 15,
        height: 20,
        depth: 5,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        position_x: -40,
        position_y: 20,
        position_z: 0,
    };
    var geomTailPlane = new THREE.BoxGeometry(tailPlane_cube.width, tailPlane_cube.height, tailPlane_cube.depth, tailPlane_cube.widthSegments, tailPlane_cube.heightSegments, tailPlane_cube.depthSegments);
    var matTailPlane = new THREE.MeshPhongMaterial({
        color: Colors.red,
        shading: THREE.FlatShading
    });
    var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(tailPlane_cube.position_x, tailPlane_cube.position_y, tailPlane_cube.position_z);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);

    /**
     * @description создаём крыло
     */
    var sideWing_cube = {
        width: 35,
        height: 5,
        depth: 120,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        position_x: 0,
        position_y: 5,
        position_z: 0,
    };
    var geomSideWing = new THREE.BoxGeometry(sideWing_cube.width, sideWing_cube.height, sideWing_cube.depth, sideWing_cube.widthSegments, sideWing_cube.heightSegments, sideWing_cube.depthSegments);
    var matSideWing = new THREE.MeshPhongMaterial({
        color: Colors.red,
        shading: THREE.FlatShading
    });
    var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.position.set(sideWing_cube.position_x, sideWing_cube.position_y, sideWing_cube.position_z);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);

    /**
     * @description создаём ветровое стекло
     */
    var windShield_cube = {
        width: 3,
        height: 15,
        depth: 20,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        position_x: 5,
        position_y: 27,
        position_z: 0,
    }
    var geomWindshield = new THREE.BoxGeometry(windShield_cube.width, windShield_cube.height, windShield_cube.depth, windShield_cube.widthSegments, windShield_cube.heightSegments, windShield_cube.depthSegments);
    var matWindshield = new THREE.MeshPhongMaterial({
        color: Colors.white,
        transparent: true,
        opacity: 0.3,
        shading: THREE.FlatShading
    });;
    var windshield = new THREE.Mesh(geomWindshield, matWindshield);
    windshield.position.set(windShield_cube.position_x, windShield_cube.position_y, windShield_cube.position_z);

    windshield.castShadow = true;
    windshield.receiveShadow = true;

    this.mesh.add(windshield);

    /**
     * @description создаём пропеллер
     */
    var propeller_cube = {
        width: 20,
        height: 10,
        depth: 10,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        position_x: 60,
        position_y: 0,
        position_z: 0,
        coefficientPosition_x: 0,
        coefficientPosition_y: 5,
        coefficientPosition_z: 5,
    };
    var geomPropeller = new THREE.BoxGeometry(propeller_cube.width, propeller_cube.height, propeller_cube.depth, propeller_cube.widthSegments, propeller_cube.heightSegments, propeller_cube.depthSegments);
    /**
     * @method .vertices - получение доступа к определённой вершине формы через данный массив
     */
    geomPropeller.vertices[4].y -= propeller_cube.coefficientPosition_y;
    geomPropeller.vertices[4].z += propeller_cube.coefficientPosition_z;
    geomPropeller.vertices[5].y -= propeller_cube.coefficientPosition_y;
    geomPropeller.vertices[5].z -= propeller_cube.coefficientPosition_z;
    geomPropeller.vertices[6].y += propeller_cube.coefficientPosition_y;
    geomPropeller.vertices[6].z += propeller_cube.coefficientPosition_z;
    geomPropeller.vertices[7].y += propeller_cube.coefficientPosition_y;
    geomPropeller.vertices[7].z -= propeller_cube.coefficientPosition_z;
    var matPropeller = new THREE.MeshPhongMaterial({
        color: Colors.brown,
        shading: THREE.FlatShading
    });
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    /**
     * @description создаём лопасть
     */
    var bladeCube = {
        width: 1,
        height: 80,
        depth: 12,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        position_x: 8,
        position_y: 0,
        position_z: 0,
        angel: Math.PI / 2,
    };
    var geomBlade = new THREE.BoxGeometry(bladeCube.width, bladeCube.height, bladeCube.depth, bladeCube.widthSegments, bladeCube.heightSegments, bladeCube.depthSegments);
    var matBlade = new THREE.MeshPhongMaterial({
        color: Colors.brownDark,
        shading: THREE.FlatShading
    });

    var leftBlade = new THREE.Mesh(geomBlade, matBlade);
    leftBlade.position.set(bladeCube.position_x, bladeCube.position_y, bladeCube.position_z);
    leftBlade.castShadow = true;
    leftBlade.receiveShadow = true;

    var rightBlade = leftBlade.clone();
    rightBlade.rotation.x = bladeCube.angel;

    rightBlade.castShadow = true;
    rightBlade.receiveShadow = true;

    this.propeller.add(leftBlade);
    this.propeller.add(rightBlade);
    this.propeller.position.set(propeller_cube.position_x, propeller_cube.position_y, propeller_cube.position_z);
    this.mesh.add(this.propeller);

    // Создание опоры для передних колёс
    var wheelProtecCube = {
        width: 30,
        height: 15,
        depth: 10,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        position_x: 25,
        position_y: -20,
        position_z: 25,
    }
    var wheelProtecGeom = new THREE.BoxGeometry(wheelProtecCube.width, wheelProtecCube.height, wheelProtecCube.depth, wheelProtecCube.widthSegments, wheelProtecCube.heightSegments, wheelProtecCube.depthSegments);
    var wheelProtecMat = new THREE.MeshPhongMaterial({
        color: Colors.red,
        shading: THREE.FlatShading
    });
    var wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat);
    wheelProtecR.position.set(wheelProtecCube.position_x, wheelProtecCube.position_y, wheelProtecCube.position_z);
    this.mesh.add(wheelProtecR);

    var wheelProtecL = wheelProtecR.clone();
    wheelProtecL.position.z = -wheelProtecR.position.z;
    this.mesh.add(wheelProtecL);

    // Создание ходовой части
    var wheelChassicsCube = {
        width: 24,
        height: 24,
        depth: 4,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        position_x: 25,
        position_y: -28,
        position_z: 25,
        scaleBack_x: 0.5,
        scaleBack_y: 0.5,
        scaleBack_z: 0.5,
        positionBack_x: -35,
        positionBack_y: -5,
        positionBack_z: 0,
    }
    var wheelChassicsGeom = new THREE.BoxGeometry(wheelChassicsCube.width, wheelChassicsCube.height, wheelChassicsCube.depth, wheelChassicsCube.widthSegments, wheelChassicsCube.heightSegments, wheelChassicsCube.depthSegments);
    var wheelChassicsMat = new THREE.MeshPhongMaterial({
        color: Colors.brownDark,
        shading: THREE.FlatShading
    });
    var wheelChassicsR = new THREE.Mesh(wheelChassicsGeom, wheelChassicsMat);
    wheelChassicsR.position.set(wheelChassicsCube.position_x, wheelChassicsCube.position_y, wheelChassicsCube.position_z);
    this.mesh.add(wheelChassicsR);

    var wheelChassicsL = wheelChassicsR.clone();
    wheelChassicsL.position.z = -wheelChassicsR.position.z;
    this.mesh.add(wheelChassicsL);

    var wheelChassicsB = wheelChassicsR.clone();
    wheelChassicsB.scale.set(wheelChassicsCube.scaleBack_x, wheelChassicsCube.scaleBack_y, wheelChassicsCube.scaleBack_z);
    wheelChassicsB.position.set(wheelChassicsCube.positionBack_x, wheelChassicsCube.positionBack_y, wheelChassicsCube.positionBack_z);
    this.mesh.add(wheelChassicsB);

    // Cоздание оси колеса
    var wheelAxisCube = {
        width: 10,
        height: 10,
        depth: 6,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
    }
    var wheelAxisGeom = new THREE.BoxGeometry(wheelAxisCube.width, wheelAxisCube.height, wheelAxisCube.depth, wheelAxisCube.widthSegments, wheelAxisCube.heightSegments, wheelAxisCube.depthSegments);
    var wheelAxisMat = new THREE.MeshPhongMaterial({
        color: Colors.brown,
        shading: THREE.FlatShading
    });
    var wheelAxisR = new THREE.Mesh(wheelAxisGeom, wheelAxisMat);
    wheelChassicsR.add(wheelAxisR);

    var wheelAxisL = wheelAxisR.clone();
    wheelAxisL.position.z = -wheelAxisR.position.z;
    wheelChassicsL.add(wheelAxisL);

    // Создание подвески заднего колеса
    var suspensionCube = {
        width: 4,
        height: 20,
        depth: 4,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        lowPosition_x: 0,
        lowPosition_y: 10,
        lowPosition_z: 0,
        position_x: -35,
        position_y: -5,
        position_z: 0,
        rotation_z: -0.3,
    }
    var suspensionGeom = new THREE.BoxGeometry(suspensionCube.width, suspensionCube.height, suspensionCube.depth, suspensionCube.widthSegments, suspensionCube.heightSegments, suspensionCube.depthSegments);
    suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(suspensionCube.lowPosition_x, suspensionCube.lowPosition_y, suspensionCube.lowPosition_z))
    var suspensionMat = new THREE.MeshPhongMaterial({
        color: Colors.red,
        shading: THREE.FlatShading
    });
    var suspension = new THREE.Mesh(suspensionGeom, suspensionMat);
    suspension.position.set(suspensionCube.position_x, suspensionCube.position_y, suspensionCube.position_z);
    suspension.rotation.z = suspensionCube.rotation_z;
    this.mesh.add(suspension);

    this.pilot = new Pilot();
    var pilotPosition = {
        x: -10,
        y: 27,
        z: 0,
    };
    this.pilot.mesh.position.set(pilotPosition.x, pilotPosition.y, pilotPosition.z);
    this.mesh.add(this.pilot.mesh);

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
};