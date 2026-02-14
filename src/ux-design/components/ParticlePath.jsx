import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getNodePosition } from '../../system/data/enneagramData';

const PARTICLE_COUNT_PER_PATH = 60; // Restored count

function createCurve(fromId, toId) {
    const from = getNodePosition(fromId);
    const to = getNodePosition(toId);

    const mid = [
        (from[0] + to[0]) / 2,
        1.2 + Math.random() * 0.5,
        (from[2] + to[2]) / 2
    ];

    return new THREE.CatmullRomCurve3([
        new THREE.Vector3(from[0], from[1], from[2]),
        new THREE.Vector3(mid[0], mid[1], mid[2]),
        new THREE.Vector3(to[0], to[1], to[2])
    ]);
}

function PathLine({ curve, color, isActive }) {
    const ref = useRef();

    const lineObj = useMemo(() => {
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.08,
            depthWrite: false
        });
        return new THREE.Line(geometry, material);
    }, [curve, color]);

    useFrame((_, delta) => {
        if (!ref.current) return;
        const targetOpacity = isActive ? 0.6 : 0.08;
        ref.current.material.opacity = THREE.MathUtils.lerp(
            ref.current.material.opacity,
            targetOpacity,
            delta * 4
        );
    });

    return <primitive ref={ref} object={lineObj} />;
}

export default function ParticlePath({
    fromId,
    toId,
    pathType,
    intensity = 0.5,
    isActive = false,
    isVisible = true
}) {
    const pointsRef = useRef();

    const curve = useMemo(() => createCurve(fromId, toId), [fromId, toId]);
    const pathColor = useMemo(
        () => new THREE.Color(pathType === 'growth' ? '#00ffcc' : '#ff3366'),
        [pathType]
    );

    const particleCount = Math.max(10, Math.floor(PARTICLE_COUNT_PER_PATH * intensity));

    const { geometry, offsets } = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const off = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            off[i] = Math.random();
            const point = curve.getPoint(off[i]);
            positions[i * 3] = point.x;
            positions[i * 3 + 1] = point.y;
            positions[i * 3 + 2] = point.z;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return { geometry: geo, offsets: off };
    }, [particleCount, curve]);

    const speed = useMemo(() => {
        const baseSpeed = pathType === 'stress' ? 0.4 : 0.2; // Restored speed
        return baseSpeed * intensity;
    }, [pathType, intensity]);

    useFrame((state, delta) => {
        if (!pointsRef.current || !isVisible) return;

        const posAttr = pointsRef.current.geometry.attributes.position;
        const posArray = posAttr.array;
        const time = state.clock.elapsedTime;

        for (let i = 0; i < particleCount; i++) {
            offsets[i] = (offsets[i] + delta * speed) % 1;
            const point = curve.getPoint(offsets[i]);
            posArray[i * 3] = point.x;
            posArray[i * 3 + 1] = point.y + Math.sin(time * 2 + i) * 0.03;
            posArray[i * 3 + 2] = point.z;
        }
        posAttr.needsUpdate = true;

        // Animate particle material - restored vibrancy
        const mat = pointsRef.current.material;
        const targetSize = isActive ? 0.08 : 0.03;
        const targetOpacity = isActive ? 1.0 : 0.15;
        mat.size = THREE.MathUtils.lerp(mat.size, targetSize, delta * 4);
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 4);
    });

    if (!isVisible) return null;

    return (
        <group>
            <PathLine curve={curve} color={pathColor} isActive={isActive} />

            <points ref={pointsRef} geometry={geometry}>
                <pointsMaterial
                    color={pathColor}
                    size={0.03}
                    transparent
                    opacity={0.15}
                    depthWrite={false}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
}
