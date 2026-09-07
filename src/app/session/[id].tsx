import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { TaskRow } from '@/components/TaskRow';
import { PROGRAM, sessionMinutes } from '@/data/program';
import { formatMinutes, minutesDoneInSession, phaseFor, sessionStatus, sessionTaskProgress } from '@/lib/progress';
import { useProgramStore } from '@/store/useProgramStore';
import { Box, Card, Text } from '@/theme/primitives';

export default function SessionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const progress = useProgramStore();
  const session = id ? PROGRAM.sessions[id] : undefined;

  if (!session) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center" padding="l">
        <Text variant="heading">Session not found.</Text>
      </Box>
    );
  }

  const status = sessionStatus(progress, session.id);
  const tasks = sessionTaskProgress(progress, session);
  const total = sessionMinutes(session);
  const done = minutesDoneInSession(progress, session);
  const phase = phaseFor(session);

  const finish = () => {
    progress.completeSession(session.id);
    router.replace({ pathname: '/session/[id]/complete', params: { id: session.id } });
  };

  return (
    <>
      <Stack.Screen options={{ title: `Session ${session.number}` }} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48, gap: 16 }}>
        <Box gap="xs">
          <Text variant="label">
            Phase {phase.number} · {phase.title} · Week {session.week}
          </Text>
          <Text variant="title">{session.title}</Text>
          <Text variant="caption">
            {session.focus} · {formatMinutes(total)}
          </Text>
        </Box>

        {status === 'locked' ? (
          <Card variant="muted">
            <Text variant="caption">
              Locked. Finish the sessions before it first. One plan, in order, no skipping.
            </Text>
          </Card>
        ) : null}

        <Card gap="s">
          <Box flexDirection="row" justifyContent="space-between">
            <Text variant="heading">Tasks</Text>
            <Text variant="caption">
              {tasks.done} / {tasks.total} · {formatMinutes(done)} logged
            </Text>
          </Box>
          <ProgressBar ratio={tasks.total ? tasks.done / tasks.total : 0} color={tasks.allDone ? 'success' : 'accent'} />
          <Box>
            {session.tasks.map((t, i) => (
              <Box key={t.id} borderTopWidth={i === 0 ? 0 : 1} borderColor="border">
                <TaskRow
                  task={t}
                  done={!!progress.doneTasks[t.id]}
                  onToggle={() => {
                    if (status === 'locked') return;
                    progress.toggleTask(t.id);
                  }}
                />
              </Box>
            ))}
          </Box>
        </Card>

        {status === 'done' ? (
          <Card variant="muted">
            <Text variant="caption">Completed {new Date(progress.doneSessions[session.id]).toLocaleDateString()}.</Text>
          </Card>
        ) : status === 'current' ? (
          <Button
            label={tasks.allDone ? 'Complete session' : `Complete session (${tasks.total - tasks.done} left)`}
            disabled={!tasks.allDone}
            onPress={finish}
          />
        ) : null}
      </ScrollView>
    </>
  );
}
