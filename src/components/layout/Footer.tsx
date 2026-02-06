"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        height: "64px",
        backgroundColor: "var(--surface)",
        borderTop: "1px solid var(--border)",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        color: "var(--text-secondary)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link
          href="/"
          style={{
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 400,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          Platform
        </Link>
        <Link
          href="/personas"
          style={{
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 400,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          Programs
        </Link>
        <Link
          href="/catalog/countries"
          style={{
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 400,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          Marketplace
        </Link>
        <Link
          href="/clinics"
          style={{
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 400,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          Clinics
        </Link>
        <Link
          href="/privacy-policy"
          style={{
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 400,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          style={{
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 400,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          Terms and Conditions
        </Link>
      </div>
    </footer>
  );
}

