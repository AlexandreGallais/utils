import type { DeepPartial } from './deep-partial.ts';

interface Settings {
  readonly chart: { readonly grid: { readonly step: number }; readonly series: { readonly id: string }[] };
  format(value: number): string;
}

describe('DeepPartial', () => {
  it('makes every depth optional', () => {
    expectTypeOf<Omit<DeepPartial<Settings>, 'format'>>().toEqualTypeOf<{
      readonly chart?: {
        readonly grid?: { readonly step?: number };
        readonly series?: readonly { readonly id?: string }[];
      };
    }>();
  });

  it('keeps functions whole', () => {
    expectTypeOf<DeepPartial<Settings>['format']>().toEqualTypeOf<((value: number) => string) | undefined>();
  });
});
