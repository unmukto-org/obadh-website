let counter = 0;

/** Unique per build, so two copies of the same SVG on one page do not collide. */
export function uid(prefix: string): string {
  counter += 1;
  return `${prefix}-${counter.toString(36)}`;
}
