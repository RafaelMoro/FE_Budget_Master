export function calculateProgress({ limit, currentAmount }: { limit: number, currentAmount: number }) {
  if (currentAmount === 0) return 0;

  return (currentAmount * 100) / limit;
}
