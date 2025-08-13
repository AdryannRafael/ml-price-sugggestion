interface MlSession {
  id: string;
  mlAccessToken: string;
  mlRefreshToken?: string;
  mlExpiresIn: number;
  mlUserId: string;
  createdAt: Date;
}

const sessions = new Map<string, MlSession>();

export const createSession = async (
  data: Omit<MlSession, "id" | "createdAt">
): Promise<MlSession> => {
  const session: MlSession = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date(),
  };
  sessions.set(session.id, session);
  return session;
};

export const getSession = async (id: string): Promise<MlSession | null> => {
  return sessions.get(id) || null;
};

export const deleteSession = async (id: string): Promise<void> => {
  sessions.delete(id);
};
