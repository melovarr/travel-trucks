import React from 'react';
import styles from './Filters.module.css';
import useCampersStore from '../../store/useCampersStore';
import Image from 'next/image';
import Button from '../UI/Buttons/Button';
import { FiltersType } from '../../store/useCampersStore';

const EQUIPMENT = [
  { key: 'AC', label: 'AC', iconSrc: '/icons/wind.svg' },
  { key: 'kitchen', label: 'Kitchen', iconSrc: '/icons/cup-hot.svg' },
  { key: 'TV', label: 'TV', iconSrc: '/icons/tv.svg' },
  { key: 'bathroom', label: 'Bathroom', iconSrc: '/icons/ph_shower.svg' },
];

const TRANSMISSION_TYPES = [
  {
    key: 'automatic',
    label: 'Automatic',
    iconSrc: '/icons/diagram.svg',
  },
];

const BODY_TYPES = [
  {
    key: 'panelTruck',
    label: 'Panel Truck',
    iconSrc: '/icons/bi_grid-1x2.svg',
  },
  {
    key: 'fullyIntegrated',
    label: 'Fully Integrated',
    iconSrc: '/icons/bi_grid.svg',
  },
  { key: 'alcove', label: 'Alcove', iconSrc: '/icons/bi_grid-3x3-gap.svg' },
];

const Filters: React.FC<{ onSearch: () => void }> = ({ onSearch }) => {
  const { filters, setFilters } = useCampersStore();

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, location: e.target.value });
  };

  const handleEquipmentClick = (key: string) => {
    setFilters({
      ...filters,
      equipment: filters.equipment.includes(key)
        ? filters.equipment.filter((eq: string) => eq !== key)
        : [...filters.equipment, key],
    });
  };

  const handleTransmissionClick = (key: string) => {
    setFilters({
      ...filters,
      transmission: filters.transmission === key ? '' : key,
    });
  };

  const handleBodyTypeClick = (key: string) => {
    setFilters({
      ...filters,
      bodyType: filters.bodyType === key ? '' : key,
    });
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.locationInput}>
        <label>Location</label>
        <div className={styles.inputWrapper}>
          <Image
            className={styles.locationIcon}
            src="/icons/map.svg"
            alt="location icon"
            width={20}
            height={20}
          />
          <input
            type="text"
            value={filters.location}
            onChange={handleLocationChange}
            placeholder="City"
            style={{ paddingLeft: 46 }}
          />
        </div>
      </div>

      <p className={styles.filtersTitle}>Filters</p>
      <div className={styles.equipmentSection}>
        <h3 className={styles.equipmentTitle}>Vehicle equipment</h3>
        <hr className={styles.separator} />
        <div className={styles.equipmentButtons}>
          {EQUIPMENT.map(item => (
            <button
              key={item.key}
              type="button"
              className={filters.equipment.includes(item.key) ? styles.active : ''}
              onClick={() => handleEquipmentClick(item.key)}
            >
              <Image
                src={item.iconSrc}
                alt={item.label}
                width={32}
                height={32}
              />
              {item.label}
            </button>
          ))}
          {TRANSMISSION_TYPES.map(item => (
            <button
              key={item.key}
              type="button"
              className={filters.transmission === item.key ? styles.active : ''}
              onClick={() => handleTransmissionClick(item.key)}
            >
              <Image
                src={item.iconSrc}
                alt={item.label}
                width={32}
                height={32}
              />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.bodyTypeSection}>
        <h3 className={styles.bodyTypeTitle}>Vehicle type</h3>
        <hr className={styles.separator} />
        <div className={styles.bodyTypeButtons}>
          {BODY_TYPES.map(item => (
            <button
              key={item.key}
              type="button"
              className={filters.bodyType === item.key ? styles.active : ''}
              onClick={() => handleBodyTypeClick(item.key)}
            >
              <Image
                src={item.iconSrc}
                alt={item.label}
                width={32}
                height={32}
              />
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <Button onClick={onSearch}>Search</Button>
    </div>
  );
};

export default Filters;
