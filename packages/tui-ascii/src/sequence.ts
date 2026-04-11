/**
 * Timed animation sequences (boot flows, FDX-style step lists).
 * Use `pushFrames` for spinners so multiple ticks render before advancing.
 */

export interface AnimationFrame {
  durationMs: number;
  render: () => string;
}

export class AnimationSequence {
  private frames: AnimationFrame[] = [];

  add(frame: AnimationFrame): this {
    this.frames.push(frame);
    return this;
  }

  addDelay(ms: number): this {
    this.frames.push({
      durationMs: ms,
      render: () => "",
    });
    return this;
  }

  addSplash(splash: string, durationMs = 2000): this {
    this.frames.push({
      durationMs,
      render: () => splash,
    });
    return this;
  }

  /** Emit one spinner glyph per tick for `ticks` frames. */
  pushSpinnerFrames(
    spinner: readonly string[],
    ticks: number,
    speedMs: number,
    label = ""
  ): this {
    for (let i = 0; i < ticks; i++) {
      const frame = i;
      this.frames.push({
        durationMs: speedMs,
        render: () => {
          const ch = spinner[frame % spinner.length] ?? " ";
          return label ? `${ch} ${label}` : ch;
        },
      });
    }
    return this;
  }

  getFrames(): readonly AnimationFrame[] {
    return this.frames;
  }
}
