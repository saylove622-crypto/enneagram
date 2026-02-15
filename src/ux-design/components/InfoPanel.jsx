import { getNodeById, getMistakableTypes, ENNEAGRAM_DATA, GROWTH_COLOR, STRESS_COLOR, DATA_SOURCES, OVERALL_STATS, STRESS_DURATION, getStressSummary } from '../../system/data/enneagramData';
import PanelMenu from './PanelMenu';

export default function InfoPanel({ selectedId, onClose, activeMode, onModeChange, journalCategory = 'GLOBAL', onJournalCategoryChange }) {
    const node = selectedId ? getNodeById(selectedId) : null;
    const growthTarget = node ? getNodeById(node.growthTo) : null;
    const stressTarget = node ? getNodeById(node.stressTo) : null;

    const triadLabels = {
        Head: { label: 'Head', ko: '사고 중심', icon: '🧠' },
        Heart: { label: 'Heart', ko: '감정 중심', icon: '❤️' },
        Gut: { label: 'Gut', ko: '본능 중심', icon: '⚡' }
    };

    // ── Global Mode Content (no node selected) ──
    const renderGlobalContent = () => {
        switch (activeMode) {
            case 'GROWTH':
                return (
                    <div className="mode-content growth global-mode">
                        <h4 className="mode-title" style={{ color: GROWTH_COLOR }}>
                            <span className="mode-icon">↗</span> Integration · 통합의 방향
                        </h4>
                        <p className="mode-description">
                            에니어그램에서 <strong>성장(통합)</strong>이란 건강한 심리적 상태에서
                            자신의 유형이 화살표 방향의 유형이 가진 긍정적 특성을 통합하는 과정입니다.
                        </p>
                        <div className="global-paths-grid">
                            {ENNEAGRAM_DATA.map(n => {
                                const target = getNodeById(n.growthTo);
                                return (
                                    <div key={n.id} className="global-path-item">
                                        <span className="gp-from" style={{ color: n.color }}>{n.id}</span>
                                        <span className="gp-arrow" style={{ color: GROWTH_COLOR }}>→</span>
                                        <span className="gp-to" style={{ color: target?.color }}>{n.growthTo}</span>
                                        <span className="gp-label">{n.levels.growth.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            case 'STRESS':
                return (
                    <div className="mode-content stress global-mode">
                        <h4 className="mode-title" style={{ color: STRESS_COLOR }}>
                            <span className="mode-icon">↘</span> Disintegration · 분열의 방향
                        </h4>
                        <p className="mode-description">
                            <strong>스트레스(분열)</strong> 상태에서는 자신의 유형이 화살표 반대 방향 유형의
                            부정적 특성을 드러냅니다. 이는 무의식적 방어기제로 작동합니다.
                        </p>
                        <div className="global-paths-grid">
                            {ENNEAGRAM_DATA.map(n => {
                                const target = getNodeById(n.stressTo);
                                return (
                                    <div key={n.id} className="global-path-item">
                                        <span className="gp-from" style={{ color: n.color }}>{n.id}</span>
                                        <span className="gp-arrow" style={{ color: STRESS_COLOR }}>→</span>
                                        <span className="gp-to" style={{ color: target?.color }}>{n.stressTo}</span>
                                        <span className="gp-label">{n.levels.stress.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            case 'MISTAKABLE':
                return (
                    <div className="mode-content mistakable global-mode">
                        <h4 className="mode-title" style={{ color: '#ffcc00' }}>
                            <span className="mode-icon">⚠</span> Look-Alikes · 유형 혼동 패턴
                        </h4>
                        <p className="mode-description">
                            에니어그램 유형은 행동적으로 비슷해 보일 수 있지만, 내적 동기에서 근본적으로 다릅니다.
                            노드를 클릭하면 해당 유형의 혼동 유형을 확인할 수 있습니다.
                        </p>
                        <div className="global-mistakable-grid">
                            {ENNEAGRAM_DATA.map(n => (
                                <div key={n.id} className="global-mistakable-item" style={{ '--gm-color': n.color }}>
                                    <span className="gm-number" style={{ color: n.color }}>{n.id}</span>
                                    <span className="gm-name">{n.krName}</span>
                                    <span className="gm-confused">↔ {n.mistakableTypes.join(', ')}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'JOURNAL':
                return (
                    <div className="mode-content journal global-mode">
                        <h4 className="mode-title" style={{ color: '#cc99ff' }}>
                            <span className="mode-icon">📊</span> Distribution Overview
                        </h4>
                        <div className="journal-toggle-row">
                            <button
                                className={`journal-toggle-btn ${journalCategory === 'GLOBAL' ? 'active' : ''}`}
                                onClick={() => onJournalCategoryChange?.('GLOBAL')}
                            >
                                Global
                            </button>
                            <button
                                className={`journal-toggle-btn ${journalCategory === 'KOREAN' ? 'active' : ''}`}
                                onClick={() => onJournalCategoryChange?.('KOREAN')}
                            >
                                Korean
                            </button>
                        </div>

                        {/* Distribution Table */}
                        <div className="journal-section">
                            <span className="journal-section-title">유형 분포 비교</span>
                            <div className="global-dist-table">
                                <div className="gd-header">
                                    <span>Type</span>
                                    <span>{journalCategory === 'KOREAN' ? 'Korean' : 'EP'}</span>
                                </div>
                                {ENNEAGRAM_DATA.map(n => (
                                    <div key={n.id} className="gd-row">
                                        <span className="gd-type" style={{ color: n.color }}>{n.id} {n.krName}</span>
                                        <span className="gd-val">
                                            {journalCategory === 'KOREAN' ? n.distribution.korean : n.distribution.ep}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stress Dynamics Overview */}
                        <div className="journal-section">
                            <span className="journal-section-title">스트레스 동역학 (Hur 2011)</span>
                            <div className="stress-overview-grid">
                                {ENNEAGRAM_DATA.map(n => {
                                    const d = n.stressDynamics;
                                    return (
                                        <div key={n.id} className="stress-mini-row">
                                            <span className="smr-type" style={{ color: n.color }}>{n.id}</span>
                                            <div className="smr-bars">
                                                <div className="smr-bar dis" style={{ width: `${d.disintegration}%` }} />
                                                <div className="smr-bar int" style={{ width: `${d.integration}%` }} />
                                            </div>
                                            <span className={`smr-ratio ${d.ratio > 1.5 ? 'danger' : d.ratio < 0.8 ? 'safe' : ''}`}>
                                                {d.ratio.toFixed(1)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="stress-legend">
                                <span className="sl-item"><span className="sl-dot dis" />분열</span>
                                <span className="sl-item"><span className="sl-dot int" />통합</span>
                                <span className="sl-stat">전체: {OVERALL_STATS.totalDisintegration}% 분열 | χ²={OVERALL_STATS.chisquare.value}</span>
                            </div>
                        </div>

                        {/* Data Source */}
                        <div className="journal-source">
                            <span className="js-label">📎 {journalCategory === 'KOREAN' ? DATA_SOURCES.korean.source : DATA_SOURCES.ep.source}</span>
                            <span className="js-note">{journalCategory === 'KOREAN' ? `n=${DATA_SOURCES.korean.n}` : `n=${DATA_SOURCES.ep.n.toLocaleString()}`} · {journalCategory === 'KOREAN' ? DATA_SOURCES.korean.note : DATA_SOURCES.ep.note}</span>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    // ── Node-Specific Content ──
    const renderContent = () => {
        if (!activeMode) {
            return (
                <div className="panel-default-content">
                    <p className="description">{node.desc}</p>
                    <div className="keywords-row">
                        {node.keywords.map((kw, i) => (
                            <span key={i} className="keyword-tag" style={{ borderColor: `${node.color}44` }}>
                                {kw}
                            </span>
                        ))}
                    </div>
                    <div className="intensity-section">
                        <div className="intensity-header">
                            <span className="intensity-label">Stress Intensity</span>
                            <span className="intensity-value">{Math.round(node.stressIntensity * 100)}%</span>
                        </div>
                        <div className="intensity-bar-bg">
                            <div
                                className="intensity-bar-fill"
                                style={{
                                    width: `${node.stressIntensity * 100}%`,
                                    background: `linear-gradient(90deg, ${node.color}, ${node.color}bb)`
                                }}
                            />
                        </div>
                    </div>
                </div>
            );
        }

        switch (activeMode) {
            case 'GROWTH':
                return (
                    <div className="mode-content growth">
                        <h4 className="mode-title" style={{ color: GROWTH_COLOR }}>
                            <span className="mode-icon">↗</span> Growth Direction
                        </h4>
                        <div className="connection growth-connection">
                            <span className="connection-label">성장 방향</span>
                            <span className="connection-target" style={{ color: GROWTH_COLOR }}>
                                Type {node.growthTo} · {growthTarget?.krName}
                            </span>
                        </div>
                        <div className="level-card growth-level">
                            <span className="level-badge growth-badge">Level 1 · 최상</span>
                            <span className="level-name">{node.levels.growth.name}</span>
                        </div>
                        <div className="keywords-row">
                            {node.levels.growth.keywords.map((kw, i) => (
                                <span key={i} className="keyword-tag growth-tag">{kw}</span>
                            ))}
                        </div>
                        <p className="mode-description">{node.growthShift_ko}</p>
                    </div>
                );
            case 'STRESS':
                return (
                    <div className="mode-content stress">
                        <h4 className="mode-title" style={{ color: STRESS_COLOR }}>
                            <span className="mode-icon">↘</span> Stress Direction
                        </h4>
                        <div className="connection stress-connection">
                            <span className="connection-label">스트레스 방향</span>
                            <span className="connection-target" style={{ color: STRESS_COLOR }}>
                                Type {node.stressTo} · {stressTarget?.krName}
                            </span>
                        </div>
                        <div className="level-card stress-level">
                            <span className="level-badge stress-badge">Level 7-9 · 최하</span>
                            <span className="level-name">{node.levels.stress.name}</span>
                        </div>
                        <div className="keywords-row">
                            {node.levels.stress.keywords.map((kw, i) => (
                                <span key={i} className="keyword-tag stress-tag">{kw}</span>
                            ))}
                        </div>
                        <p className="mode-description">{node.stressShift_ko}</p>
                    </div>
                );
            case 'MISTAKABLE': {
                const mistakables = getMistakableTypes(node.id);
                return (
                    <div className="mode-content mistakable">
                        <h4 className="mode-title" style={{ color: '#ffcc00' }}>
                            <span className="mode-icon">⚠</span> 혼동되기 쉬운 유형
                        </h4>
                        <p className="mode-subtitle">
                            Type {node.id} {node.krName}과(와) 착각하기 쉬운 유형들
                        </p>
                        <div className="mistakable-list">
                            {mistakables.map((mt) => (
                                <div key={mt.id} className="mistakable-card" style={{ '--mt-color': mt.color }}>
                                    <div className="mistakable-header">
                                        <span className="mistakable-number" style={{ color: mt.color }}>{mt.id}</span>
                                        <div className="mistakable-names">
                                            <span className="mistakable-name-en">{mt.name}</span>
                                            <span className="mistakable-name-kr">{mt.krName}</span>
                                        </div>
                                    </div>
                                    <div className="mistakable-keywords">
                                        {mt.keywords.slice(0, 3).map((kw, i) => (
                                            <span key={i} className="keyword-tag mini-tag">{kw}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }
            case 'JOURNAL': {
                const stressSummary = getStressSummary(node.id);
                const devDist = node.devLevelDist;
                const stat = journalCategory === 'KOREAN' ? node.distribution.korean : node.distribution.ep;
                const maxStat = journalCategory === 'KOREAN' ? 35 : 20;
                return (
                    <div className="mode-content journal">
                        <h4 className="mode-title" style={{ color: '#cc99ff' }}>
                            <span className="mode-icon">📊</span> Data Journal
                        </h4>
                        <div className="journal-toggle-row">
                            <button
                                className={`journal-toggle-btn ${journalCategory === 'GLOBAL' ? 'active' : ''}`}
                                onClick={() => onJournalCategoryChange?.('GLOBAL')}
                            >
                                Global
                            </button>
                            <button
                                className={`journal-toggle-btn ${journalCategory === 'KOREAN' ? 'active' : ''}`}
                                onClick={() => onJournalCategoryChange?.('KOREAN')}
                            >
                                Korean
                            </button>
                        </div>

                        {/* Distribution */}
                        <div className="journal-section">
                            <span className="journal-section-title">분포율</span>
                            <div className="distribution-bars">
                                <div className="dist-item">
                                    <span className="dist-label">
                                        {journalCategory === 'KOREAN' ? 'Korean' : 'EP Survey'}
                                    </span>
                                    <div className="dist-bar-bg">
                                        <div className="dist-bar-fill" style={{
                                            width: `${(stat / maxStat) * 100}%`,
                                            background: `linear-gradient(90deg, ${node.color}, ${node.color}88)`
                                        }} />
                                    </div>
                                    <span className="dist-value">{stat}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Stress Dynamics */}
                        {stressSummary && (
                            <div className="journal-section">
                                <span className="journal-section-title">스트레스 동역학</span>
                                <div className="stress-dynamics-card">
                                    <div className="sd-bar-row">
                                        <span className="sd-label dis">분열</span>
                                        <div className="sd-bar-bg">
                                            <div className="sd-bar dis" style={{ width: `${stressSummary.disintegration}%` }} />
                                        </div>
                                        <span className="sd-val">{stressSummary.disintegration}%</span>
                                    </div>
                                    <div className="sd-bar-row">
                                        <span className="sd-label int">통합</span>
                                        <div className="sd-bar-bg">
                                            <div className="sd-bar int" style={{ width: `${stressSummary.integration}%` }} />
                                        </div>
                                        <span className="sd-val">{stressSummary.integration}%</span>
                                    </div>
                                    <div className="sd-ratio-row">
                                        <span className="sd-ratio-label">분열/통합 비</span>
                                        <span className={`sd-ratio-val ${stressSummary.riskLevel}`}>{stressSummary.ratio.toFixed(2)}</span>
                                        <span className={`sd-risk-badge ${stressSummary.riskLevel}`}>{stressSummary.riskLevel}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Dev Level Distribution */}
                        {devDist && (
                            <div className="journal-section">
                                <span className="journal-section-title">발달 수준 분포</span>
                                <div className="dev-level-bars">
                                    {['L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8'].map(key => {
                                        const val = devDist[key];
                                        const lvl = parseInt(key.replace('L', ''));
                                        const rangeClass = lvl <= 3 ? 'healthy' : lvl <= 6 ? 'average' : 'unhealthy';
                                        return (
                                            <div key={key} className={`dl-row ${rangeClass}`}>
                                                <span className="dl-label">L{lvl}</span>
                                                <div className="dl-bar-bg">
                                                    <div className="dl-bar" style={{ width: `${(val / 80) * 100}%` }} />
                                                </div>
                                                <span className="dl-val">{val > 0 ? `${val}%` : '—'}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Career */}
                        {node.career && (
                            <div className="journal-section">
                                <span className="journal-section-title">직업 경향성</span>
                                <div className="career-card">
                                    <span className="cc-field">{node.career.field}</span>
                                    <span className="cc-ratio">~{node.career.dominance}%</span>
                                </div>
                            </div>
                        )}

                        {/* Source */}
                        <div className="journal-source">
                            <span className="js-label">📎 Hur & Lee (2011); {DATA_SOURCES.ep.source}</span>
                        </div>
                    </div>
                );
            }
            default:
                return null;
        }
    };

    // Determine if we're in "global mode" (no node, but has activeMode)
    const isGlobalMode = !node && activeMode;

    return (
        <div className={`info-panel ${node || isGlobalMode ? 'active' : ''}`}>
            {/* Empty state (no node, no mode) */}
            {!node && !activeMode && (
                <div className="panel-empty-with-menu">
                    <div className="panel-empty">
                        <div className="panel-empty-icon">◎</div>
                        <p className="panel-empty-title">Enneagram Explorer</p>
                        <p className="panel-empty-desc">좌측 3D 모델에서 노드를 클릭하거나<br />아래 메뉴를 선택해 전체 유형을 탐색하세요.</p>
                    </div>
                    <div className="panel-bottom-section">
                        <PanelMenu activeMode={activeMode} onModeChange={onModeChange} />
                    </div>
                </div>
            )}

            {/* Global mode (no node, but activeMode is set) */}
            {isGlobalMode && (
                <>
                    <button className="close-btn" onClick={() => onModeChange(null)}>✕</button>
                    <div className="panel-top-section">
                        <div className="panel-header global-header">
                            <div className="type-number global-number">✦</div>
                            <div className="type-names">
                                <h2 className="type-name-en">All Types</h2>
                                <h3 className="type-name-kr">전체 유형</h3>
                            </div>
                        </div>
                        <div className="panel-body">
                            {renderGlobalContent()}
                        </div>
                    </div>
                    <div className="panel-bottom-section">
                        <PanelMenu activeMode={activeMode} onModeChange={onModeChange} />
                    </div>
                </>
            )}

            {/* Node-specific view */}
            {node && (
                <>
                    <button className="close-btn" onClick={onClose}>✕</button>

                    <div className="panel-top-section">
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
                            {renderContent()}
                        </div>
                    </div>

                    <div className="panel-bottom-section">
                        <PanelMenu activeMode={activeMode} onModeChange={onModeChange} />
                    </div>
                </>
            )}
        </div>
    );
}


