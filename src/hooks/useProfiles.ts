import useSWR from "swr";

export interface ProfileData {
  components: Array<{
    _id: string;
    _title: string;
    profile: {
      _id: string;
      _title: string;
      email: string;
      country: string;
    };
  }>;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Error al obtener datos");
  }
  return res.json();
};

export function useProfiles() {
  const { data, error, isLoading } = useSWR<ProfileData>(
    "/api/profile",
    fetcher
  );

  return {
    data,
    loading: isLoading,
    error,
  };
}
