/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { registerUser } from '../../utils/auth';

export default function RegisterForm() {
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const initialState = {
    uid: user.fbUser.uid,
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
    registerUser(formData).then(() => updateUser(user.fbUser.uid));
    router.push('/');
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
      <Button variant="danger" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    fbUser: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
