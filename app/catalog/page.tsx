'use client';

import { useEffect, useState } from 'react';
import CamperList from '../../components/CamperList/CamperList';
import { Camper, getCampers } from '../../lib/api';
import styles from './catalogPage.module.css';
import { FiltersType } from 'components/components/Filters/Filters';
import Filters from 'components/components/Filters/Filters';

const initialFilters: FiltersType = {
  location: '',
  equipment: [] as string[],
  bodyType: '',
};

export default function Catalog() {
  const [filters, setFilters] = useState<FiltersType>(initialFilters);
  const [campers, setCampers] = useState<Camper[]>([]);

  useEffect(() => {
    const fetchAllCampers = async () => {
      const allCampers = await getCampers({
        location: '',
        equipment: [],
        bodyType: '',
      });
      setCampers(allCampers);
    };
    fetchAllCampers();
  }, []);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFilters(prev => ({ ...prev, location: e.target.value }));
  // };

  // const handleEquipmentClick = (eq: string) => {
  //   setFilters(prev => ({
  //     ...prev,
  //     equipment: prev.equipment.includes(eq)
  //       ? prev.equipment.filter(item => item !== eq)
  //       : [...prev.equipment, eq],
  //   }));
  // };

  // const handleBodyTypeClick = (type: string) => {
  //   setFilters(prev => ({ ...prev, bodyType: type }));
  // };

  const handleSearch = async () => {
    const filteredCampers = await getCampers(filters);
    setCampers(filteredCampers);
    console.log('Filtered campers:', filteredCampers);
  };

  return (
    <div className={styles.container}>
      <Filters
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
      />
      {/* <div>
        <div>
          <p>Location</p>
          <input
            type="text"
            placeholder="Search by location"
            value={filters.location}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <p>Filters</p>
          <div>
            <p>Vehicle equipment</p>
            <hr />
            {['AC', 'Automatic', 'Kitchen', 'TV', 'Bathroom'].map(eq => (
              <button
                key={eq}
                className={`btn ${filters.equipment.includes(eq) ? 'active' : ''}`}
                type="button"
                onClick={() => handleEquipmentClick(eq)}
              >
                {eq}
              </button>
            ))}
          </div>
          <div>
            <p>Vehicle type</p>
            <hr />
            {['fullyIntegrated', 'alcove', 'panelTruck'].map(type => (
              <button
                key={type}
                className={`btn ${filters.bodyType === type ? 'active' : ''}`}
                type="button"
                onClick={() => handleBodyTypeClick(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <button className="btn" type="button" onClick={handleSearch}>
          Search
        </button>
      </div> */}
      <div>{campers.length > 0 && <CamperList campers={campers} />}</div>
    </div>
  );
}
