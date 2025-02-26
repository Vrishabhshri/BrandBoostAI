import { useState } from 'react';
import competitorOverviewData from '@/components/context/competitor-overview.json';
import recentPostsData from '@/components/context/recent-posts.json';

export const useCompetitorOverview = () => {
  const [data] = useState({
    ...competitorOverviewData,
    overview: {
      ...competitorOverviewData.overview,
      recentPosts: recentPostsData.overview.recentPosts.posts,
      socialMediaPerformance: {
        ...competitorOverviewData.overview.socialMediaPerformance,
        data: recentPostsData.overview.socialMediaPerformance.data
      }
    }
  });

  return {
    overview: data.overview,
    navigation: data.navigation,
    lastRefreshed: data.competitorDashboard.lastRefreshed
  };
}; 