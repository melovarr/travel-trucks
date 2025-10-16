'use client';

import { useQuery } from '@tanstack/react-query';
import { getSingleCamper } from 'components/lib/api';
import Image from 'next/image';
import { useParams } from 'next/navigation';

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

  if (isLoading) return <p>Loading...</p>;

  if (error || !camper) return <p>Some error..</p>;
  //   const camper = await getSingleCamper(id);
  console.log('camper id:', camper);

  const gallery = camper.gallery?.slice(0, 3) || [];

  return (
    <div>
      <h1>{camper.name}</h1>
      <p>Rating: {camper.rating}</p>
      <p>Location: {camper.location}</p>
      <p>Price: ${camper.price}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        {gallery.map((image, index) => (
          <Image
            key={index}
            src={image.original}
            alt={`${camper.name} image ${index + 1}`}
            width={292}
            height={312}
            style={{ objectFit: 'cover' }} // Щоб зображення було обрізане за потреби
            priority={index === 0} // Пріоритет для першої картинки
          ></Image>
        ))}
      </div>
      <p>{camper.description}</p>
    </div>
  );
};

export default CamperDetailsClient;
