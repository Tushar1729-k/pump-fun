# Pump Prep

A program-tracking app modeled on Pump Club's locked, progressive structure, pointed at a
12-week Google SRE-SWE interview prep plan instead of a workout plan.

**Program > Phase > Session > Task.** Sessions unlock strictly in order. Check off tasks, complete
the session, see the summary, move on. No daily decisions.

## Stack

- Expo SDK 57, React Native 0.86, Expo Router (file-based, React Navigation underneath)
- Restyle for theming (light and dark), Zustand for progress state, persisted with AsyncStorage
- TypeScript strict

Reference for the structure: the shipped Pump Club 1.83.0 bundle (React Native + Expo + Hermes) and
the STRV build write-up. See `reference/`.

## Run it

```sh
npm install
npx expo start
```

Scan the QR code with the Camera app on iPhone (Expo Go must be installed). The phone and Mac
need to be on the same Wi-Fi, or add `--tunnel`.

Checks:

```sh
npm run typecheck        # tsc --noEmit
npx expo-doctor          # dependency and config validation
npx expo export --platform ios   # full Metro bundle
```

## Layout

```
src/
  app/                  routes
    index.tsx           Today: current session, progress, phases
    program.tsx         Full program, all 38 sessions, reset
    session/[id].tsx    Session detail, task checklist, complete
    session/[id]/complete.tsx   Completion summary (modal)
  components/           Button, ProgressBar, SessionCard, StatusPill, TaskRow
  data/                 types.ts, program.ts (the seeded 12-week plan, Phase 0 application + 3 phases)
  lib/progress.ts       unlock rules and progress selectors
  store/                Zustand store (progress only; the program is static data)
  theme/                Restyle theme and Box/Text/Card primitives
```

## Next

- Native dev build (`npx expo run:ios --device`) and swap AsyncStorage for MMKV.
- Session timer and rest-style countdown per task.
- Edit the plan in-app instead of in `src/data/program.ts`.
