import { AuthService } from "../features/auth/data/AuthService";
import { DashService } from "../features/dash/data/DashService";

// Could be env variable we read
const backendUrl = "https://example.com";

export const authService = new AuthService(backendUrl);

export const dashService = new DashService();
