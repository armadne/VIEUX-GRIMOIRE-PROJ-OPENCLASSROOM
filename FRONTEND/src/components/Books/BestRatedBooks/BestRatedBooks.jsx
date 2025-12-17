import React from 'react';
import PropTypes from 'prop-types';
import { useBestRatedBooks } from '../../../lib/customHooks';
import BookItem from '../BookItem/BookItem';
import styles from './BestRatedBooks.module.css';

function BestRatedBooks({ author, genre }) {
  const { bestRatedBooks } = useBestRatedBooks();
  const role = localStorage.getItem('role');

  // Filtrage selon le rôle
  let filteredBooks = bestRatedBooks;
  if (role === 'admin' && genre) {
    filteredBooks = bestRatedBooks.filter((book) => book.genre === genre);
  } else if (role !== 'admin' && author) {
    filteredBooks = bestRatedBooks.filter((book) => book.author === author);
  }

  const content = filteredBooks.length > 0 ? (
    filteredBooks.map((book) => (
      <BookItem key={`book-${book.id}`} book={book} size={3} />
    ))
  ) : (
    <h3>Aucune recommandation</h3>
  );

  return (
    <section className={`content-container ${styles.BestRatedBooks}`}>
      <h2>
        {role === 'admin' ? 'Livres similaires' : 'Du même auteur...'}
      </h2>
      <div className={styles.List}>
        {content}
      </div>
    </section>
  );
}

BestRatedBooks.propTypes = {
  author: PropTypes.string,
  genre: PropTypes.string,
};

BestRatedBooks.defaultProps = {
  author: '',
  genre: '',
};

export default BestRatedBooks;
