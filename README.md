# 🌌 Neon Enneagram Orbit: Theoretical Visualization

**Neon Enneagram Orbit**는 Riso-Hudson 에니어그램 이론을 기반으로 인간 심리의 역동성을 3차원 공간에서 시각화한 인터랙티브 데이터 저널입니다. '에너지 흐름'과 '회전하는 다이아몬드'를 메타포로 하여, 성격 유형 간의 복잡한 연결성과 심리적 변화를 세련된 네온 그래픽으로 표현합니다.

---

## 🚀 주요 업데이트 및 특징

### **1. Riso-Hudson 이론 기반 데이터 통합**
단순한 정보를 넘어 전문적인 심리 이론을 데이터 모델에 투영했습니다.
* **핵심 키워드**: 각 유형별 3개의 핵심 특성 키워드 제공.
* **삼원법(Triadic Groups) 분류**: 
  - **Center**: 지능 중심 (장/가슴/머리)
  - **Hornevian Group**: 사회적 에너지 스타일 (순응/주장/수용)
  - **Harmonic Group**: 갈등 대처 스타일 (긍정/능력/반응)
* **심리적 변화 기술**: 성장(Growth) 및 스트레스(Stress) 방향에 따른 상세한 행동 변화 설명 포함.

### **2. 다이아몬드(Plumbob) 노드 디자인**
기본 구체 형태에서 벗어나 더욱 상징적인 디자인을 적용했습니다.
* **Octahedron Geometry**: 심즈의 플럼밥을 연상시키는 정팔면체 다이아몬드 형태.
* **자전 애니메이션**: 각 노드가 스스로 회전하며 생동감 있는 에너지를 뿜어냅니다.
* **Soft spread Aura**: 중첩된 4단계 레이어 오라를 통해 빛이 안개처럼 부드럽게 확산되는 고품질 그래픽 구현.

### **3. 현대적 시스템 아키텍처**
유지보수와 확장성을 고려하여 프로젝트 구조를 재설계했습니다.
* **`src/system/`**: 핵심 프레임워크 로직 및 에니어그램 데이터 모델 관리.
* **`src/ux-design/`**: 3D 컴포넌트 시각화 및 UI 스타일링 전담.

### **4. 최적화된 하이브리드 레이아웃**
* **PC 모드**: 좌측 3D 씬과 우측 상세 정보 패널이 공존하는 와이드 스플릿 뷰.
* **Mobile 모드**: 전체 화면 3D 뷰와 하단 슬라이드업 정보 패널.

---

## 🛠 Tech Stack
* **Frontend**: React 19, Vite
* **3D Engine**: Three.js (R3F, Drei)
* **Theoretical Model**: Riso-Hudson Enneagram System
* **Visual Effects**: Post-processing (Bloom, Layered Aura)
* **Typography**: Inter, JetBrains Mono

---

## ✨ Key Features
* **Theoretical Visualization**: 실제 심리 이론에 근거한 데이터 시각화.
* **Kinetic Interaction**: 노드 클릭 시 활성화되는 에너지 파티클 궤적 시스템.
* **Subtle Neon Aesthetics**: 시각적 피로도를 낮춘 세련되고 은은한 네온 글로우.
* **Dynamic Information Panel**: 유형별 센터, 그룹, 행동 변화를 한눈에 보여주는 데이터 UI.

---

## 🏃 실행 방법
1. 의존성 설치: `npm install`
2. 개발 서버 실행: `npm run dev`
3. 브라우저 확인: `http://localhost:5173`

---

## 🔮 Future Roadmap
- [ ] 개별 사용자 데이터 연동 (LocalStorage/Database)
- [ ] 날짜별 심리 상태 기록 및 에너지 강도 로그 저장
- [ ] 각 삼원법(Center/Hornevian/Harmonic) 그룹별 하이라이트 필터 기능
- [ ] AR/VR 모드 지원 (WebXR)
