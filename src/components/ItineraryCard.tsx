import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Users, Star, Calendar } from 'lucide-react';

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  estimatedCost: number;
  duration: string;
  category: string;
}

export interface DayPlan {
  dayNumber: number;
  date: string;
  theme: string;
  activities: Activity[];
  estimatedCost: number;
}

export interface Itinerary {
  id: string;
  destination: string;
  title: string;
  description: string;
  duration: number;
  totalCost: number;
  rating: number;
  tags: string[];
  days: DayPlan[];
  highlights: string[];
}

interface ItineraryCardProps {
  itinerary: Itinerary;
  onSelect: (itinerary: Itinerary) => void;
  onSave: (itinerary: Itinerary) => void;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ itinerary, onSelect, onSave }) => {
  return (
    <Card className="w-full hover:shadow-elegant transition-all duration-300 cursor-pointer animate-scale-in">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold text-foreground">{itinerary.title}</CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{itinerary.destination}</span>
              <div className="flex items-center gap-1 ml-4">
                <Calendar className="w-4 h-4" />
                <span>{itinerary.duration} days</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-gradient-sunset px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-white" />
            <span className="text-white font-semibold">{itinerary.rating}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed">{itinerary.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {itinerary.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Cost and Duration */}
        <div className="flex items-center justify-between p-3 bg-gradient-card rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-travel-golden" />
            <div>
              <p className="font-semibold text-lg">${itinerary.totalCost.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total estimated cost</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <div className="text-right">
              <p className="font-semibold">{itinerary.duration} Days</p>
              <p className="text-xs text-muted-foreground">Perfect duration</p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-foreground">Trip Highlights</h4>
          <div className="space-y-1">
            {itinerary.highlights.slice(0, 3).map((highlight, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                <span className="text-muted-foreground">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Day Preview */}
        {itinerary.days.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-foreground">Day 1 Preview: {itinerary.days[0].theme}</h4>
            <div className="space-y-1">
              {itinerary.days[0].activities.slice(0, 2).map((activity) => (
                <div key={activity.id} className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                  <span className="text-primary font-medium">{activity.time}</span>
                  <span className="text-muted-foreground">{activity.title}</span>
                </div>
              ))}
              {itinerary.days[0].activities.length > 2 && (
                <p className="text-xs text-muted-foreground px-2">
                  +{itinerary.days[0].activities.length - 2} more activities
                </p>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={() => onSelect(itinerary)}
            className="flex-1 bg-gradient-adventure hover:shadow-elegant transition-all duration-300"
          >
            View Full Itinerary
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onSave(itinerary)}
            className="hover:bg-gradient-card transition-all duration-300"
          >
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItineraryCard;