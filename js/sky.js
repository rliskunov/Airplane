Sky = function () {
    /**
     * @function Object3D - создание пустого контейнера
     * @param nClouds - количество облаков на небе
     */
    this.mesh = new THREE.Object3D();
    this.nClouds = 20;
    /**
     * @param cloud_distribution_angle - угол для каждого следующего облака. Нужен, чтобы распредеелить облака равномерно
     */
    var cloud_distribution_angle = Math.PI * 2 / this.nClouds;
    /**
     * @description создадим облака для неба
     */
    for (var i = 0; i < this.nClouds; i++) {
        var group_clouds = new Cloud();
        /**
         * @param angleRotation_clouds - угол поворота
         * @param distance_center_cloud - расстояние между центром оси и облаком
         */
        var angleRotation_clouds = cloud_distribution_angle * i;
        var distance_center_cloud = 750 + Math.random() * 200;
        group_clouds.mesh.position.y = Math.sin(angleRotation_clouds) * distance_center_cloud;
        group_clouds.mesh.position.x = Math.cos(angleRotation_clouds) * distance_center_cloud;
        group_clouds.mesh.position.z = -400 - Math.random() * 400;
        group_clouds.mesh.rotation.z = angleRotation_clouds + Math.PI / 2;
        var size_cubs = 1 + Math.random() * 2;
        group_clouds.mesh.scale.set(size_cubs, size_cubs, size_cubs);
        this.mesh.add(group_clouds.mesh);
    }
};