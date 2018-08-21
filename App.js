import React from 'react';
import { AR } from 'expo';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import { View as GraphicsView } from 'expo-graphics';

export default class App extends React.Component {

  componentDidMount() {
    // Turn off extra warnings
    THREE.suppressExpoWarnings(true)
    ThreeAR.suppressWarnings()
  }

  onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
    AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal, AR.PlaneDetectionTypes.Vertical);
    // AR.setPlaneDetection(AR.PlaneDetectionTypes.Vertical);

    this.renderer = new ExpoTHREE.Renderer({
      gl,
      pixelRatio,
      width,
      height
    });

    this.scene = new THREE.Scene();
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
    this.camera = new ThreeAR.Camera(width, height, 0.1, 1000);
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshPhongMaterial({ color: 0xff00ff });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.z = -0.4;
    this.scene.add(this.cube);
    this.scene.add(new THREE.AmbientLight(0xffffff));
  }

  onRender = () => {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return(
      <GraphicsView
        style={{ flex: 1 }}
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        isArEnabled
        arTrackingConfiguration={AR.TrackingConfigurations.World}
        // Bonus: debug props
        isArRunningStateEnabled
        isArCameraStateEnabled
      />
    );
  }
}

