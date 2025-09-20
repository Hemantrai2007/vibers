import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Download, 
  Share2, 
  BookOpen,
  Star,
  Calendar,
  Users
} from 'lucide-react';
import { Itinerary, DayPlan, Activity } from './ItineraryCard';

interface ItineraryViewProps {
  itinerary: Itinerary;
  onBack: () => void;
  onBook: (itinerary: Itinerary) => void;
  onExport: (itinerary: Itinerary) => void;
}

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
  <div className="flex gap-4 p-4 bg-gradient-card rounded-lg border border-border/50 hover:shadow-card transition-all duration-300">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-gradient-adventure rounded-lg flex items-center justify-center">
        <Clock className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="flex-grow space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">{activity.title}</h4>
        <Badge variant="outline" className="text-xs">
          {activity.category}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">{activity.description}</p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>{activity.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{activity.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-3 h-3" />
          <span>${activity.estimatedCost}</span>
        </div>
      </div>
    </div>
    <div className="flex-shrink-0 text-right">
      <div className="text-primary font-semibold">{activity.time}</div>
    </div>
  </div>
);

const DayPlanView: React.FC<{ day: DayPlan; dayIndex: number }> = ({ day, dayIndex }) => (
  <Card className="animate-fade-in">
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-lg">Day {day.dayNumber}</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground text-sm">{day.date}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-semibold text-travel-golden">${day.estimatedCost}</div>
          <div className="text-xs text-muted-foreground">Daily budget</div>
        </div>
      </div>
      <div className="bg-gradient-adventure/10 px-3 py-2 rounded-lg">
        <p className="font-medium text-accent">Theme: {day.theme}</p>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      {day.activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </CardContent>
  </Card>
);

const ItineraryView: React.FC<ItineraryViewProps> = ({ 
  itinerary, 
  onBack, 
  onBook, 
  onExport 
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={onBack}
              className="hover:bg-gradient-card transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-grow">
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                {itinerary.title}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{itinerary.destination}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{itinerary.duration} days</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-travel-golden" />
                  <span>{itinerary.rating} rating</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">${itinerary.totalCost.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total estimated cost</div>
            </div>
          </div>
          
          <p className="text-muted-foreground mt-4">{itinerary.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {itinerary.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Trip Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-travel-golden" />
            Trip Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {itinerary.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gradient-card rounded-lg">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span className="text-sm font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Itinerary */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Daily Itinerary</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onExport(itinerary)}
              className="hover:bg-gradient-card transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              className="hover:bg-gradient-card transition-all duration-300"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
        
        {itinerary.days.map((day, index) => (
          <DayPlanView key={day.dayNumber} day={day} dayIndex={index} />
        ))}
      </div>

      {/* Booking Section */}
      <Card className="bg-gradient-hero shadow-hero">
        <CardContent className="p-6">
          <div className="flex items-center justify-between text-white">
            <div>
              <h3 className="text-xl font-bold">Ready to book this amazing trip?</h3>
              <p className="text-white/80 mt-1">Secure your spot and start your adventure</p>
            </div>
            <Button
              onClick={() => onBook(itinerary)}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 hover:shadow-lg transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItineraryView;