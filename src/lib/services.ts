import { AuthService } from "../features/auth/data/AuthService";

// Could be env variable we read
const backendUrl = "https://example.com";

export const authService = new AuthService(backendUrl);
