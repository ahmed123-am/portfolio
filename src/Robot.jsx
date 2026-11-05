import { useRef, useState } from "react";

export default function Robot({ lang }) {
  const stageRef = useRef(null);
  const [gaze, setGaze] = useState({ x: 0, y: 0, rx: 0, ry: 0 });

  function followPointer(event) {
    if (event.pointerType !== "mouse" || !stageRef.current) return;
    const bounds = stageRef.current.getBoundingClientRect();
    const nx = (event.clientX - bounds.left) / bounds.width - 0.5;
    const ny = (event.clientY - bounds.top) / bounds.height - 0.5;
    setGaze({
      x: Math.max(-8, Math.min(8, nx * 16)),
      y: Math.max(-6, Math.min(6, ny * 12)),
      rx: Math.max(-2.5, Math.min(2.5, ny * -5)),
      ry: Math.max(-3.5, Math.min(3.5, nx * 7)),
    });
  }

  function resetGaze() {
    setGaze({ x: 0, y: 0, rx: 0, ry: 0 });
  }

  return (
    <div
      className="hero-visual reveal"
      id="robot-stage"
      ref={stageRef}
      onPointerMove={followPointer}
      onPointerLeave={resetGaze}
      aria-label={lang === "ar" ? "روبوت هولوجرام يتابع حركة المؤشر" : "Holographic robot following the pointer"}
    >
      <div className="visual-grid" aria-hidden="true" />
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <div className="orbit-node node-one" aria-hidden="true" />
      <div className="orbit-node node-two" aria-hidden="true" />
      <div className="visual-label label-top"><span>RF / 01</span><i /><span>LINK ACTIVE</span></div>
      <div className="robot-halo" aria-hidden="true" />
      <div
        className="robot-layer"
        style={{ transform: `translate3d(${gaze.x * 0.48}px, ${gaze.y * 0.38}px, 0)` }}
      >
        <svg className="robot-svg" viewBox="0 0 440 540" role="img" aria-labelledby="robot-title robot-desc">
          <title id="robot-title">Signal robot</title>
          <desc id="robot-desc">A complete holographic robot with eyes that follow the mouse pointer.</desc>
          <defs>
            <filter id="cyan-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="robot-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#102743" stopOpacity=".97" />
              <stop offset="1" stopColor="#081421" stopOpacity=".99" />
            </linearGradient>
          </defs>
          <g className="robot-rings" fill="none" stroke="#1c9fca" strokeWidth="1.2" opacity=".43">
            <ellipse cx="220" cy="282" rx="168" ry="177" transform="rotate(-14 220 282)" />
            <ellipse cx="220" cy="282" rx="195" ry="151" transform="rotate(15 220 282)" strokeDasharray="3 11" />
          </g>
          <g
            className="robot-drawing"
            fill="none"
            stroke="#54e8ff"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#cyan-glow)"
            style={{ transform: `rotateX(${gaze.rx}deg) rotateY(${gaze.ry}deg)` }}
          >
            <path className="trace trace-late" d="M220 55v27M204 55h32" strokeWidth="4" />
            <circle className="trace trace-late antenna-light" cx="220" cy="45" r="9" strokeWidth="3" />
            <path className="trace trace-late" d="M170 94c9-15 26-24 50-24s41 9 50 24" strokeWidth="2.5" opacity=".72" />
            <g className="robot-arms">
              <path className="trace trace-late" d="M154 284q-18-1-30 17l-20 29q-7 10-1 20l11 17M286 284q18-1 30 17l20 29q7 10 1 20l-11 17" strokeWidth="8" />
              <path className="trace trace-late" d="M111 362v12q0 8 8 8h7q8 0 8-8v-10M329 362v12q0 8-8 8h-7q-8 0-8-8v-10" strokeWidth="3" />
              <circle className="trace trace-late" cx="119" cy="333" r="8" strokeWidth="3" />
              <circle className="trace trace-late" cx="321" cy="333" r="8" strokeWidth="3" />
            </g>
            <path className="trace trace-late" d="M110 151H91a18 18 0 0 0 0 36h19M330 151h19a18 18 0 0 1 0 36h-19" strokeWidth="4" />
            <rect className="trace trace-late" x="78" y="157" width="13" height="25" rx="6" strokeWidth="3" />
            <rect className="trace trace-late" x="349" y="157" width="13" height="25" rx="6" strokeWidth="3" />
            <rect className="robot-head trace" x="112" y="91" width="216" height="166" rx="48" fill="url(#robot-fill)" strokeWidth="4" />
            <path className="trace trace-late" d="M145 139q12-10 26-7M269 132q14-3 26 7" strokeWidth="3" opacity=".65" />
            <g className="robot-eyes">
              <circle cx="171" cy="171" r="20" fill="#071827" stroke="#278eaa" strokeWidth="2" />
              <circle cx="269" cy="171" r="20" fill="#071827" stroke="#278eaa" strokeWidth="2" />
              <g className="robot-pupil" style={{ transform: `translate(${gaze.x}px, ${gaze.y}px)` }}>
                <circle cx="171" cy="171" r="7" fill="#b5ff53" stroke="none" />
                <circle cx="173" cy="168" r="2" fill="#f1ffda" stroke="none" />
              </g>
              <g className="robot-pupil" style={{ transform: `translate(${gaze.x}px, ${gaze.y}px)` }}>
                <circle cx="269" cy="171" r="7" fill="#b5ff53" stroke="none" />
                <circle cx="271" cy="168" r="2" fill="#f1ffda" stroke="none" />
              </g>
              <path className="trace trace-late" d="M149 171h4M287 171h4" strokeWidth="2" opacity=".55" />
            </g>
            <path className="trace trace-late" d="M190 211q30 26 60 0" strokeWidth="4" />
            <circle className="trace trace-late" cx="137" cy="215" r="4" strokeWidth="2" opacity=".65" />
            <circle className="trace trace-late" cx="303" cy="215" r="4" strokeWidth="2" opacity=".65" />
            <path className="trace trace-late" d="M196 257v17M244 257v17" strokeWidth="5" />
            <path className="robot-body trace" d="M150 294q0-22 22-22h96q22 0 22 22v103q0 19-19 19h-102q-19 0-19-19z" fill="url(#robot-fill)" strokeWidth="4" />
            <path className="trace trace-late" d="M172 311q0-9 9-9h78q9 0 9 9v48q0 9-9 9h-78q-9 0-9-9zM185 385h70" strokeWidth="2.5" opacity=".75" />
            <circle className="trace trace-late core-pulse" cx="220" cy="335" r="12" strokeWidth="3" />
            <path className="trace trace-late" d="M202 335h36M220 317v36M190 323l60 24M250 323l-60 24" strokeWidth="1.6" opacity=".8" />
            <path className="trace trace-late" d="M177 416h86l-13 22h-60z" fill="#0b1d2d" strokeWidth="3" />
            <path className="trace trace-late" d="M187 438v37q0 10 10 10h13q9 0 9-10v-37M253 438v37q0 10-10 10h-13q-9 0-9-10v-37" fill="#0b1d2d" strokeWidth="4" />
            <path className="trace trace-late" d="M188 475v11q-2 9-14 16l-12 7q-6 5 2 10h61q8-1 5-9l-11-18v-17M252 475v11q2 9 14 16l12 7q6 5-2 10h-61q-8-1-5-9l11-18v-17" fill="url(#robot-fill)" strokeWidth="4" />
            <path className="trace trace-late" d="M165 508h58M217 508h58" strokeWidth="4" />
          </g>
          <g className="robot-signal" fill="none" stroke="#b5ff53" strokeLinecap="round" strokeWidth="2" opacity=".9">
            <path d="M379 235q15 22 0 44" /><path d="M393 222q25 34 0 70" opacity=".6" />
            <path d="M60 237q-15 22 0 44" /><path d="M46 224q-25 34 0 70" opacity=".6" />
          </g>
        </svg>
      </div>
      <div className="visual-label label-bottom">
        <span className="signal-bars"><i /><i /><i /><i /></span>
        <span>{lang === "ar" ? "إشارة مستقرة" : "Signal steady"}</span>
        <span className="label-divider" />
        <span>24.7<span className="small-unit">GHz</span></span>
      </div>
      <div className="floating-chip chip-code"><span>&lt;/&gt;</span><small>FRONT-END</small></div>
      <div className="floating-chip chip-signal"><span>∿</span><small>COMMS</small></div>
    </div>
  );
}
