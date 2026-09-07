import { Pressable } from 'react-native';

import type { Task, TaskKind } from '@/data/types';
import { Box, Text } from '@/theme/primitives';

const KIND_LABEL: Record<TaskKind, string> = {
  drill: 'Drill',
  read: 'Read',
  build: 'Design',
  write: 'Write',
  mock: 'Mock',
  review: 'Review',
};

type Props = {
  task: Task;
  done: boolean;
  onToggle: () => void;
};

export function TaskRow({ task, done, onToggle }: Props) {
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: done }}
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
    >
      <Box flexDirection="row" gap="m" paddingVertical="m" alignItems="flex-start">
        <Box
          width={26}
          height={26}
          borderRadius="pill"
          borderWidth={2}
          borderColor={done ? 'success' : 'border'}
          backgroundColor={done ? 'success' : 'surface'}
          alignItems="center"
          justifyContent="center"
          marginTop="xs"
        >
          {done ? (
            <Text color="onAccent" fontSize={15} lineHeight={18} fontWeight="700">
              ✓
            </Text>
          ) : null}
        </Box>
        <Box flex={1} gap="xs">
          <Text variant="body" color={done ? 'textMuted' : 'text'} textDecorationLine={done ? 'line-through' : 'none'}>
            {task.title}
          </Text>
          {task.detail ? <Text variant="caption">{task.detail}</Text> : null}
          <Text variant="label">
            {KIND_LABEL[task.kind]} · {task.minutes} min
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}
