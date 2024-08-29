import { hashSync } from 'bcrypt';

export function hash(password: string, saltRounds = 11) {
    return hashSync(password, saltRounds);
}