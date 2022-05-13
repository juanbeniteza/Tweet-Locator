import SearchBar from './SearchBar';
import Tweet from './Tweet';
import SearchTerms from './SearchTerms';
import React, { useState, useEffect } from 'react';
import ObjectNames from './shared/interfaces/geo.interface';

import axios from 'axios';

interface Props {
  tweets: ObjectNames[];
}

function Info(props: Props): ReturnType<React.FC> {
  const { tweets } = props;

  const [searchTerms, setSearchTerms] = useState([]);

  const getTerms = () => {
    axios
      .get('http://localhost:3001/rules')
      .then((res) => {
        setSearchTerms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createTerm = (term: string) => {
    axios
      .post('http://localhost:3001/rules', {
        rule: term,
      })
      .then((res) => {
        getTerms();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTerm = (termId: string) => {
    axios
      .put('http://localhost:3001/rules', {
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
      <SearchTerms
        searchTerms={searchTerms}
        onDelete={deleteTerm}
        term={''}
        id={''}
      />
      <Tweet tweets={tweets} />
    </div>
  );
}

export default Info;
