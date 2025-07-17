// components/clients/ClientSearchBar.tsx
type ClientSearchBarProps = {
  setSearchTerm: (term: string) => void;
};

export default function ClientSearchBar({ setSearchTerm }: ClientSearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search clients..."
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border px-3 py-1 rounded shadow-sm"
    />
  );
}
