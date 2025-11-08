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
  const {
    campers,
    filters,
    setCampers,
    addCampers,
    currentPage,
    setCurrentPage,
    total,
    setTotal,
  } = useCampersStore();
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCampers = useCallback(
    async (pageNum: number, newFilters = filters) => {
      setLoading(true);
      setError(null); // Очищаємо помилку при новому завантаженні
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
        setError('Не вдалося завантажити список кемперів. Спробуйте ще раз.');
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    },
    [filters, setCampers, addCampers, setTotal]
  );

  // Initial load - відновлюємо пагінацію з store
  useEffect(() => {
    // Якщо є збережені кемпери, просто показуємо їх (пагінація зберігається)
    if (campers.length > 0) {
      setIsInitialLoad(false);
      return;
    }

    // Якщо немає збережених кемперів, але поточна сторінка > 1, завантажуємо всі попередні сторінки
    if (currentPage > 1) {
      const loadAllPages = async () => {
        setLoading(true);
        setError(null);
        try {
          const allCampers: typeof campers = [];
          for (let i = 1; i <= currentPage; i++) {
            const data = await getCampers({
              ...filters,
              page: i,
              limit: PAGE_SIZE,
            });
            allCampers.push(...data.items);
            if (i === currentPage) {
              setTotal(data.total);
            }
          }
          setCampers(allCampers);
        } catch (error) {
          console.error('Failed to load campers:', error);
          setError('Не вдалося завантажити список кемперів. Спробуйте ще раз.');
          // Якщо помилка, скидаємо на першу сторінку
          setCurrentPage(1);
          loadCampers(1);
        } finally {
          setLoading(false);
          setIsInitialLoad(false);
        }
      };
      loadAllPages();
    } else {
      // Якщо немає збережених кемперів і поточна сторінка = 1, завантажуємо першу сторінку
      loadCampers(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load more campers when page changes
  useEffect(() => {
    if (currentPage > 1) {
      // Перевіряємо, чи вже завантажені кемпери для цієї сторінки
      const expectedCount = currentPage * PAGE_SIZE;
      if (campers.length < expectedCount) {
        loadCampers(currentPage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page for new search
    const currentFilters = useCampersStore.getState().filters;
    loadCampers(1, currentFilters);
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const showLoadMoreButton = !loading && campers.length < total;

  return (
    <div className={styles.container}>
      <div className={styles.filtersWrapper}>
        <Filters onSearch={handleSearch} />
      </div>
      <div className={styles.listWrapper}>
        {error ? (
          <div>
            <p>{error}</p>
            <button
              onClick={() => {
                setError(null);
                loadCampers(1);
              }}
            >
              Спробувати ще раз
            </button>
          </div>
        ) : isInitialLoad && loading ? (
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
