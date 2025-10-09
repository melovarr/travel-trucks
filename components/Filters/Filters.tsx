// import React, { useState } from 'react';

// Можеш винести ці масиви згідно потреб (для динамічного рендеру)
const EQUIPMENT = [
  { key: 'AC', label: 'AC' },
  { key: 'Automatic', label: 'Automatic' },
  { key: 'Kitchen', label: 'Kitchen' },
  { key: 'TV', label: 'TV' },
  { key: 'Bathroom', label: 'Bathroom' },
];

const BODY_TYPES = [
  { key: 'Van', label: 'Van' },
  { key: 'Fully Integrated', label: 'Fully Integrated' },
  { key: 'Alcove', label: 'Alcove' },
];

// Тип фільтрів
export type Filters = {
  location: string;
  equipment: string[];
  bodyType: string;
};

type FiltersProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onSearch: () => void;
};

const Filters: React.FC<FiltersProps> = ({ filters, setFilters, onSearch }) => {
  // Оновлення локації
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, location: e.target.value }));
  };

  // Оновлення вибору обладнання (toggle)
  const handleEquipmentClick = (key: string) => {
    setFilters(prev =>
      prev.equipment.includes(key)
        ? { ...prev, equipment: prev.equipment.filter(eq => eq !== key) }
        : { ...prev, equipment: [...prev.equipment, key] }
    );
  };

  // Вибір типу кузова — один активний
  const handleBodyTypeClick = (key: string) => {
    setFilters(prev => ({ ...prev, bodyType: key }));
  };

  return (
    <div className="filters-container">
      <div>
        <label>Location</label>
        <input
          type="text"
          value={filters.location}
          onChange={handleLocationChange}
          placeholder="Kyiv, Ukraine"
        />
      </div>

      <div>
        <h3>Vehicle equipment</h3>
        <div className="equipment-buttons">
          {EQUIPMENT.map(item => (
            <button
              key={item.key}
              type="button"
              className={filters.equipment.includes(item.key) ? 'active' : ''}
              onClick={() => handleEquipmentClick(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3>Vehicle type</h3>
        <div className="bodytype-buttons">
          {BODY_TYPES.map(item => (
            <button
              key={item.key}
              type="button"
              className={filters.bodyType === item.key ? 'active' : ''}
              onClick={() => handleBodyTypeClick(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <button className="search-btn" type="button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default Filters;
