
import { stores } from "@/data/stores";
import MapView from "@/features/search/MapView/components/MapView";
import SearchForm from "@/features/search/SearchForm/components/SearchForm";
import SearchResultList from "@/features/search/SearchResultList/components/SearchResultList";

export default function Home() {
  return (
    <main className="p-4 flex flex-col gap-8">
      <SearchForm />
      <MapView stores={stores} />
      <SearchResultList stores={stores} />
    </main>
  );
}
