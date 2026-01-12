import { useState, Suspense, lazy } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactScene3D = lazy(() => import('@/components/3d/ContactScene3D'));

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({ title: "Message Sent!", description: "I'll get back to you within 24 hours." });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero with 3D */}
        <section className="relative min-h-[40vh] flex items-center overflow-hidden mb-8">
          <Suspense fallback={null}>
            <ContactScene3D />
          </Suspense>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <span className="inline-block px-4 py-1 rounded-full glass-card text-primary text-sm font-medium mb-4">Contact</span>
              <h1 className="section-heading">Let's <span className="text-glow">Talk</span></h1>
              <p className="section-subheading">Have a project in mind? Let's discuss how I can help.</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="glass-card rounded-2xl p-8">
                <h3 className="font-display text-2xl font-semibold text-foreground mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"><Mail className="w-5 h-5 text-primary" /></div>
                    <div><p className="font-medium text-foreground">Email</p><p className="text-muted-foreground text-sm">mubeen@erpspecialist.com</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"><Phone className="w-5 h-5 text-primary" /></div>
                    <div><p className="font-medium text-foreground">Phone</p><p className="text-muted-foreground text-sm">+1 (555) 123-4567</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"><MapPin className="w-5 h-5 text-primary" /></div>
                    <div><p className="font-medium text-foreground">Location</p><p className="text-muted-foreground text-sm">Remote / Worldwide</p></div>
                  </div>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-8">
                <h4 className="font-display text-lg font-semibold text-foreground mb-4">Why Work With Me?</h4>
                <ul className="space-y-3">
                  {['Free initial consultation', 'Transparent pricing', 'Agile methodology', 'Post-launch support'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-foreground mb-2 block">Name</label><Input placeholder="Your name" required className="bg-background/50 border-border" /></div>
                  <div><label className="text-sm font-medium text-foreground mb-2 block">Email</label><Input type="email" placeholder="your@email.com" required className="bg-background/50 border-border" /></div>
                </div>
                <div><label className="text-sm font-medium text-foreground mb-2 block">Subject</label><Input placeholder="Project inquiry" required className="bg-background/50 border-border" /></div>
                <div><label className="text-sm font-medium text-foreground mb-2 block">Message</label><Textarea placeholder="Tell me about your project..." rows={5} required className="bg-background/50 border-border resize-none" /></div>
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-glow-blue text-primary-foreground font-semibold" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : <><Send className="mr-2 w-4 h-4" />Send Message</>}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
