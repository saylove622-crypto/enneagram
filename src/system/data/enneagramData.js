/**
 * Enneagram Data Model - Based on Riso-Hudson Theory
 * Reference: https://www.enneagraminstitute.com/how-the-enneagram-system-works/
 */

// Color scheme for growth and stress paths
export const GROWTH_COLOR = '#00ffcc';
export const STRESS_COLOR = '#ff3366';

// Comprehensive Enneagram type data
export const ENNEAGRAM_DATA = [
  {
    id: 1,
    name: 'Reformer',
    krName: '개혁가',
    keywords: ['integrity', 'improvement', 'discipline'],
    center: 'gut',
    triad: 'Gut',
    hornevian: 'compliant',
    harmonic: 'competency',
    color: '#4A6FA5',
    growthTo: 7,
    stressTo: 4,
    stressIntensity: 0.70,
    growthShift_ko: '완벽주의가 완화되고 유연함·즐거움을 허용, 규칙보다 경험과 가능성을 더 탐색하게 됨.',
    stressShift_ko: '자기비판이 정서화되어 우울·자기연민으로 이동, "나는 충분히 좋지 않다"는 감정에 몰입.',
    desc: '원칙과 개선을 추구하는 완벽주의자. 옳고 그름에 대한 명확한 기준을 가지고 있으며, 세상을 더 나은 곳으로 만들기 위해 노력합니다.'
  },
  {
    id: 2,
    name: 'Helper',
    krName: '조력가',
    keywords: ['warmth', 'generosity', 'people-pleasing'],
    center: 'heart',
    triad: 'Heart',
    hornevian: 'compliant',
    harmonic: 'positive',
    color: '#E57373',
    growthTo: 4,
    stressTo: 8,
    stressIntensity: 0.80,
    growthShift_ko: '타인 중심에서 한 발 물러나 자기감정 인식·개성을 찾고, 진짜 욕구를 솔직히 표현.',
    stressShift_ko: '도움을 거절당할 때 분노·지배적 태도가 올라와, 상대를 통제하거나 죄책감을 유발하려 함.',
    desc: '따뜻하고 배려심 많은 조력자. 타인의 필요를 먼저 생각하고 관계 속에서 자신의 가치를 찾으며, 사랑받기를 원합니다.'
  },
  {
    id: 3,
    name: 'Achiever',
    krName: '성취가',
    keywords: ['ambition', 'efficiency', 'image'],
    center: 'heart',
    triad: 'Heart',
    hornevian: 'assertive',
    harmonic: 'competency',
    color: '#F9A825',
    growthTo: 6,
    stressTo: 9,
    stressIntensity: 0.65,
    growthShift_ko: '이미지 관리에서 내려와 협력·충성을 중시, 팀과 장기적 신뢰 기반 목표에 헌신.',
    stressShift_ko: '실패·평가 불안을 회피하기 위해 무기력·현실 도피로 가라앉고, 중요한 목표에서 이탈.',
    desc: '성공 지향적이고 효율적인 성취자. 목표 달성과 인정받는 것을 중요시하며, 자신의 이미지를 관리하는 데 능숙합니다.'
  },
  {
    id: 4,
    name: 'Individualist',
    krName: '예술가',
    keywords: ['depth', 'authenticity', 'sensitivity'],
    center: 'heart',
    triad: 'Heart',
    hornevian: 'withdrawn',
    harmonic: 'reactive',
    color: '#7E57C2',
    growthTo: 1,
    stressTo: 2,
    stressIntensity: 0.75,
    growthShift_ko: '감정 기복을 구조화해 원칙·책임감으로 조직화, 창의성을 실제 작업과 규율로 연결.',
    stressShift_ko: '인정욕구가 커지며 의존적·소유적 도움주기로 이동, "너 없이는 안 돼" 같은 감정적 압박을 강화.',
    desc: '깊이 있고 진정성을 추구하는 개성주의자. 독특함과 의미를 중요시하며, 감정적으로 예민하고 창의적입니다.'
  },
  {
    id: 5,
    name: 'Investigator',
    krName: '탐구가',
    keywords: ['analysis', 'detachment', 'knowledge'],
    center: 'head',
    triad: 'Head',
    hornevian: 'withdrawn',
    harmonic: 'competency',
    color: '#26C6DA',
    growthTo: 8,
    stressTo: 7,
    stressIntensity: 0.60,
    growthShift_ko: '머릿속 아이디어를 현실로 옮기며 단호함·실행력을 발휘, 경계를 유지하면서도 영향력을 행사.',
    stressShift_ko: '사고 과부하를 피하려고 충동적 계획·자극 추구로 분산, 깊이 대신 가벼운 즐거움에 집착.',
    desc: '지적이고 관찰력이 뛰어난 탐구자. 지식을 축적하고 이해하는 것을 중시하며, 에너지 보존을 위해 거리를 둡니다.'
  },
  {
    id: 6,
    name: 'Loyalist',
    krName: '충성가',
    keywords: ['loyalty', 'vigilance', 'anxiety'],
    center: 'head',
    triad: 'Head',
    hornevian: 'compliant',
    harmonic: 'reactive',
    color: '#FFB74D',
    growthTo: 9,
    stressTo: 3,
    stressIntensity: 0.85,
    growthShift_ko: '불안을 내려놓고 내적 평온·수용을 키워, 신뢰 기반으로 관계를 유지하고 과도한 의심을 줄임.',
    stressShift_ko: '인정·안전을 얻기 위해 성과·이미지 과투자로 이동, \'일중독\'이나 과도한 성취 경쟁에 빠지기 쉬움.',
    desc: '충성스럽고 책임감 있는 안전 추구자. 믿을 수 있는 관계와 시스템을 중시하며, 위험을 예측하고 대비합니다.'
  },
  {
    id: 7,
    name: 'Enthusiast',
    krName: '열정가',
    keywords: ['variety', 'optimism', 'spontaneity'],
    center: 'head',
    triad: 'Head',
    hornevian: 'assertive',
    harmonic: 'positive',
    color: '#FFEE58',
    growthTo: 5,
    stressTo: 1,
    stressIntensity: 0.90,
    growthShift_ko: '흩어진 관심을 줄이고 집중·깊이 있는 탐구를 통해 아이디어를 구조화, 자발성을 지식과 통찰로 정제.',
    stressShift_ko: '자유 제한에 반발하면서도 내면적으로 엄격한 자기비판·강박이 올라와, 자신이나 타인을 심하게 평가.',
    desc: '낙천적이고 다재다능한 열정가. 새로운 경험과 즐거움을 추구하며, 제한받는 것을 싫어합니다.'
  },
  {
    id: 8,
    name: 'Challenger',
    krName: '도전자',
    keywords: ['power', 'protection', 'intensity'],
    center: 'gut',
    triad: 'Gut',
    hornevian: 'assertive',
    harmonic: 'reactive',
    color: '#EF5350',
    growthTo: 2,
    stressTo: 5,
    stressIntensity: 0.78,
    growthShift_ko: '힘과 통제를 내려놓고 돌봄·배려를 표현, 약함을 인정하며 타인의 필요에 민감해짐.',
    stressShift_ko: '신뢰 붕괴 시 감정적 철수·과도한 관찰자 모드로 들어가, 감정을 차단하고 전략·정보에만 몰두.',
    desc: '강력하고 자기주장이 확실한 도전자. 정의와 보호를 중시하며, 약자를 지키고 부당함에 맞섭니다.'
  },
  {
    id: 9,
    name: 'Peacemaker',
    krName: '평화주의자',
    keywords: ['harmony', 'accommodation', 'inertia'],
    center: 'gut',
    triad: 'Gut',
    hornevian: 'withdrawn',
    harmonic: 'positive',
    color: '#81C784',
    growthTo: 3,
    stressTo: 6,
    stressIntensity: 0.55,
    growthShift_ko: '자신의 욕구·목표를 인식하여 주도적 성취·표현을 시도, 타인의 아젠다에 휩쓸리지 않고 전면에 나섬.',
    stressShift_ko: '갈등 회피가 깨질 때 걱정·우유부단·불신이 증가, 결정을 미루며 타인의 반응을 과도하게 염려.',
    desc: '평화롭고 수용적인 중재자. 조화와 안정을 추구하며, 갈등을 피하고 모든 관점을 이해하려 합니다.'
  }
];

// Triadic Group Metadata
export const TRIADIC_GROUPS = {
  center: {
    gut: { types: [8, 9, 1], theme: '분노, 자율성, 경계, 신체적 본능', icon: '⚡' },
    heart: { types: [2, 3, 4], theme: '수치심, 이미지, 관계·인정 욕구', icon: '❤️' },
    head: { types: [5, 6, 7], theme: '두려움, 안전, 예측·통제 욕구', icon: '🧠' }
  },
  hornevian: {
    compliant: { types: [1, 2, 6], description: '외부 기준·관계에 맞추려 함, "해야 한다/기대에 부응해야 한다" 에너지' },
    assertive: { types: [3, 7, 8], description: '앞으로 밀고 나감, 자신감 있게 욕구를 주장하고 상황을 리드' },
    withdrawn: { types: [4, 5, 9], description: '내면으로 물러나 관찰·공상·평온을 추구, 직접적 요구를 피하는 경향' }
  },
  harmonic: {
    positive: { types: [2, 7, 9], description: '긍정·희망 유지, 문제를 재해석하거나 가볍게 넘기며 정서적 톤을 올리려 함' },
    competency: { types: [1, 3, 5], description: '능력·논리·기능성을 통해 문제를 해결, 감정보다 성과·정확성을 중시' },
    reactive: { types: [4, 6, 8], description: '감정 반응이 강하고 관계 속에서 긴장·충돌을 통해 진정성·신뢰를 확인하려 함' }
  }
};

// Helper: Get node by ID
export function getNodeById(id) {
  return ENNEAGRAM_DATA.find(node => node.id === id);
}

// Helper: Calculate circular position on XZ plane (Y = 0)
export function getNodePosition(id) {
  const radius = 4;
  const angleOffset = -Math.PI / 2; // Start at top (12 o'clock)
  const angle = ((id - 1) / 9) * Math.PI * 2 + angleOffset;
  return [
    Math.cos(angle) * radius,
    0,
    Math.sin(angle) * radius
  ];
}

// Helper: Get types by group
export function getTypesByGroup(groupType, groupName) {
  return TRIADIC_GROUPS[groupType]?.[groupName]?.types || [];
}

// Helper: Get type's triadic classifications
export function getTypeTriads(typeId) {
  const node = getNodeById(typeId);
  if (!node) return null;

  return {
    center: node.center,
    hornevian: node.hornevian,
    harmonic: node.harmonic,
    centerInfo: TRIADIC_GROUPS.center[node.center],
    hornevianInfo: TRIADIC_GROUPS.hornevian[node.hornevian],
    harmonicInfo: TRIADIC_GROUPS.harmonic[node.harmonic]
  };
}
