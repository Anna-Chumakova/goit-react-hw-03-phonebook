import { Component } from "react";
import { nanoid } from "nanoid";
import styles from "./FormAddContact.module.css";

class FormAddContact extends Component {
    state = {
        name: '',
        number: ''
    }
    
    nameId = nanoid();
    numberId = nanoid();

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, number } = this.state;
        this.props.onSubmit({name, number});
        this.setState({
            name: '',
            number: '',
        })    
    }

    
    render() {
        const { nameId, numberId, handleSubmit, handleChange } = this;
        return (
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor={nameId}>Name: </label>
                    <input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        id={nameId}
                        value={this.state.name}
                        onChange={handleChange}
                        className="field"
                        placeholder="Name"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor={numberId}>Number: </label>
                    <input
                        id={numberId}
                        name="number"
                        value={this.state.number}
                        onChange={handleChange}
                        className="field"
                        placeholder="Number"
                        type="tel"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required />
                </div>
                <button className={styles.btn}>Add contact</button>
        </form>
        )
    }
}

export default FormAddContact;