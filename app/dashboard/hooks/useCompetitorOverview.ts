import { useEffect, useState } from 'react';
import competitorOverviewData from '@/components/context/competitor-overview.json';

export const useCompetitorOverview = () => {
  const [data, setData] = useState(competitorOverviewData);
  
  return {
    overview: data.overview,
    navigation: data.navigation,
    lastRefreshed: data.competitorDashboard.lastRefreshed
  };
}; 