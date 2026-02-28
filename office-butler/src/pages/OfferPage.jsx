// src/pages/OfferPage.jsx
import React, { useMemo, useState } from "react";

import Topbar from "../components/organisms/Topbar";
import OfferForm from "../components/organisms/OfferForm";
import OfferResult from "../components/organisms/OfferResult";
import AIAssistant from "../components/organisms/AIAssistant";
import TaskSection from "../components/organisms/TaskSection";

import { buildOffer } from "../utils/offer";
import { buildSuggestions } from "../utils/suggestions";
import { buildInitialTasks } from "../utils/tasks";

export default function OfferPage() {
  // Inputs
  const [rooms, setRooms] = useState(3.5);
  const [startAddress, setStartAddress] = useState("");
  const [destAddress, setDestAddress] = useState("");
  const [date, setDate] = useState("");

  // Output
  const [offer, setOffer] = useState(null);
  const [tasks, setTasks] = useState([]);

  // AI UI state
  const [activeSuggestionId, setActiveSuggestionId] = useState(null);
  const [thinkingTrigger, setThinkingTrigger] = useState(0);

  const canCreate = useMemo(() => {
    return (
      String(rooms).length > 0 &&
      startAddress.trim().length >= 4 &&
      destAddress.trim().length >= 4 &&
      !!date
    );
  }, [rooms, startAddress, destAddress, date]);

  const suggestions = useMemo(() => {
    return buildSuggestions({ rooms, startAddress, destAddress, date });
  }, [rooms, startAddress, destAddress, date]);

  function onCreateOffer() {
    if (!canCreate) return;

    // Build offer result
    const nextOffer = buildOffer({ rooms, startAddress, destAddress, date });
    setOffer(nextOffer);

    // Build tasks
    const nextTasks = buildInitialTasks({ rooms, startAddress, destAddress, date });
    setTasks(nextTasks);

    // Reset AI selection + trigger "thinking" animation
    setActiveSuggestionId(null);
    setThinkingTrigger((n) => n + 1);
  }

  function toggleTask(taskId) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: t.status === "done" ? "open" : "done" } : t
      )
    );
  }

  function resetAll() {
    setRooms(3.5);
    setStartAddress("");
    setDestAddress("");
    setDate("");

    setOffer(null);
    setTasks([]);

    setActiveSuggestionId(null);
    setThinkingTrigger(0);
  }

  const openCount = tasks.filter((t) => t.status === "open").length;

  return (
    <div className="app">
      <Topbar onReset={resetAll} />

      <main className="grid">
        <section className="stack">
          <OfferForm
            rooms={rooms}
            setRooms={setRooms}
            startAddress={startAddress}
            setStartAddress={setStartAddress}
            destAddress={destAddress}
            setDestAddress={setDestAddress}
            date={date}
            setDate={setDate}
            canCreate={canCreate}
            onCreate={onCreateOffer}
          />

          <OfferResult offer={offer} />
        </section>

        <section className="stack">
          <AIAssistant
            suggestions={suggestions}
            activeSuggestionId={activeSuggestionId}
            setActiveSuggestionId={setActiveSuggestionId}
            hasOffer={!!offer}
            thinkingTrigger={thinkingTrigger}
          />

          <TaskSection tasks={tasks} openCount={openCount} onToggle={toggleTask} />
        </section>
      </main>

      <footer className="footer">
        <div className="footerNote">
          
        </div>
      </footer>
    </div>
  );
}