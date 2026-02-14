import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { getNodePosition } from '../../system/data/enneagramData';

export default function EnneagramNode({ data, isSelected, isConnected, onSelect, hasSelection }) {
    const meshRef = useRef();
    const glowRef = useRef();
    const outlineRef = useRef();
    const [hovered, setHovered] = useState(false);
    const position = useMemo(() => getNodePosition(data.id), [data.id]);

    // Calculate label position (radially outward)
    const labelPosition = useMemo(() => {
        const dir = new THREE.Vector3(...position).normalize();
        return dir.multiplyScalar(0.7).toArray(); // Offset by 0.7 units radially
    }, [position]);

    // Determine visual state
    const isHighlighted = isSelected || hovered;
    const isDimmed = hasSelection && !isSelected && !isConnected && !hovered;

    // Target values for animation - adjusted for softer spread
    const targetIntensity = isHighlighted ? 2.5 : isDimmed ? 0.15 : 0.7;
    const targetScale = isHighlighted ? 1.15 : isDimmed ? 0.85 : 1.0;
    const targetOpacity = isDimmed ? 0.15 : 0.9;

    useFrame((state, delta) => {
        if (outlineRef.current) {
            // Smooth scale transition
            outlineRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                delta * 6
            );

            // Rotate diamond like Sims Plumbob
            outlineRef.current.rotation.y += delta * 1.2;

            // Emissive intensity animation
            const mat = outlineRef.current.material;
            mat.emissiveIntensity = THREE.MathUtils.lerp(
                mat.emissiveIntensity,
                targetIntensity,
                delta * 6
            );
            mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 6);

            // Gentle floating animation
            outlineRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + data.id) * 0.08;
        }

        if (glowRef.current) {
            const pulseScale = isHighlighted
                ? 1.6 + Math.sin(state.clock.elapsedTime * 3) * 0.2
                : 1.3;
            glowRef.current.scale.lerp(
                new THREE.Vector3(pulseScale, pulseScale, pulseScale),
                delta * 6
            );

            // Softer opacity for the spread look
            const baseOpacity = isHighlighted ? 0.15 : isDimmed ? 0.02 : 0.06;
            glowRef.current.material.opacity = THREE.MathUtils.lerp(
                glowRef.current.material.opacity,
                baseOpacity,
                delta * 6
            );
        }
    });

    return (
        <group position={position}>
            {/* Multi-layered soft glow aura for ultra-smooth gradient */}
            {/* Layer 1: Core Glow */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshBasicMaterial
                    color={data.color}
                    transparent
                    opacity={0.12}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Layer 2: Inner Spread */}
            <mesh scale={[1.5, 1.5, 1.5]}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshBasicMaterial
                    color={data.color}
                    transparent
                    opacity={0.06}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Layer 3: Middle Spread */}
            <mesh scale={[2.0, 2.0, 2.0]}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshBasicMaterial
                    color={data.color}
                    transparent
                    opacity={0.03}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Layer 4: Outer Edge (Cap at Radius 1.0 roughly) */}
            <mesh scale={[2.5, 2.5, 2.5]}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshBasicMaterial
                    color={data.color}
                    transparent
                    opacity={0.015}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Diamond (Octahedron) Node */}
            <mesh
                ref={outlineRef}
                onClick={(e) => { e.stopPropagation(); onSelect(data.id); }}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
            >
                {/* Sims-style Diamond shape */}
                <octahedronGeometry args={[0.28, 0]} />
                <meshStandardMaterial
                    color={data.color}
                    emissive={data.color}
                    emissiveIntensity={0.8}
                    wireframe
                    transparent
                    opacity={1}
                />
                {/* Inner solid-ish diamond for structure */}
                <mesh>
                    <octahedronGeometry args={[0.27, 0]} />
                    <meshBasicMaterial
                        color={data.color}
                        transparent
                        opacity={0.15}
                    />
                </mesh>
            </mesh>

            {/* Repositioned Label (Radially Outward) - Restored bold typography */}
            <group position={labelPosition}>
                <Text
                    fontSize={0.2}
                    color={isDimmed ? '#444444' : data.color}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.015}
                    outlineColor="#000000"
                    fontWeight="bold"
                >
                    {data.id}
                </Text>

                {(isHighlighted || isConnected) && (
                    <Text
                        position={[0, -0.25, 0]}
                        fontSize={0.12}
                        color={data.color}
                        anchorX="center"
                        anchorY="middle"
                        outlineWidth={0.008}
                        outlineColor="#000000"
                    >
                        {data.krName}
                    </Text>
                )}
            </group>
        </group>
    );
}
