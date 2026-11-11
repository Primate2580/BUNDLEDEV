/** Compile-time guard: adding a LessonKind without handling it becomes a type error. */
export function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${JSON.stringify(value)}`);
}
