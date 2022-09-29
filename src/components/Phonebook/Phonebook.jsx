import { Component } from "react";
import FormAddContact from "./FormAddContact/FormAddContact";
import ContactList from "./ContactList/ContactList";
import { nanoid } from "nanoid";
import styles from "./Phonebook.module.css";

class Phonebook extends Component {
    state = {
        contacts: [],
        filter: '',
    }
addContact = (contact) => {
    if (this.isDuplicate(contact)) {
        return alert(`${contact.name} - ${contact.number} is already in contacts`);
    }
    this.setState((prev) => {
        const newContact = {
            id: nanoid(),
            ...contact
        }
        return {
            contacts: [...prev.contacts, newContact]
        }
    })
  }

  removeContact = (id) => {
    this.setState((prev) => {
        const newContacts = prev.contacts.filter((item) => item.id !== id);

        return {
            contacts: newContacts
        }
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
        [name]: value
    })
  }

  isDuplicate({name, number}) {
    const { contacts } = this.state;
    const result = contacts.find((item) => item.name === name && item.number === number);
    return result;
  }

  getFilteredContacts() {
    const { contacts, filter } = this.state;
    
    if (!filter) {
        return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({name, number}) => {
        const normalizedName = name.toLocaleLowerCase();
        const normalizedNumber = number.toLocaleLowerCase();
        const result = normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter);
        return result;
    })

    return filteredContacts;
  }

    render() {
        const { addContact, removeContact, handleChange } = this;
        const { filter } = this.state;
        const contacts = this.getFilteredContacts();
        return (
        <div className={styles.container}>
            <h2 className={styles.title}>Contacts</h2>
            <div className={styles.contactBlock}>
                <div>
                    <FormAddContact onSubmit={addContact} />
                </div>
                    <div>
                    <h3>Find contacts by name</h3>
                    <input type="text" name="filter" onChange={handleChange} value={filter} className={styles.filter} placeholder="Filter" />
                    <ContactList items={contacts} removeContact={removeContact} />
            </div>
            </div>
      </div>
    )   
    }
}
export default Phonebook;