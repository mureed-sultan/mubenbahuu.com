import { Suspense, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TestimonialsScene3D = lazy(() => import('@/components/3d/TestimonialsScene3D'));

import { lazy } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CTO, TechVentures Inc.',
    company: 'TechVentures',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    content: 'Mubeen transformed our entire business operations with a custom ERP solution. The system handles everything from inventory to HR seamlessly. Incredible work!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Ahmed Al-Rashid',
    role: 'Operations Director, Gulf Logistics',
    company: 'Gulf Logistics',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'The Odoo implementation was flawless. Our logistics operations are now 40% more efficient. Mubeen\'s expertise in ERP is unmatched.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'CEO, InnovateTech Solutions',
    company: 'InnovateTech',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'Working with Mubeen on our Oracle ERP migration was a game-changer. Zero downtime, perfect data integrity, and excellent post-launch support.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Michael Foster',
    role: 'VP of Engineering, DataFlow Systems',
    company: 'DataFlow',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'The Spring Boot microservices architecture Mubeen designed scaled our platform to handle 10x the traffic. Brilliant technical leadership.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Priya Sharma',
    role: 'Managing Director, Nexus Manufacturing',
    company: 'Nexus Manufacturing',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    content: 'From requirements gathering to deployment, Mubeen delivered a custom ERP that perfectly fits our manufacturing processes. ROI was visible within 3 months.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <Suspense fallback={null}>
        <TestimonialsScene3D />
      </Suspense>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full glass-card text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="section-heading">What Clients Say</h2>
          <p className="section-subheading">
            Trusted by industry leaders worldwide
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="glass-card-hover rounded-3xl p-8 md:p-12 relative">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/20" />
            
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6 justify-center">
                {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                ))}
              </div>

              {/* Content */}
              <p className="text-lg md:text-xl text-foreground/90 text-center leading-relaxed mb-8">
                "{currentTestimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/50"
                />
                <div className="text-left">
                  <p className="font-display font-semibold text-foreground">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-primary/50 hover:bg-primary/20"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-primary/50 hover:bg-primary/20"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-8 bg-primary' : 'bg-primary/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
