import { axiosInstance } from "./axios-instance";

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  testimonialText: string;
  avatarUrl: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/* 🔥 NEW: testimonial page content */
export interface TestimonialPage {
  title: string;
  subtitle: string;
}

/* existing */
export async function getAllTestimonials(): Promise<{
  success: boolean;
  data: Testimonial[];
}> {
  const { data } = await axiosInstance.get("/api/testimonials");
  return data;
}

/* 🔥 NEW: get testimonial page title + subtitle */
export async function getTestimonialPage(): Promise<{
  success: boolean;
  data: TestimonialPage;
}> {
  const { data } = await axiosInstance.get("/api/testimonial-page");
  return data;
}
