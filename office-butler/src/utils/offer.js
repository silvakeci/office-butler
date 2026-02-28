import { clamp, friendlyDate, isWeekend } from "./format";

export function pseudoDistanceKm(a, b) {
  const s = (a + "|" + b).toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  return 5 + (hash % 66); // 5..70
}

export function buildOffer({ rooms, startAddress, destAddress, date }) {
  const distanceKm = pseudoDistanceKm(startAddress, destAddress);

  const base = 390;
  const roomsPart = Number(rooms) * 150;
  const distancePart = distanceKm * 6;
  const weekendSurcharge = isWeekend(date) ? 90 : 0;

  const riskBuffer = clamp(Math.round((roomsPart + distancePart) * 0.07), 40, 140);
  const price = Math.round(base + roomsPart + distancePart + weekendSurcharge + riskBuffer);

  const description = [
    `Moving offer for a ${rooms}-room apartment.`,
    `Route: approx. ${distanceKm} km.`,
    `Date: ${friendlyDate(date)}.`,
    `Includes truck + movers, loading/unloading, and basic insurance.`,
  ].join(" ");

  return {
    price,
    distanceKm,
    description,
    createdAt: new Date().toISOString(),
    inputs: { rooms, startAddress, destAddress, date },
  };
}