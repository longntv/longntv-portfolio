// Usage: npm run hash-password -- 'your-password'
// Prints a value for ADMIN_PASSWORD_HASH.
import { hashPassword } from "./auth.js";

const password = process.argv[2];
if (!password || password.length < 8) {
  console.error("Usage: npm run hash-password -- '<password of at least 8 chars>'");
  process.exit(1);
}
console.log(hashPassword(password));
