import { CountryOption } from "@/lib/schemas/submission";

export interface CountrySelectorProps {
  countryOptions: CountryOption[];
  countryCode: string;
  error?: string;
  hasError?: boolean;
  selectProps: React.SelectHTMLAttributes<HTMLSelectElement>;
  label?: string;
}
