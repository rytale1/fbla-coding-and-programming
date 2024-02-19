import { useState } from "react";

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle search logic here
    };

    return (
        <form className="search-form" onSubmit={handleOnSubmit}>
            <input
                type="text"
                className="form-control"
                placeholder="Search jobs"
                value={searchTerm}
                onChange={handleOnChange}
            />
            <button type="submit" className="btn btn-primary">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
