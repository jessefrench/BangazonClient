/* eslint-disable object-curly-newline */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { registerUser } from '../../utils/auth';
import { updateUser } from '../../api/userData';

export default function RegisterForm({ mode, userProp }) {
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
      setFormData((prevState) => ({ ...prevState, ...userProp }));
    }
  }, [mode, userProp]);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = ({ target: { checked } }) => {
    setFormData((prev) => ({ ...prev, seller: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === 'register') {
        await registerUser(formData);
        updateAuthUser(authUser.fbUser.uid);
        router.push('/');
      } else if (mode === 'update') {
        await updateUser(formData.id, formData);
        router.push('/profile');
      }
    } catch (error) {
      console.error(`Error ${mode === 'register' ? 'registering' : 'updating'} user:`, error);
    }
  };

  const formFields = [
    { label: 'First name', name: 'firstName', type: 'text', placeholder: 'Enter your first name' },
    { label: 'Last name', name: 'lastName', type: 'text', placeholder: 'Enter your last name' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter your address' },
    { label: 'City', name: 'city', type: 'text', placeholder: 'Enter your city' },
    { label: 'State', name: 'state', type: 'text', placeholder: 'Enter your state' },
    { label: 'ZIP', name: 'zip', type: 'text', placeholder: 'Enter your ZIP' },
  ];

  return (
    <Form onSubmit={handleSubmit}>
      {formFields.map(({ label, name, type, placeholder }) => (
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

RegisterForm.propTypes = {
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

RegisterForm.defaultProps = {
  userProp: {},
};
