export type AccountPlatform = 'Instagram' | 'TikTok' | 'YouTube' | 'X' | 'Facebook' | 'LinkedIn';

export interface Account {
  id: string;
  platform: AccountPlatform;
  name: string;
  followers: number;
  engagementRate: number;
  postsLast7Days: number;
  updatedAt: string;
}

export type AccountUpsert = Omit<Account, 'id' | 'updatedAt'>;
