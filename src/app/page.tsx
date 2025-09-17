import MapView from "@/features/search/MapView/components/MapView";
import SearchForm from "@/features/search/SearchForm/components/SearchForm";
import SearchResultList from "@/features/search/SearchResultList/components/SearchResultList";
import { stores } from "../features/search/data/stores.mock";

export default function Home() {
  return (
    <main className="p-4 flex flex-col gap-8">
      <SearchForm />
      <MapView />
      <SearchResultList stores={stores} />
    </main>
  );
}
