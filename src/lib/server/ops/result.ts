export type Result<T, E> = Ok<T> | Err<E>;
export type Ok<T> = { valid: true } & (void extends T ? unknown : { value: T });
export type Err<E> = E extends string
  ? { valid: false; error: E }
  : E extends [infer K extends string, infer V]
    ? { valid: false; error: K; value: V }
    : never;

type ErrCases<E, T> = {
  [K in Err<E>["error"]]: (value: Err<E> extends { value: unknown } ? Err<E>["value"] : void) => T;
};

export function caseErr<E, T = void>(err: Err<E>, cases: ErrCases<E, T>): T {
  return cases[err.error]((err as unknown as { value: never }).value);
}

export function caseErrAsync<E, T = void>(err: Err<E>, cases: ErrCases<E, Promise<T>>): Promise<T> {
  return cases[err.error]((err as unknown as { value: never }).value);
}
