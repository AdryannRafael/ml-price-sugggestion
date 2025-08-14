import type { MlSessionInput } from "~/dto/input/ml-session.input";
import type { MlSession } from "~/dto/ml-session";

const sessions = new Map<string, MlSession>();

export const createSession = async (
  data: MlSessionInput
): Promise<MlSession> => {
  const session: MlSession = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date(),
  };
  sessions.set(session.id, session);
  return session;
};
export const refreshSession = async (
  id: string,
  data: MlSessionInput
): Promise<MlSession> => {
  const sessionLoad = await getSession(id);
  if (!sessionLoad) throw new Error("Session not exist");
  const session: MlSession = {
    id: sessionLoad.id,
    ...data,
    createdAt: new Date(),
  };
  sessions.set(sessionLoad.id, session);
  return session;
};

export const getSession = async (id: string): Promise<MlSession | null> => {
  return sessions.get(id) || null;
};

export const deleteSession = async (id: string): Promise<void> => {
  sessions.delete(id);
};
