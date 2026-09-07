import type { Phase, Program, Session, Task, TaskKind } from './types';

/**
 * Seed program: 12 weeks of Google SRE-SWE interview prep.
 * Phase 0 is the application (2 sessions, week 1). Then three phases, three sessions a week,
 * 36 sessions, ~90 minutes each. 38 sessions total.
 * Structure mirrors the reference app: Program > Phase > Session > Task,
 * and sessions unlock strictly in order.
 */

type TaskSpec = [kind: TaskKind, minutes: number, title: string, detail?: string];
type SessionSpec = { title: string; focus: string; tasks: TaskSpec[] };

const CODING_RULES =
  'Plain Google Doc, no autocomplete, talk out loud, stop at 35 minutes whether or not it is done.';

const coding = (topic: string, warmup: string, problems: string, extra?: TaskSpec): SessionSpec => ({
  title: topic,
  focus: 'Coding',
  tasks: [
    ['drill', 15, `Warm-up: one easy ${warmup} problem`, 'Solve it cold, then explain the invariant in one sentence.'],
    ['drill', 35, `Medium problem 1: ${problems}`, CODING_RULES],
    ['drill', 35, `Medium problem 2: ${problems}`, CODING_RULES],
    extra ?? [
      'review',
      10,
      'Pattern journal',
      'Write the pattern you used, the mistake you made, and the test case that caught it.',
    ],
  ],
});

const phase0: SessionSpec[] = [
  {
    title: 'Resume: hard numbers',
    focus: 'Application',
    tasks: [
      [
        'write',
        30,
        'Pull the numbers from the work laptop',
        'Watcher ingest latency and cluster count, teams served by the GraphQL API, triage time before and after Triagent, CI/CD time cut, PRs per week the review bot handles, Data Query Service customers and QPS. Confirm which internal names Walmart lets you disclose.',
      ],
      [
        'write',
        40,
        'Rewrite the Walmart section: accomplished X, measured by Y, by doing Z',
        'Watcher bullet first, verb first. Add Wish AI and the incident pipeline back under SWE II. Remove "I" and "my". Fix "an API which users to execute" and spell out "reqs".',
      ],
      [
        'review',
        20,
        'Cut to one page',
        'Replace the objective with two lines: what you are, what you build, at what scale. Drop Adopt A Pet, "Currently learning", the soft-skills line, duplicate Docker and Kubernetes, and the IDE list. Two lines per internship. Check the rendered PDF for broken bullets.',
      ],
      ['write', 10, 'Decide on Georgia Tech', 'Enrolled: list it with the expected date. Not enrolled: leave it off.'],
    ],
  },
  {
    title: 'Referral paragraph and cover letter',
    focus: 'Application',
    tasks: [
      [
        'write',
        25,
        'Rewrite the 150-word referral paragraph',
        'One metric with a baseline. Plain descriptions instead of Wishlenz, WCNP, MegaCache, MCP. End with one sentence on fit for SRE at Google. "Highlight projects include", split the 35-word sentence, delete the template text.',
      ],
      [
        'write',
        35,
        'Fix the cover letter',
        'One team story: Reliability Engineering org, MetaLake as its data foundation. Chronological order. Name the role, say why Google and why SRE, end with an ask. Fix "Specifcally", drop Prime React UI, fix "enables me to fulfill". Lead with the Watcher or Triagent.',
      ],
      [
        'review',
        20,
        'Align all three documents',
        'Same team name everywhere. "Google Cloud AlloyDB (PostgreSQL-compatible)". "Data Query Service" everywhere. MTTR is a goal or a result in all three, not both. "10 Kubernetes resource types". Put the Watcher consumers on the resume.',
      ],
      ['write', 10, 'Send to Sana', 'Resume PDF, referral paragraph, cover letter. Ask her what her interview loop looked like.'],
    ],
  },
];

const phase1: SessionSpec[] = [
  coding('Arrays and hash maps', 'array', 'hash map counting, prefix sums'),
  coding('Two pointers and sliding window', 'two-pointer', 'sliding window with a hash map'),
  coding('Intervals and sorting', 'sorting', 'merge or insert intervals, meeting rooms'),
  coding('Binary trees', 'tree traversal', 'recursive tree DFS, path sums, LCA'),
  coding('Graph BFS and DFS', 'grid BFS', 'graph traversal, islands, shortest path in a grid'),
  coding('Topological sort', 'in-degree', 'course schedule, build order, cycle detection'),
  coding('Union-find', 'connected components', 'union-find with path compression'),
  coding('Heaps and top-k', 'heap', 'k closest, merge k sorted, task scheduler'),
  coding('Binary search on answer', 'binary search', 'search on the answer space, rotated arrays'),
  coding('Dynamic programming', 'memoization', '1-D and grid DP, coin change, edit distance'),
  coding('Recursion and backtracking', 'permutations', 'subsets, N-queens, word search'),
  {
    title: 'Phase 1 mock: coding',
    focus: 'Mock interview',
    tasks: [
      ['mock', 45, 'Timed mock: one medium problem, interview format', 'Have Sana or a friend read the prompt. Clarify, plan, code, test, and state complexity.'],
      ['review', 20, 'Debrief', 'Where did time go? Which pattern did you miss? Write two fixes for Phase 2 maintenance.'],
      ['review', 25, 'Redo the mock problem clean', 'From a blank doc. It should take under 25 minutes now.'],
    ],
  },
];

const NALSD_RULES = 'Do the arithmetic on paper: records/s, bytes/record, storage/day, machines, failure domains.';

const phase2: SessionSpec[] = [
  {
    title: 'NALSD fundamentals',
    focus: 'System design',
    tasks: [
      ['read', 40, 'Read the NALSD chapter of the SRE Workbook', 'Chapter 12. Note the four questions the interviewer asks at each step.'],
      ['drill', 30, 'Capacity math drill', 'Sizing a 10k QPS log service: bytes per record, storage per day, disks, machines.'],
      ['drill', 20, 'Coding maintenance: one medium graph problem', CODING_RULES],
    ],
  },
  {
    title: 'Design the Watcher from zero',
    focus: 'System design',
    tasks: [
      ['build', 50, 'Design a Kubernetes inventory service for 7,500 clusters', 'Start from requirements. Ingest rate, fan-in, storage, query API. ' + NALSD_RULES],
      ['write', 20, 'Failure modes', 'What breaks at 10x? Which component fails first? How do you know?'],
      ['drill', 20, 'Coding maintenance: one medium DP problem', CODING_RULES],
    ],
  },
  {
    title: 'Storage and replication',
    focus: 'System design',
    tasks: [
      ['read', 30, 'Read: SRE book, Chapter 23 (distributed consensus)', 'Focus on why, not the algorithm.'],
      ['build', 40, 'Design a metrics store', 'Petabyte scale, time series, retention tiers. ' + NALSD_RULES],
      ['drill', 20, 'Coding maintenance: one medium heap problem', CODING_RULES],
    ],
  },
  {
    title: 'Load balancing and overload',
    focus: 'System design',
    tasks: [
      ['read', 30, 'Read: SRE book, Chapters 19 to 21', 'Frontend load balancing, in the datacenter, handling overload.'],
      ['build', 40, 'Design a global rate limiter', 'Per-tenant limits, 1M QPS, sub-millisecond decision. ' + NALSD_RULES],
      ['drill', 20, 'Coding maintenance: one medium interval problem', CODING_RULES],
    ],
  },
  {
    title: 'SLOs and error budgets',
    focus: 'SRE practice',
    tasks: [
      ['read', 30, 'Read: SRE book, Chapter 4 (SLOs) and Workbook Chapter 2', 'Write an SLO for the Watcher. Availability and freshness.'],
      ['write', 30, 'Define SLIs for Data Query Service', 'Latency, availability, correctness. What would you alert on and why?'],
      ['drill', 30, 'Coding maintenance: one medium tree problem', CODING_RULES],
    ],
  },
  {
    title: 'Queues and pipelines',
    focus: 'System design',
    tasks: [
      ['build', 50, 'Design an incident event pipeline', 'Ingest, dedupe, route, page. Exactly-once vs at-least-once. ' + NALSD_RULES],
      ['read', 20, 'Read: Workbook Chapter 13 (data processing pipelines)'],
      ['drill', 20, 'Coding maintenance: one medium sliding window problem', CODING_RULES],
    ],
  },
  {
    title: 'Monitoring and alerting',
    focus: 'SRE practice',
    tasks: [
      ['read', 30, 'Read: SRE book, Chapter 6 (monitoring) and Chapter 10 (alerting)'],
      ['build', 40, 'Design the monitoring for your Watcher design', 'Four golden signals, symptom vs cause alerts, dashboards.'],
      ['drill', 20, 'Coding maintenance: one medium hash map problem', CODING_RULES],
    ],
  },
  {
    title: 'Caching and consistency',
    focus: 'System design',
    tasks: [
      ['build', 50, 'Design a read-through cache for a hot-key workload', 'Eviction, invalidation, thundering herd, consistency guarantees. ' + NALSD_RULES],
      ['write', 20, 'Trade-off table', 'Three cache designs, four columns: latency, consistency, cost, failure mode.'],
      ['drill', 20, 'Coding maintenance: one medium binary search problem', CODING_RULES],
    ],
  },
  {
    title: 'Postmortems',
    focus: 'SRE practice',
    tasks: [
      ['read', 25, 'Read: SRE book, Chapter 15 (postmortem culture)'],
      ['write', 45, 'Write a blameless postmortem for a real Walmart incident', 'Timeline, impact, root cause, contributing factors, action items with owners. Use numbers.'],
      ['drill', 20, 'Coding maintenance: one medium topological sort problem', CODING_RULES],
    ],
  },
  {
    title: 'Scaling to 10x',
    focus: 'System design',
    tasks: [
      ['build', 50, 'Take any prior design and scale it 10x, then 100x', 'Which numbers change? Which components get replaced? ' + NALSD_RULES],
      ['drill', 40, 'Coding: two medium problems, mixed topics', CODING_RULES],
    ],
  },
  {
    title: 'NALSD mock',
    focus: 'Mock interview',
    tasks: [
      ['mock', 50, 'Timed NALSD mock: design a URL shortener at Google scale', 'Interviewer pushes on numbers at every step. No hand-waving.'],
      ['review', 20, 'Debrief', 'Where did the math stall? Where did you skip a failure domain?'],
      ['drill', 20, 'Coding maintenance: one medium problem of your weakest topic', CODING_RULES],
    ],
  },
  {
    title: 'Phase 2 mock: coding under pressure',
    focus: 'Mock interview',
    tasks: [
      ['mock', 45, 'Timed mock: one medium-hard problem, interview format'],
      ['review', 15, 'Debrief'],
      ['review', 30, 'Rewrite your six weakest pattern-journal entries as flash cards'],
    ],
  },
];

const phase3: SessionSpec[] = [
  {
    title: 'Linux processes and memory',
    focus: 'Systems',
    tasks: [
      ['read', 30, 'Process lifecycle, signals, /proc, virtual memory, OOM killer', 'Use iximiuz Labs or a local VM. Be able to draw the fork/exec path.'],
      ['drill', 40, 'Lab: find why a process is using memory', 'ps, pmap, /proc/<pid>/status, smem. Explain RSS vs VSZ vs shared.'],
      ['drill', 20, 'Coding maintenance: one medium problem', CODING_RULES],
    ],
  },
  {
    title: 'strace and the syscall layer',
    focus: 'Systems',
    tasks: [
      ['drill', 45, 'Lab: strace a slow program and find the stall', 'strace -f -T -e trace=network,file. Read the timings, not the noise.'],
      ['read', 25, 'File descriptors, blocking vs non-blocking I/O, epoll'],
      ['drill', 20, 'Coding maintenance: one medium problem', CODING_RULES],
    ],
  },
  {
    title: 'Networking: DNS and TCP',
    focus: 'Systems',
    tasks: [
      ['read', 30, 'Walk a request end to end', 'DNS resolution, TCP handshake, TLS, HTTP. Where can each step fail?'],
      ['drill', 40, 'Lab: tcpdump a failing connection and explain it', 'SYN with no SYN-ACK, RST, retransmits. Name the layer that failed.'],
      ['drill', 20, 'Coding maintenance: one medium problem', CODING_RULES],
    ],
  },
  {
    title: '"The service is slow"',
    focus: 'Troubleshooting',
    tasks: [
      ['drill', 50, 'Structured troubleshooting drill', 'Given only "the service is slow", talk through: scope, recent changes, golden signals, bisect the path. Time-box each step.'],
      ['read', 20, 'Read: SRE book, Chapter 12 (effective troubleshooting)'],
      ['drill', 20, 'Coding maintenance: one medium problem', CODING_RULES],
    ],
  },
  {
    title: 'Behavioral stories, part 1',
    focus: 'Behavioral',
    tasks: [
      ['write', 45, 'Write three stories: an incident you ran, a disagreement, a failure', 'Situation, action, result. One number in each. Under 90 seconds spoken.'],
      ['drill', 25, 'Say each story out loud twice, timed'],
      ['drill', 20, 'Coding maintenance: one medium problem', CODING_RULES],
    ],
  },
  {
    title: 'Behavioral stories, part 2',
    focus: 'Behavioral',
    tasks: [
      ['write', 45, 'Write three stories: mentoring, unclear requirements, a hard trade-off', 'Same format. Map each story to Googleyness: comfort with ambiguity, bias to action, collaboration.'],
      ['drill', 25, 'Say each story out loud twice, timed'],
      ['drill', 20, 'Coding maintenance: one medium problem', CODING_RULES],
    ],
  },
  {
    title: 'Kubernetes internals',
    focus: 'Systems',
    tasks: [
      ['read', 30, 'Control plane, informers, watch semantics, resource versions', 'You built on this. Be able to explain list-watch and resync from memory.'],
      ['drill', 40, 'Lab: debug a CrashLoopBackOff and a pending pod', 'Events, describe, logs, scheduler predicates.'],
      ['drill', 20, 'Coding maintenance: one medium problem', CODING_RULES],
    ],
  },
  {
    title: 'Systems mock',
    focus: 'Mock interview',
    tasks: [
      ['mock', 45, 'Timed troubleshooting mock', 'Interviewer plays the system. You ask for one observation at a time.'],
      ['review', 20, 'Debrief', 'Which observation would have shortened the path?'],
      ['drill', 25, 'Coding maintenance: one medium problem', CODING_RULES],
    ],
  },
  {
    title: 'Full loop rehearsal, day 1',
    focus: 'Mock interview',
    tasks: [
      ['mock', 45, 'Coding round'],
      ['mock', 45, 'NALSD round'],
    ],
  },
  {
    title: 'Full loop rehearsal, day 2',
    focus: 'Mock interview',
    tasks: [
      ['mock', 45, 'Systems round'],
      ['mock', 30, 'Googleyness and leadership round', 'Six stories, delivered under time.'],
      ['review', 15, 'Debrief both days', 'Three fixes only. Anything more will not stick this week.'],
    ],
  },
  {
    title: 'Weak-spot week',
    focus: 'Review',
    tasks: [
      ['drill', 45, 'Two medium problems from your worst topic', CODING_RULES],
      ['build', 30, 'One NALSD design from your worst debrief, numbers only', NALSD_RULES],
      ['review', 15, 'Reread all pattern journal entries'],
    ],
  },
  {
    title: 'Taper',
    focus: 'Review',
    tasks: [
      ['drill', 30, 'One easy and one medium problem, clean and calm', 'Confidence, not volume.'],
      ['review', 20, 'Read your six stories once'],
      ['review', 10, 'Logistics', 'Interview times, links, quiet room, water, paper, pen. Then stop.'],
    ],
  },
];

function buildProgram(): Program {
  type PhaseSpec = {
    number: number;
    title: string;
    subtitle: string;
    sessions: SessionSpec[];
    /** Phase 0 runs inside week 1, alongside the first coding sessions, so it does not shift the 12-week clock. */
    fixedWeek?: number;
  };
  const phaseSpecs: PhaseSpec[] = [
    {
      number: 0,
      title: 'Application',
      subtitle: 'The referral is the gate. Numbers first, then send it.',
      sessions: phase0,
      fixedWeek: 1,
    },
    { number: 1, title: 'Coding', subtitle: 'The bar is the same as for any SWE. Start where people fail.', sessions: phase1 },
    { number: 2, title: 'NALSD and SRE practice', subtitle: 'Non-abstract design. Do the math every time.', sessions: phase2 },
    {
      number: 3,
      title: 'Systems and behavioral',
      subtitle: 'Linux, networks, troubleshooting, and six stories with numbers.',
      sessions: phase3,
    },
  ];

  const sessions: Record<string, Session> = {};
  const order: string[] = [];
  const phases: Phase[] = [];
  let number = 0;
  let weeklyIndex = 0; // counts only sessions that follow the 3-per-week cadence

  for (const ps of phaseSpecs) {
    const phaseId = `p${ps.number}`;
    const sessionIds: string[] = [];
    ps.sessions.forEach((ss, si) => {
      number += 1;
      const id = `${phaseId}s${si + 1}`;
      let week: number;
      if (ps.fixedWeek !== undefined) {
        week = ps.fixedWeek;
      } else {
        week = Math.floor(weeklyIndex / 3) + 1;
        weeklyIndex += 1;
      }
      const tasks: Task[] = ss.tasks.map(([kind, minutes, title, detail], ti) => ({
        id: `${id}t${ti + 1}`,
        kind,
        minutes,
        title,
        detail,
      }));
      sessions[id] = { id, phaseId, number, week, title: ss.title, focus: ss.focus, tasks };
      sessionIds.push(id);
      order.push(id);
    });
    const first = sessions[sessionIds[0]].week;
    const last = sessions[sessionIds[sessionIds.length - 1]].week;
    phases.push({
      id: phaseId,
      number: ps.number,
      title: ps.title,
      subtitle: ps.subtitle,
      weeks: [first, last],
      sessionIds,
    });
  }

  return {
    id: 'google-sre-12w',
    title: 'Google SRE Prep',
    tagline: '12 weeks. 3 sessions a week. One plan, no decisions.',
    phases,
    sessions,
    order,
  };
}

export const PROGRAM: Program = buildProgram();

export const sessionMinutes = (s: Session) => s.tasks.reduce((sum, t) => sum + t.minutes, 0);
