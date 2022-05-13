interface SearchTerms {
  value: string;
  id: string;
}

interface Props {
  term: string;
  id: string;
  onDelete: (id: string) => void;
  searchTerms: SearchTerms[];
}

function Term(props: Props) {
  const { term, id, onDelete } = props;

  const deleteTerm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(id);
    onDelete(id);
  };

  return (
    <div className="terms">
      <span>{term}</span>
      <span className="remove-term" onClick={deleteTerm}>
        X
      </span>
    </div>
  );
}

function SearchTerms(props: Props) {
  const { searchTerms } = props;
  const { onDelete } = props;

  return (
    <div className="search-terms">
      <div className="terms-group">
        {searchTerms.map((term) => (
          <Term
            term={term.value}
            id={term.id}
            key={term.id}
            onDelete={onDelete}
            searchTerms={[]}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchTerms;
