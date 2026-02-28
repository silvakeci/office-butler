import { isWeekend } from "./format";
import { pseudoDistanceKm } from "./offer";

export function buildSuggestions({ rooms, startAddress, destAddress, date }) {
  const list = [];

  list.push({
    id: "compare-prices",
    title: "Customer may compare prices",
    detail: "Consider calling quickly to answer questions and secure the booking.",
    tone: "warning",
  });

  list.push({
    id: "parking",
    title: "Ask about parking availability",
    detail: "Parking or access restrictions can change time & cost. Confirm in advance.",
    tone: "info",
  });

  if (isWeekend(date)) {
    list.push({
      id: "weekend-slot",
      title: "Weekend date selected",
      detail: "Weekend slots fill up fast—offer an alternative weekday option as backup.",
      tone: "warning",
    });
  }

  if (Number(rooms) >= 4.5) {
    list.push({
      id: "extra-movers",
      title: "Large apartment size",
      detail: "Suggest 3 movers or a bigger truck to reduce risk of delays.",
      tone: "info",
    });
  }

  if (startAddress.trim() && destAddress.trim()) {
    const km = pseudoDistanceKm(startAddress, destAddress);
    if (km >= 45) {
      list.push({
        id: "long-distance",
        title: "Longer route detected",
        detail: "Confirm elevator availability and reserve a larger time window.",
        tone: "info",
      });
    }
  }

  return list;
}