import { isWeekend } from "./format";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function buildInitialTasks({ rooms, date }) {
  const nextTasks = [
    { id: uid(), title: "Call customer", status: "open" },
    { id: uid(), title: "Confirm appointment time window", status: "open" },
    { id: uid(), title: "Ask about parking / access (both addresses)", status: "open" },
    { id: uid(), title: "Confirm elevators / stairs situation", status: "open" },
    { id: uid(), title: "Send offer summary to customer", status: "open" },
  ];

  if (isWeekend(date)) {
    nextTasks.splice(2, 0, { id: uid(), title: "Offer a weekday backup slot", status: "open" });
  }

  if (Number(rooms) >= 4.5) {
    nextTasks.splice(3, 0, { id: uid(), title: "Assess if 3 movers are needed", status: "open" });
  }

  return nextTasks;
}