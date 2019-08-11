import * as BABYLON from "babylonjs";
export const showAxis = (size: number, scene: BABYLON.Scene) => {
  // tslint:disable-next-line: no-shadowed-variable
  const makeTextPlane = (text: string, color: string, size: number) => {
    const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
    const plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
    const mMaterial = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    mMaterial.backFaceCulling = false;
    mMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    mMaterial.diffuseTexture = dynamicTexture;
    plane.material = mMaterial;
    return plane;
  };

  const axisX = BABYLON.Mesh.CreateLines(
    "axisX",
    [
      BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(size, 0, 0),
      new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
      new BABYLON.Vector3(size, 0, 0),
      new BABYLON.Vector3(size * 0.95, -0.05 * size, 0),
    ],
    scene
  );
  axisX.color = new BABYLON.Color3(1, 0, 0);
  const xChar = makeTextPlane("X", "red", size / 10);
  xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
  const axisY = BABYLON.Mesh.CreateLines(
    "axisY",
    [
      BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(0, size, 0),
      new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
      new BABYLON.Vector3(0, size, 0),
      new BABYLON.Vector3(0.05 * size, size * 0.95, 0),
    ],
    scene
  );
  axisY.color = new BABYLON.Color3(0, 1, 0);
  const yChar = makeTextPlane("Y", "green", size / 10);
  yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
  const axisZ = BABYLON.Mesh.CreateLines(
    "axisZ",
    [
      BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(0, 0, size),
      new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
      new BABYLON.Vector3(0, 0, size),
      new BABYLON.Vector3(0, 0.05 * size, size * 0.95),
    ],
    scene
  );
  axisZ.color = new BABYLON.Color3(0, 0, 1);
  const zChar = makeTextPlane("Z", "blue", size / 10);
  zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
};

// Local Axes
export const localAxes = (size: number, scene: BABYLON.Scene) => {
  // tslint:disable-next-line: variable-name
  const pilot_local_axisX = BABYLON.Mesh.CreateLines(
    "pilot_local_axisX",
    [
      BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(size, 0, 0),
      new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
      new BABYLON.Vector3(size, 0, 0),
      new BABYLON.Vector3(size * 0.95, -0.05 * size, 0),
    ],
    scene
  );
  pilot_local_axisX.color = new BABYLON.Color3(1, 0, 0);

  // tslint:disable-next-line: variable-name
  const pilot_local_axisY = BABYLON.Mesh.CreateLines(
    "pilot_local_axisY",
    [
      BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(0, size, 0),
      new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
      new BABYLON.Vector3(0, size, 0),
      new BABYLON.Vector3(0.05 * size, size * 0.95, 0),
    ],
    scene
  );
  pilot_local_axisY.color = new BABYLON.Color3(0, 1, 0);

  // tslint:disable-next-line: variable-name
  const pilot_local_axisZ = BABYLON.Mesh.CreateLines(
    "pilot_local_axisZ",
    [
      BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(0, 0, size),
      new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
      new BABYLON.Vector3(0, 0, size),
      new BABYLON.Vector3(0, 0.05 * size, size * 0.95),
    ],
    scene
  );
  pilot_local_axisZ.color = new BABYLON.Color3(0, 0, 1);

  // tslint:disable-next-line: variable-name
  const local_origin = BABYLON.MeshBuilder.CreateBox("local_origin", { size: 1 }, scene);
  local_origin.isVisible = false;

  pilot_local_axisX.parent = local_origin;
  pilot_local_axisY.parent = local_origin;
  pilot_local_axisZ.parent = local_origin;

  return local_origin;
};

export default showAxis;
