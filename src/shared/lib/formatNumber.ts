type FormatCompactOptions = {
  max?: number; // if value > max => show >max
  decimals?: number; // digits after dot for compact form
};

type CompactNumber = {
  short: string;
  full: string;
};

const trimZeros = (value: string): string => {
  return value.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
}

export const formatCompactNumber = 
  (value: number, options: FormatCompactOptions = {}): CompactNumber => {
    const { max = 100_000_000_000, decimals = 1 } = options;

    if (!Number.isFinite(value)) return { short: '—', full: '—' };

    const full = Math.trunc(value).toLocaleString();
    const abs = Math.abs(value);

    const format = (num: number, suffix: string) => {
      const fixed = num.toFixed(decimals);
      return `${trimZeros(fixed)}${suffix}`;
    };

    if (value > max) {
      return { short: `>${format(max / 1_000_000_000, 'B').toLocaleString()}`, full };
    }

    if (abs >= 1_000_000_000) return { short: format(value / 1_000_000_000, 'B'), full };
    if (abs >= 1_000_000) return { short: format(value / 1_000_000, 'M'), full };
    if (abs >= 1_000) return { short: format(value / 1_000, 'K'), full };

    return { short: value.toString(), full };
  }

export const isCompactApplied = (value: CompactNumber): boolean => {
  return value.short !== value.full;
}
