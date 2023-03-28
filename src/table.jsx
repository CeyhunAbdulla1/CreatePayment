import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

function UserTable() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    setUsers(data);
  };

  const handleViewClick = user => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEditClick = user => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
    setSelectedUser(null);
  };

  const handleSave = newData => {
    // TODO: API'ye düzenlenen verileri gönderin
    console.log('New data:', newData);
    const updatedUsers = users.map(user => (user.id === newData.id ? newData : user));
    setUsers(updatedUsers);
    handleModalClose();
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSelectedUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>
                <button onClick={() => handleViewClick(user)}>View</button>
                <button onClick={() => handleEditClick(user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && (
        <EditModal user={selectedUser} onClose={handleModalClose} onSave={handleSave} onChange={handleInputChange} />
      )}
      {isViewModalOpen && (
        <ViewModal user={selectedUser} onClose={handleModalClose} />
      )}
    </div>
  );
}

function EditModal({ user, onClose, onSave, onChange }) {
  return (
    <Modal isOpen={true} onRequestClose={onClose} style={customModalStyles}>
      <h2>Edit User</h2>
      <form onSubmit={event => {
        event.preventDefault();
        onSave(user);
      }}>
        <div>
          <label htmlFor="username">Username:</label>
          <input id="username" name="username" type="text" value={user.username} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text" value={user.name} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="surname">Surname:</label>
          <input id="surname" name="surname" type="text" value={user.surname} onChange={onChange} />
        </div>
        <div>
          <button type="submit">Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

function ViewModal({ user, onClose }) {
  return (
    <Modal isOpen={true} onRequestClose={onClose} style={customModalStyles}>
      <h2>User Details</h2>
      <div>
        <strong>Username:</strong> {user.username}
      </div>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Surname:</strong> {user.surname}
      </div>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
}




export default UserTable;
