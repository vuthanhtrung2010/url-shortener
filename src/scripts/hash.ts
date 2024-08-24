import { createHash } from 'crypto';

export function hash(input: string): string {
    const hash = createHash('sha3-512');
    hash.update(input);
    return hash.digest('hex');
}