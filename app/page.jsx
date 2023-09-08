"use client";
import { getProject, val } from "@theatre/core";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import {
	SheetProvider,
	PerspectiveCamera,
	useCurrentSheet,
} from "@theatre/r3f";

import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	Box,
	OrbitControls,
	ScrollControls,
	useScroll,
} from "@react-three/drei";
import Lifeline from "./components/Lifeline";
import Bloodhound from "./components/Bloodhound";
import Horizon from "./components/Horizon";

studio.extend(extension);
studio.initialize();

export default function Home() {
	const sheet = getProject("Fly Through").sheet("Scene");
	return (
		<main className="w-[100vw] h-[100vh] flex flex-col justify-center">
			{/* <Navbar /> */}
			<Suspense fallback={null}>
				<div className="w-full aspect-square">
					<Canvas gl={{ preserveDrawingBuffer: true }}>
						<ScrollControls pages={5}>
							<SheetProvider sheet={sheet}>
								<Scene />
							</SheetProvider>
						</ScrollControls>
					</Canvas>
				</div>
			</Suspense>
		</main>
	);
}

function Scene() {
	const sheet = useCurrentSheet();
	const scroll = useScroll();

	useFrame(() => {
		const sequenceLength = val(sheet.sequence.pointer.length);

		sheet.sequence.position = scroll.offset * sequenceLength;
	});

	return (
		<>
			<directionalLight position={[-2, 5, 2]} intensity={1} />
			<ambientLight intensity={1} />
			<PerspectiveCamera
				theatreKey="Camera"
				makeDefault
				position={[-0.7, 1.4, -1.3]}
				rotation={[0, -3.14, 0]}
				fov={75}
				near={0.1}
				far={70}
			/>
			<Box
				position={[-2, 0.36, -0.2]}
				material={new THREE.MeshNormalMaterial()}
			/>
			<Box
				scale={3}
				position={[0, 2, 5]}
				material={new THREE.MeshNormalMaterial()}
			/>
			<Box
				scale={0.7}
				position={[1, 0.2, 0]}
				material={new THREE.MeshNormalMaterial()}
			/>
			<Lifeline scale={0.03} position={[-2, 0, 0]} />
			<Bloodhound scale={0.1} position={[0.3, -0.1, 0]} />
			<Horizon scale={0.03} position={[1, -0.04, 0]} />
		</>
	);
}
