import React from "react";

export default function RobotAvatar({ status = "idle" }) {
  
  return (
    <div className={`robot ${status}`}>
      <div className="robotHead">
        <div className="robotAntenna" />
        <div className="robotFace">
          <div className="robotEyes">
            <span className="eye" />
            <span className="eye" />
          </div>
          <div className="robotMouth" />
        </div>
      </div>
      <div className="robotLabel">
        <div className="robotName">ButlerBot</div>
        <div className="robotState">
          {status === "thinking" ? "Thinking…" : status === "ready" ? "Ready" : "Idle"}
        </div>
      </div>
    </div>
  );
}