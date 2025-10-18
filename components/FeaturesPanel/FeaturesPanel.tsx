import React from 'react';
import styles from './FeaturesPanel.module.css';
import { useCamperFeatures } from '../../lib/hooks';
import Image from 'next/image';
import Loading from '../../app/loading';

const DETAILS = [
  { label: 'Form', value: 'Panel truck' },
  { label: 'Length', value: '5.4 m' },
  { label: 'Width', value: '2.01 m' },
  { label: 'Height', value: '2.05 m' },
  { label: 'Tank', value: '132 l' },
  { label: 'Consumption', value: '12.4l/100km' },
];

const FeaturesPanel = ({ camperId }: { camperId: string }) => {
  const { data: camper, isLoading, error } = useCamperFeatures(camperId);
  if (isLoading) return <Loading />;
  if (error || !camper) return <div>Error loading features.</div>;

  function capitalizeFirstLetter(str: string) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div className={styles.featuresWrapper}>
      <div className={styles.camperItem__features}>
        <p className={styles.camperItem__feature}>
          <Image
            src="/diagram.svg"
            alt="Transmission Icon"
            width={20}
            height={20}
            style={{ marginRight: 8, verticalAlign: 'middle' }}
          />
          {capitalizeFirstLetter(camper.transmission)}
        </p>
        <p className={styles.camperItem__feature}>
          <Image
            src="/fuel-pump.svg"
            alt="Fuel Pump Icon"
            width={20}
            height={20}
            style={{ marginRight: 8, verticalAlign: 'middle' }}
          />
          {capitalizeFirstLetter(camper.engine)}
        </p>
        {camper.kitchen ? (
          <p className={styles.camperItem__feature}>
            <Image
              src="/cup-hot.svg"
              alt="Kitchen Icon"
              width={20}
              height={20}
              style={{ marginRight: 8, verticalAlign: 'middle' }}
            />
            Kitchen
          </p>
        ) : null}
        {camper.AC ? (
          <p className={styles.camperItem__feature}>
            <Image
              src="/wind.svg"
              alt="Wind Icon"
              width={20}
              height={20}
              style={{ marginRight: 8, verticalAlign: 'middle' }}
            />
            AC
          </p>
        ) : null}
        {camper.TV ? (
          <p className={styles.camperItem__feature}>
            <Image
              src="/icons/tv.svg"
              alt="TV Icon"
              width={20}
              height={20}
              style={{ marginRight: 8, verticalAlign: 'middle' }}
            />
            TV
          </p>
        ) : null}
        {camper.bathroom ? (
          <p className={styles.camperItem__feature}>
            <Image
              src="/icons/ph_shower.svg"
              alt="Bathroom Icon"
              width={20}
              height={20}
              style={{ marginRight: 8, verticalAlign: 'middle' }}
            />
            Bathroom
          </p>
        ) : null}
        {/* {camper.radio ? (
                <p className={styles.camperItem__feature}>Radio</p>
              ) : null} */}
        {/* {camper.refrigerator ? (
                <p className={styles.camperItem__feature}>Refrigerator</p>
              ) : null} */}
        {/* {camper.microwave ? (
                <p className={styles.camperItem__feature}>Microwave</p>
              ) : null} */}
        {/* {camper.gas ? (
                <p className={styles.camperItem__feature}>
                  <Image
                    src="/icons/hugeicons_gas-stove.svg"
                    alt="Gas stove Icon"
                    width={20}
                    height={20}
                    style={{ marginRight: 8, verticalAlign: 'middle' }}
                  />
                  Gas
                </p>
              ) : null} */}
        {/* {camper.water ? (
                <p className={styles.camperItem__feature}>
                  <Image
                    src="/icons/ion_water-outline.svg"
                    alt="Water Icon"
                    width={20}
                    height={20}
                    style={{ marginRight: 8, verticalAlign: 'middle' }}
                  />
                  Water
                </p>
              ) : null} */}
      </div>
      <div className={styles.divider}>
        <h3 className={styles.vehicleDetails}>Vehicle details</h3>
        <hr className={styles.line} />
        <div className={styles.detailsTable}>
          <div className={styles.detailsTable__row} key={camper.form}>
            <p>Form</p>
            <p>{capitalizeFirstLetter(camper.form)}</p>
          </div>
          <div className={styles.detailsTable__row} key={camper.length}>
            <p>Length</p>
            <p>{camper.length}</p>
          </div>
          <div className={styles.detailsTable__row} key={camper.width}>
            <p>Width</p>
            <p>{camper.width}</p>
          </div>
          <div className={styles.detailsTable__row} key={camper.height}>
            <p>Height</p>
            <p>{camper.height}</p>
          </div>
          <div className={styles.detailsTable__row} key={camper.tank}>
            <p>Tank</p>
            <p>{camper.tank}</p>
          </div>
          <div className={styles.detailsTable__row} key={camper.consumption}>
            <p>Consumption</p>
            <p>{camper.consumption}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPanel;
