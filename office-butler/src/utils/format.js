export function formatCHF(amount) {
    return new Intl.NumberFormat("de-CH", {
      style: "currency",
      currency: "CHF",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  
  export function isWeekend(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr + "T00:00:00");
    const day = d.getDay();
    return day === 0 || day === 6;
  }
  
  export function friendlyDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    return new Intl.DateTimeFormat("en-CH", { dateStyle: "medium" }).format(d);
  }
  
  export function formatLocalDateTime(iso) {
    return new Date(iso).toLocaleString();
  }
  
  export function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }