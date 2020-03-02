import { userExists } from './login';

test('Check if admin user exists', () => {
    expect(userExists('admin')).toBe(true);
});
