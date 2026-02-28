import React from "react";
import Button from "../atoms/Button";

export default function Topbar({ onReset }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="logo">OB</div>
        <div>
          <div className="brandTitle">Office Butler</div>
          <div className="brandSub">Moving Offer Prototype</div>
        </div>
      </div>

      <div className="topActions">
        <Button variant="ghost" type="button" onClick={onReset}>
          Reset
        </Button>
      </div>
    </header>
  );
}