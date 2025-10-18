import { getSingleCamper } from '../../../lib/api';
import CamperDetailsClient from './CamperDetails.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
// import BookingForm from 'components/components/BookingForm/BookingForm';
import CamperDetailsTabs from './CamperDetailsTabs';
import styles from './CamperDetails.module.css';

type Props = {
  params: Promise<{ id: string }>;
};

const CamperDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['camper', id],
    queryFn: () => getSingleCamper(id),
  });
  //   const camper = await getSingleCamper(id);
  //   console.log('camper id:', camper);

  return (
    <div className={styles.container}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CamperDetailsClient />
        <CamperDetailsTabs />
      </HydrationBoundary>
    </div>
  );
};

export default CamperDetails;
