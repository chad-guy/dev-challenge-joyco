import { basehub } from "basehub";
import { HomePage } from "@/components/pages";

export const revalidate = 60;

interface InPlacesData {
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

async function getInPlacesData() {
  try {
    const result = await basehub().query({
      collections: {
        inPlaces: {
          _id: true,
          _sys: { title: true },
          items: {
            _id: true,
            _sys: { title: true, slug: true },
            image: {
              url: true,
              width: true,
              height: true,
              alt: true,
              fileName: true,
            },
            uploadedBy: {
              _id: true,
              _sys: { title: true },
              email: true,
              country: true,
            },
          },
        },
      },
    });

    if (result.collections.inPlaces?.items) {
      result.collections.inPlaces.items =
        result.collections.inPlaces.items.filter((item) => item.image !== null);
    }

    return result as InPlacesData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error al obtener datos de Basehub");
  }
}

export default async function Home() {
  const inPlacesData = await getInPlacesData();

  return <HomePage data={inPlacesData} />;
}
