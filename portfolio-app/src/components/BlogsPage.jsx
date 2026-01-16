import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Tag, ArrowRight, X, ArrowLeft } from 'lucide-react';
import { API_ENDPOINTS } from '../constants/config';

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.BLOGS);
            if (response.ok) {
                const data = await response.json();
                setBlogs(data);
            }
        } catch (err) {
            console.error('Error fetching blogs:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenBlog = (blog) => {
        setSelectedBlog(blog);
        document.body.classList.add('modal-open');
    };

    const handleCloseBlog = () => {
        setSelectedBlog(null);
        document.body.classList.remove('modal-open');
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
                        BLOG
                    </h1>
                    <p className="text-white/40 text-sm md:text-base font-mono max-w-xl">
                        Thoughts, tutorials, and insights on design, development, and everything in between.
                    </p>
                </motion.div>

                {/* Blog Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array(6).fill(0).map((_, i) => (
                            <div key={i} className="animate-pulse bg-white/5 rounded-3xl h-80" />
                        ))}
                    </div>
                ) : blogs.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {blogs.map((blog, index) => (
                            <motion.article
                                key={blog._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => handleOpenBlog(blog)}
                                className="group cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500"
                            >
                                {blog.coverImage && (
                                    <div className="aspect-video w-full overflow-hidden">
                                        <img
                                            src={blog.coverImage}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    {/* Tags */}
                                    {blog.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {blog.tags.slice(0, 3).map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-mono uppercase tracking-wider"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h2 className="text-lg font-bold tracking-tight mb-3 group-hover:text-white transition-colors line-clamp-2">
                                        {blog.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-white/40 text-sm line-clamp-3 mb-4 leading-relaxed">
                                        {blog.excerpt}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <span className="flex items-center gap-2 text-white/30 text-[10px] font-mono">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                        <span className="flex items-center gap-1 text-white/60 text-xs font-medium group-hover:text-white transition-colors">
                                            Read More
                                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-white/20 font-mono text-sm uppercase tracking-widest">
                            No blogs published yet
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Blog Detail Modal */}
            <AnimatePresence>
                {selectedBlog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md overflow-y-auto"
                    >
                        <div className="min-h-screen py-8 px-4 md:px-8">
                            <div className="max-w-4xl mx-auto">
                                {/* Close Button */}
                                <motion.button
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    onClick={handleCloseBlog}
                                    className="mb-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-mono"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Blogs
                                </motion.button>

                                {/* Cover Image */}
                                {selectedBlog.coverImage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="aspect-video w-full rounded-3xl overflow-hidden mb-8"
                                    >
                                        <img
                                            src={selectedBlog.coverImage}
                                            alt={selectedBlog.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                )}

                                {/* Tags */}
                                {selectedBlog.tags.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="flex flex-wrap gap-2 mb-6"
                                    >
                                        {selectedBlog.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono uppercase tracking-wider"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </motion.div>
                                )}

                                {/* Title */}
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="text-3xl md:text-5xl font-black tracking-tighter mb-4"
                                >
                                    {selectedBlog.title}
                                </motion.h1>

                                {/* Meta */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-4 text-white/40 text-sm font-mono mb-12"
                                >
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(selectedBlog.createdAt).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </motion.div>

                                {/* Content */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                    className="prose prose-invert prose-lg max-w-none"
                                >
                                    <div className="text-white/70 leading-relaxed whitespace-pre-wrap text-base md:text-lg">
                                        {selectedBlog.content}
                                    </div>
                                </motion.div>

                                {/* Footer */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-16 pt-8 border-t border-white/10"
                                >
                                    <button
                                        onClick={handleCloseBlog}
                                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-mono"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to Blogs
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BlogsPage;
