import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const schedule = [
  {
    time: "오전 9시",
    title: "열차 타기",
    detail: "서울역에서 강릉행 열차를 타고 여행 시작",
    accent: "01",
  },
  {
    time: "오전 11시",
    title: "강릉 도착",
    detail: "강릉역에 도착해서 본격 일정 스타트",
    accent: "02",
  },
  {
    time: "점심",
    title: "순두부찌개 먹기",
    detail: "강릉 대표 메뉴로 든든하고 따끈하게 충전",
    accent: "03",
  },
  {
    time: "오후 2시",
    title: "강릉 해안에서 해수욕",
    detail: "시원한 바다 앞에서 여름 무드 제대로 즐기기",
    accent: "04",
  },
  {
    time: "오후 4시",
    title: "카페거리에서 커피 한 잔",
    detail: "감성 카페에 들러 여유롭게 쉬어가기",
    accent: "05",
  },
  {
    time: "오후 6시",
    title: "횟집에서 회와 맥주",
    detail: "신선한 회와 시원한 맥주로 하루 마무리",
    accent: "06",
  },
];

const BG = "radial-gradient(circle at top left, rgba(29,185,84,0.16) 0%, rgba(26,5,51,0.9) 35%, #000000 100%)";
const SPOTIFY_GREEN = "#1DB954";
const PURPLE = "#1a0533";

const SectionLabel: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div
      style={{
        fontSize: 26,
        fontWeight: 700,
        color: "rgba(255,255,255,0.72)",
        letterSpacing: 4,
        textTransform: "uppercase",
      }}
    >
      {text}
    </div>
  );
};

const SceneCard: React.FC<{
  index: number;
  time: string;
  title: string;
  detail: string;
  accent: string;
}> = ({ index, time, title, detail, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = 90 + index * 70;
  const localFrame = frame - start;

  const entrance = spring({
    fps,
    frame: localFrame,
    config: {
      damping: 12,
      stiffness: 140,
      mass: 0.9,
    },
  });

  const opacity = interpolate(localFrame, [0, 8, 52, 68], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(entrance, [0, 1], [120, 0]);
  const scale = interpolate(entrance, [0, 1], [0.88, 1]);
  const glow = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <Sequence from={start} durationInFrames={82}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 64,
          opacity,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1000,
            minHeight: 420,
            borderRadius: 42,
            background: `linear-gradient(180deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.06) 100%), ${PURPLE}`,
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: `0 30px 120px rgba(0,0,0,0.4), 0 0 ${80 * glow}px rgba(29,185,84,0.18)`,
            padding: "42px 46px",
            color: "white",
            transform: `translateY(${translateY}px) scale(${scale})`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -10,
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0) 70%)",
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <SectionLabel text="Gangneung Trip" />
            <div style={{ fontSize: 82, fontWeight: 900, color: SPOTIFY_GREEN, lineHeight: 1 }}>{accent}</div>
          </div>

          <div style={{ marginTop: 36, color: SPOTIFY_GREEN, fontSize: 44, fontWeight: 900 }}>{time}</div>
          <div style={{ marginTop: 16, fontSize: 68, fontWeight: 900, lineHeight: 1.08 }}>{title}</div>
          <div
            style={{
              marginTop: 28,
              maxWidth: 760,
              fontSize: 31,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.86)",
              fontWeight: 700,
            }}
          >
            {detail}
          </div>

          <div
            style={{
              position: "absolute",
              left: 46,
              bottom: 34,
              display: "flex",
              gap: 12,
            }}
          >
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: dot === index % 3 ? SPOTIFY_GREEN : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const introEntrance = spring({
    fps,
    frame,
    config: {
      damping: 14,
      stiffness: 120,
    },
  });

  const introOpacity = interpolate(frame, [0, 12, 68, 86], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const introTranslate = interpolate(introEntrance, [0, 1], [80, 0]);

  return (
    <AbsoluteFill
      style={{
        background: BG,
        fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", Arial, sans-serif',
      }}
    >
      <Sequence from={0} durationInFrames={95}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 72,
            opacity: introOpacity,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 1080,
              transform: `translateY(${introTranslate}px)`,
            }}
          >
            <SectionLabel text="Spotify Wrapped Style V2" />
            <div
              style={{
                marginTop: 26,
                fontSize: 104,
                lineHeight: 0.98,
                color: "white",
                fontWeight: 900,
                letterSpacing: -2,
              }}
            >
              강릉 여행
              <br />
              브리핑
            </div>
            <div
              style={{
                marginTop: 30,
                fontSize: 34,
                color: SPOTIFY_GREEN,
                fontWeight: 900,
              }}
            >
              6개의 일정, 하루를 꽉 채운 트립 플랜
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 28,
                color: "rgba(255,255,255,0.72)",
                fontWeight: 700,
              }}
            >
              검정과 딥 퍼플 위에 초록 포인트, 카드형 팝업 모션으로 정리한 V2 버전
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
