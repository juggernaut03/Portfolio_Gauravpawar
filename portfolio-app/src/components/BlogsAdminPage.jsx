import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Calendar, Search, Plus, Edit3, Trash2, Eye, EyeOff,
    X, Save, Tag, Image, AlignLeft
} from 'lucide-react';
import { API_ENDPOINTS } from '../constants/config';

const BlogsAdminPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        coverImage: '',
        tags: '',
        published: false
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(API_ENDPOINTS.BLOGS_ADMIN, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setBlogs(data);
            } else {
                setError('Failed to fetch blogs');
            }
        } catch (err) {
            setError('Error connecting to server');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (blog = null) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({
                title: blog.title,
                excerpt: blog.excerpt,
                content: blog.content,
                coverImage: blog.coverImage || '',
                tags: blog.tags.join(', '),
                published: blog.published
            });
        } else {
            setEditingBlog(null);
            setFormData({
                title: '',
                excerpt: '',
                content: '',
                coverImage: '',
                tags: '',
                published: false
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');

        const blogData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        };

        try {
            const url = editingBlog
                ? `${API_ENDPOINTS.BLOGS}/${editingBlog._id}`
                : API_ENDPOINTS.BLOGS;

            const response = await fetch(url, {
                method: editingBlog ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(blogData)
            });

            if (response.ok) {
                fetchBlogs();
                handleCloseModal();
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to save blog');
            }
        } catch (err) {
            console.error('Save error:', err);
            alert('Error saving blog');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_ENDPOINTS.BLOGS}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setBlogs(blogs.filter(blog => blog._id !== id));
            } else {
                alert('Failed to delete blog');
            }
        } catch (err) {
            console.error('Delete error:', err);
            alert('Error deleting blog');
        }
    };

    const handleTogglePublish = async (id, currentStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_ENDPOINTS.BLOGS}/${id}/publish`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ published: !currentStatus })
            });

            if (response.ok) {
                const updatedBlog = await response.json();
                setBlogs(blogs.map(blog => blog._id === id ? updatedBlog : blog));
            } else {
                alert('Failed to update publish status');
            }
        } catch (err) {
            console.error('Publish toggle error:', err);
            alert('Error updating publish status');
        }
    };

    // Stats
    const totalBlogs = blogs.length;
    const publishedBlogs = blogs.filter(blog => blog.published).length;
    const draftBlogs = blogs.filter(blog => !blog.published).length;

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-20">
            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Blogs', value: totalBlogs, icon: <FileText className="w-5 h-5" />, color: 'blue' },
                    { label: 'Published', value: publishedBlogs, icon: <Eye className="w-5 h-5" />, color: 'emerald' },
                    { label: 'Drafts', value: draftBlogs, icon: <EyeOff className="w-5 h-5" />, color: 'amber' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-400 border border-${stat.color}-500/20`}>
                                {stat.icon}
                            </div>
                        </div>
                        <p className="text-3xl font-black tracking-tighter mb-1">{stat.value}</p>
                        <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Table Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                        type="text"
                        placeholder="SEARCH BLOGS..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs font-mono focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                    />
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-white/90 transition-all"
                >
                    <Plus className="w-4 h-4" /> New Blog
                </button>
            </div>

            {/* Table Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/[0.02]">
                                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-widest text-white/30">Blog</th>
                                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-widest text-white/30">Tags</th>
                                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-widest text-white/30">Status</th>
                                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-widest text-white/30">Date</th>
                                <th className="px-8 py-6 text-[10px] font-mono uppercase tracking-widest text-white/30 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="5" className="px-8 py-8 h-20 bg-white/[0.01]" />
                                    </tr>
                                ))
                            ) : filteredBlogs.length > 0 ? (
                                filteredBlogs.map((blog) => (
                                    <tr key={blog._id} className="group hover:bg-white/[0.03] transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${blog.published
                                                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                                        : 'bg-white/5 border-white/10 text-white/40'
                                                    }`}>
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm tracking-tight">{blog.title}</p>
                                                    <p className="text-white/30 text-[10px] font-mono mt-1 line-clamp-1 max-w-xs">
                                                        {blog.excerpt}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-wrap gap-1">
                                                {blog.tags.slice(0, 3).map((tag, i) => (
                                                    <span key={i} className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-mono">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {blog.tags.length > 3 && (
                                                    <span className="text-white/30 text-[9px] font-mono">+{blog.tags.length - 3}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-tighter ${blog.published
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                }`}>
                                                {blog.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-xs font-mono text-white/30">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleTogglePublish(blog._id, blog.published)}
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${blog.published
                                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500 hover:text-white'
                                                            : 'bg-white/5 text-white/30 border-white/10 hover:bg-white hover:text-black'
                                                        }`}
                                                    title={blog.published ? 'Unpublish' : 'Publish'}
                                                >
                                                    {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => handleOpenModal(blog)}
                                                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white text-white hover:text-black transition-all border border-white/10"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center hover:bg-red-500 text-red-500 hover:text-white transition-all border border-red-500/20"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-white/20 font-mono text-sm uppercase tracking-widest">
                                        No blogs found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black tracking-tighter">
                                    {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
                                        <FileText className="w-3 h-3 inline mr-2" />Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                                        placeholder="Enter blog title..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
                                        <AlignLeft className="w-3 h-3 inline mr-2" />Excerpt
                                    </label>
                                    <textarea
                                        name="excerpt"
                                        value={formData.excerpt}
                                        onChange={handleInputChange}
                                        required
                                        rows={2}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-white/20 transition-all resize-none"
                                        placeholder="Brief description of the blog..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
                                        <FileText className="w-3 h-3 inline mr-2" />Content
                                    </label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        required
                                        rows={8}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-white/20 transition-all resize-none font-mono"
                                        placeholder="Write your blog content here..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
                                            <Image className="w-3 h-3 inline mr-2" />Cover Image URL
                                        </label>
                                        <input
                                            type="url"
                                            name="coverImage"
                                            value={formData.coverImage}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
                                            <Tag className="w-3 h-3 inline mr-2" />Tags (comma separated)
                                        </label>
                                        <input
                                            type="text"
                                            name="tags"
                                            value={formData.tags}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-white/20 transition-all"
                                            placeholder="tech, design, ..."
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        name="published"
                                        id="published"
                                        checked={formData.published}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-white focus:ring-0 focus:ring-offset-0"
                                    />
                                    <label htmlFor="published" className="text-sm text-white/60">
                                        Publish immediately
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="flex-1 py-3 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 px-6 bg-white text-black font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-white/90 transition-all"
                                    >
                                        <Save className="w-4 h-4" />
                                        {editingBlog ? 'Update Blog' : 'Create Blog'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BlogsAdminPage;
