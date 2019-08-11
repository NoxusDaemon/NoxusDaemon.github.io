import * as BABYLON from "babylonjs";
import { Mesh, Vector3 } from "babylonjs";
import "babylonjs-loaders";
import React from "react";
import Scene, { ISceneEventArgs } from "./Scene";
import showAxis from "./ShowAxis";

// tslint:disable: no-console
class GameView extends React.Component {
  public onSceneMount = (e: ISceneEventArgs) => {
    const { canvas, scene, engine } = e;

    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.FreeCamera("camera1", new Vector3(0, 0, 0), scene);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    showAxis(4, scene);
    const redMaterial = new BABYLON.StandardMaterial("redMaterial", scene);
    redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    redMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    const redSphere = BABYLON.MeshBuilder.CreateSphere("redSphere1", { diameter: 0.2 }, scene);
    redSphere.material = redMaterial;
    redSphere.position = new Vector3(0.4114965, 2.4016495, -0.9060635);

    const blueMaterial = new BABYLON.StandardMaterial("blueMaterial", scene);
    blueMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1);
    blueMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    const blueSphere = BABYLON.MeshBuilder.CreateSphere("blueSphere1", { diameter: 0.5 }, scene);
    blueSphere.material = blueMaterial;
    let prope: Mesh;
    let prope2: Mesh;
    let drone: Mesh[];
    BABYLON.SceneLoader.ImportMesh(
      ["Drone", "Propllier_2_Drone.002", "propller_1_Drone.004"],
      "/assets/",
      "Drone.obj",
      scene,
      result => {
        const tmp: any = result;
        drone = tmp;
        camera.position = drone[0]
          .getBoundingInfo()
          .boundingBox.center.add(new BABYLON.Vector3(-2, 2, 0));
        camera.setTarget(new BABYLON.Vector3(1, 2, 0));

        BABYLON.SceneLoader.ImportMesh(["prope1"], "/assets/", "prope.obj", scene, propes => {
          const tprope: any = propes[0];
          prope = tprope.clone("prope1", drone[0]);
          prope2 = tprope.clone("prope2", drone[0]);
          prope.position = drone[2].getBoundingInfo().boundingBox.center;
          prope2.position = drone[1].getBoundingInfo().boundingBox.center;
          scene.removeMesh(tprope);
          scene.removeMesh(drone[2]);
          scene.removeMesh(drone[1]);
        });
      }
    );

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    let preTime = new Date().getTime();
    let delay = 1000 / 60;
    scene.registerBeforeRender(() => {
      if (drone) {
        drone[0].position = camera
          .getTarget()
          .clone()
          .add(new BABYLON.Vector3(2, -5, 0));
        console.log(drone[0].position);
      }
    });
    scene.registerAfterRender(() => {
      const curTime = new Date().getTime();
      if (curTime - preTime > delay && drone) {
        document.body.onkeyup = event => {
          if (event.keyCode === 32) {
            if (delay === 1000 / 60) {
              delay = 10000;
            } else {
              delay = 1000 / 60;
            }
          }
        };
        // drone[0].position = camera
        //   .getTarget()
        //   .clone()
        //   .add(new BABYLON.Vector3(2, -5, 0));
        // drone[0].translate(Vector3.Right(), -0.1);
        console.log(drone[0].position);
        rotate(prope, -0.1);
        rotate(prope2, 0.1);

        // if (prope) {
        //   blueSphere.position = drone[0].position.clone().add(prope.position.clone());
        // }
        preTime = curTime;
      }
    });
    // BABYLON.SceneLoader.
    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
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
const rotate = (what: Mesh, by: number) => {
  if (what) {
    what.rotate(new BABYLON.Vector3(0, 1, 0), by);
  }
};
export default GameView;
