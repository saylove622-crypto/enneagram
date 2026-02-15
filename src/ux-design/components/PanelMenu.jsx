import React from 'react';

export default function PanelMenu({ activeMode, onModeChange }) {
    const menuItems = [
        {
            id: 'GROWTH',
            label: '성장',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
            ),
            color: '#00ffcc'
        },
        {
            id: 'STRESS',
            label: '퇴화',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                    <polyline points="16 17 22 17 22 11"></polyline>
                </svg>
            ),
            color: '#ff3366'
        },
        {
            id: 'MISTAKABLE',
            label: '혼동 유형',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            ),
            color: '#ffcc00'
        },
        {
            id: 'JOURNAL',
            label: '데이터 저널',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            ),
            color: '#cc99ff'
        }
    ];

    return (
        <div className="panel-menu">
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    className={`menu-item ${activeMode === item.id ? 'active' : ''}`}
                    onClick={() => onModeChange(item.id)}
                    style={{ '--item-color': item.color }}
                >
                    <div className="icon-wrapper">
                        {item.icon}
                    </div>
                    <span className="menu-label">{item.label}</span>
                    {activeMode === item.id && (
                        <div className="active-indicator" style={{ background: item.color }} />
                    )}
                </button>
            ))}
        </div>
    );
}
