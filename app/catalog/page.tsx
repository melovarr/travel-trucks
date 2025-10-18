'use client';

import { useCallback, useEffect, useState } from 'react';
import CamperList from '../../components/CamperList/CamperList';
import { getCampers } from '../../lib/api';
import styles from './catalogPage.module.css';
import Filters from 'components/Filters/Filters';
import useCampersStore from '../../store/useCampersStore';
import Button from 'components/UI/Buttons/LoadButton';
import Loading from '../loading';

const PAGE_SIZE = 4;

export default function Catalog() {
  const { campers, filters, setCampers, addCampers } = useCampersStore();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loadCampers = useCallback(
    async (pageNum: number, newFilters = filters) => {
      setLoading(true);
      try {
        const data = await getCampers({
          ...newFilters,
          page: pageNum,
          limit: PAGE_SIZE,
        });

        if (pageNum === 1) {
          setCampers(data.items);
        } else {
          addCampers(data.items);
        }
        setTotal(data.total);
      } catch (error) {
        console.error('Failed to load campers:', error);
        // Optionally, handle the error in the UI
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    },
    [filters, setCampers, addCampers]
  );

  // Initial load
  useEffect(() => {
    loadCampers(1);
  }, []);

  // Load more campers when page changes
  useEffect(() => {
    if (page > 1) {
      loadCampers(page);
    }
  }, [page]);

  const handleSearch = () => {
    setPage(1); // Reset to first page for new search
    const currentFilters = useCampersStore.getState().filters;
    loadCampers(1, currentFilters);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showLoadMoreButton = !loading && campers.length < total;

  return (
    <div className={styles.container}>
      <div className={styles.filtersWrapper}>
        <Filters onSearch={handleSearch} />
      </div>
      <div className={styles.listWrapper}>
        {isInitialLoad && loading ? (
          <Loading />
        ) : (
          <CamperList campers={campers} />
        )}

        {showLoadMoreButton && (
          <div className={styles.loadMoreContainer}>
            <Button onClick={handleLoadMore} disabled={loading}>
              {loading ? 'Loading...' : 'Load More'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
