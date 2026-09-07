import type { SessionStatus } from '@/lib/progress';
import { Box, Text } from '@/theme/primitives';

const LABEL: Record<SessionStatus, string> = { done: 'Done', current: 'Up next', locked: 'Locked' };

export function StatusPill({ status }: { status: SessionStatus }) {
  const bg = status === 'done' ? 'successSoft' : status === 'current' ? 'accentSoft' : 'surfaceMuted';
  const fg = status === 'done' ? 'success' : status === 'current' ? 'accent' : 'textFaint';
  return (
    <Box backgroundColor={bg} borderRadius="pill" paddingHorizontal="s" paddingVertical="xs">
      <Text variant="label" color={fg}>
        {LABEL[status]}
      </Text>
    </Box>
  );
}
