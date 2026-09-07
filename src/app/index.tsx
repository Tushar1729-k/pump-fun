import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { SessionCard } from '@/components/SessionCard';
import { PROGRAM } from '@/data/program';
import {
  currentSessionId,
  formatMinutes,
  phaseFor,
  phaseProgress,
  programProgress,
  totalMinutesDone,
} from '@/lib/progress';
import { useProgramStore } from '@/store/useProgramStore';
import { Box, Card, Text } from '@/theme/primitives';

export default function TodayScreen() {
  const router = useRouter();
  const progress = useProgramStore();
  const currentId = currentSessionId(progress);
  const current = currentId ? PROGRAM.sessions[currentId] : null;
  const overall = programProgress(progress);
  const minutes = totalMinutesDone(progress);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48, gap: 16 }}>
        <Box gap="xs" paddingTop="m">
          <Text variant="label">{PROGRAM.title}</Text>
          <Text variant="display">{current ? 'Today' : 'Program complete'}</Text>
          <Text variant="caption">{PROGRAM.tagline}</Text>
        </Box>

        {current ? (
          <Box gap="s">
            <Text variant="label">
              Phase {phaseFor(current).number} · {phaseFor(current).title}
            </Text>
            <SessionCard
              session={current}
              status="current"
              onPress={() => router.push({ pathname: '/session/[id]', params: { id: current.id } })}
            />
            <Button
              label={progress.startedAt ? 'Start session' : 'Start the program'}
              onPress={() => {
                progress.start();
                router.push({ pathname: '/session/[id]', params: { id: current.id } });
              }}
            />
          </Box>
        ) : (
          <Card variant="accent" gap="s">
            <Text variant="heading">All {overall.total} sessions done.</Text>
            <Text variant="caption">Reset from the Program screen to run it again.</Text>
          </Card>
        )}

        <Card gap="m">
          <Box flexDirection="row" justifyContent="space-between" alignItems="baseline">
            <Text variant="heading">Progress</Text>
            <Text variant="caption">
              {overall.done} / {overall.total} sessions
            </Text>
          </Box>
          <ProgressBar ratio={overall.ratio} />
          <Box flexDirection="row" gap="l">
            <Stat label="Weeks" value={`${current ? current.week : 12} / 12`} />
            <Stat label="Time logged" value={formatMinutes(minutes)} />
          </Box>
        </Card>

        <Box gap="s">
          <Text variant="label">Phases</Text>
          {PROGRAM.phases.map((ph) => {
            const pp = phaseProgress(progress, ph);
            return (
              <Card key={ph.id} gap="s">
                <Box flexDirection="row" justifyContent="space-between">
                  <Text variant="heading">
                    {ph.number}. {ph.title}
                  </Text>
                  <Text variant="caption">
                    {pp.done}/{pp.total}
                  </Text>
                </Box>
                <Text variant="caption">
                  Weeks {ph.weeks[0]}–{ph.weeks[1]} · {ph.subtitle}
                </Text>
                <ProgressBar ratio={pp.ratio} color={pp.ratio === 1 ? 'success' : 'accent'} height={4} />
              </Card>
            );
          })}
        </Box>

        <Button label="View full program" variant="ghost" onPress={() => router.push('/program')} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Box gap="xs">
      <Text variant="label">{label}</Text>
      <Text variant="heading">{value}</Text>
    </Box>
  );
}
