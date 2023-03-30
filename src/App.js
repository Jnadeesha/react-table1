import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./process.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [contacts, setContacts] = useState(JSON.stringify(data));

  const day={analyses: [
    {
  analysis: "",
  ruleSeperator: "",
  logicalOperator: "",
  interval: "",
    }]
}
  const [addFormData, setAddFormData] = useState(
    day
  );

  const [editFormData, setEditFormData] = useState(day);

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
      //console.log(newFormData);

  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
    //console.log(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      analysis: addFormData.analysis,
      ruleSeperator: addFormData.ruleSeperator,
      logicalOperator: addFormData.logicalOperator,
      interval: addFormData.interval,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
       // console.log(newContacts);

  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      analysis: editFormData.analyses[0].analysis,
      ruleSeperator: editFormData.analyses[0].ruleSeperator,
      logicalOperator: editFormData.analyses.logicalOperator,
      interval: editFormData.analyses.interval,
    };

    const newContacts = [...contacts];

    const index = contacts.analyses.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
       //// console.log(newContacts);

    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      analysis: contact.analyses[0].analysis,
      ruleSeperator: contact.analyses[0].ruleSeperator,
      logicalOperator: contact.analyses.logicalOperator,
      interval: contact.analyses.interval,
    };

    setEditFormData(formValues);
           //console.log(formValues);

  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.analyses.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
              ////console.log(newContacts);

  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ruleSeperator</th>
              <th>Phone Number</th>
              <th>interval</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          


          {  Array.isArray(contacts)? contacts.map((person,x) => (
                 (person?.analyses && person?.analyses.map((contact) =>(
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>



                 )))
            ))

          
            : null }
          </tbody>
        </table>
      </form>

      <h2>Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="analysis"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="ruleSeperator"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="logicalOperator"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="interval"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
