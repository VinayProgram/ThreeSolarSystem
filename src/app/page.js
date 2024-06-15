'use client'
import React, { Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import stars from '../../public/stars.jp'
const page = () => {
  if (typeof window == "undefined"&& typeof Audio =='undefined') { return }
  const audio = new Audio('/space-ambience-56265.mp3')
  
  const Scene = new THREE.Scene()
  const Renderer = new THREE.WebGLRenderer()
  const Camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000)
  Camera.position.set(-90, 140, 140)
  const orbit = new OrbitControls(Camera, Renderer.domElement)
  orbit.update()
  Renderer.setSize(window.innerWidth, window.innerHeight)
  const CubeTexture = new THREE.CubeTextureLoader()
  Scene.background = CubeTexture.load([
    '/stars.jpg',
    '/stars.jpg',
    '/stars.jpg',
    '/stars.jpg',
    '/stars.jpg',
    '/stars.jpg',
  ])
  const Textureloader = new THREE.TextureLoader()
  const AmbientLight = new THREE.AmbientLight('0xFFFFFF', 0.1)
  // const Light=new THREE.HemisphereLight(0x333333,1)
  // Scene.add(Light)
  Scene.add(AmbientLight)
  const sunGeo = new THREE.SphereGeometry(16, 30, 30);
  const sunMaterial = new THREE.MeshBasicMaterial({ map: Textureloader.load('/sun.jpg') })
  const SunMesh = new THREE.Mesh(sunGeo, sunMaterial)
  SunMesh.position.set(-10, 10, 0)
  Scene.add(SunMesh)
  function createPlanete(size, material, position, ring) {
    const genric = new THREE.SphereGeometry(size, 30, 30)
    const genricmaterial = new THREE.MeshStandardMaterial({ map: Textureloader.load(`/${material}`) })
    const genricmesh = new THREE.Mesh(genric, genricmaterial)
    const genricobj = new THREE.Object3D()
    genricmesh.position.x = position
    genricobj.add(genricmesh)

    if (ring) {

      const ringGeo = new THREE.RingGeometry(
        ring.innerRadius,
        ring.outerRadius,
        32);
      const ringMat = new THREE.MeshBasicMaterial({
        map: Textureloader.load(`/${ring.texture}`),
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      genricobj.add(ringMesh);
      ringMesh.position.x = position;
      ringMesh.rotation.x = -0.5 * Math.PI;

    }
    Scene.add(genricobj)
    return { genricobj, genricmesh }
  }
  const mercury = createPlanete(3.2, 'mercury.jpg', 28);
  const venus = createPlanete(5.8, 'venus.jpg', 44);
  const earth = createPlanete(6, 'earth.jpg', 62);
  const mars = createPlanete(4, 'mars.jpg', 78);
  const jupiter = createPlanete(12, 'jupiter.jpg', 100);
  const saturn = createPlanete(10, 'saturn.jpg', 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: 'saturnring.png'
  });
  const uranus = createPlanete(7, 'uranus.jpg', 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: 'uranusring.png'
  });
  const neptune = createPlanete(7, 'neptune.jpg', 200);
  const pluto = createPlanete(2.8, 'pluto.jpg', 216);
  Scene.add(mercury,
    venus,
    earth,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune,
    pluto)
  const pointLight = new THREE.PointLight('#f0bf7f', 100000, 30000);
  Scene.add(pointLight);
  useEffect(() => {


    function animate() {
      SunMesh.rotateY(0.004);

      mercury.genricmesh.rotateY(0.004);
      venus.genricmesh.rotateY(0.002);
      earth.genricmesh.rotateY(0.02);
      mars.genricmesh.rotateY(0.018);
      jupiter.genricmesh.rotateY(0.04);
      saturn.genricmesh.rotateY(0.038);
      uranus.genricmesh.rotateY(0.03);
      neptune.genricmesh.rotateY(0.032);
      pluto.genricmesh.rotateY(0.008);
      mercury.genricobj.rotateY(0.04);
      venus.genricobj.rotateY(0.015);
      earth.genricobj.rotateY(0.01);
      mars.genricobj.rotateY(0.008);
      jupiter.genricobj.rotateY(0.002);
      saturn.genricobj.rotateY(0.0009);
      uranus.genricobj.rotateY(0.0004);
      neptune.genricobj.rotateY(0.0001);
      pluto.genricobj.rotateY(0.00007);
      Renderer.render(Scene, Camera)
    }
    Renderer.setAnimationLoop(animate)

    document.getElementById('myobject').appendChild(Renderer.domElement)
  }, [])
  return (
    <Suspense>
      <div id='myobject'>
        <button className='mybtn' onClick={() => audio.play()}>Play</button>
      </div>
    </Suspense>
  )
}

export default page