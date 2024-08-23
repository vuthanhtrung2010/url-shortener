import { hash } from "./hash";

test("hash", () => {
    expect(hash("password")).toBe("c0067d4af4e87f00dbac63b6156828237059172d1bbeac67427345d6a9fda484");
})

test("hash", () => {
    expect(hash("bfqbg4bgfnnf24nt0bg0rb0wbg40gb")).toBe("07a342cd0423bbcf8fffdffed428b539304815a6f0bc208814819d074355c995");
})