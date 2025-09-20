import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, DollarSign, Compass } from 'lucide-react';

interface TripFormData {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelers: number;
  interests: string[];
}

interface TripPlannerFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading?: boolean;
}

const INTERESTS = [
  'Adventure & Outdoor',
  'Cultural Heritage',
  'Food & Culinary',
  'Nightlife & Entertainment',
  'Nature & Wildlife',
  'History & Museums',
  'Beach & Relaxation',
  'Photography',
  'Spiritual & Wellness',
  'Shopping & Markets'
];

const TripPlannerForm: React.FC<TripPlannerFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<TripFormData>({
    origin: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelers: 1,
    interests: []
  });

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Plan Your Perfect Trip
        </CardTitle>
        <p className="text-muted-foreground">Tell us your preferences and we'll create personalized itineraries</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Origin and Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                From
              </Label>
              <Input
                id="origin"
                placeholder="Your starting city"
                value={formData.origin}
                onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                required
                className="transition-all duration-300 focus:shadow-elegant"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-accent" />
                To (Optional)
              </Label>
              <Input
                id="destination"
                placeholder="Destination or 'Surprise me!'"
                value={formData.destination}
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                className="transition-all duration-300 focus:shadow-elegant"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                required
                className="transition-all duration-300 focus:shadow-elegant"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                required
                className="transition-all duration-300 focus:shadow-elegant"
              />
            </div>
          </div>

          {/* Budget and Travelers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-travel-golden" />
                Budget Range
              </Label>
              <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                <SelectTrigger className="transition-all duration-300 focus:shadow-elegant">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget ($500-1500)</SelectItem>
                  <SelectItem value="mid-range">Mid-range ($1500-3000)</SelectItem>
                  <SelectItem value="luxury">Luxury ($3000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="travelers" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Travelers
              </Label>
              <Select 
                value={formData.travelers.toString()} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, travelers: parseInt(value) }))}
              >
                <SelectTrigger className="transition-all duration-300 focus:shadow-elegant">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Person' : 'People'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What interests you?</Label>
            <div className="grid grid-cols-2 gap-2">
              {INTERESTS.map(interest => (
                <label
                  key={interest}
                  className={`
                    flex items-center space-x-2 p-3 rounded-md border cursor-pointer transition-all duration-300
                    ${formData.interests.includes(interest)
                      ? 'bg-gradient-adventure text-white border-accent shadow-elegant'
                      : 'bg-card hover:bg-gradient-card border-border hover:border-primary'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-hero hover:shadow-hero transition-all duration-300 text-lg py-6"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Your Perfect Trip...' : 'Generate Trip Ideas ✈️'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TripPlannerForm;