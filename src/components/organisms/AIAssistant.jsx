import React, { useEffect, useMemo, useState } from "react";
import Pill from "../atoms/Pill";
import SuggestionCard from "../molecules/SuggestionCard";
import RobotAvatar from "../atoms/RobotAvatar";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function AIAssistant({
  suggestions,
  activeSuggestionId,
  setActiveSuggestionId,
  hasOffer,
  thinkingTrigger,
}) {
  const [status, setStatus] = useState("idle"); 
  const [progress, setProgress] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [visibleSuggestions, setVisibleSuggestions] = useState([]);

  const resultMessage = useMemo(() => {
    if (!hasOffer) return "";
    return "Offer generated. I’m scanning for risks and next-best actions.";
  }, [hasOffer]);

  const showBubble = status === "thinking" || hasOffer;

  const bubbleText = status === "thinking" ? typedText : resultMessage;

 
  const shouldShowSuggestions = hasOffer && (status === "thinking" || status === "ready");

  useEffect(() => {
    let cancelled = false;

    async function runThinking() {
      if (!thinkingTrigger) return;

      setStatus("thinking");
      setProgress(0);
      setTypedText("");
      setVisibleSuggestions([]);

      const full =
        "Analyzing room size, route complexity, date demand, and potential friction points…";

      for (let i = 0; i < full.length; i++) {
        if (cancelled) return;
        setTypedText(full.slice(0, i + 1));
        await sleep(12);
      }

      for (let p = 0; p <= 100; p += 5) {
        if (cancelled) return;

        setProgress(p);

        if (p === 25 && suggestions[0]) setVisibleSuggestions((v) => [...v, suggestions[0]]);
        if (p === 45 && suggestions[1]) setVisibleSuggestions((v) => [...v, suggestions[1]]);
        if (p === 65 && suggestions[2]) setVisibleSuggestions((v) => [...v, suggestions[2]]);
        if (p === 80 && suggestions[3]) setVisibleSuggestions((v) => [...v, suggestions[3]]);
        if (p === 95 && suggestions[4]) setVisibleSuggestions((v) => [...v, suggestions[4]]);

        await sleep(70);
      }

      if (!cancelled) {
        setVisibleSuggestions(suggestions);
        setStatus("ready");
      }
    }

    runThinking();
    return () => {
      cancelled = true;
    };
  }, [thinkingTrigger, suggestions]);


  const listToShow = status === "thinking" ? visibleSuggestions : suggestions;

  return (
    <div className="card">
      <div className="cardHeader">
        <h2>AI Assistant</h2>
        <Pill>{status === "thinking" ? "Thinking" : "Simulated"}</Pill>
      </div>

      <div className="aiTop">
        <div className="aiRobotCol">
          <RobotAvatar
            status={status === "thinking" ? "thinking" : hasOffer ? "ready" : "idle"}
          />

          {showBubble && (
            <>
              <div className="aiBubble">
                {bubbleText}
                {status === "thinking" && <span className="cursor">▍</span>}
              </div>

              {status === "thinking" && (
                <div className="aiProgressRow">
                  <div className="aiProgressBar">
                    <div className="aiProgressFill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="aiProgressPct">{progress}%</div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="aiTopText">
          <div className="aiIntroTitle">
            {hasOffer
              ? status === "thinking"
                ? "Running a checklist..."
                : "Recommendations ready."
              : "Create an offer to get AI suggestions."}
          </div>
          <div className="aiIntroSub">
            {hasOffer
              ? "Rules-based suggestions."
              : "I’ll analyze risk factors like parking, distance, and time constraints."}
          </div>
        </div>
      </div>

      {shouldShowSuggestions ? (
        <div className="aiList">
          {listToShow.map((s) => (
            <SuggestionCard
              key={s.id}
              suggestion={s}
              active={activeSuggestionId === s.id}
              onClick={() =>
                setActiveSuggestionId((prev) => (prev === s.id ? null : s.id))
              }
            />
          ))}
        </div>
      ) : (
        <div className="emptyState">Create an offer to generate AI suggestions.</div>
      )}

      <div className="aiFooter">
        <div className="aiFooterText">
          {hasOffer
            ? "Tip: confirm parking/elevator info early to avoid delays."
            : "Tip: more accurate inputs → better suggestions."}
        </div>
      </div>
    </div>
  );
}