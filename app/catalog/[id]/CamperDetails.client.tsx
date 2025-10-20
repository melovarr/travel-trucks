'use client';

import { useQuery } from '@tanstack/react-query';
import { getSingleCamper } from '../../../lib/api';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import styles from './CamperDetails.module.css';
import Loading from '../../../app/loading';

// type Props = {
//   params: Promise<{ id: string }>;
// };

const CamperDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: camper,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['camper', id],
    queryFn: () => getSingleCamper(id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;

  if (error || !camper) return <p>Some error..</p>;
  //   const camper = await getSingleCamper(id);
  console.log('camper id:', camper);

  const gallery = camper.gallery?.slice(0, 3) || [];

  return (
    <div>
      <h2 className={styles.camperName}>{camper.name}</h2>
      <div className={styles.camperRatingLocation}>
        <p className={styles.camperRating}>
          <Image
            src="/icons/prop2_pres.svg"
            alt="Star icon"
            width={16}
            height={16}
          />
          {camper.rating}
          {` (${camper.reviews?.length ?? 0} Reviews)`}
        </p>
        <p className={styles.camperLocation}>
          <Image src="/icons/map.svg" alt="Map icon" width={16} height={16} />
          {camper.location}
        </p>
      </div>
      <p className={styles.camperPrice}>
        &euro;{Number(camper.price).toFixed(2)}
      </p>
      <div className={styles.imagesGallery}>
        {gallery.map((image, index) => (
          <Image
            className={styles.camperPhotos}
            key={index}
            src={image.original}
            alt={`${camper.name} image ${index + 1}`}
            width={292}
            height={312}
            priority={index === 0} // Пріоритет для першої картинки
          ></Image>
        ))}
      </div>
      <p className={styles.camperDescription}>{camper.description}</p>
    </div>
  );
};

export default CamperDetailsClient;
