import { getSingleCamper } from 'components/lib/api';
import CamperDetailsClient from './CamperDetails.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
// import BookingForm from 'components/components/BookingForm/BookingForm';
import CamperDetailsTabs from './CamperDetailsTabs';

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperDetailsClient />
      <CamperDetailsTabs />
    </HydrationBoundary>
  );
};

export default CamperDetails;
