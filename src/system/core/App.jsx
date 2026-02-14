import { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import EnneagramScene from './EnneagramScene';
import InfoPanel from '../../ux-design/components/InfoPanel';
import '../../ux-design/styles/App.css';

export default function App() {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectNode = useCallback((id) => {
    setSelectedId(id);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <div className="app-container">
      {/* Left: 3D Canvas */}
      <div className="canvas-section">
        <Canvas
          camera={{ position: [0, 12, 3], fov: 50 }}
          gl={{
            antialias: true,
            toneMapping: 3,
            toneMappingExposure: 1.2,
          }}
          style={{ background: '#050505' }}
        >
          <EnneagramScene
            selectedId={selectedId}
            onSelectNode={handleSelectNode}
          />
        </Canvas>

        {/* Header & Legend overlaid on Canvas */}
        <div className="header-overlay">
          <h1 className="site-title">ENNEAGRAM ORBIT</h1>
          <p className="site-subtitle">theoretical visualization</p>
        </div>
        <div className="legend-overlay">
          <div className="legend-item">
            <span className="legend-dot growth"></span>
            <span className="legend-label">Growth Path</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot stress"></span>
            <span className="legend-label">Stress Path</span>
          </div>
        </div>

        {/* Instruction (shown when no node selected) */}
        {!selectedId && (
          <div className="instruction-overlay">
            <p>Click a node to explore</p>
          </div>
        )}
      </div>

      {/* Right: Info Panel */}
      <InfoPanel selectedId={selectedId} onClose={handleClose} />
    </div>
  );
}
