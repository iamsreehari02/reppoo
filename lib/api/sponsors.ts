import { axiosInstance } from "./axios-instance";

export interface Sponsor {
  _id: string;
  name: string;
  logoUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export async function getSponsors(): Promise<Sponsor[]> {
  const { data } = await axiosInstance.get<{
    success: boolean;
    data: Sponsor[];
  }>("/api/sponsors");
  return data.data;
}
