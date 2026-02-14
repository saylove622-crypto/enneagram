import { getNodeById, GROWTH_COLOR, STRESS_COLOR } from '../../system/data/enneagramData';

export default function InfoPanel({ selectedId, onClose }) {
    const node = selectedId ? getNodeById(selectedId) : null;
    const growthTarget = node ? getNodeById(node.growthTo) : null;
    const stressTarget = node ? getNodeById(node.stressTo) : null;

    const triadLabels = {
        Head: { label: 'Head', ko: '사고 중심', icon: '🧠' },
        Heart: { label: 'Heart', ko: '감정 중심', icon: '❤️' },
        Gut: { label: 'Gut', ko: '본능 중심', icon: '⚡' }
    };

    return (
        <div className={`info-panel ${node ? 'active' : ''}`}>
            {/* Empty state for PC right panel */}
            {!node && (
                <div className="panel-empty">
                    <div className="panel-empty-icon">◎</div>
                    <p className="panel-empty-title">Enneagram Explorer</p>
                    <p className="panel-empty-desc">좌측 3D 모델에서 노드를 클릭하면<br />해당 유형의 상세 정보를 확인할 수 있습니다.</p>
                </div>
            )}

            {node && (
                <>
                    <button className="close-btn" onClick={onClose}>✕</button>

                    <div className="panel-header">
                        <div className="type-number" style={{ color: node.color }}>
                            {node.id}
                        </div>
                        <div className="type-names">
                            <h2 className="type-name-en">{node.name}</h2>
                            <h3 className="type-name-kr">{node.krName}</h3>
                        </div>
                        <div className="triad-badge" style={{ borderColor: node.color }}>
                            <span className="triad-icon">{triadLabels[node.triad]?.icon}</span>
                            <span className="triad-text">{triadLabels[node.triad]?.ko}</span>
                        </div>
                    </div>

                    <div className="panel-body">
                        <p className="description">{node.desc}</p>

                        <div className="connections">
                            <div className="connection growth-connection">
                                <span className="connection-label">성장 방향</span>
                                <span className="connection-target" style={{ color: GROWTH_COLOR }}>
                                    Type {node.growthTo} · {growthTarget?.krName}
                                </span>
                            </div>
                            <div className="connection stress-connection">
                                <span className="connection-label">스트레스 방향</span>
                                <span className="connection-target" style={{ color: STRESS_COLOR }}>
                                    Type {node.stressTo} · {stressTarget?.krName}
                                </span>
                            </div>
                        </div>

                        <div className="intensity-section">
                            <div className="intensity-header">
                                <span className="intensity-label">Energy Intensity</span>
                                <span className="intensity-value">{Math.round(node.intensity * 100)}%</span>
                            </div>
                            <div className="intensity-bar-bg">
                                <div
                                    className="intensity-bar-fill"
                                    style={{
                                        width: `${node.intensity * 100}%`,
                                        background: `linear-gradient(90deg, ${node.color}, ${node.color}bb)`
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
