import { useMemo, useCallback } from 'react';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import EnneagramNode from '../../ux-design/components/EnneagramNode';
import ParticlePath from '../../ux-design/components/ParticlePath';
import BackgroundParticles from '../../ux-design/components/BackgroundParticles';
import { ENNEAGRAM_DATA } from '../data/enneagramData';

export default function EnneagramScene({ selectedId, onSelectNode }) {

    // Generate all paths from data
    const paths = useMemo(() => {
        const result = [];
        ENNEAGRAM_DATA.forEach(node => {
            result.push({
                key: `growth-${node.id}-${node.growthTo}`,
                fromId: node.id,
                toId: node.growthTo,
                pathType: 'growth',
                intensity: node.intensity
            });
            result.push({
                key: `stress-${node.id}-${node.stressTo}`,
                fromId: node.id,
                toId: node.stressTo,
                pathType: 'stress',
                intensity: node.intensity
            });
        });
        return result;
    }, []);

    // Determine which node IDs are connected to the selected node
    const connectedNodeIds = useMemo(() => {
        if (!selectedId) return new Set();
        const selected = ENNEAGRAM_DATA.find(n => n.id === selectedId);
        if (!selected) return new Set();
        return new Set([selected.growthTo, selected.stressTo, selectedId]);
    }, [selectedId]);

    const isPathActive = useCallback((fromId, toId) => {
        if (!selectedId) return false;
        return fromId === selectedId || toId === selectedId;
    }, [selectedId]);

    const handleSelect = useCallback((id) => {
        onSelectNode(id === selectedId ? null : id);
    }, [selectedId, onSelectNode]);

    return (
        <>
            {/* Ambient lighting - restored vibrancy */}
            <ambientLight intensity={0.08} />
            <pointLight position={[0, 8, 0]} intensity={0.3} color="#4A6FA5" />
            <pointLight position={[5, -3, 5]} intensity={0.2} color="#ff3366" />
            <pointLight position={[-5, -3, -5]} intensity={0.2} color="#00ffcc" />

            {/* Fog for depth */}
            <fog attach="fog" args={['#050505', 10, 30]} />

            {/* Background particles */}
            <BackgroundParticles />

            {/* Center ring glow */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <ringGeometry args={[3.7, 4.3, 64]} />
                <meshBasicMaterial
                    color="#1a1a2e"
                    transparent
                    opacity={0.1}
                    side={2}
                    depthWrite={false}
                />
            </mesh>

            {/* Particle paths */}
            {paths.map(path => (
                <ParticlePath
                    key={path.key}
                    fromId={path.fromId}
                    toId={path.toId}
                    pathType={path.pathType}
                    intensity={path.intensity}
                    isActive={isPathActive(path.fromId, path.toId)}
                    isVisible={true}
                />
            ))}

            {/* Enneagram nodes */}
            {ENNEAGRAM_DATA.map(node => (
                <EnneagramNode
                    key={node.id}
                    data={node}
                    isSelected={selectedId === node.id}
                    isConnected={connectedNodeIds.has(node.id)}
                    hasSelection={selectedId !== null}
                    onSelect={handleSelect}
                />
            ))}

            {/* Post processing - Restored strong Bloom for neon vibe */}
            <EffectComposer>
                <Bloom
                    intensity={1.5}
                    luminanceThreshold={0.1}
                    luminanceSmoothing={0.9}
                    mipmapBlur
                />
            </EffectComposer>

            {/* Camera controls */}
            <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={5}
                maxDistance={18}
                maxPolarAngle={Math.PI / 1.8}
                minPolarAngle={Math.PI / 6}
                autoRotate={false}
            />
        </>
    );
}
