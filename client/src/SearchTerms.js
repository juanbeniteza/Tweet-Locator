function Term(props) {
  const { term, id, onDelete } = props;

  const deleteTerm = (e) => {
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

function SearchTerms(props) {
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
          />
        ))}
      </div>
    </div>
  );
}

export default SearchTerms;
