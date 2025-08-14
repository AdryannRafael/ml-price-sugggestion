export interface MlSession {
  id: string;
  mlAccessToken: string;
  mlRefreshToken?: string;
  mlExpiresIn: number;
  mlUserId: string;
  createdAt: Date;
}
