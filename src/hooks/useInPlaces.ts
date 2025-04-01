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

export function useInPlaces() {
  const { data, error, isLoading } = useSWR<InPlacesData>(
    "/api/inplaces",
    fetcher
  );

  return {
    data,
    loading: isLoading,
    error,
  };
}
