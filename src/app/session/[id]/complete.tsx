import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { PROGRAM, sessionMinutes } from '@/data/program';
import { currentSessionId, formatMinutes, phaseFor, phaseProgress, programProgress } from '@/lib/progress';
import { useProgramStore } from '@/store/useProgramStore';
import { Box, Card, Text } from '@/theme/primitives';

export default function CompleteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const progress = useProgramStore();
  const session = id ? PROGRAM.sessions[id] : undefined;

  if (!session) {
    router.replace('/');
    return null;
  }

  const phase = phaseFor(session);
  const pp = phaseProgress(progress, phase);
  const overall = programProgress(progress);
  const nextId = currentSessionId(progress);
  const next = nextId ? PROGRAM.sessions[nextId] : null;
  const phaseJustFinished = pp.done === pp.total;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} padding="l" gap="l" justifyContent="center">
        <Box gap="xs">
          <Text variant="label" color="success">
            Session {session.number} complete
          </Text>
          <Text variant="display">{phaseJustFinished ? `Phase ${phase.number} done.` : 'Logged.'}</Text>
          <Text variant="caption">
            {session.title} · {formatMinutes(sessionMinutes(session))}
          </Text>
        </Box>

        <Card gap="m">
          <Box gap="s">
            <Box flexDirection="row" justifyContent="space-between">
              <Text variant="heading">Phase {phase.number}</Text>
              <Text variant="caption">
                {pp.done} / {pp.total}
              </Text>
            </Box>
            <ProgressBar ratio={pp.ratio} color={pp.ratio === 1 ? 'success' : 'accent'} />
          </Box>
          <Box gap="s">
            <Box flexDirection="row" justifyContent="space-between">
              <Text variant="heading">Program</Text>
              <Text variant="caption">
                {overall.done} / {overall.total}
              </Text>
            </Box>
            <ProgressBar ratio={overall.ratio} color={overall.ratio === 1 ? 'success' : 'accent'} />
          </Box>
        </Card>

        {next ? (
          <Card variant="accent" gap="xs">
            <Text variant="label" color="accent">
              Up next · Session {next.number}
            </Text>
            <Text variant="heading">{next.title}</Text>
            <Text variant="caption">
              {next.focus} · {formatMinutes(sessionMinutes(next))}
            </Text>
          </Card>
        ) : (
          <Card variant="accent">
            <Text variant="heading">That was the last one. Go get the offer.</Text>
          </Card>
        )}

        <Button label="Done" onPress={() => router.dismissTo('/')} />
      </Box>
    </SafeAreaView>
  );
}
