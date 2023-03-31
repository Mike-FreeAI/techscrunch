/**
 * Get nth item of Array. Negative for backward
 *
 * @category Array
 */
export function at(array: readonly [], index: number): undefined;
export function at<T>(array: readonly T[], index: number): T;
export function at<T>(array: readonly T[] | [], index: number): T | undefined {
	const len = array.length;
	if (!len) return undefined;

	if (index < 0) index += len;

	return array[index];
}

/**
 * Get last item
 *
 * @category Array
 */
export function last(array: readonly []): undefined;
export function last<T>(array: readonly T[]): T;
export function last<T>(array: readonly T[]): T | undefined {
	return at(array, -1);
}
