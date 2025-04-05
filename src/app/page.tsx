import { HomePage } from "@/components/pages";
import { getInPlacesData } from "@/lib/api";

export const revalidate = 60;

export default async function Home() {
  const inPlacesData = await getInPlacesData();
  return <HomePage data={inPlacesData} />;
}
