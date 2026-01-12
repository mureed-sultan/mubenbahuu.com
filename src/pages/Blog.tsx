import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { blogPosts } from '@/data/blogPosts';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import ERPScene3D from '@/components/3d/ERPScene3D';

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header with 3D Scene */}
          <div className="relative mb-16">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 rounded-full glass-card text-primary text-sm font-medium mb-4">Blog</span>
              <h1 className="section-heading">Latest Insights</h1>
              <p className="section-subheading">Thoughts on ERP, enterprise software, and digital transformation.</p>
            </div>
            <Suspense fallback={<div className="h-[300px] bg-muted/20 rounded-2xl animate-pulse" />}>
              <div className="glass-card rounded-2xl overflow-hidden">
                <ERPScene3D />
              </div>
            </Suspense>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="glass-card-hover rounded-2xl overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full glass-card text-xs font-medium text-primary">{post.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="text-primary text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Read <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
