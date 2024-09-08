interface InputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const Input: React.FC<InputProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="p-4">
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar Ativo ou Local"
        className="h-8 border-2 w-full px-2 rounded p-4"
      />
    </div>
  );
};

