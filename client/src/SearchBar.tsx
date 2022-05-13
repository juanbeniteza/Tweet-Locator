import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { SetStateAction, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface Props {
  onSubmit: (value: string) => void;
}

function SearchBar(props: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const { onSubmit } = props;

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let value = searchTerm;
    setSearchTerm('');

    onSubmit(value);
  };

  return (
    <div className="search-bar">
      <InputGroup className="search">
        <FormControl
          style={{ marginLeft: '10px' }}
          placeholder="Search"
          onChange={handleChange}
          value={searchTerm}
        />
        <Button onClick={handleSubmit}>
          <AiOutlineSearch size={22} />
        </Button>
      </InputGroup>
    </div>
  );
}

export default SearchBar;
