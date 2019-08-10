import * as BABYLON from "babylonjs";
import { AbstractMesh } from "babylonjs";
import "babylonjs-loaders";
import React from "react";
import Scene, { ISceneEventArgs } from "./Scene";
class GameView extends React.Component {
  public onSceneMount = (e: ISceneEventArgs) => {
    const { canvas, scene, engine } = e;

    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, 0), scene);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    let drone: BABYLON.AbstractMesh[];
    BABYLON.SceneLoader.ImportMesh(
      ["Drone", "Propllier_2_Drone.002", "propller_1_Drone.004"],
      "/assets/",
      "Drone.obj",
      scene,
      result => {
        drone = result;
        camera.position = drone[0]
          .getBoundingInfo()
          .boundingBox.center.add(new BABYLON.Vector3(-2, 2, 0));
        camera.setTarget(new BABYLON.Vector3(1, 2, 0));
      }
    );

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    let preTime = new Date().getTime();
    const delay = 1000 / 60;
    // BABYLON.SceneLoader.
    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
        const curTime = new Date().getTime();

        // tslint:disable-next-line: no-console
        if (curTime - preTime > delay && drone) {
          rotate(drone[1], 0.1);
          rotate(drone[2], 0.1);
          preTime = curTime;
        }
      }
    });
  };
  public render() {
    return (
      <Scene
        onSceneMount={this.onSceneMount}
        canvasOptions={{ style: { width: "100%", height: "100%" } }}
      />
    );
  }
}
const rotate = (what: AbstractMesh, by: number) => {
  what.rotateAround(what.getBoundingInfo().boundingBox.center, new BABYLON.Vector3(0, 1, 0), by);
};
export default GameView;
