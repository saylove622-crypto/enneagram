import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { getNodePosition } from '../../system/data/enneagramData';

export default function EnneagramNode({
    data,
    isSelected,
    isConnected,
    onSelect,
    hasSelection,
    // Journal mode props
    targetPosition: journalTargetPos = null,
    journalScale = null,
    barHeight = 0,
    barStat = null,
    stressBarHeight = 0,
    integrationBarHeight = 0,
    isJournalMode = false,
    // Mistakable isolation
    isMistakableDimmed = false,
}) {
    const meshRef = useRef();
    const glowRef = useRef();
    const outlineRef = useRef();
    const groupRef = useRef();
    const barRef = useRef();
    const stressBarRef = useRef();
    const intBarRef = useRef();
    const [hovered, setHovered] = useState(false);
    const defaultPosition = useMemo(() => getNodePosition(data.id), [data.id]);

    // Current position target — either journal linear or default orbit
    const currentTargetPos = useMemo(() => {
        if (isJournalMode && journalTargetPos) {
            return new THREE.Vector3(...journalTargetPos);
        }
        return new THREE.Vector3(...defaultPosition);
    }, [isJournalMode, journalTargetPos, defaultPosition]);

    // Calculate label position (radially outward from default)
    const labelPosition = useMemo(() => {
        if (isJournalMode) {
            return [0, -0.6, 0]; // Below node in journal mode
        }
        const dir = new THREE.Vector3(...defaultPosition).normalize();
        return dir.multiplyScalar(0.7).toArray();
    }, [defaultPosition, isJournalMode]);

    // Determine visual state
    const isHighlighted = isSelected || hovered;
    // In mistakable mode, isMistakableDimmed overrides normal dimming
    const isDimmed = isMistakableDimmed || (hasSelection && !isSelected && !isConnected && !hovered && !isJournalMode);

    // Target values for animation
    const baseScale = (isJournalMode && journalScale) ? journalScale : 1.0;
    const targetIntensity = isMistakableDimmed ? 0.05 : isHighlighted ? 2.5 : isDimmed ? 0.15 : 0.7;
    const targetScale = isHighlighted ? baseScale * 1.15 : isDimmed ? baseScale * 0.85 : baseScale;
    const targetOpacity = isMistakableDimmed ? 0.08 : isDimmed ? 0.15 : 0.9;

    // Color for dimmed nodes (grayscale)
    const nodeColor = useMemo(() => new THREE.Color(data.color), [data.color]);
    const grayColor = useMemo(() => new THREE.Color('#333333'), []);

    useFrame((state, delta) => {
        // Animate group position towards target
        if (groupRef.current) {
            groupRef.current.position.lerp(currentTargetPos, delta * 3);
        }

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

            // Lerp color for grayscale effect
            const targetColor = isMistakableDimmed ? grayColor : nodeColor;
            mat.color.lerp(targetColor, delta * 4);
            mat.emissive.lerp(targetColor, delta * 4);

            // Gentle floating animation (skip in journal mode for clean look)
            if (!isJournalMode) {
                outlineRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8 + data.id) * 0.08;
            } else {
                outlineRef.current.position.y = THREE.MathUtils.lerp(outlineRef.current.position.y, 0, delta * 4);
            }
        }

        if (glowRef.current) {
            const pulseScale = isHighlighted
                ? 1.6 + Math.sin(state.clock.elapsedTime * 3) * 0.2
                : 1.3;
            glowRef.current.scale.lerp(
                new THREE.Vector3(pulseScale, pulseScale, pulseScale),
                delta * 6
            );

            const baseOpacity = isMistakableDimmed ? 0.01 : isHighlighted ? 0.15 : isDimmed ? 0.02 : 0.06;
            glowRef.current.material.opacity = THREE.MathUtils.lerp(
                glowRef.current.material.opacity,
                baseOpacity,
                delta * 6
            );

            // Glow color lerp for grayscale
            const targetGlowColor = isMistakableDimmed ? grayColor : nodeColor;
            glowRef.current.material.color.lerp(targetGlowColor, delta * 4);
        }

        // Animate distribution bar
        if (barRef.current) {
            const targetBarScale = isJournalMode ? barHeight : 0;
            barRef.current.scale.y = THREE.MathUtils.lerp(barRef.current.scale.y, targetBarScale, delta * 4);
            barRef.current.position.y = barRef.current.scale.y / 2 + 0.4;
            barRef.current.material.opacity = THREE.MathUtils.lerp(
                barRef.current.material.opacity,
                isJournalMode ? 0.6 : 0,
                delta * 4
            );
        }

        // Animate stress (disintegration) bar
        if (stressBarRef.current) {
            const targetH = isJournalMode ? stressBarHeight : 0;
            stressBarRef.current.scale.y = THREE.MathUtils.lerp(stressBarRef.current.scale.y, targetH, delta * 4);
            stressBarRef.current.position.y = stressBarRef.current.scale.y / 2 + 0.4;
            stressBarRef.current.material.opacity = THREE.MathUtils.lerp(
                stressBarRef.current.material.opacity,
                isJournalMode ? 0.5 : 0,
                delta * 4
            );
        }

        // Animate integration bar
        if (intBarRef.current) {
            const targetH = isJournalMode ? integrationBarHeight : 0;
            intBarRef.current.scale.y = THREE.MathUtils.lerp(intBarRef.current.scale.y, targetH, delta * 4);
            intBarRef.current.position.y = intBarRef.current.scale.y / 2 + 0.4;
            intBarRef.current.material.opacity = THREE.MathUtils.lerp(
                intBarRef.current.material.opacity,
                isJournalMode ? 0.5 : 0,
                delta * 4
            );
        }
    });

    return (
        <group ref={groupRef} position={defaultPosition}>
            {/* Multi-layered soft glow aura */}
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

            {/* Layer 4: Outer Edge */}
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

            {/* Distribution bar (center) */}
            <mesh ref={barRef} position={[0, 0.4, 0]} scale={[0.1, 0, 0.1]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial
                    color={data.color}
                    transparent
                    opacity={0}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* Stress (disintegration) bar — left, red */}
            <mesh ref={stressBarRef} position={[-0.2, 0.4, 0]} scale={[0.08, 0, 0.08]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial
                    color="#ff3366"
                    transparent
                    opacity={0}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* Integration bar — right, green */}
            <mesh ref={intBarRef} position={[0.2, 0.4, 0]} scale={[0.08, 0, 0.08]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial
                    color="#00ffcc"
                    transparent
                    opacity={0}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* Stat label (Journal mode only) */}
            {isJournalMode && barStat !== null && (
                <Text
                    position={[0, barHeight + 0.6, 0]}
                    fontSize={0.15}
                    color={data.color}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.008}
                    outlineColor="#000000"
                    fontWeight="bold"
                >
                    {barStat}%
                </Text>
            )}

            {/* Repositioned Label */}
            <group position={labelPosition}>
                <Text
                    fontSize={0.2}
                    color={isMistakableDimmed ? '#444444' : isDimmed ? '#444444' : data.color}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.015}
                    outlineColor="#000000"
                    fontWeight="bold"
                >
                    {data.id}
                </Text>

                {(isHighlighted || isConnected || isJournalMode) && (
                    <Text
                        position={[0, -0.25, 0]}
                        fontSize={0.12}
                        color={isMistakableDimmed ? '#444444' : data.color}
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
