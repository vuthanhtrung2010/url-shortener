import { hash } from "./hash";

export function checkPassword(password: string) {
    return hash(password) === process.env.PASSWORD_HASH;
}