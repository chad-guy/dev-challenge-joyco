import { CountryOption } from "@/lib/schemas/submission";

export interface CustomSelectProps {
  options: CountryOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
}
