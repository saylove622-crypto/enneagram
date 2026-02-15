import { useMemo, useCallback } from 'react';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import EnneagramNode from '../../ux-design/components/EnneagramNode';
import ParticlePath from '../../ux-design/components/ParticlePath';
import BackgroundParticles from '../../ux-design/components/BackgroundParticles';
import { ENNEAGRAM_DATA } from '../data/enneagramData';

export default function EnneagramScene({ selectedId, onSelectNode, activeMode, journalCategory = 'GLOBAL' }) {

    // Generate all paths from data
    const paths = useMemo(() => {
        const result = [];
        ENNEAGRAM_DATA.forEach(node => {
            result.push({
                key: `growth-${node.id}-${node.growthTo}`,
                fromId: node.id,
                toId: node.growthTo,
                pathType: 'growth',
                intensity: node.stressIntensity
            });
            result.push({
                key: `stress-${node.id}-${node.stressTo}`,
                fromId: node.id,
                toId: node.stressTo,
                pathType: 'stress',
                intensity: node.stressIntensity
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

    // Mistakable isolation: which nodes should NOT be dimmed
    const mistakableRelevantIds = useMemo(() => {
        if (activeMode !== 'MISTAKABLE' || !selectedId) return null;
        const selected = ENNEAGRAM_DATA.find(n => n.id === selectedId);
        if (!selected) return null;
        return new Set([selectedId, ...(selected.mistakableTypes || [])]);
    }, [activeMode, selectedId]);

    // Journal mode: calculate linear positions and stats for each node
    const journalNodeData = useMemo(() => {
        if (activeMode !== 'JOURNAL') return null;
        const spacing = 1.8; // distance between nodes in line
        const totalWidth = (ENNEAGRAM_DATA.length - 1) * spacing;
        const startX = -totalWidth / 2;

        return ENNEAGRAM_DATA.map((node, index) => {
            const stat = journalCategory === 'KOREAN' ? node.distribution.korean : node.distribution.ep;
            const maxStat = journalCategory === 'KOREAN' ? 35 : 20;
            const normalizedStat = stat / maxStat;

            // Stress dynamics data for dual bar visualization
            const sd = node.stressDynamics || {};
            const disNorm = (sd.disintegration || 0) / 100;
            const intNorm = (sd.integration || 0) / 100;

            return {
                id: node.id,
                targetPosition: [startX + index * spacing, 0, 0],
                journalScale: 0.6 + normalizedStat * 1.2,
                barHeight: normalizedStat * 4,
                stat: stat,
                // Stress dynamics for dual bars
                stressBarHeight: disNorm * 3.5,
                integrationBarHeight: intNorm * 3.5,
                stressRatio: sd.ratio || 0,
            };
        });
    }, [activeMode, journalCategory]);

    const isPathActive = useCallback((fromId, toId, pathType) => {
        // Global mode: light up ALL paths of the active type
        if (!selectedId && activeMode === 'GROWTH' && pathType === 'growth') return true;
        if (!selectedId && activeMode === 'STRESS' && pathType === 'stress') return true;

        // Node-specific mode
        if (selectedId) {
            if (activeMode === 'GROWTH' && pathType === 'growth' && fromId === selectedId) return true;
            if (activeMode === 'STRESS' && pathType === 'stress' && fromId === selectedId) return true;
            return fromId === selectedId || toId === selectedId;
        }

        return false;
    }, [selectedId, activeMode]);

    const handleSelect = useCallback((id) => {
        onSelectNode(id === selectedId ? null : id);
    }, [selectedId, onSelectNode]);

    // Should we hide particle paths in journal mode?
    const hidePathsInJournal = activeMode === 'JOURNAL';

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
                    opacity={hidePathsInJournal ? 0.0 : 0.1}
                    side={2}
                    depthWrite={false}
                />
            </mesh>

            {/* Particle paths — hidden in Journal mode */}
            {!hidePathsInJournal && paths.map(path => (
                <ParticlePath
                    key={path.key}
                    fromId={path.fromId}
                    toId={path.toId}
                    pathType={path.pathType}
                    intensity={path.intensity}
                    isActive={isPathActive(path.fromId, path.toId, path.pathType)}
                    isVisible={true}
                />
            ))}

            {/* Enneagram nodes */}
            {ENNEAGRAM_DATA.map(node => {
                const jData = journalNodeData?.find(d => d.id === node.id);
                const isMistakableDimmed = mistakableRelevantIds
                    ? !mistakableRelevantIds.has(node.id)
                    : false;

                return (
                    <EnneagramNode
                        key={node.id}
                        data={node}
                        isSelected={selectedId === node.id}
                        isConnected={connectedNodeIds.has(node.id)}
                        hasSelection={selectedId !== null}
                        onSelect={handleSelect}
                        // Journal mode props
                        targetPosition={jData?.targetPosition || null}
                        journalScale={jData?.journalScale || null}
                        barHeight={jData?.barHeight || 0}
                        barStat={jData?.stat || null}
                        stressBarHeight={jData?.stressBarHeight || 0}
                        integrationBarHeight={jData?.integrationBarHeight || 0}
                        isJournalMode={activeMode === 'JOURNAL'}
                        // Mistakable isolation
                        isMistakableDimmed={isMistakableDimmed}
                    />
                );
            })}

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
