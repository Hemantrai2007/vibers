import { Itinerary, DayPlan, Activity } from '@/components/ItineraryCard';

interface TripRequest {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelers: number;
  interests: string[];
}

// Mock data for destinations and activities
const DESTINATIONS = [
  {
    name: 'Rajasthan, India',
    description: 'Land of Kings with magnificent palaces, forts, and desert adventures',
    tags: ['Cultural Heritage', 'History & Museums', 'Adventure & Outdoor'],
    baseRating: 4.8
  },
  {
    name: 'Kerala, India',
    description: 'God\'s Own Country with backwaters, spice plantations, and serene beaches',
    tags: ['Nature & Wildlife', 'Beach & Relaxation', 'Cultural Heritage'],
    baseRating: 4.7
  },
  {
    name: 'Goa, India',
    description: 'Tropical paradise with pristine beaches, vibrant nightlife, and Portuguese heritage',
    tags: ['Beach & Relaxation', 'Nightlife & Entertainment', 'Food & Culinary'],
    baseRating: 4.6
  },
  {
    name: 'Himachal Pradesh, India',
    description: 'Himalayan wonderland with snow-capped peaks, hill stations, and adventure sports',
    tags: ['Adventure & Outdoor', 'Nature & Wildlife', 'Photography'],
    baseRating: 4.8
  },
  {
    name: 'Rishikesh, India',
    description: 'Yoga capital of the world with spiritual retreats and adventure activities',
    tags: ['Spiritual & Wellness', 'Adventure & Outdoor', 'Nature & Wildlife'],
    baseRating: 4.5
  }
];

const BUDGET_MULTIPLIERS = {
  budget: 1,
  'mid-range': 2,
  luxury: 3.5
};

// Generate mock activities based on interests and location
const generateActivities = (destination: string, interests: string[], budgetLevel: string): Activity[] => {
  const baseActivities = {
    'Rajasthan, India': [
      { title: 'Amber Fort Exploration', category: 'Cultural Heritage', location: 'Jaipur', duration: '3 hours', baseCost: 15 },
      { title: 'City Palace Tour', category: 'History & Museums', location: 'Udaipur', duration: '2 hours', baseCost: 12 },
      { title: 'Camel Safari in Thar Desert', category: 'Adventure & Outdoor', location: 'Jaisalmer', duration: '4 hours', baseCost: 45 },
      { title: 'Mehrangarh Fort Visit', category: 'Cultural Heritage', location: 'Jodhpur', duration: '2.5 hours', baseCost: 8 },
      { title: 'Traditional Rajasthani Cooking Class', category: 'Food & Culinary', location: 'Jaipur', duration: '3 hours', baseCost: 35 },
      { title: 'Hawa Mahal Photography Tour', category: 'Photography', location: 'Jaipur', duration: '1 hour', baseCost: 5 }
    ],
    'Kerala, India': [
      { title: 'Backwater Houseboat Cruise', category: 'Nature & Wildlife', location: 'Alleppey', duration: '6 hours', baseCost: 80 },
      { title: 'Spice Plantation Walk', category: 'Nature & Wildlife', location: 'Munnar', duration: '2 hours', baseCost: 20 },
      { title: 'Ayurvedic Spa Treatment', category: 'Spiritual & Wellness', location: 'Kovalam', duration: '2 hours', baseCost: 50 },
      { title: 'Kathakali Dance Performance', category: 'Cultural Heritage', location: 'Kochi', duration: '1.5 hours', baseCost: 15 },
      { title: 'Tea Garden Tour', category: 'Nature & Wildlife', location: 'Munnar', duration: '3 hours', baseCost: 25 },
      { title: 'Beach Sunset Photography', category: 'Photography', location: 'Varkala', duration: '2 hours', baseCost: 10 }
    ],
    'Goa, India': [
      { title: 'Beach Hopping Tour', category: 'Beach & Relaxation', location: 'North Goa', duration: '6 hours', baseCost: 30 },
      { title: 'Portuguese Heritage Walk', category: 'Cultural Heritage', location: 'Old Goa', duration: '3 hours', baseCost: 20 },
      { title: 'Night Market Food Tour', category: 'Food & Culinary', location: 'Panaji', duration: '3 hours', baseCost: 40 },
      { title: 'Sunset Cruise with Dinner', category: 'Nightlife & Entertainment', location: 'Mandovi River', duration: '3 hours', baseCost: 60 },
      { title: 'Water Sports Adventure', category: 'Adventure & Outdoor', location: 'Calangute Beach', duration: '4 hours', baseCost: 75 },
      { title: 'Flea Market Shopping', category: 'Shopping & Markets', location: 'Anjuna', duration: '2 hours', baseCost: 15 }
    ],
    'Himachal Pradesh, India': [
      { title: 'Trekking in Parvati Valley', category: 'Adventure & Outdoor', location: 'Kasol', duration: '8 hours', baseCost: 50 },
      { title: 'Paragliding Experience', category: 'Adventure & Outdoor', location: 'Bir Billing', duration: '3 hours', baseCost: 80 },
      { title: 'Monastery Visit', category: 'Spiritual & Wellness', location: 'Dharamshala', duration: '2 hours', baseCost: 10 },
      { title: 'Apple Orchard Tour', category: 'Nature & Wildlife', location: 'Shimla', duration: '2 hours', baseCost: 15 },
      { title: 'Mountain Photography Workshop', category: 'Photography', location: 'Manali', duration: '4 hours', baseCost: 45 },
      { title: 'Hot Springs Relaxation', category: 'Spiritual & Wellness', location: 'Manikaran', duration: '2 hours', baseCost: 20 }
    ],
    'Rishikesh, India': [
      { title: 'Yoga Session by the Ganges', category: 'Spiritual & Wellness', location: 'Laxman Jhula', duration: '2 hours', baseCost: 25 },
      { title: 'White Water Rafting', category: 'Adventure & Outdoor', location: 'Ganges River', duration: '4 hours', baseCost: 60 },
      { title: 'Meditation Workshop', category: 'Spiritual & Wellness', location: 'Parmarth Niketan', duration: '3 hours', baseCost: 30 },
      { title: 'Ganga Aarti Ceremony', category: 'Cultural Heritage', location: 'Triveni Ghat', duration: '1 hour', baseCost: 5 },
      { title: 'Jungle Safari', category: 'Nature & Wildlife', location: 'Rajaji National Park', duration: '5 hours', baseCost: 70 },
      { title: 'Bungee Jumping', category: 'Adventure & Outdoor', location: 'Jumpin Heights', duration: '2 hours', baseCost: 90 }
    ]
  };

  const multiplier = BUDGET_MULTIPLIERS[budgetLevel as keyof typeof BUDGET_MULTIPLIERS] || 1;
  const destinationActivities = baseActivities[destination as keyof typeof baseActivities] || baseActivities['Rajasthan, India'];
  
  // Filter activities based on interests and apply budget multiplier
  return destinationActivities
    .filter(activity => interests.length === 0 || interests.some(interest => activity.category === interest))
    .map((activity, index) => ({
      id: `activity-${index}`,
      time: ['09:00', '11:30', '14:00', '16:30', '19:00'][index % 5],
      title: activity.title,
      description: `Experience the best of ${activity.title.toLowerCase()} with our expertly guided tour`,
      location: activity.location,
      estimatedCost: Math.round(activity.baseCost * multiplier),
      duration: activity.duration,
      category: activity.category
    }));
};

// Generate day plans
const generateDayPlans = (
  destination: string, 
  startDate: string, 
  endDate: string, 
  interests: string[],
  budgetLevel: string
): DayPlan[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  const allActivities = generateActivities(destination, interests, budgetLevel);
  const days: DayPlan[] = [];
  
  const themes = [
    'Cultural Immersion',
    'Adventure & Nature',
    'Local Experiences',
    'Relaxation & Wellness',
    'Food & Markets',
    'Photography & Sightseeing'
  ];
  
  for (let i = 0; i < totalDays; i++) {
    const dayDate = new Date(start);
    dayDate.setDate(start.getDate() + i);
    
    const activitiesPerDay = Math.min(4, allActivities.length);
    const dayActivities = allActivities.slice(i * activitiesPerDay, (i + 1) * activitiesPerDay);
    
    const dayPlan: DayPlan = {
      dayNumber: i + 1,
      date: dayDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      theme: themes[i % themes.length],
      activities: dayActivities,
      estimatedCost: dayActivities.reduce((sum, activity) => sum + activity.estimatedCost, 0)
    };
    
    days.push(dayPlan);
  }
  
  return days;
};

// Calculate interest score
const calculateInterestScore = (destination: any, userInterests: string[]): number => {
  if (userInterests.length === 0) return 0.7;
  
  const matchingInterests = destination.tags.filter((tag: string) => 
    userInterests.includes(tag)
  ).length;
  
  return Math.min(1, 0.4 + (matchingInterests / userInterests.length) * 0.6);
};

// Generate mock itineraries
export const generateItineraries = async (request: TripRequest): Promise<Itinerary[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const start = new Date(request.startDate);
  const end = new Date(request.endDate);
  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Select destinations to recommend
  let destinationsToRecommend = DESTINATIONS;
  
  // If user specified a destination, prioritize it
  if (request.destination && request.destination.toLowerCase() !== 'surprise me!') {
    const matchingDestination = DESTINATIONS.find(d => 
      d.name.toLowerCase().includes(request.destination.toLowerCase())
    );
    if (matchingDestination) {
      destinationsToRecommend = [matchingDestination, ...DESTINATIONS.filter(d => d !== matchingDestination)];
    }
  }
  
  const itineraries: Itinerary[] = destinationsToRecommend.slice(0, 3).map((destination, index) => {
    const interestScore = calculateInterestScore(destination, request.interests);
    const rating = Math.round((destination.baseRating + interestScore * 0.4) * 10) / 10;
    
    const days = generateDayPlans(
      destination.name, 
      request.startDate, 
      request.endDate, 
      request.interests,
      request.budget
    );
    
    const totalCost = days.reduce((sum, day) => sum + day.estimatedCost, 0) * request.travelers;
    
    const highlights = [
      `Explore ${destination.name}'s hidden gems`,
      `Experience authentic local culture`,
      `Professional guided tours included`,
      `Perfect for ${request.interests.join(' & ').toLowerCase() || 'all travelers'}`,
      `Optimized for ${totalDays}-day adventure`,
      `Budget-friendly ${request.budget} options`
    ];
    
    return {
      id: `itinerary-${index + 1}`,
      destination: destination.name,
      title: `${totalDays}-Day ${destination.name} Adventure`,
      description: destination.description,
      duration: totalDays,
      totalCost: Math.round(totalCost),
      rating,
      tags: [...destination.tags, request.budget.charAt(0).toUpperCase() + request.budget.slice(1)],
      days,
      highlights: highlights.slice(0, 4)
    };
  });
  
  // Sort by rating (interest match) descending
  return itineraries.sort((a, b) => b.rating - a.rating);
};