import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import styles from './PantryList.module.css';

const PantryList = ({ searchQuery, setEditItem }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pantry'), (snapshot) => {
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={4} className={styles.gridContainer}>
      {filteredItems.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={4}>
          <Card className={styles.card}>
            {item.imageUrl && (
              <CardMedia
                component="img"
                className={styles.cardMedia}
                image={item.imageUrl}
                alt={item.name}
              />
            )}
            <CardContent className={styles.cardContent}>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {item.quantity}
              </Typography>
            </CardContent>
            <CardActions className={styles.cardActions}>
              <Button size="small" className={styles.editButton} onClick={() => setEditItem(item)}>Edit</Button>
              <Button size="small" className={styles.deleteButton} onClick={async () => await deleteDoc(doc(db, 'pantry', item.id))}>Delete</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PantryList;
