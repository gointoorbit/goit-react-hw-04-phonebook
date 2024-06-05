import { useState, useEffect } from 'react';
import { AddContactForm } from './AddContactForm/AddContactForm.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import { ContactListItem } from './ContactListItem/ContactListItem.jsx';
import { SearchFilter } from './SearchFilter/SearchFilter.jsx';
import { nanoid } from 'nanoid';

export const App = () => {
  const savedContacts = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(savedContacts || []);
  const [filter, setFilter] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const onChange = event => {
    const { name, value } = event.target;

    if (name === 'name') {
      setContactName(value);
    }
    if (name === 'number') {
      setContactNumber(value);
    }
    if (name === 'filter') {
      setFilter(value);
    }
  };

  const onSubmit = event => {
    event.preventDefault();

    const duplicativeContact = contacts.some(
      contact =>
        contact.contactName.toLowerCase() === contactName.trim().toLowerCase()
    );

    if (duplicativeContact) {
      alert(`${contactName} is already in contacts`);
      return;
    }

    setContacts([...contacts, { id: nanoid(), contactName, contactNumber }]);
    setFilter('');
    setContactName('');
    setContactNumber('');
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filteredUserData = contacts.filter(contact =>
    contact.contactName.toLowerCase().includes(filter.toLowerCase())
  );

  const onDelete = event => {
    const dataToLeave = contacts.filter(
      contact =>
        !contact.id.toLowerCase().includes(event.target.id.toLowerCase())
    );

    setContacts(dataToLeave);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <AddContactForm
        onChange={onChange}
        onSubmit={onSubmit}
        contactName={contactName}
        contactNumber={contactNumber}
      />
      <h2>Contacts</h2>
      <SearchFilter onChange={onChange} filter={filter} />
      <ContactList>
        {filteredUserData.map(contact => (
          <ContactListItem contact={contact} onClick={onDelete} />
        ))}
      </ContactList>
    </>
  );
};
