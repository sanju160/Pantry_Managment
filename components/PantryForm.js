import { useState, useEffect } from 'react';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button, TextField, Container } from '@mui/material';
import styles from './PantryForm.module.css';

const PantryForm = ({ editItem, setEditItem }) => {
  const [item, setItem] = useState({ name: '', quantity: '' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editItem) {
      setItem(editItem);
    }
  }, [editItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = item.imageUrl || ''; // Use the existing image URL by default

    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const itemData = { ...item, imageUrl };

    if (editItem) {
      const itemRef = doc(db, 'pantry', editItem.id);
      await updateDoc(itemRef, itemData);
      setEditItem(null);
    } else {
      await addDoc(collection(db, 'pantry'), itemData);
    }

    setItem({ name: '', quantity: '' });
    setImage(null);
  };

  return (
    <Container className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="Name"
          name="name"
          value={item.name}
          onChange={handleChange}
          required
          fullWidth
          className={styles.textField}
        />
        <TextField
          label="Quantity"
          name="quantity"
          value={item.quantity}
          onChange={handleChange}
          required
          fullWidth
          className={styles.textField}
        />
        <input
          type="file"
          id="file-input"
          onChange={handleImageChange}
          className={styles.fileInput}
        />
        <label htmlFor="file-input" className={styles.uploadButton}>
          &#9650;
        </label>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={styles.submitButton}
        >
          {editItem ? 'Update' : 'Add'} Item
        </Button>
      </form>
    </Container>
  );
};

export default PantryForm;
