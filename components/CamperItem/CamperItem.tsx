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
        src={camper.gallery?.[0]?.original || '/Link.jpg'}
        alt={camper.name}
        width={292}
        height={320}
        priority
      />
      <div className={styles.camperItem__content}>
        <div className={styles.camperItem__top}>
          <div className={styles.camperItem__header}>
            <h4>{camper.name}</h4>
            <p>&euro;{Number(camper.price).toFixed(2)}</p>
            <HeartIcon selected={isSelected} onClick={toggleSelected} />
          </div>
          <div className={styles.camperItem__subheader}>
            <p>
              <span className={styles.camperItem__star}>★</span> {camper.rating}
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
              <p>
                <strong>AC</strong> {camper.AC ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>TV</strong> {camper.TV ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>transmission</strong> {camper.transmission}
              </p>
              <p>
                <strong>kitchen</strong> {camper.kitchen ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>bathroom</strong> {camper.bathroom ? 'Yes' : 'No'}
              </p>
            </div>
            <p>
              <strong>Vehicle type:</strong> {camper.form}
            </p>
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
