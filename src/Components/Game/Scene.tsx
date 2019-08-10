import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import React from 'react'

export interface SceneEventArgs {
  engine: BABYLON.Engine
  scene: BABYLON.Scene
  canvas: HTMLCanvasElement
}

export interface ISceneProps extends React.HTMLAttributes<HTMLCanvasElement> {
  engineOptions?: BABYLON.EngineOptions
  adaptToDeviceRatio?: boolean
  onSceneMount?: (args: SceneEventArgs) => void
  width?: number
  height?: number
}

class Scene extends React.Component<ISceneProps, {}> {
  private engine: BABYLON.Engine | undefined
  private canvas: HTMLCanvasElement | undefined

  public onResizeWindow = () => {
    if (this.engine) {
      this.engine.resize()
    }
  }

  public componentDidMount() {
    this.engine = new BABYLON.Engine(
      this.canvas!,
      true,
      this.props.engineOptions,
      this.props.adaptToDeviceRatio
    )

    const scene = new BABYLON.Scene(this.engine)

    if (this.props.onSceneMount) {
      this.props.onSceneMount({
        canvas: this.canvas!,
        engine: this.engine,
        scene,
      })
    } else {
      // tslint:disable-next-line: no-console
      console.error('onSceneMount function not available')
    }

    // Resize the babylon engine when the window is resized
    window.addEventListener('resize', this.onResizeWindow)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeWindow)
  }

  public onCanvasLoaded = (c: HTMLCanvasElement) => {
    if (c !== null) {
      this.canvas = c
    }
  }

  public render() {
    // 'rest' can contain additional properties that you can flow through to canvas:
    // (id, className, etc.)

    const opts: any = { ...this.props }

    return <canvas {...opts} ref={this.onCanvasLoaded} />
  }
}

export default Scene
