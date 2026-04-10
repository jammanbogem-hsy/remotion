import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const schedule = [
  { time: "오전 9시", title: "열차 타기", emoji: "🚆", detail: "서울역에서 강릉행 열차 탑승" },
  { time: "오전 11시", title: "강릉 도착", emoji: "📍", detail: "강릉역 도착 후 바로 일정 시작" },
  { time: "점심", title: "순두부찌개 먹기", emoji: "🍲", detail: "강릉 대표 메뉴로 든든하게 점심" },
  { time: "오후 2시", title: "강릉 해안 해수욕", emoji: "🏖️", detail: "푸른 바다 보며 시원하게 물놀이" },
  { time: "오후 4시", title: "카페거리 커피 한 잔", emoji: "☕", detail: "감성 카페에서 잠깐 쉬어가기" },
  { time: "오후 6시", title: "횟집에서 회와 맥주", emoji: "🍻", detail: "신선한 회에 시원한 맥주로 마무리" },
];

const bgColors = [
  ["#0f172a", "#1d4ed8"],
  ["#1e293b", "#0ea5e9"],
  ["#3f3f46", "#f97316"],
  ["#164e63", "#06b6d4"],
  ["#4c1d95", "#ec4899"],
  ["#14532d", "#f59e0b"],
];

const SceneCard: React.FC<{
  index: number;
  time: string;
  title: string;
  detail: string;
  emoji: string;
}> = ({ index, time, title, detail, emoji }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - index * 75;

  const entrance = spring({
    fps,
    frame: localFrame,
    config: {
      damping: 14,
      stiffness: 120,
    },
  });

  const opacity = interpolate(localFrame, [0, 10, 60, 72], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(entrance, [0, 1], [80, 0]);
  const scale = interpolate(entrance, [0, 1], [0.92, 1]);
  const colors = bgColors[index % bgColors.length];

  return (
    <Sequence from={index * 75} durationInFrames={90}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
          opacity,
          padding: 70,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 980,
            borderRadius: 36,
            backgroundColor: "rgba(255,255,255,0.14)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.22)",
            backdropFilter: "blur(18px)",
            padding: "42px 48px",
            color: "white",
            transform: `translateY(${translateY}px) scale(${scale})`,
          }}
        >
          <div style={{ fontSize: 34, opacity: 0.9, marginBottom: 18 }}>{time}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ fontSize: 84, lineHeight: 1 }}>{emoji}</div>
            <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            {detail}
          </div>
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const introScale = spring({
    fps,
    frame,
    config: {
      damping: 16,
      stiffness: 110,
    },
  });

  const introOpacity = interpolate(frame, [0, 18, 55], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", fontFamily: "Pretendard, Arial, sans-serif" }}>
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            background: "radial-gradient(circle at top, #38bdf8 0%, #0f172a 55%, #020617 100%)",
            color: "white",
            opacity: introOpacity,
          }}
        >
          <div
            style={{
              textAlign: "center",
              transform: `scale(${interpolate(introScale, [0, 1], [0.85, 1])})`,
            }}
          >
            <div style={{ fontSize: 30, letterSpacing: 10, opacity: 0.8, marginBottom: 20 }}>
              TRAVEL BRIEFING
            </div>
            <div style={{ fontSize: 88, fontWeight: 900, lineHeight: 1.1 }}>강릉 여행 브리핑</div>
            <div style={{ fontSize: 34, marginTop: 26, opacity: 0.92 }}>
              하루 일정, 한 번에 쫙 정리
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {schedule.map((item, index) => (
        <SceneCard key={`${item.time}-${item.title}`} index={index} {...item} />
      ))}
    </AbsoluteFill>
  );
};
