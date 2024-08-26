import { prismaMock } from '../singleton';
import { createRedirect } from '../src/data';

test('createRedirect function exists', () => {
    console.log(createRedirect); // Should log the function, not undefined
    expect(typeof createRedirect).toBe('function');
  });