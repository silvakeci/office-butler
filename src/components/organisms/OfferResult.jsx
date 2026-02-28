import React from "react";
import Pill from "../atoms/Pill";
import Button from "../atoms/Button";
import { formatCHF, formatLocalDateTime } from "../../utils/format";

export default function OfferResult({ offer }) {
  return (
    <div className={`card ${offer ? "" : "muted"}`}>
      <div className="cardHeader">
        <h2>Offer result</h2>
        {offer ? <Pill tone="ok">Generated</Pill> : <Pill>Not created</Pill>}
      </div>

      {offer ? (
        <div className="offerBody">
          <div className="priceRow">
            <div className="price">{formatCHF(offer.price)}</div>
            <div className="priceMeta">
              <div>Estimated route: {offer.distanceKm} km</div>
              <div>Created: {formatLocalDateTime(offer.createdAt)}</div>
            </div>
          </div>

          <div className="divider" />
          <div className="offerDesc">{offer.description}</div>

          <div className="miniActions">
            <Button type="button" onClick={() => alert("Prototype: imagine sending this to the customer.")}>
              Send to customer
            </Button>
            <Button type="button" onClick={() => alert("Prototype: imagine a PDF export here.")}>
              Export PDF
            </Button>
          </div>
        </div>
      ) : (
        <div className="emptyState">Create an offer to see the calculated price and summary here.</div>
      )}
    </div>
  );
}