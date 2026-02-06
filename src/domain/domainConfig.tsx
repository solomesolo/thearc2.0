"use client";

import { Heart, Activity, Brain, Moon, Dumbbell, Eye } from "lucide-react";
import React from "react";

export type DomainId = "overview" | "cardiovascular" | "metabolic" | "cancer_screening" | "neuro" | "sleep" | "fitness";

export interface DomainConfig {
  id: DomainId;
  label: string;
  icon: React.ReactNode;
  priorityOrder: number;
}

export const domainConfigs: DomainConfig[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <Eye size={20} />,
    priorityOrder: 0,
  },
  {
    id: "cardiovascular",
    label: "Cardiovascular",
    icon: <Heart size={20} />,
    priorityOrder: 1,
  },
  {
    id: "metabolic",
    label: "Metabolic",
    icon: <Activity size={20} />,
    priorityOrder: 2,
  },
  {
    id: "cancer_screening",
    label: "Cancer screening",
    icon: <Activity size={20} />,
    priorityOrder: 3,
  },
  {
    id: "neuro",
    label: "Neuro",
    icon: <Brain size={20} />,
    priorityOrder: 4,
  },
  {
    id: "sleep",
    label: "Sleep",
    icon: <Moon size={20} />,
    priorityOrder: 5,
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: <Dumbbell size={20} />,
    priorityOrder: 6,
  },
];

export const getDomainConfig = (id: DomainId): DomainConfig | undefined => {
  return domainConfigs.find((d) => d.id === id);
};

export const getDomainLabel = (id: DomainId): string => {
  return getDomainConfig(id)?.label || id;
};

