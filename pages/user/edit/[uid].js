import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserDetails } from '../../../api/userData';
import RegisterForm from '../../../components/forms/RegisterForm';

export default function EditUser() {
  const [editUser, setEditUser] = useState({});
  const router = useRouter();
  const { uid } = router.query;

  useEffect(() => {
    if (uid) {
      getUserDetails(uid)
        .then((userData) => {
          setEditUser(userData);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [uid]);

  return <RegisterForm mode="update" userProp={editUser} />;
}
