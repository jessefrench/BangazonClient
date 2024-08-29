import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { checkUser, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/RegisterForm';

export default function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  return (
    <>
      {authUser?.uid === user?.uid ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            height: '90vh',
            padding: '30px',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <h1>Hello {user?.fbUser?.displayName}! </h1>
          <p>Click the button below to logout!</p>
          <Button variant="danger" type="button" size="lg" className="user-card-button" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      ) : (<RegisterForm user={user} onUpdate={onUpdate} />)}
    </>
  );
}
