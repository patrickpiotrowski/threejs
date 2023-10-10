import * as THREE from 'three'
import { WebGLRenderer } from "three";
import Experience from "./Experience.js";

export default class Renderer {
  constructor () {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera

    this.setInstance()
  }

  setInstance () {
    this.instance = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    })
    this.instance.useLegacyLights = false
    this.instance.toneMapping = THREE.CineonToneMapping
    this.instance.toneMappingExposure = 1.75
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    this.instance.setClearColor('#211d20')
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  resize () {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  update () {
    this.instance.render(this.scene, this.camera.instance)
  }
}