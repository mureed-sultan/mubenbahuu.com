import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    slug: 'odoo-vs-oracle-which-erp-right-for-you',
    title: 'Odoo vs Oracle: Which ERP is Right for Your Business?',
    excerpt: 'A comprehensive comparison of two leading ERP solutions to help you make an informed decision for your enterprise.',
    category: 'ERP Comparison',
    author: 'Mubeen Bahuu',
    date: 'Jan 5, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
  },
  {
    id: 2,
    slug: 'implementing-erp-common-pitfalls',
    title: 'Implementing ERP: 10 Common Pitfalls to Avoid',
    excerpt: 'Learn from common mistakes that organizations make during ERP implementation and how to navigate around them.',
    category: 'Best Practices',
    author: 'Mubeen Bahuu',
    date: 'Dec 28, 2023',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
  },
  {
    id: 3,
    slug: 'spring-boot-microservices-erp',
    title: 'Building Scalable ERP with Spring Boot Microservices',
    excerpt: 'Discover how microservices architecture can revolutionize your custom ERP development approach.',
    category: 'Development',
    author: 'Mubeen Bahuu',
    date: 'Dec 15, 2023',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
  },
];

export default function BlogSection() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="hero-glow bottom-0 left-1/4" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="inline-block px-4 py-1 rounded-full glass-card text-primary text-sm font-medium mb-4">
              Latest Insights
            </span>
            <h2 className="section-heading text-left">
              From The Blog
            </h2>
            <p className="text-muted-foreground max-w-xl mt-4">
              Thoughts, tutorials, and insights on ERP implementation, enterprise software, and digital transformation.
            </p>
          </div>
          <Link to="/blog" className="mt-6 md:mt-0">
            <Button variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary">
              View All Posts
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={post.id}
              className="glass-card-hover rounded-2xl overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full glass-card text-xs font-medium text-primary">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
