import css from './ContactListItem.module.css';
import PropTypes from 'prop-types';

export const ContactListItem = ({ contact, onClick }) => {
  return (
    <li key={contact.id} className={css.contactItem}>
      <span className={css.itemContainer}>
        {contact.contactName}: {contact.contactNumber}
      </span>
      <button
        id={contact.id}
        type="button"
        className={css.buttonItem}
        onClick={onClick}
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
