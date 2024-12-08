import { useState } from 'react';
import competitorOverviewData from '@/components/context/competitor-overview.json';

export const useCompetitorOverview = () => {
  const [data] = useState(competitorOverviewData);
  return {
    overview: data.overview,
    navigation: data.navigation,
    lastRefreshed: data.competitorDashboard.lastRefreshed
  };
}; 