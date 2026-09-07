import { Box } from '@/theme/primitives';
import type { Theme } from '@/theme/theme';

type Props = {
  ratio: number;
  color?: keyof Theme['colors'];
  height?: number;
};

export function ProgressBar({ ratio, color = 'accent', height = 6 }: Props) {
  const pct = Math.max(0, Math.min(1, ratio)) * 100;
  return (
    <Box height={height} borderRadius="pill" backgroundColor="surfaceMuted" overflow="hidden">
      <Box height={height} width={`${pct}%`} backgroundColor={color} borderRadius="pill" />
    </Box>
  );
}
