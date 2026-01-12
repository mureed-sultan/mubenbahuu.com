import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight, Database, Server, Code2, Layers } from 'lucide-react';

const PortfolioScene3D = lazy(() => import('@/components/3d/PortfolioScene3D'));

const projects = [
  {
    id: 1,
    title: 'Enterprise Manufacturing ERP',
    client: 'Nexus Manufacturing Co.',
    industry: 'Manufacturing',
    duration: '8 months',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
    description: 'Complete Odoo implementation for a manufacturing company with 500+ employees, including production planning, inventory management, and quality control modules.',
    technologies: ['Odoo 16', 'Python', 'PostgreSQL', 'Docker'],
    results: [
      '40% reduction in inventory costs',
      '60% faster order processing',
      'Real-time production tracking',
      'Integrated quality management'
    ],
    icon: Database,
    color: 'from-primary to-glow-blue',
  },
  {
    id: 2,
    title: 'Oracle Cloud Migration',
    client: 'Gulf Logistics International',
    industry: 'Logistics & Supply Chain',
    duration: '6 months',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
    description: 'Migrated legacy on-premise Oracle E-Business Suite to Oracle Cloud ERP with zero downtime and complete data integrity.',
    technologies: ['Oracle Cloud ERP', 'Oracle Integration Cloud', 'APEX', 'PL/SQL'],
    results: [
      '99.9% uptime achieved',
      '50% reduction in IT costs',
      'Automated compliance reporting',
      'Mobile-first accessibility'
    ],
    icon: Server,
    color: 'from-accent to-glow-purple',
  },
  {
    id: 3,
    title: 'Custom Healthcare ERP',
    client: 'MedCare Hospital Network',
    industry: 'Healthcare',
    duration: '12 months',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
    description: 'Built a HIPAA-compliant custom ERP solution integrating patient management, billing, inventory, and staff scheduling.',
    technologies: ['Spring Boot', 'React', 'PostgreSQL', 'Kubernetes', 'AWS'],
    results: [
      'HIPAA & GDPR compliant',
      '30% improvement in patient throughput',
      'Unified billing across 12 facilities',
      'AI-powered scheduling optimization'
    ],
    icon: Code2,
    color: 'from-glow-blue to-primary',
  },
  {
    id: 4,
    title: 'Retail Multi-Channel Platform',
    client: 'Urban Style Retail',
    industry: 'Retail & E-commerce',
    duration: '5 months',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    description: 'Implemented Odoo with custom e-commerce integration, POS systems, and omnichannel inventory management.',
    technologies: ['Odoo 17', 'Shopify API', 'Python', 'Redis', 'ElasticSearch'],
    results: [
      'Unified 50+ store locations',
      'Real-time inventory sync',
      '25% increase in sales',
      'Seamless online-offline experience'
    ],
    icon: Layers,
    color: 'from-success to-primary',
  },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '15+', label: 'Industries Served' },
  { value: '10M+', label: 'Data Records Migrated' },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center overflow-hidden">
          <Suspense fallback={null}>
            <PortfolioScene3D />
          </Suspense>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1 rounded-full glass-card text-primary text-sm font-medium mb-4">
                Portfolio
              </span>
              <h1 className="section-heading">
                Featured <span className="text-glow">Projects</span>
              </h1>
              <p className="section-subheading">
                Real-world ERP implementations that transformed businesses
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-6 text-center">
                  <p className="font-display text-3xl md:text-4xl font-bold text-glow mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="relative w-full aspect-video object-cover rounded-2xl"
                      />
                      <div className="absolute top-4 left-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                          <project.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <span className="text-primary text-sm font-medium">{project.industry}</span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full glass-card text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="glass-card rounded-xl p-4 mb-6">
                      <p className="text-sm font-medium text-foreground mb-3">Key Results:</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.results.map((result) => (
                          <li key={result} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-success" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span><strong className="text-foreground">Client:</strong> {project.client}</span>
                      <span><strong className="text-foreground">Duration:</strong> {project.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="glass-card-hover rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Build Your Success Story?
              </h2>
              <p className="text-muted-foreground mb-8">
                Let's discuss how I can transform your business operations with the right ERP solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-glow-blue text-primary-foreground font-semibold">
                    Start Your Project
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                    View Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
