declare module 'aos' {
  interface AosOptions {
    duration?: number;
    easing?: string;
    once?: boolean;
    offset?: number;
  }

  function init(options?: AosOptions): void;
  function refresh(): void;
  function refreshHard(): void;
}

declare module 'aos/dist/aos.css';
