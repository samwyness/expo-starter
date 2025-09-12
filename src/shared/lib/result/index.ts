export type Success<T> = [T, null];
export type Failure<E> = [null, E];
export type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Tries to execute a promise and returns a Result type.
 * If the promise resolves, it returns a Success type.
 * If the promise rejects, it returns a Failure type.
 */
export async function tryAsync<T, E = Error>(
  fn: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await fn;
    return [data, null] as Success<T>;
  } catch (error) {
    return [null, error] as Failure<E>;
  }
}
