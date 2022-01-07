import SearchBar from "./SearchBar";
import Tweet from "./Tweet";
import SearchTerms from "./SearchTerms";
import { useState, useEffect } from "react";
import axios from "axios";

function Info(props) {
  const { tweets } = props;

  const [searchTerms, setSearchTerms] = useState([]);

  const getTerms = () => {
    axios
      .get("http://localhost:3001/rules")
      .then((res) => {
        setSearchTerms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createTerm = (term) => {
    axios
      .post("http://localhost:3001/rules", {
        rule: term,
      })
      .then((res) => {
        getTerms();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTerm = (termId) => {
    axios
      .put("http://localhost:3001/rules", {
        ruleIds: [termId],
      })
      .then((res) => {
        getTerms();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTerms();
  }, []);

  return (
    <div className="info">
      <SearchBar onSubmit={createTerm} />
      <SearchTerms searchTerms={searchTerms} onDelete={deleteTerm} />
      <Tweet tweets={tweets} />
    </div>
  );
}

export default Info;
