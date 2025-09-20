import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import TripPlannerForm from '@/components/TripPlannerForm';
import ItineraryCard, { Itinerary } from '@/components/ItineraryCard';
import ItineraryView from '@/components/ItineraryView';
import { generateItineraries } from '@/lib/mockAI';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Sparkles, Clock, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-travel.jpg';

interface TripFormData {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelers: number;
  interests: string[];
}

type ViewState = 'form' | 'results' | 'detail';

const Index = () => {
  const [viewState, setViewState] = useState<ViewState>('form');
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedItineraries, setSavedItineraries] = useState<Itinerary[]>([]);

  const handleFormSubmit = async (formData: TripFormData) => {
    setIsLoading(true);
    try {
      const results = await generateItineraries(formData);
      setItineraries(results);
      setViewState('results');
      toast({
        title: "Trip ideas generated! ✈️",
        description: `Found ${results.length} personalized itineraries for you.`,
      });
    } catch (error) {
      toast({
        title: "Error generating trip ideas",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectItinerary = (itinerary: Itinerary) => {
    setSelectedItinerary(itinerary);
    setViewState('detail');
  };

  const handleSaveItinerary = (itinerary: Itinerary) => {
    setSavedItineraries(prev => {
      if (prev.find(saved => saved.id === itinerary.id)) {
        toast({
          title: "Already saved!",
          description: "This itinerary is already in your saved trips.",
        });
        return prev;
      }
      toast({
        title: "Itinerary saved! 💾",
        description: "Added to your saved trips.",
      });
      return [...prev, itinerary];
    });
  };

  const handleBackToResults = () => {
    setSelectedItinerary(null);
    setViewState('results');
  };

  const handleBackToForm = () => {
    setViewState('form');
    setItineraries([]);
  };

  const handleBookItinerary = (itinerary: Itinerary) => {
    toast({
      title: "Booking feature coming soon! 🚀",
      description: "We're working on integrating with booking partners.",
    });
  };

  const handleExportItinerary = (itinerary: Itinerary) => {
    const dataStr = JSON.stringify(itinerary, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${itinerary.destination.replace(/[^a-z0-9]/gi, '_')}_itinerary.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Itinerary exported! 📄",
      description: "Downloaded as JSON file.",
    });
  };

  const renderHeroSection = () => (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Your Perfect Trip
            <span className="block bg-gradient-sunset bg-clip-text text-transparent">
              Starts Here
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            AI-powered personalized trip planning that creates unforgettable journeys tailored just for you
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 hover:shadow-hero transition-all duration-300 px-8 py-6 text-lg"
              onClick={() => document.getElementById('trip-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Planning
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Explore Destinations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeatures = () => (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our AI Trip Planner?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We use advanced AI to create personalized itineraries that match your interests, budget, and style
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center shadow-card hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-adventure rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Personalization</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes your preferences to create trips that perfectly match your interests and style
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-card hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Save Hours of Planning</h3>
              <p className="text-muted-foreground">
                Get complete itineraries in minutes instead of spending hours researching and planning
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-card hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Trusted & Secure</h3>
              <p className="text-muted-foreground">
                Your data is protected and we partner with trusted local guides and booking platforms
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );

  if (viewState === 'detail' && selectedItinerary) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <ItineraryView
            itinerary={selectedItinerary}
            onBack={handleBackToResults}
            onBook={handleBookItinerary}
            onExport={handleExportItinerary}
          />
        </div>
      </div>
    );
  }

  if (viewState === 'results') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
                Your Personalized Trip Options
              </h1>
              <p className="text-muted-foreground mb-6">
                Choose from our AI-curated itineraries designed just for you
              </p>
              <Button 
                variant="outline" 
                onClick={handleBackToForm}
                className="hover:bg-gradient-card transition-all duration-300"
              >
                ← Plan Another Trip
              </Button>
            </div>
            
            <div className="space-y-6">
              {itineraries.map((itinerary) => (
                <ItineraryCard
                  key={itinerary.id}
                  itinerary={itinerary}
                  onSelect={handleSelectItinerary}
                  onSave={handleSaveItinerary}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {renderHeroSection()}
      {renderFeatures()}
      
      <section id="trip-form" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <TripPlannerForm 
              onSubmit={handleFormSubmit} 
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;