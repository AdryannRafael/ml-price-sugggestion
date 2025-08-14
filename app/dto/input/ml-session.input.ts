import type { MlSession } from "../ml-session";

export type MlSessionInput = Omit<MlSession, "id" | "createdAt">;
