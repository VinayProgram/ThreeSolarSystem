'use client'
import React, { useEffect } from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// import stars from '../../public/stars.jp'
const page = () => {
  if (typeof window == "undefined") { return }
  const Scene = new THREE.Scene()
  const Renderer = new THREE.WebGLRenderer()
  const Camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000)
  Camera.position.set(-90, 140, 140)
  const orbit=new OrbitControls(Camera,Renderer.domElement)
  orbit.update()
  Renderer.setSize(window.innerWidth, window.innerHeight)
  const CubeTexture=new THREE.CubeTextureLoader()
  Scene.background=CubeTexture.load([
    '/stars.jpg',
    '/stars.jpg',
   '/stars.jpg',
   '/stars.jpg',
   '/stars.jpg',
   '/stars.jpg',
  ])
  const Textureloader=new THREE.TextureLoader()
  const AmbientLight=new THREE.AmbientLight('orange',3)
  // const Light=new THREE.HemisphereLight(0x333333,1)
  // Scene.add(Light)
  Scene.add(AmbientLight)
  const sunGeo = new THREE.SphereGeometry(16, 30, 30);
  const sunMaterial = new THREE.MeshStandardMaterial({  map: Textureloader.load('/sun.jpg') })
  const SunMesh = new THREE.Mesh(sunGeo, sunMaterial)
  SunMesh.position.set(-10,10,0)
  Scene.add(SunMesh)
  useEffect(() => {
    function animate() {

      Renderer.render(Scene, Camera)
    }
    Renderer.setAnimationLoop(animate)

    document.getElementById('myobject').appendChild(Renderer.domElement)
  }, [])
  return (
    <div id='myobject'>

    </div>
  )
}

export default page