export type CopyStatus = 'idle' | 'copied' | 'error';

const timers = {
  set: (task: () => void, delay: number) => setTimeout(task, delay),
  clear: (timer: ReturnType<typeof setTimeout>) => clearTimeout(timer),
};

/** Each attempt owns its completion and reset; cleanup invalidates both without updating UI. */
export function createCopyFeedback(
  write: () => Promise<void>,
  report: (status: CopyStatus, attempt: number) => void,
  clock = timers,
) {
  let latest = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const clear = () => {
    if (timer !== undefined) clock.clear(timer);
    timer = undefined;
  };
  return {
    async copy() {
      const attempt = ++latest;
      clear();
      let status: CopyStatus = 'copied';
      try {
        await write();
      } catch {
        status = 'error';
      }
      if (attempt !== latest) return;
      report(status, attempt);
      if (status === 'copied')
        timer = clock.set(() => {
          if (attempt !== latest) return;
          timer = undefined;
          report('idle', attempt);
        }, 2600);
    },
    cancel() {
      latest++;
      clear();
    },
  };
}
