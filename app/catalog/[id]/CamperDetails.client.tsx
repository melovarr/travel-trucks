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

  return (
    <div>
      <h1>{camper.name}</h1>
      <Image
        src={camper.gallery[0]?.original}
        alt={camper.name}
        width={292}
        height={320}
        priority
      ></Image>
      <p>{camper.description}</p>
      <p>Price: ${camper.price}</p>
      <p>Location: {camper.location}</p>
      <p>Rating: {camper.rating}</p>
    </div>
  );
};

export default CamperDetailsClient;
