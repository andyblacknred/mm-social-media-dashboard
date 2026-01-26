export type AccountPlatform = 'Instagram' | 'TikTok' | 'YouTube' | 'X' | 'Facebook' | 'LinkedIn';

export type Account = {
  id: string;
  platform: AccountPlatform;
  name: string;
  followers: number;
  engagementRate: number; // %
  postsLast7Days: number;
  updatedAt: string; // ISO
};

export type AccountUpsert = {
  platform: AccountPlatform;
  name: string;
  followers: number;
  engagementRate: number;
  postsLast7Days: number;
};
