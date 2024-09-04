/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { registerUser } from '../../utils/auth';
import { updateUser } from '../../api/userData';

export default function UserForm({ mode, userProp }) {
  const { user: authUser, updateUser: updateAuthUser } = useAuth();
  const router = useRouter();

  const initialState = {
    uid: authUser.fbUser.uid,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    seller: false,
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (mode === 'update' && userProp) {
      setFormData((prevState) => ({
        ...prevState,
        ...userProp,
      }));
    }
  }, [mode, userProp]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      seller: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'register') {
      registerUser(formData).then(() => updateAuthUser(authUser.fbUser.uid));
      router.push('/');
    } else if (mode === 'update') {
      updateUser(formData.id, formData)
        .then((updatedUser) => {
          router.push('/users');
          console.warn('User updated:', updatedUser);
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {[
        { label: 'First name', name: 'firstName', type: 'text', placeholder: 'Enter your first name' },
        { label: 'Last name', name: 'lastName', type: 'text', placeholder: 'Enter your last name' },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
        { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter your address' },
        { label: 'City', name: 'city', type: 'text', placeholder: 'Enter your city' },
        { label: 'State', name: 'state', type: 'text', placeholder: 'Enter your state' },
        { label: 'ZIP', name: 'zip', type: 'text', placeholder: 'Enter your ZIP' },
      ].map(({ label, name, type, placeholder }) => (
        <Form.Group className="mb-3" controlId={`formBasic${name}`} key={name}>
          <Form.Label>{label}</Form.Label>
          <Form.Control
            type={type}
            name={name}
            required
            value={formData[name] || ''}
            placeholder={placeholder}
            onChange={handleInputChange}
          />
        </Form.Group>
      ))}
      <Form.Group className="mb-3" controlId="formBasicSeller">
        <Form.Check
          type="checkbox"
          label="Are you a seller?"
          checked={formData.seller}
          onChange={handleCheckboxChange}
        />
      </Form.Group>
      <Button variant="dark" type="submit">
        {mode === 'register' ? 'Register' : 'Update'}
      </Button>
    </Form>
  );
}

UserForm.propTypes = {
  mode: PropTypes.oneOf(['register', 'update']).isRequired,
  userProp: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    seller: PropTypes.bool,
  }),
};

UserForm.defaultProps = {
  userProp: {},
};
