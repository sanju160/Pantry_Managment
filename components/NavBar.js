import { Button, TextField } from '@mui/material';
import styles from './NavBar.module.css';

const NavBar = ({ searchQuery, setSearchQuery, handleLogout }) => {
  return (
    <div className={styles.navbar}>
      <h1>Pantry Management</h1>
      <div>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchField}
        />
        <Button onClick={handleLogout} className={styles.logoutButton}>Logout</Button>
      </div>
    </div>
  );
};

export default NavBar;
