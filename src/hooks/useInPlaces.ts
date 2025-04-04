import useSWR from "swr";

export interface InPlacesData {
  collections: {
    inPlaces: {
      _id: string;
      _sys: { title: string };
      items: Array<{
        _id: string;
        _sys: { title: string; slug: string };
        image: {
          url: string;
          width: number;
          height: number;
          alt: string;
          fileName: string;
        };
        uploadedBy: {
          _id: string;
          _sys: { title: string };
          email: string;
          country: string;
        };
      }>;
    };
  };
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Error al obtener datos");
  }
  return res.json();
};

export function useInPlaces(initialData?: InPlacesData) {
  const { data, error, isLoading, mutate } = useSWR<InPlacesData>(
    "/api/inplaces",
    fetcher,
    {
      fallbackData: initialData,
      revalidateOnFocus: true,
      revalidateIfStale: true,
      revalidateOnMount: true,
      dedupingInterval: 5000,
    }
  );

  return {
    data,
    loading: isLoading,
    error,
    refresh: () => mutate(),
  };
}
