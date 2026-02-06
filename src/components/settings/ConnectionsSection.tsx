"use client";

import React, { useState } from "react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import { X } from "lucide-react";

export default function ConnectionsSection() {
  const { evtConnectProvider, evtConnectWearables } = useCommandCenterStore();
  const [providers] = useState([
    { id: "prov_1", name: "City Clinic", status: "Connected" },
    { id: "prov_2", name: "Metro Health", status: "Connected" },
  ]);
  const [wearables] = useState([
    { id: "wear_1", name: "Apple Watch", status: "Connected" },
  ]);
  const [autoImport, setAutoImport] = useState(true);

  const handleDisconnectProvider = (providerId: string) => {
    if (confirm("Are you sure you want to disconnect this provider?")) {
      // TODO: Disconnect
      alert("Provider disconnected.");
    }
  };

  const handleDisconnectWearable = (wearableId: string) => {
    if (confirm("Are you sure you want to disconnect this wearable?")) {
      // TODO: Disconnect
      alert("Wearable disconnected.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "24px",
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "24px",
        }}
      >
        Data & connections
      </h2>

      {/* Providers */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>Providers</h3>
          <button
            onClick={evtConnectProvider}
            style={{
              padding: "8px 16px",
              backgroundColor: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            Connect provider
          </button>
        </div>
        {providers.length === 0 ? (
          <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>No providers connected.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {providers.map((provider) => (
              <div
                key={provider.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  backgroundColor: "var(--surface-alt)",
                  borderRadius: "8px",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
                    {provider.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{provider.status}</div>
                </div>
                <button
                  onClick={() => handleDisconnectProvider(provider.id)}
                  style={{
                    padding: "6px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-secondary)",
                  }}
                  title="Disconnect"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wearables */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>Wearables</h3>
          <button
            onClick={evtConnectWearables}
            style={{
              padding: "8px 16px",
              backgroundColor: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            Connect wearables
          </button>
        </div>
        {wearables.length === 0 ? (
          <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>No wearables connected.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {wearables.map((wearable) => (
              <div
                key={wearable.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  backgroundColor: "var(--surface-alt)",
                  borderRadius: "8px",
                }}
              >
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
                    {wearable.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{wearable.status}</div>
                </div>
                <button
                  onClick={() => handleDisconnectWearable(wearable.id)}
                  style={{
                    padding: "6px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-secondary)",
                  }}
                  title="Disconnect"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Automatic import */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
              Automatic import
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              Automatically import new documents from connected providers
            </p>
          </div>
          <label
            style={{
              position: "relative",
              display: "inline-block",
              width: "44px",
              height: "24px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={autoImport}
              onChange={(e) => setAutoImport(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: autoImport ? "var(--primary)" : "var(--text-tertiary)",
                borderRadius: "12px",
                transition: "0.3s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  height: "18px",
                  width: "18px",
                  left: autoImport ? "22px" : "3px",
                  bottom: "3px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  transition: "0.3s",
                }}
              />
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

