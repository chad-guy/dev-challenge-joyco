import { CountryOption } from "@/lib/schemas/submission";

export interface CustomCountryDropdownProps {
  options: CountryOption[];
  value: string;
  onChangeAction: (value: string) => void;
  error?: string;
  disabled?: boolean;
}
