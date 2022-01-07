import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const { onSubmit } = props;

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let value = searchTerm;
    setSearchTerm("");

    onSubmit(value);
  };

  return (
    <div className="search-bar">
      <InputGroup className="search">
        <Button onClick={handleSubmit}>
          <box-icon name="search-alt" size="sm"></box-icon>
        </Button>
        <FormControl
          placeholder="Search"
          onChange={handleChange}
          value={searchTerm}
        />
      </InputGroup>
    </div>
  );
}

export default SearchBar;
