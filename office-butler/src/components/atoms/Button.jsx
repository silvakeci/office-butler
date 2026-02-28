import React from "react";

export default function Button({ variant = "default", className = "", ...props }) {
  const classes =
    variant === "primary"
      ? "btn primary"
      : variant === "ghost"
      ? "btn ghost"
      : "btn";

  return <button className={`${classes} ${className}`} {...props} />;
}