import css from './SearchFilter.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const searchFilterId = nanoid();

export const SearchFilter = ({ onChange, filter }) => {
  return (
    <div className={css.filterContainer}>
      <label htmlFor={searchFilterId} className={css.filterLabel}>
        Find contacts by name
      </label>
      <input
        id={searchFilterId}
        className={css.filterInput}
        type="text"
        name="filter"
        onChange={onChange}
        value={filter}
      ></input>
    </div>
  );
};

SearchFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
