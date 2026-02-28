import React from "react";
import Pill from "../atoms/Pill";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import SegmentedControl from "../atoms/SegmentedControl";
import Field from "../molecules/Field";
import { isWeekend } from "../../utils/format";

const ROOM_OPTIONS = [2.5, 3.5, 4.5];

export default function OfferForm({
  rooms,
  setRooms,
  startAddress,
  setStartAddress,
  destAddress,
  setDestAddress,
  date,
  setDate,
  canCreate,
  onCreate,
}) {
  return (
    <div className="card">
      <div className="cardHeader">
        <h2>Create an offer</h2>
        <Pill tone={canCreate ? "ok" : "default"}>{canCreate ? "Ready" : "Fill all fields"}</Pill>
      </div>

      <div className="form">
        <Field label="Number of rooms">
          <SegmentedControl options={ROOM_OPTIONS} value={rooms} onChange={setRooms} />
        </Field>

        <Field label="Start address">
          <Input
            value={startAddress}
            onChange={(e) => setStartAddress(e.target.value)}
            placeholder="e.g. Bahnhofstrasse 1, Zürich"
          />
        </Field>

        <Field label="Destination address">
          <Input
            value={destAddress}
            onChange={(e) => setDestAddress(e.target.value)}
            placeholder="e.g. Rue de Lausanne 10, Genève"
          />
        </Field>

        <Field label="Date">
          <Input value={date} onChange={(e) => setDate(e.target.value)} type="date" />
        </Field>

        <div className="ctaRow">
          <Button variant="primary" onClick={onCreate} disabled={!canCreate} type="button">
            Create Offer
          </Button>
          <div className="hint">
            {isWeekend(date) ? "Weekend: higher demand" : "Tip: choose a weekday for lower risk"}
          </div>
        </div>
      </div>
    </div>
  );
}