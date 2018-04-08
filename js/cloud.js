Cloud = function () {
    /**
     * @function Object3D - создание пустого контейнера, который содержит составные части облаков (кубы)
     * @param cube_width - ширина
     * @param cube_height - высота
     * @param cube_depth - глубина
     * @param cube_widthSegments - количество сегментов по ширине
     * @param cube_heightSegments - количество сегментов по высоте
     * @param cube_depthSegments - количество сегментов по глубине
     */
    this.mesh = new THREE.Object3D();
    this.mesh.name = "cloud";
    var cloudCube = {
        width: 20,
        height: 20,
        depth: 20,
    };
    var geom = new THREE.CubeGeometry(cloudCube.width, cloudCube.height, cloudCube.depth);
    // Безтекстурный объекта
    var mat = new THREE.MeshPhongMaterial({
        color: Colors.white,
    });
    /* // Текстурный объект
    var texture = new THREE.TextureLoader().load('img/cloud.jpg');
    var mat = new THREE.MeshBasicMaterial({
        color: Colors.white,
        map: texture,
        overdraw: true
    }); */
    /**
     * @description продублируем кубик произвольное число раз
     */
    var blocks_count = 3;
    var nBlocs = blocks_count + Math.floor(Math.random() * blocks_count);
    for (var i = 0; i < nBlocs; i++) {
        var group_cubs = new THREE.Mesh(geom.clone(), mat);
        /**
         * @description зададим случайную позицию и ротацию каждому кубику
         */
        group_cubs.position.x = i * 15;
        group_cubs.position.y = Math.random() * 10;
        group_cubs.position.z = Math.random() * 10;
        group_cubs.rotation.z = Math.random() * Math.PI * 2;
        group_cubs.rotation.y = Math.random() * Math.PI * 2;
        /** 
         * @description зададим произвольный размер кубикам
         */
        var size_cubs = 0.1 + Math.random() * 0.9;
        group_cubs.scale.set(size_cubs, size_cubs, size_cubs);
        /**
         * @method castShadow - отбрасывание 
         * @method receiveShadow - преломление теней
         */
        group_cubs.castShadow = true;
        group_cubs.receiveShadow = true;
        this.mesh.add(group_cubs);
    }
}