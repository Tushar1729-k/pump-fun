export type TaskKind = 'drill' | 'read' | 'build' | 'write' | 'mock' | 'review';

export interface Task {
  id: string;
  title: string;
  detail?: string;
  minutes: number;
  kind: TaskKind;
}

export interface Session {
  id: string;
  phaseId: string;
  /** 1-based position within the whole program. */
  number: number;
  /** 1-based week within the program. */
  week: number;
  title: string;
  focus: string;
  tasks: Task[];
}

export interface Phase {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  weeks: [number, number];
  sessionIds: string[];
}

export interface Program {
  id: string;
  title: string;
  tagline: string;
  phases: Phase[];
  sessions: Record<string, Session>;
  /** Ordered list of all session ids. Sessions unlock in this order. */
  order: string[];
}
