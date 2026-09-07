import { Pressable } from 'react-native';

import { sessionMinutes } from '@/data/program';
import type { Session } from '@/data/types';
import { formatMinutes, type SessionStatus } from '@/lib/progress';
import { Box, Card, Text } from '@/theme/primitives';

import { StatusPill } from './StatusPill';

type Props = {
  session: Session;
  status: SessionStatus;
  onPress?: () => void;
};

export function SessionCard({ session, status, onPress }: Props) {
  const locked = status === 'locked';
  return (
    <Pressable
      onPress={onPress}
      disabled={locked}
      accessibilityRole="button"
      accessibilityState={{ disabled: locked }}
      style={({ pressed }) => ({ opacity: locked ? 0.55 : pressed ? 0.85 : 1 })}
    >
      <Card variant={status === 'current' ? 'accent' : undefined} gap="s">
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <Text variant="label">
            Session {session.number} · Week {session.week}
          </Text>
          <StatusPill status={status} />
        </Box>
        <Text variant="heading">{session.title}</Text>
        <Text variant="caption">
          {session.focus} · {session.tasks.length} tasks · {formatMinutes(sessionMinutes(session))}
        </Text>
      </Card>
    </Pressable>
  );
}
