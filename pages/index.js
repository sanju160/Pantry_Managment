import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import PantryForm from '../components/PantryForm';
import PantryList from '../components/PantryList';
import NavBar from '../components/NavBar';
import { Container } from '@mui/material';
import pantryFormStyles from '../components/PantryForm.module.css'; // Import PantryForm specific styles

const Home = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editItem, setEditItem] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  if (!user) return null; // Show nothing until the user state is determined

  return (
    <div>
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleLogout={handleLogout} />
      <Container className={pantryFormStyles.container}>
        <PantryForm editItem={editItem} setEditItem={setEditItem} />
        <PantryList searchQuery={searchQuery} setEditItem={setEditItem} />
      </Container>
    </div>
  );
};

export default Home;
