import { PROGRAM, sessionMinutes } from '@/data/program';
import type { Phase, Session } from '@/data/types';
import type { ProgramState } from '@/store/useProgramStore';

export type SessionStatus = 'done' | 'current' | 'locked';

type Progress = Pick<ProgramState, 'doneSessions' | 'doneTasks'>;

/** The first session in program order that is not complete. Null when the program is finished. */
export function currentSessionId(p: Progress): string | null {
  return PROGRAM.order.find((id) => !p.doneSessions[id]) ?? null;
}

export function sessionStatus(p: Progress, sessionId: string): SessionStatus {
  if (p.doneSessions[sessionId]) return 'done';
  return currentSessionId(p) === sessionId ? 'current' : 'locked';
}

export function sessionTaskProgress(p: Progress, s: Session) {
  const done = s.tasks.filter((t) => p.doneTasks[t.id]).length;
  return { done, total: s.tasks.length, allDone: done === s.tasks.length };
}

export function phaseProgress(p: Progress, phase: Phase) {
  const done = phase.sessionIds.filter((id) => p.doneSessions[id]).length;
  return { done, total: phase.sessionIds.length, ratio: done / phase.sessionIds.length };
}

export function programProgress(p: Progress) {
  const done = PROGRAM.order.filter((id) => p.doneSessions[id]).length;
  return { done, total: PROGRAM.order.length, ratio: done / PROGRAM.order.length };
}

export function phaseStatus(p: Progress, phase: Phase): SessionStatus {
  const { done, total } = phaseProgress(p, phase);
  if (done === total) return 'done';
  const cur = currentSessionId(p);
  return cur && phase.sessionIds.includes(cur) ? 'current' : 'locked';
}

export function phaseFor(session: Session): Phase {
  return PROGRAM.phases.find((ph) => ph.id === session.phaseId)!;
}

export function minutesDoneInSession(p: Progress, s: Session) {
  return s.tasks.filter((t) => p.doneTasks[t.id]).reduce((sum, t) => sum + t.minutes, 0);
}

export function totalMinutesDone(p: Progress) {
  return PROGRAM.order
    .filter((id) => p.doneSessions[id])
    .reduce((sum, id) => sum + sessionMinutes(PROGRAM.sessions[id]), 0);
}

export function formatMinutes(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}
