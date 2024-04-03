import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Noise } from '@react-three/postprocessing'

const colors = {
  white: 'hsl(302, 100%, 96%)',
  lightest: 'hsl(302, 100%, 92%)',
  light: 'hsl(302, 100%, 81%)',
  midlight: 'hsl(302, 100%, 65%)',
  medium: 'hsl(302, 100%, 50%)',
  middark: 'hsl(302, 100%, 36%)',
  darkish: 'hsl(302, 100%, 26%)',
  dark: 'hsl(302, 100%, 15%)',
  darkest: 'hsl(302, 100%, 10%)',
  black: 'hsl(302, 100%, 3%)'
}

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)

  useEffect(() => {
    // change mouse cursor to "grab" on hover
    if (hovered) document.body.style.cursor = 'grab'
    // change mouse cursor to "auto" on hover out
    else document.body.style.cursor = 'auto'
  }, [hovered])

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    ref.current.rotation.x += delta + props.z * 0.0001
    ref.current.rotation.y += delta - props.z * 0.0001
  })
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
      <mesh
          {...props}
          ref={ref}
          scale={props.z === 1 ? 1 : props.z === 2 ? 0.5 : 0.75}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
      >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={
              hovered
                ? colors.light
                : props.z === 2
                  ? colors.darkish
                  : props.z === 1
                    ? colors.midlight
                    : colors.middark
            }
            opacity={hovered ? 1 : 0.8 }
            transparent={true}
          />
      </mesh>
  )
}

const Fallback = () => {
  return (
    <h4>Loading...</h4>
  )
}

createRoot(document.querySelector('[data-three-js="boxes"]')).render(
    <Suspense fallback={<Fallback/>}>
      <Canvas>
          <EffectComposer>
              <ambientLight intensity={Math.PI / 2} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
              <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
              <Box position={[0, 1, -2]} z={2} />
              <Box position={[-1, 0, -2]} z={2} />
              <Box position={[1, 0, -2]} z={2} />
              <Box position={[0, -1, -2]} z={2} />

              <Box position={[-1, 1, -1]} z={0} />
              <Box position={[1, 1, -1]} z={0} />
              <Box position={[0, 0, -1]} z={0} />
              <Box position={[-1, -1, -1]} z={0} />
              <Box position={[1, -1, -1]} z={0} />

              <Box position={[0, 1, 0]} z={1} />
              <Box position={[-1, 0, 0]} z={1} />
              <Box position={[1, 0, 0]} z={1} />
              <Box position={[0, -1, 0]} z={1} />

              <Box position={[-1, 1, 1]} z={0} />
              <Box position={[1, 1, 1]} z={0} />
              <Box position={[0, 0, 1]} z={0} />
              <Box position={[-1, -1, 1]} z={0} />
              <Box position={[1, -1, 1]} z={0} />

              <Box position={[0, 1, 2]} z={2} />
              <Box position={[-1, 0, 2]} z={2} />
              <Box position={[1, 0, 2]} z={2} />
              <Box position={[0, -1, 2]} z={2} />

              <OrbitControls makeDefault />
              <Noise opacity={0.2} />
          </EffectComposer>
      </Canvas>
    </Suspense>
)
