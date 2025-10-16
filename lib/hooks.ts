
'use client';

import { useQuery } from '@tanstack/react-query';
import { getSingleCamper } from './api';

export const useCamperReviews = (id: string) => {
    return useQuery({
        queryKey: ['camperReviews', id],
        queryFn: () => getSingleCamper(id).then(camper => camper.reviews),
        enabled: !!id,
    });
};
