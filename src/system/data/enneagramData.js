/**
 * Enneagram Data Model - Based on Riso-Hudson Theory
 * Reference: https://www.enneagraminstitute.com/how-the-enneagram-system-works/
 * 
 * Academic Sources:
 * - Hur, Y. & Lee, K. (2011). Korean Journal of Medical Education, 23(3), 175-184
 * - Ramos-Vera, C. et al. (2022). Frontiers in Psychology, 13, 1051271
 * - enneagram-personality.com Population Distribution Survey (n=189,957)
 * - Riso, D.R. & Hudson, R. (1996). Personality Types. Houghton Mifflin
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
    stressBehavior_ko: '감정적, 자기비판적, 우울해짐',
    desc: '원칙과 개선을 추구하는 완벽주의자. 옳고 그름에 대한 명확한 기준을 가지고 있으며, 세상을 더 나은 곳으로 만들기 위해 노력합니다.',
    levels: {
      growth: { name: 'Wise Realist', krName: '현명한 리얼리스트', keywords: ['Wise', 'Accepting', 'Noble', 'Pure', 'Realistic', 'Humane', 'Transcendent'] },
      stress: { name: 'Intolerant Misanthrope', krName: '편협한 인간혐오자', keywords: ['Intolerant', 'Self-Righteous', 'Inflexible', 'Punitive', 'Obsessive', 'Condemning'] }
    },
    distribution: { ep: 8.9, korean: 15.5 },
    mistakableTypes: [6, 4, 5],
    // Hur 2011 stress dynamics
    stressDynamics: { disintegration: 48.4, integration: 45.3, mediocre: 6.3, ratio: 1.07 },
    // Hur 2011 dev level distribution
    devLevelDist: { L2: 1.6, L3: 0, L4: 10.9, L5: 67.2, L6: 18.8, L7: 1.6, L8: 0 },
    // Career tendency
    career: { field: '회계/정밀 직무', fieldEn: 'Accounting & Precision', dominance: 16 },
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
    stressIntensity: 0.55,
    growthShift_ko: '타인 지향성에서 벗어나 자기 깊은 감정과 마주하며 진정한 내면의 필요를 인식.',
    stressShift_ko: '거부감에 격분, 강압적·통제적으로 변하며 분노를 통해 관계를 유지하려 함.',
    stressBehavior_ko: '강압적, 통제적, 분노 표출',
    desc: '따뜻하고 돌보는 성격의 소유자. 타인의 필요를 잘 감지하며, 사랑과 인정을 통해 관계를 맺습니다.',
    levels: {
      growth: { name: 'Disinterested Altruist', krName: '무사심의 이타주의자', keywords: ['Unconditional Love', 'Humble', 'Altruistic', 'Gracious', 'Joyous'] },
      stress: { name: 'Self-Deceptive Manipulator', krName: '자기기만적 조종가', keywords: ['Manipulative', 'Self-Deceptive', 'Guilt-Instilling', 'Entitled', 'Coercive', 'Hostile'] }
    },
    distribution: { ep: 8.5, korean: 8.9 },
    mistakableTypes: [9, 6, 4],
    stressDynamics: { disintegration: 40.5, integration: 51.4, mediocre: 8.1, ratio: 0.79 },
    devLevelDist: { L2: 0, L3: 0, L4: 32.4, L5: 54.1, L6: 13.5, L7: 0, L8: 0 },
    career: { field: '의료/간호/돌봄', fieldEn: 'Healthcare & Caregiving', dominance: 17 },
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
    stressIntensity: 0.60,
    growthShift_ko: '겉모습·업적 집착이 약해지고 내면의 진실과 안정감을 추구, 신뢰를 세우기 시작.',
    stressShift_ko: '에너지가 급격히 소진되어 무기력해지고, 감정을 차단한 채 방관자로 이탈.',
    stressBehavior_ko: '무기력, 이탈, 감정 마비',
    desc: '성공과 효율을 추구하는 야심가. 목표 지향적이며, 사회적 인정과 성취를 통해 자기 가치를 확인합니다.',
    levels: {
      growth: { name: 'Authentic Person', krName: '진정성 있는 사람', keywords: ['Self-Accepting', 'Inner-Directed', 'Authentic', 'Modest', 'Benevolent'] },
      stress: { name: 'Exploitative Opportunist', krName: '착취적 기회주의자', keywords: ['Exploitative', 'Deceptive', 'Narcissistic', 'Vindictive', 'Relentless', 'Psychopathic'] }
    },
    distribution: { ep: 10.5, korean: 3.9 },
    mistakableTypes: [7, 8, 1],
    stressDynamics: { disintegration: 56.3, integration: 31.5, mediocre: 12.5, ratio: 1.79 },
    devLevelDist: { L2: 0, L3: 0, L4: 12.5, L5: 68.8, L6: 18.8, L7: 0, L8: 0 },
    career: { field: '기업 경영자/임원', fieldEn: 'Business Executive', dominance: 16 },
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
    growthShift_ko: '감정 기복에서 벗어나 객관적 원칙과 규율을 내면화, 감정보다 행동에 초점을 맞추게 됨.',
    stressShift_ko: '과잉 의존적으로 변하며 사랑받기 위해 타인을 조종, 자신의 필요를 강요.',
    stressBehavior_ko: '과잉 의존, 타인 조종, 필요 강요',
    desc: '깊이와 진정성을 추구하는 감성적 탐구자. 독특한 정체성을 소중히 여기며, 내면의 감정에 충실합니다.',
    levels: {
      growth: { name: 'Inspired Creator', krName: '영감의 창조자', keywords: ['Profoundly Creative', 'Self-Renewing', 'Inspired', 'Transformative'] },
      stress: { name: 'Alienated Depressive', krName: '소외된 우울자', keywords: ['Depressed', 'Ashamed', 'Self-Inhibiting', 'Alienated', 'Paralyzed', 'Self-Destructive'] }
    },
    distribution: { ep: 15.0, korean: 8.7 },
    mistakableTypes: [1, 2, 9],
    stressDynamics: { disintegration: 50.0, integration: 44.4, mediocre: 5.6, ratio: 1.13 },
    devLevelDist: { L2: 2.8, L3: 0, L4: 25.0, L5: 52.8, L6: 16.7, L7: 0, L8: 0 },
    career: { field: '예술가/음악가/창작자', fieldEn: 'Artist & Creative', dominance: 14 },
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
    stressIntensity: 0.50,
    growthShift_ko: '내면 은둔에서 벗어나 결단력과 실행력을 발휘, 체험 속에서 자신감을 획득.',
    stressShift_ko: '지적 고갈 시 산만한 쾌락 추구로 도피, 과잉 자극을 통해 불안을 덮으려 함.',
    stressBehavior_ko: '산만, 충동적, 과잉 자극 추구',
    desc: '지식과 분석을 추구하는 관찰자. 객관적 이해를 중시하며, 자원의 보존과 독립성을 소중히 여깁니다.',
    levels: {
      growth: { name: 'Pioneering Visionary', krName: '선구적 비전가', keywords: ['Visionary', 'Open-Minded', 'Pioneering', 'Comprehensive', 'Original'] },
      stress: { name: 'Isolated Nihilist', krName: '고립된 허무주의자', keywords: ['Reclusive', 'Nihilistic', 'Eccentric', 'Fearful', 'Delusional', 'Schizoid'] }
    },
    distribution: { ep: 4.8, korean: 8.5 },
    mistakableTypes: [1, 4, 9],
    stressDynamics: { disintegration: 31.4, integration: 57.1, mediocre: 11.4, ratio: 0.55 },
    devLevelDist: { L2: 0, L3: 0, L4: 25.7, L5: 54.3, L6: 17.1, L7: 2.9, L8: 0 },
    career: { field: '과학자/연구자', fieldEn: 'Scientist & Researcher', dominance: 11 },
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
    stressIntensity: 0.65,
    growthShift_ko: '의심과 불안에서 벗어나 내면의 평화와 안정을 찾고, 존재 자체로의 만족감을 느끼게 됨.',
    stressShift_ko: '불안을 감추기 위해 과시적·경쟁적으로 변하며, 타인에게 잘 보이는 이미지에 집착.',
    stressBehavior_ko: '과시적, 경쟁적, 이미지 집착',
    desc: '안전과 신뢰를 추구하는 경계자. 충성심이 강하며, 위험을 예측하고 대비하는 능력이 뛰어납니다.',
    levels: {
      growth: { name: 'Valiant Hero', krName: '용감한 영웅', keywords: ['Trusting', 'Courageous', 'Self-Affirming', 'Heroic', 'Independent'] },
      stress: { name: 'Overreacting Dependent', krName: '과잉반응 의존자', keywords: ['Dependent', 'Self-Disparaging', 'Clinging', 'Paranoid', 'Panicky', 'Masochistic'] }
    },
    distribution: { ep: 16.1, korean: 6.5 },
    mistakableTypes: [1, 2, 9],
    stressDynamics: { disintegration: 14.8, integration: 70.4, mediocre: 14.8, ratio: 0.21 },
    devLevelDist: { L2: 0, L3: 3.7, L4: 33.3, L5: 48.1, L6: 14.8, L7: 0, L8: 0 },
    career: { field: '법률/규제 직무', fieldEn: 'Legal & Compliance', dominance: 12 },
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
    stressIntensity: 0.55,
    growthShift_ko: '자극 추구에서 멈추어 깊이 있는 관찰과 집중을 배우고, 질적 풍요를 얻게 됨.',
    stressShift_ko: '무비판적 쾌락에서 급격히 비판적·완벽주의적으로 전환, 타인과 자신을 엄격하게 심판.',
    stressBehavior_ko: '비판적, 완벽주의적, 경직',
    desc: '즐거움과 가능성을 추구하는 낙관주의자. 새로운 경험에 열려 있으며, 삶을 충만하게 살고자 합니다.',
    levels: {
      growth: { name: 'Ecstatic Appreciator', krName: '환희의 감상자', keywords: ['Joyous', 'Ecstatic', 'Grateful', 'Appreciative', 'Deeply Satisfied'] },
      stress: { name: 'Impulsive Escapist', krName: '충동적 도피자', keywords: ['Impulsive', 'Infantile', 'Addicted', 'Debauched', 'Manic', 'Panic-Stricken'] }
    },
    distribution: { ep: 13.7, korean: 8.2 },
    mistakableTypes: [3, 8, 2],
    stressDynamics: { disintegration: 38.2, integration: 41.2, mediocre: 20.6, ratio: 0.93 },
    devLevelDist: { L2: 0, L3: 0, L4: 17.6, L5: 76.5, L6: 5.9, L7: 0, L8: 0 },
    career: { field: '마케팅/미디어', fieldEn: 'Marketing & Media', dominance: 13 },
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
    stressIntensity: 0.80,
    growthShift_ko: '지배적 에너지를 내려놓고 공감을 배우며, 관대함과 보살핌을 통해 연결.',
    stressShift_ko: '적대적 에너지가 내면으로 향해 은둔·편집적 사고, 사회를 적대적으로 인식하며 철수.',
    stressBehavior_ko: '은둔, 편집적 사고, 사회적 철수',
    desc: '힘과 정의를 추구하는 도전자. 결단력이 강하며, 약한 자를 보호하고 환경을 통제하려 합니다.',
    levels: {
      growth: { name: 'Magnanimous Heart', krName: '관대한 심장', keywords: ['Compassionate', 'Empowering', 'Gentle', 'Magnanimous', 'Forbearing'] },
      stress: { name: 'Ruthless Outlaw', krName: '무자비한 무법자', keywords: ['Ruthless', 'Destructive', 'Dictatorial', 'Megalomaniac', 'Violent', 'Sociopathic'] }
    },
    distribution: { ep: 6.3, korean: 7.0 },
    mistakableTypes: [3, 6, 1],
    stressDynamics: { disintegration: 44.8, integration: 48.3, mediocre: 6.9, ratio: 0.93 },
    devLevelDist: { L2: 0, L3: 0, L4: 31.0, L5: 55.2, L6: 13.8, L7: 0, L8: 0 },
    career: { field: '기업가/창업가/리더십', fieldEn: 'Entrepreneur & Leadership', dominance: 22 },
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
    stressIntensity: 0.85,
    growthShift_ko: '수동적 조율에서 벗어나 능동적 목표 설정과 자기 주장을 연습, 에너지를 외부로 발산.',
    stressShift_ko: '내면의 평화가 무너지면 의심·불안이 급증, 방어적이고 걱정에 사로잡히게 됨.',
    stressBehavior_ko: '불안, 의심, 방어적 사고',
    desc: '평화와 조화를 추구하는 중재자. 갈등을 회피하며, 모든 관점을 이해하려는 포용력을 지닙니다.',
    levels: {
      growth: { name: 'Self-Possessed Guide', krName: '자기확립된 안내자', keywords: ['Self-Possessed', 'Dynamic', 'Serene', 'Exuberant', 'All-Embracing'] },
      stress: { name: 'Denying Doormat', krName: '부정하는 희생양', keywords: ['Denying', 'Neglectful', 'Dissociated', 'Numb', 'Helpless', 'Self-Abandoning'] }
    },
    distribution: { ep: 16.2, korean: 32.9 },
    mistakableTypes: [2, 4, 6],
    stressDynamics: { disintegration: 73.5, integration: 19.9, mediocre: 6.6, ratio: 3.69 },
    devLevelDist: { L2: 0, L3: 0, L4: 2.9, L5: 58.1, L6: 35.3, L7: 2.9, L8: 0.7 },
    career: { field: '상담/교육/HR', fieldEn: 'Counseling & Education', dominance: 14 },
  }
];

// ── Career Data by Occupation ──
export const CAREER_DATA = [
  { field: '의료/간호/돌봄', fieldEn: 'Healthcare & Caregiving', dominantType: 2, ratio: 17, source: 'ZipDo 2025' },
  { field: '예술가/음악가/창작자', fieldEn: 'Artist & Creative', dominantType: 4, ratio: 14, source: 'ZipDo 2025' },
  { field: '과학자/연구자', fieldEn: 'Scientist & Researcher', dominantType: 5, ratio: 11, source: 'ZipDo 2025' },
  { field: '기업 경영자/임원', fieldEn: 'Business Executive', dominantType: 3, ratio: 16, source: 'Truity' },
  { field: '기업가/창업가', fieldEn: 'Entrepreneur', dominantType: 8, ratio: 21, source: 'ZipDo 2025' },
  { field: '회계/정밀 직무', fieldEn: 'Accounting & Precision', dominantType: 1, ratio: 16, source: 'ZipDo 2025' },
  { field: '리더십/조직 리더', fieldEn: 'Leadership', dominantType: 8, ratio: 22, source: 'ZipDo 2025' },
];

// ── Development Level Framework (Riso-Hudson) ──
export const DEV_LEVELS = [
  { level: 1, name: 'Level of Liberation', krName: '해방', range: 'Healthy', state: '자기 이미지로부터의 자유, 덕성(Virtue)의 발현' },
  { level: 2, name: 'Level of Psychological Capacity', krName: '심리적 능력', range: 'Healthy', state: '기본 욕구와 자아상 형성, 잠재력의 극대화' },
  { level: 3, name: 'Level of Social Value', krName: '사회적 가치', range: 'Healthy', state: '재능의 외적 표현, 건설적 관계 형성' },
  { level: 4, name: 'Level of Imbalance', krName: '불균형', range: 'Average', state: '사회적 역할에의 집착, 이상화의 시작' },
  { level: 5, name: 'Level of Interpersonal Control', krName: '대인관계 통제', range: 'Average', state: '타인 조종, 자아상 강요, 갈등 표면화' },
  { level: 6, name: 'Level of Overcompensation', krName: '과잉보상', range: 'Average', state: '방어기제 강화, 흑백논리 발동' },
  { level: 7, name: 'Level of Violation', krName: '침해', range: 'Unhealthy', state: '현실 괴리, 자기/타인 침해, 방어기제 붕괴' },
  { level: 8, name: 'Level of Obsession', krName: '강박', range: 'Unhealthy', state: '강박적 사고와 충동적 행동' },
  { level: 9, name: 'Level of Pathological Destructiveness', krName: '병적 파괴', range: 'Unhealthy', state: '심각한 정신 병리' },
];

// ── Subtype Group Scores (Hur 2011) ──
export const SUBTYPE_SCORES = {
  center: {
    gut: { types: [1, 8, 9], mean: 4.68, sd: 0.42, f: 17.36, p: '<0.001' },
    heart: { types: [2, 3, 4], mean: 4.46, sd: 0.45 },
    head: { types: [5, 6, 7], mean: 4.41, sd: 0.40 },
  },
  hornevian: {
    assertive: { types: [3, 7, 8], mean: 4.51, sd: 0.41, f: 15.61, p: '<0.001' },
    withdrawn: { types: [4, 5, 9], mean: 4.68, sd: 0.44 },
    compliant: { types: [1, 2, 6], mean: 4.40, sd: 0.39 },
  },
  harmonic: {
    positive: { types: [2, 7, 9], mean: 4.67, sd: 0.41, f: 11.50, p: '<0.001' },
    competency: { types: [1, 3, 5], mean: 4.51, sd: 0.41 },
    reactive: { types: [4, 6, 8], mean: 4.43, sd: 0.48 },
  },
};

// ── Stress Duration Patterns (Chestnut) ──
export const STRESS_DURATION = [
  { type: 'temporary', krName: '일시적 스트레스', duration: '수시간~수일', recovery: '자연 회복 가능', color: '#66bb6a' },
  { type: 'acute', krName: '급성 위기', duration: '상황 해결 시 즉시', recovery: '빠른 반등', color: '#ffca28' },
  { type: 'sustained', krName: '지속적 압박', duration: '수주~수개월', recovery: '분열 패턴 고착화', color: '#ffa726' },
  { type: 'chronic', krName: '만성 과부하', duration: '근본 원인 해결 전까지', recovery: '통합 거의 불가능', color: '#ef5350' },
  { type: 'integration', krName: '통합(성장)', duration: '6~18개월 의식적 노력', recovery: '점진적 역량 구축', color: '#42a5f5' },
];

// ── Network Analysis Data (Ramos-Vera 2022, n=859) ──
export const NETWORK_ANALYSIS = {
  source: 'Ramos-Vera et al. (2022). Frontiers in Psychology',
  sample: 'n=859 (페루 대학생)',
  method: 'Gaussian Graphical Model + Graphical LASSO',
  highestCluster: [4, 5, 6],
  highestPredictability: 6,
  bridgeNode: 7,
  centralNodes: [6, 7, 8],
};

// ── Data Source Citations ──
export const DATA_SOURCES = {
  ep: { label: 'EP Survey', n: 189957, note: '온라인 자기보고식, 자기선택 편향 가능', source: 'enneagram-personality.com' },
  korean: { label: 'Korean Medical Students', n: 414, note: '한국 의대생 집단, 일반화 주의', source: 'Hur & Lee (2011)' },
  career: { label: 'Career Trends', note: '서베이 기반 추정치', source: 'ZipDo 2025; Truity Career Research' },
  rheti: { label: 'RHETI Reliability', alpha: '0.72-0.84', retest: '0.72-0.92' },
  kepti: { label: 'KEPTI (한국형)', alpha: '0.90', retest: '0.89', validity: '0.82' },
};

// ── Overall Stats (Hur 2011) ──
export const OVERALL_STATS = {
  totalDisintegration: 51.7,
  totalIntegration: 39.4,
  totalMediocre: 8.9,
  totalRatio: 1.31,
  levelDistribution: { healthy: 0.7, average: 97.4, unhealthy: 1.9 },
  chisquare: { value: 59.2, p: '<0.001' },
};

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

// Helper: Get mistakable types info
export function getMistakableTypes(typeId) {
  const node = getNodeById(typeId);
  if (!node || !node.mistakableTypes) return [];
  return node.mistakableTypes.map(id => getNodeById(id)).filter(Boolean);
}

// Helper: Get stress dynamics summary
export function getStressSummary(typeId) {
  const node = getNodeById(typeId);
  if (!node || !node.stressDynamics) return null;
  const d = node.stressDynamics;
  return {
    ...d,
    isHighRisk: d.ratio > 1.0,
    riskLevel: d.ratio >= 3.0 ? 'critical' : d.ratio >= 1.5 ? 'high' : d.ratio >= 1.0 ? 'moderate' : 'low',
  };
}
