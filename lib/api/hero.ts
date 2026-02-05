import { axiosInstance } from "./axios-instance";

export interface BackendHero {
  _id: string;
  title?: string;
  subtitle?: string;
  userCount?: number;
  image1Url?: string;
  image2Url?: string;
  image3Url?: string;
  updatedAt?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
}

interface HeroResponse {
  success: boolean;
  data: BackendHero;
}

export async function getHero(): Promise<BackendHero | null> {
  try {
    const { data } = await axiosInstance.get<HeroResponse>("/api/content/hero");
    if (!data?.success || !data?.data) return null;
    return data.data;
  } catch {
    return null;
  }
}
