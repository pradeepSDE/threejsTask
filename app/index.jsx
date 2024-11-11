import { GLView } from "expo-gl";
import { THREE, Renderer } from "expo-three";
import { useRef } from "react";
import { Text, View } from "react-native";
import {
  Scene,
  Mesh,
  PerspectiveCamera,
  BufferGeometry,
  BoxGeometry,
  MeshBasicMaterial,
  BufferAttribute,
} from "three";

export default function Index() {
  const onContextCreate = async (gl) => {
    // three js code will be written here
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    gl.canvas = {
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    };
    const renderer = new Renderer({ gl });

    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // const geometry = new BufferGeometry();
    const geometry = new BoxGeometry(3, 3, 3);
    // const vertices = new Float32Array([1, 1, 1]);

    // geometry.setAttribute("position", new BufferAttribute(vertices, 3));
    const material = new MeshBasicMaterial({ color: "blue" });
    const cube = new Mesh(geometry, material);
    cubeRef.current = cube;
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      //   cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };
  let isDragging = false;
  // let initialTouchPosition = { x: 0, y: 0 };
  const cubeRef = useRef(null);
  const isDraggingRef = useRef(false);
  const initialTouchPosition = useRef({ x: 0, y: 0 });

  const onTouchStart = (event) => {
    isDraggingRef.current = true;
    initialTouchPosition.current = {
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    };
  };

  const onTouchMove = (event) => {
    if (isDraggingRef.current && cubeRef.current) {
      const currentTouchPosition = {
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      };
      const deltaX = currentTouchPosition.x - initialTouchPosition.current.x;
      const deltaY = currentTouchPosition.y - initialTouchPosition.current.y;

      cubeRef.current.rotation.y += deltaX * 0.01; // Adjust scaling factor as needed
      cubeRef.current.rotation.x += deltaY * 0.01;
      initialTouchPosition.current = currentTouchPosition;
    }
  };

  const onTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      // onTouchStart={onTouchStart}
      // onTouchMove={onTouchMove}
      // onTouchEnd={onTouchEnd}
    >
      <GLView
        onContextCreate={onContextCreate}
        style={{ width: 300, height: 300 }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
      {/* <onContextCreate/> */}
    </View>
  );
}
