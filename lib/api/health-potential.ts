import { axiosInstance } from "./axios-instance";

export interface HealthPotentialSection {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  updatedAt: string;
}

export async function getHealthPotential(): Promise<{
  success: boolean;
  data: HealthPotentialSection;
}> {
  const { data } = await axiosInstance.get<{
    success: boolean;
    data: HealthPotentialSection;
  }>("/api/health-potential");
  return data;
}
