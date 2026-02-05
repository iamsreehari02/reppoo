import { axiosInstance } from "./axios-instance";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface FaqSection {
  _id: string;
  sectionTitle: string;
  sectionParagraph: string;
  items: FaqItem[];
  updatedAt: string;
}

export async function getFaqSection(): Promise<{
  success: boolean;
  data: FaqSection;
}> {
  const { data } = await axiosInstance.get<{
    success: boolean;
    data: FaqSection;
  }>("/api/faq");
  return data;
}
