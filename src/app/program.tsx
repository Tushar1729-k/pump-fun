import { useRouter } from 'expo-router';
import { Alert, ScrollView } from 'react-native';

import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { SessionCard } from '@/components/SessionCard';
import { PROGRAM } from '@/data/program';
import { phaseProgress, phaseStatus, sessionStatus } from '@/lib/progress';
import { useProgramStore } from '@/store/useProgramStore';
import { Box, Text } from '@/theme/primitives';

export default function ProgramScreen() {
  const router = useRouter();
  const progress = useProgramStore();

  const confirmReset = () => {
    Alert.alert('Reset progress?', 'Every session and task goes back to unchecked. The program itself is unchanged.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: () => progress.reset() },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48, gap: 24 }}>
      {PROGRAM.phases.map((ph) => {
        const pp = phaseProgress(progress, ph);
        const st = phaseStatus(progress, ph);
        return (
          <Box key={ph.id} gap="s">
            <Box gap="xs">
              <Text variant="label" color={st === 'locked' ? 'textFaint' : 'textMuted'}>
                Phase {ph.number} · Weeks {ph.weeks[0]}–{ph.weeks[1]}
              </Text>
              <Text variant="title">{ph.title}</Text>
              <Text variant="caption">{ph.subtitle}</Text>
              <ProgressBar ratio={pp.ratio} color={pp.ratio === 1 ? 'success' : 'accent'} height={4} />
            </Box>
            {ph.sessionIds.map((id) => {
              const s = PROGRAM.sessions[id];
              return (
                <SessionCard
                  key={id}
                  session={s}
                  status={sessionStatus(progress, id)}
                  onPress={() => router.push({ pathname: '/session/[id]', params: { id } })}
                />
              );
            })}
          </Box>
        );
      })}
      <Button label="Reset progress" variant="ghost" onPress={confirmReset} />
    </ScrollView>
  );
}
