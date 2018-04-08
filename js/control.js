/**
 * @description Управление
 * @name W - движение вверх
 * @name S - движение вниз
 * @name A - движение влево
 * @name D - движение вправо
 * @name Y - движение к наблюдателю
 * @name H - движение от наблюдателя
 * @name Q - вращение через левый ближний угол
 * @name E - вращение через дальний правый угол
 * @name Z - вращение по Х
 * @name X - вращение по Z
 * @name C - вращение по Y
 * @name SPACE - вращение пропеллера влево
 * @name ENTER - вращение пропеллера вправо
 * @name U - по умолчанию значения координат
 * @name I - по умолчанию значение углов
 * @description Цифры 1,2,3 на основной клавиатуре отвечают за прикрепление камеры к объекту
 * @description Цифры на дополнительной клавиатуре отвечают за обратоку действий камеры
 */

coefficient_move_plane = 1,
    coefficient_rotation_airplane = 0.05,
    coefficient_rotation_propeller = 0.3;

function updatePlane() {
    if (Key.isDown(Key.A)) {
        airplane.mesh.position.x -= coefficient_move_plane;
    } else if (Key.isDown(Key.D)) {
        airplane.mesh.position.x += coefficient_move_plane;
    }
    if (Key.isDown(Key.W)) {
        airplane.mesh.position.y += coefficient_move_plane;
    } else if (Key.isDown(Key.S)) {
        airplane.mesh.position.y -= coefficient_move_plane;
    }
    if (Key.isDown(Key.Y)) {
        airplane.mesh.position.z += coefficient_move_plane;
    } else if (Key.isDown(Key.H)) {
        airplane.mesh.position.z -= coefficient_move_plane;
    }
    if (Key.isDown(Key.Q)) {
        airplane.mesh.rotation.x += coefficient_rotation_airplane;
        airplane.mesh.rotation.y += coefficient_rotation_airplane;
        airplane.mesh.rotation.z += coefficient_rotation_airplane;
    } else if (Key.isDown(Key.E)) {
        airplane.mesh.rotation.x -= coefficient_rotation_airplane;
        airplane.mesh.rotation.y -= coefficient_rotation_airplane;
        airplane.mesh.rotation.z -= coefficient_rotation_airplane;
    }

    if (Key.isDown(Key.Z)) {
        airplane.mesh.rotation.x += coefficient_rotation_airplane;
    } else if (Key.isDown(Key.V)) {
        airplane.mesh.rotation.x -= coefficient_rotation_airplane;
    }
    if (Key.isDown(Key.X)) {
        airplane.mesh.rotation.y += coefficient_rotation_airplane;
    } else if (Key.isDown(Key.B)) {
        airplane.mesh.rotation.y -= coefficient_rotation_airplane;
    }
    if (Key.isDown(Key.C)) {
        airplane.mesh.rotation.z += coefficient_rotation_airplane;
    } else if (Key.isDown(Key.N)) {
        airplane.mesh.rotation.z -= coefficient_rotation_airplane;
    }

    if (Key.isDown(Key.SPACE)) {
        airplane.propeller.rotation.x += coefficient_rotation_propeller;
    } else if (Key.isDown(Key.ENTER)) {
        airplane.propeller.rotation.x -= coefficient_rotation_propeller;
    }

    if (Key.isDown(Key.U)) {
        airplane.mesh.position.x = 0;
        airplane.mesh.position.y = 100;
        airplane.mesh.position.z = 0;
    }
    if (Key.isDown(Key.I)) {
        airplane.mesh.rotation.x = 0;
        airplane.mesh.rotation.y = 0;
        airplane.mesh.rotation.z = 0;
    }
}

fixed_on_airplane_TCP = false;
fixed_on_airplane_SCP = false;

function moveCamera() {
    var coefficient_move_camera = 1.5;
    var coefficient_rotation_camera = 0.01;

    if (Key.isDown(Key.Down)) {
        camera.position.y -= coefficient_move_camera;
    } else if (Key.isDown(Key.Up)) {
        camera.position.y += coefficient_move_camera;
    }
    if (Key.isDown(Key.Left)) {
        camera.position.x -= coefficient_move_camera;
    } else if (Key.isDown(Key.Right)) {
        camera.position.x += coefficient_move_camera;
    }
    if (Key.isDown(Key.Depth)) {
        camera.position.z -= coefficient_move_camera;
    } else if (Key.isDown(Key.UnDepth)) {
        camera.position.z += coefficient_move_camera;
    }

    if (Key.isDown(Key.DownArrow)) {
        camera.rotation.x -= coefficient_rotation_camera;
    } else if (Key.isDown(Key.UpArrow)) {
        camera.rotation.x += coefficient_rotation_camera;
    }
    if (Key.isDown(Key.RightArrow)) {
        camera.rotation.y -= coefficient_rotation_camera;
    } else if (Key.isDown(Key.LeftArrow)) {
        camera.rotation.y += coefficient_rotation_camera;
    }

    /* Условие по умолчанию */
    if (Key.isDown(Key._1)) {
        fixed_on_airplane_SCP = false;
        fixed_on_airplane_TCP = false;
        camera.position.set(PERSPECTIVE_CAMERA_POSITION_X, PERSPECTIVE_CAMERA_POSITION_Y, PERSPECTIVE_CAMERA_POSITION_Z);

        camera.rotation.x = PERSPECTIVE_CAMERA_ROTATION_X;
        camera.rotation.y = PERSPECTIVE_CAMERA_ROTATION_Y;
        camera.rotation.z = PERSPECTIVE_CAMERA_ROTATION_Z;
    }

    /* При нажатии клавиша крепится к объекту */
    if (Key.isDown(Key._2)) {
        camera.position.set(SECOND_PERSON_CAMERA_POSITION_X, SECOND_PERSON_CAMERA_POSITION_Y, SECOND_PERSON_CAMERA_POSITION_Z);
        camera.lookAt(airplane.mesh.position);
    }

    if (Key.isDown(Key._3)) {
        camera.position.set(airplane.mesh.position.x + -50, airplane.mesh.position.y + 50, airplane.mesh.position.z);
        camera.lookAt(airplane.mesh.position);
    }

    /* Фиксированная камера с разных углов */
    if (Key.isDown(Key._8)) {
        fixed_on_airplane_SCP = !fixed_on_airplane_SCP;
    }
    if (fixed_on_airplane_SCP) {
        camera.position.set(SECOND_PERSON_CAMERA_POSITION_X, SECOND_PERSON_CAMERA_POSITION_Y, SECOND_PERSON_CAMERA_POSITION_Z);
        camera.lookAt(airplane.mesh.position);
    }

    if (Key.isDown(Key._9)) {
        fixed_on_airplane_TCP = !fixed_on_airplane_TCP;
    }
    if (fixed_on_airplane_TCP) {
        camera.position.set(airplane.mesh.position.x + -50, airplane.mesh.position.y + 50, airplane.mesh.position.z);
        camera.lookAt(airplane.mesh.position);
    }
}