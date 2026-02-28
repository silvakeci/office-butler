import React from "react";
import Label from "../atoms/Label";

export default function Field({ label, children }) {
  return (
    <div className="field">
      <Label>{label}</Label>
      {children}
    </div>
  );
}