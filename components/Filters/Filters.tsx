import React from 'react';
import styles from './Filters.module.css';
import useCampersStore from 'components/store/useCampersStore';

export type FiltersType = {
  location: string;
  equipment: string[];
  bodyType: string;
  page?: number;
  limit?: number;
};

const EQUIPMENT = [
  { key: 'AC', label: 'AC' },
  { key: 'Automatic', label: 'Automatic' },
  { key: 'Kitchen', label: 'Kitchen' },
  { key: 'TV', label: 'TV' },
  { key: 'Bathroom', label: 'Bathroom' },
];

const BODY_TYPES = [
  { key: 'panelTruck', label: 'Panel Truck' },
  { key: 'fullyIntegrated', label: 'Fully Integrated' },
  { key: 'alcove', label: 'Alcove' },
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

  const handleBodyTypeClick = (key: string) => {
    setFilters({
      ...filters,
      bodyType: key,
    });
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.locationInput}>
        <label>Location</label>
        <input
          type="text"
          value={filters.location}
          onChange={handleLocationChange}
          placeholder="Kyiv, Ukraine"
        />
      </div>

      <p>Filters</p>
      <div>
        <h3>Vehicle equipment</h3>
        <div className={styles.equipmentButtons}>
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
        <div className={styles.bodyTypeButtons}>
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

// // import React, { useState } from 'react';
// import styles from './Filters.module.css';

// // Можеш винести ці масиви згідно потреб (для динамічного рендеру)
// const EQUIPMENT = [
//   { key: 'AC', label: 'AC' },
//   { key: 'Automatic', label: 'Automatic' },
//   { key: 'Kitchen', label: 'Kitchen' },
//   { key: 'TV', label: 'TV' },
//   { key: 'Bathroom', label: 'Bathroom' },
// ];

// const BODY_TYPES = [
//   { key: 'panelTruck', label: 'Panel Truck' },
//   { key: 'fullyIntegrated', label: 'Fully Integrated' },
//   { key: 'alcove', label: 'Alcove' },
// ];

// Тип фільтрів

// type FiltersProps = {
//   filters: FiltersType;
//   setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
//   onSearch: () => void;
// };

// const Filters: React.FC<FiltersProps> = ({ filters, setFilters, onSearch }) => {
//   // Оновлення локації
//   const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFilters(prev => ({ ...prev, location: e.target.value }));
//   };

//   // Оновлення вибору обладнання (toggle)
//   const handleEquipmentClick = (key: string) => {
//     setFilters(prev =>
//       prev.equipment.includes(key)
//         ? { ...prev, equipment: prev.equipment.filter(eq => eq !== key) }
//         : { ...prev, equipment: [...prev.equipment, key] }
//     );
//   };

//   // Вибір типу кузова — один активний
//   const handleBodyTypeClick = (key: string) => {
//     setFilters(prev => ({ ...prev, bodyType: key }));
//   };

//   return (
//     <div className={styles.filtersContainer}>
//       <div className={styles.locationInput}>
//         <label>Location</label>
//         <input
//           type="text"
//           value={filters.location}
//           onChange={handleLocationChange}
//           placeholder="Kyiv, Ukraine"
//         />
//       </div>
//       <p>Filters</p>
//       <div>
//         <h3>Vehicle equipment</h3>
//         <div className={styles.equipmentButtons}>
//           {EQUIPMENT.map(item => (
//             <button
//               key={item.key}
//               type="button"
//               className={filters.equipment.includes(item.key) ? 'active' : ''}
//               onClick={() => handleEquipmentClick(item.key)}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h3>Vehicle type</h3>
//         <div className={styles.bodyTypeButtons}>
//           {BODY_TYPES.map(item => (
//             <button
//               key={item.key}
//               type="button"
//               className={filters.bodyType === item.key ? 'active' : ''}
//               onClick={() => handleBodyTypeClick(item.key)}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <button className="search-btn" type="button" onClick={onSearch}>
//         Search
//       </button>
//     </div>
//   );
// };

// export default Filters;
