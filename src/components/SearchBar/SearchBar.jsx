import { useDispatch, useSelector } from "react-redux";
import "./SearchBar.css";
import {
  addKeywordsToSearch,
  clearSearchKeyword,
  removeSearchResults,
} from "../../utils/searchSlice";
import { useEffect, useRef } from "react";

const SearchBar = () => {
  const searchData = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    dispatch(addKeywordsToSearch(e.target.value));
  };

  useEffect(() => {
    searchData.keywords.length > 0 && inputRef.current.focus();
  }, []);

  const handleClear = () => {
    dispatch(clearSearchKeyword());
    dispatch(removeSearchResults());
    inputRef.current.blur();
  };

  return (
    <div>
      <div className='search-box'>
        <input
          type='text'
          onChange={(e) => handleSearch(e)}
          placeholder='What to watch?'
          value={searchData.keywords}
          ref={inputRef}
        />
        <button className='z-[3]' onClick={handleClear} aria-label="Close" type='reset'></button>
      </div>
    </div>
  );
};

export default SearchBar;
