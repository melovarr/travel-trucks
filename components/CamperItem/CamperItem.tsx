import Link from 'next/link';
import { Camper } from 'components/lib/api';
import Image from 'next/image';
import styles from './CamperItem.module.css';
import useCampersStore from 'components/store/useCampersStore';
import HeartIcon from '../UI/Heart/HeartIcon';

type CamperItemProps = {
  camper: Camper;
};

const CamperItem: React.FC<CamperItemProps> = ({ camper }) => {
  const { addSelectedCamper, removeSelectedCamper, selectedCampers } =
    useCampersStore();

  // const handleAdd = () => {
  //   addSelectedCamper(camper);
  // };

  // const handleRemove = () => {
  //   removeSelectedCamper(camper.id);
  // };
  function capitalizeFirstLetter(str: string) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const toggleSelected = () => {
    if (isSelected) {
      removeSelectedCamper(camper.id);
    } else {
      addSelectedCamper(camper);
    }
  };

  const isSelected = selectedCampers.some(c => c.id === camper.id);

  return (
    <li className={styles.camperItem}>
      <Image
        className={styles.camperItem__image}
        src={camper.gallery?.[0]?.thumb || '/Link.jpg'}
        alt={camper.name}
        width={292}
        height={320}
        priority
      />
      <div className={styles.camperItem__content}>
        <div className={styles.camperItem__top}>
          <div className={styles.camperItem__header}>
            <h4>{camper.name}</h4>
            <p>
              &euro;{Number(camper.price).toFixed(2)}
              <HeartIcon selected={isSelected} onClick={toggleSelected} />
            </p>
          </div>
          <div className={styles.camperItem__subheader}>
            <p className={styles.camperRating}>
              <Image
                src="/icons/prop2_pres.svg"
                alt="Star icon"
                width={16}
                height={16}
              />
              {camper.rating}
              {` (${camper.reviews.length} Reviews)`}
            </p>
            <p>
              <strong>Location:</strong> {camper.location}
            </p>
          </div>
          <div className={styles.camperItem__info}>
            <p className={styles.camperItem__description}>
              {camper.description}
            </p>

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
              {/* {camper.TV ? (
                <p className={styles.camperItem__feature}>TV</p>
              ) : null} */}
              {/* {camper.bathroom ? (
                <p className={styles.camperItem__feature}>Bathroom</p>
              ) : null} */}
              {/* {camper.radio ? (
                <p className={styles.camperItem__feature}>Radio</p>
              ) : null} */}
              {/* {camper.refrigerator ? (
                <p className={styles.camperItem__feature}>Refrigerator</p>
              ) : null} */}
              {/* {camper.microwave ? (
                <p className={styles.camperItem__feature}>Microwave</p>
              ) : null} */}
              {camper.gas ? (
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
              ) : null}
              {camper.water ? (
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
              ) : null}
            </div>
          </div>
        </div>
        <Link href={`/catalog/${camper.id}`} className={styles.btn}>
          Show more
          {/* <button className="show-more-btn">Show more</button> */}
        </Link>
      </div>
    </li>
  );
};

export default CamperItem;
