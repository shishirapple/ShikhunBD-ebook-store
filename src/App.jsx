import React, { useState, useEffect, createContext, useContext } from 'react';

// --- ICONS (Heroicons & Custom) ---
// Using inline SVGs for icons to avoid external dependencies.
const BookOpenIcon = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);
const ShoppingCartIcon = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.835l1.823-6.84a1.125 1.125 0 00-.986-1.43H5.625M7.5 14.25v-6h11.218" />
  </svg>
);
const StarIcon = ({ className = 'w-5 h-5', isFilled = true }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={isFilled ? 0 : 1.5} className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);
const XMarkIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const HeartIcon = ({ className = 'w-6 h-6', isFilled = false }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={isFilled ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);
const MenuIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);
const ArrowUpIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
);
const SearchIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);
const PaperAirplaneIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);
const CheckCircleIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const ArrowDownTrayIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);
// Custom Payment Method SVGs
const BkashIcon = () => <svg width="40" height="40" viewBox="0 0 40 40"><path fill="#D82A7D" d="M15.38 3.8h11.16l-3.5 11.2h-4.16zM27.22 3.8h11.16l-7.66 22.12h-7.62zM1.62 3.8h11.16L5.12 25.92H1.62zM15.98 15.6h11.16l-3.5 10.32h-4.16z"></path></svg>;
const NagadIcon = () => <svg width="40" height="40" viewBox="0 0 40 40"><path fill="#F54D4D" d="M20 0C9 0 0 9 0 20s9 20 20 20 20-9 20-20S31 0 20 0zm4.5 24.8l-8.3 4.2c-.4.2-.8 0-1-.4l-4.2-8.3c-.2-.4 0-.8.4-1l8.3-4.2c.4-.2.8 0 1 .4l4.2 8.3c.2.4 0 .8-.4 1z"></path></svg>;
const RocketIcon = () => <svg width="40" height="40" viewBox="0 0 40 40"><path fill="#8A2BE2" d="M20 0L0 10l20 30L40 10zM20 15l10 5-10 15-10-15z"></path></svg>;


// --- MOCK DATA ---
const authors = {
  'author-1': { id: 'author-1', name: 'Elena Vance', bio: 'Elena Vance is a celebrated author of contemporary fiction, known for her poignant explorations of human connection in the digital age. With a background in psychology, her narratives are both compelling and deeply insightful.', imageUrl: 'https://placehold.co/400x400/a3a3a3/ffffff?text=Elena', books: ['book-1', 'book-4'] },
  'author-2': { id: 'author-2', name: 'Marcus Thorne', bio: 'Marcus Thorne is a master of the science fiction genre. His world-building is second to none, creating sprawling universes that challenge the imagination. Thorne holds a degree in astrophysics, which lends a hard science edge to his stories.', imageUrl: 'https://placehold.co/400x400/a3a3a3/ffffff?text=Marcus', books: ['book-2', 'book-3'] },
};
const books = [
  { id: 'book-1', title: 'The Last Echo', authorId: 'author-1', coverImageUrl: 'https://placehold.co/600x800/52525b/ffffff?text=The+Last+Echo', price: 14.99, description: 'A gripping tale of memory and loss, where a reclusive archivist discovers a sound recording that could change history. But as she delves deeper, she finds that some secrets are meant to stay buried.', genre: 'Fiction', publicationDate: '2023-05-15', avgRating: 4.5, sampleText: "The dust motes danced in the single beam of light that pierced the gloom of the archive. Eleanor ran a gloved finger across a canister labeled 'Echo-7'. She hadn't come here looking for trouble, but the low, melancholic hum emanating from within the metal suggested trouble had been waiting for her all along...", downloadUrl: '#' },
  { id: 'book-2', title: 'Starlight Imperium', authorId: 'author-2', coverImageUrl: 'https://placehold.co/600x800/1e293b/ffffff?text=Starlight+Imperium', price: 18.99, description: 'The galaxy is on the brink of war. A lone pilot, framed for an act of interstellar terrorism, must clear her name and unite a fractured alliance before the tyrannical Imperium extinguishes the last flames of freedom.', genre: 'Sci-Fi', publicationDate: '2022-11-01', avgRating: 4.8, sampleText: "Captain Eva Rostova watched the nebula bloom on the main viewer, a cosmic flower of violent purples and reds. 'They're coming,' she whispered, her knuckles white on the command chair. 'And they're bringing hell with them.' The ship shuddered as the first volley of plasma fire impacted the shields.", downloadUrl: '#' },
  { id: 'book-3', title: 'Chronoscape', authorId: 'author-2', coverImageUrl: 'https://placehold.co/600x800/7c2d12/ffffff?text=Chronoscape', price: 16.99, description: 'A historian invents a device to view the past, but soon learns that observation is not without consequence. Every glance backward creates ripples that threaten to unravel the fabric of his own present.', genre: 'Sci-Fi', publicationDate: '2024-01-20', avgRating: 4.6, sampleText: 'Dr. Aris Thorne activated the Chronoscape. The cobbled streets of ancient Rome flickered into existence around him, a ghostly overlay on his sterile lab. He was merely an observer, a ghost in the machine of time. Or so he thought. Then, a Roman centurion looked directly at him, a flicker of recognition in his eyes, and Aris felt a cold dread he had never known.', downloadUrl: '#' },
  { id: 'book-4', title: 'The Willow Creek Letters', authorId: 'author-1', coverImageUrl: 'https://placehold.co/600x800/166534/ffffff?text=Willow+Creek', price: 12.99, description: 'Two strangers, a generation apart, begin an anonymous correspondence, sharing their deepest secrets and dreams. A heartwarming story about friendship, second chances, and the timeless power of the written word.', genre: 'Fiction', publicationDate: '2021-08-30', avgRating: 4.9, sampleText: "It started with a note, tucked into the spine of a library book. 'To whoever finds this,' it read, 'I hope you are having a better day than I am.' Liam, recently retired and adrift, found himself writing back. He placed his reply in the same book, hoping a stranger's words might anchor him.", downloadUrl: '#' },
];
const reviews = {
  'book-1': [{ id: 'rev-1', userName: 'Reader_27', rating: 5, comment: 'Absolutely unputdownable! The mystery kept me guessing until the very end.' }, { id: 'rev-2', userName: 'Bookworm_Belle', rating: 4, comment: 'A beautifully written, atmospheric novel. A bit slow at times, but the payoff is worth it.' }],
  'book-2': [{ id: 'rev-3', userName: 'Galaxy_Surfer', rating: 5, comment: 'Epic space opera at its finest. The world-building is incredible!' }, { id: 'rev-4', userName: 'SciFi_Fanatic', rating: 5, comment: 'Marcus Thorne has done it again. A must-read for any fan of the genre.' }],
  'book-3': [{ id: 'rev-5', userName: 'TimeTravelerTom', rating: 4, comment: 'A thought-provoking concept that was executed brilliantly. Made me think!' }],
  'book-4': [{ id: 'rev-6', userName: 'CozyReader', rating: 5, comment: 'This book was like a warm hug. So heartwarming and beautifully written.' }, { id: 'rev-7', userName: 'LetterLover', rating: 5, comment: 'I cried! The characters felt so real. Highly recommend.' }],
};

// --- CONTEXT for State Management ---
const AppContext = createContext();

// --- COMPONENTS ---

const Rating = ({ rating, className = '' }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(fullStars)].map((_, i) => <StarIcon key={`full_${i}`} className="w-5 h-5 text-amber-500" />)}
      {[...Array(emptyStars)].map((_, i) => <StarIcon key={`empty_${i}`} className="w-5 h-5 text-stone-300" isFilled={false} />)}
    </div>
  );
};

const BookCard = ({ book }) => {
  const { setView, wishlist, toggleWishlist } = useContext(AppContext);
  const author = authors[book.authorId];
  const isInWishlist = wishlist.includes(book.id);

  return (
    <div 
        onClick={() => setView({ page: 'product', id: book.id })}
        className="group relative flex flex-col bg-white p-4 rounded-md shadow-md border border-stone-200 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="overflow-hidden rounded-md bg-stone-200">
        <img 
          src={book.coverImageUrl} 
          alt={`Cover of ${book.title}`} 
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/f5f5f4/a8a29e?text=Image+Not+Found'; }}
        />
      </div>
       <button 
        onClick={(e) => {
            e.stopPropagation(); // Prevent card click when clicking heart
            toggleWishlist(book.id);
        }}
        className="absolute top-2 right-2 z-10 p-2 bg-white/70 rounded-full text-red-700 hover:bg-white transition-colors"
        aria-label="Toggle Wishlist"
      >
        <HeartIcon isFilled={isInWishlist} className="w-6 h-6" />
      </button>
      <div className="mt-4 flex flex-col flex-grow">
        <h3 className="text-lg font-serif font-semibold text-stone-800">{book.title}</h3>
        <p 
            className="text-sm text-stone-500 hover:text-red-800"
            onClick={(e) => {
                e.stopPropagation(); // Prevent card click when clicking author
                setView({ page: 'author', id: author.id });
            }}
        >
            {author.name}
        </p>
        <div className="flex items-center mt-2">
            <Rating rating={book.avgRating} />
            <span className="text-xs text-stone-500 ml-2">({(reviews[book.id] || []).length})</span>
        </div>
        <p className="mt-2 text-xl font-sans font-bold text-stone-900">${book.price}</p>
      </div>
    </div>
  );
};

const Header = () => {
    const { setView, cart, wishlist } = useContext(AppContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const wishlistItemCount = wishlist.length;

    const handleLinkClick = (view) => {
        setView(view);
        setIsMenuOpen(false);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            handleLinkClick({ page: 'search-results', query: searchQuery.trim() });
            setSearchQuery('');
        }
    }

    return (
        <>
            <header className="bg-stone-800 shadow-lg sticky top-0 z-40 text-white">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between gap-4">
                        <div className="flex items-center">
                            <button onClick={() => handleLinkClick({ page: 'home' })} className="flex-shrink-0 flex items-center gap-3">
                                <BookOpenIcon className="h-8 w-8 text-amber-300" />
                                <span className="text-3xl font-serif text-white">ShikhunBD</span>
                            </button>
                        </div>
                        
                        {/* Desktop Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-xl">
                            <form onSubmit={handleSearchSubmit} className="w-full flex">
                                <input 
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for books or authors..."
                                    className="w-full py-2 px-4 rounded-l-md border-0 text-stone-900 focus:ring-2 focus:ring-inset focus:ring-amber-400"
                                />
                                <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold py-2 px-4 rounded-r-md transition-colors">
                                    <SearchIcon className="h-6 w-6"/>
                                </button>
                            </form>
                        </div>

                        <div className="flex items-center gap-2">
                             <div className="hidden md:flex items-center gap-4">
                                <button onClick={() => handleLinkClick({ page: 'my-library' })} className="font-sans text-stone-300 hover:text-white transition-colors">My Library</button>
                                <button onClick={() => handleLinkClick({ page: 'wishlist' })} className="relative p-2 text-stone-300 hover:text-white transition-colors">
                                    <HeartIcon className="h-7 w-7" />
                                    {wishlistItemCount > 0 && (
                                        <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-700 text-xs font-medium text-white">
                                            {wishlistItemCount}
                                        </span>
                                    )}
                                </button>
                                <button onClick={() => handleLinkClick({ page: 'cart' })} className="relative p-2 text-stone-300 hover:text-white transition-colors">
                                    <ShoppingCartIcon className="h-7 w-7" />
                                    {cartItemCount > 0 && (
                                        <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-700 text-xs font-medium text-white">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </button>
                            </div>
                            <div className="md:hidden">
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-stone-300 hover:text-white">
                                    {isMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {/* Mobile Menu */}
            <div className={`fixed top-20 left-0 right-0 bottom-0 bg-stone-800/95 backdrop-blur-sm z-30 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
                     <form onSubmit={handleSearchSubmit} className="w-full max-w-sm flex">
                        <input 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for books..."
                            className="w-full py-3 px-4 rounded-l-md border-0 text-stone-900 focus:ring-2 focus:ring-inset focus:ring-amber-400"
                        />
                        <button type="submit" className="bg-amber-400 hover:bg-amber-500 text-stone-900 font-bold py-3 px-4 rounded-r-md transition-colors">
                            <SearchIcon className="h-6 w-6"/>
                        </button>
                    </form>
                    <button onClick={() => handleLinkClick({ page: 'home' })} className="font-serif text-3xl text-white hover:text-amber-300">Home</button>
                    <button onClick={() => handleLinkClick({ page: 'all-products' })} className="font-serif text-3xl text-white hover:text-amber-300">All Books</button>
                    <button onClick={() => handleLinkClick({ page: 'my-library' })} className="font-serif text-3xl text-white hover:text-amber-300">My Library</button>
                    <button onClick={() => handleLinkClick({ page: 'wishlist' })} className="font-serif text-3xl text-white hover:text-amber-300">Wishlist</button>
                    <button onClick={() => handleLinkClick({ page: 'contact' })} className="font-serif text-3xl text-white hover:text-amber-300">Contact</button>
                    <div className="flex gap-8 mt-4">
                        <button onClick={() => handleLinkClick({ page: 'wishlist' })} className="relative p-2 text-white">
                            <HeartIcon className="h-8 w-8" />
                            {wishlistItemCount > 0 && <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-700 text-xs font-medium">{wishlistItemCount}</span>}
                        </button>
                        <button onClick={() => handleLinkClick({ page: 'cart' })} className="relative p-2 text-white">
                            <ShoppingCartIcon className="h-8 w-8" />
                            {cartItemCount > 0 && <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-700 text-xs font-medium">{cartItemCount}</span>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const Footer = () => {
    const { setView } = useContext(AppContext);
    return (
        <footer className="bg-stone-800 text-stone-300 border-t-4 border-stone-900">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                 <div className="flex justify-center space-x-8 mb-8">
                    <button onClick={() => setView({ page: 'home' })} className="hover:text-white transition-colors">Home</button>
                    <button onClick={() => setView({ page: 'all-products' })} className="hover:text-white transition-colors">All Books</button>
                    <button onClick={() => setView({ page: 'my-library' })} className="hover:text-white transition-colors">My Library</button>
                    <button onClick={() => setView({ page: 'contact' })} className="hover:text-white transition-colors">Contact Us</button>
                </div>
                <div className="text-center">
                    <p className="font-serif text-lg">ShikhunBD</p>
                    <p className="mt-4 text-center text-sm text-stone-400">&copy; 2025 ShikhunBD. All rights reserved. A haven for readers.</p>
                </div>
            </div>
        </footer>
    );
};

const SampleModal = ({ book, onClose }) => {
    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-amber-50 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border-4 border-stone-700">
                <div className="flex justify-between items-center p-4 border-b-2 border-stone-700 bg-stone-200">
                    <h2 className="text-xl font-serif font-bold text-stone-800">Sample: {book.title}</h2>
                    <button onClick={onClose} className="text-stone-500 hover:text-stone-800">
                        <XMarkIcon className="w-7 h-7" />
                    </button>
                </div>
                <div className="p-8 overflow-y-auto">
                    <p className="text-stone-700 text-lg leading-relaxed whitespace-pre-wrap font-serif">{book.sampleText}</p>
                </div>
                <div className="p-4 border-t border-stone-300 bg-stone-100 text-right">
                    <button onClick={onClose} className="rounded-md bg-red-800 py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- PAGES ---

const PageWrapper = ({ children }) => (
    <div className="opacity-0 animate-fadeIn">
        {children}
    </div>
);

const HomePage = () => {
  const featuredBooks = books.slice(0, 4);
  const { setView } = useContext(AppContext);

  return (
    <PageWrapper>
      <div className="relative bg-stone-600">
        <div className="absolute inset-0">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop" alt="A cozy library"/>
            <div className="absolute inset-0 bg-stone-800 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
            <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-6xl">
              Your Literary Escape Awaits
            </h1>
            <p className="mt-6 text-lg leading-8 text-stone-200 max-w-2xl mx-auto">
              Find timeless classics and modern masterpieces. Settle in and discover a world of stories.
            </p>
            <div className="mt-10">
              <button
                onClick={() => setView({ page: 'all-products' })}
                className="rounded-md bg-red-800 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800 transition-transform hover:scale-105"
              >
                Explore the Collection
              </button>
            </div>
        </div>
      </div>

      <div className="bg-amber-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-stone-900 text-center border-b-2 border-stone-300 pb-4 mb-12">Featured Selections</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

const ProductListPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('relevance');

    const filteredAndSortedBooks = books
        .filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || authors[book.authorId].name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'rating': return b.avgRating - a.avgRating;
                default: return 0;
            }
        });

    return (
        <PageWrapper>
            <div className="bg-amber-50/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="border-b-2 border-stone-300 pb-6 mb-10">
                        <h1 className="text-4xl font-serif font-bold tracking-tight text-stone-900">Our Entire Collection</h1>
                        <p className="mt-4 text-base text-stone-600">Browse through our curated selection of fine ebooks.</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 p-4 bg-white border border-stone-200 rounded-md shadow-sm">
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <input
                                type="text"
                                placeholder="Search by title or author..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-md border-stone-300 shadow-sm focus:border-red-800 focus:ring-red-800 font-sans"
                            />
                        </div>
                        <div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-md border-stone-300 shadow-sm focus:border-red-800 focus:ring-red-800 font-sans"
                            >
                                <option value="relevance">Sort by Relevance</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating">Highest Rating</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredAndSortedBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

const ProductDetailPage = ({ id }) => {
    const { setView, addToCart, handleBuyNow, wishlist, toggleWishlist } = useContext(AppContext);
    const [showSample, setShowSample] = useState(false);
    const book = books.find(b => b.id === id);
    if (!book) return <NotFoundPage />;

    const author = authors[book.authorId];
    const bookReviews = reviews[book.id] || [];
    const isInWishlist = wishlist.includes(book.id);
    
    const relatedBooks = books.filter(b => b.genre === book.genre && b.id !== book.id).slice(0, 4);

    return (
        <PageWrapper>
            {showSample && <SampleModal book={book} onClose={() => setShowSample(false)} />}
            <div className="bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
                        <div className="flex flex-col items-center p-4">
                            <img
                                src={book.coverImageUrl}
                                alt={`Cover of ${book.title}`}
                                className="h-auto w-full max-w-md object-cover rounded-lg shadow-2xl border-4 border-stone-200"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/f5f5f4/a8a29e?text=Image+Not+Found'; }}
                            />
                        </div>
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <h1 className="text-4xl font-serif font-bold tracking-tight text-stone-900">{book.title}</h1>
                            <div className="mt-3">
                                <p 
                                    className="text-xl text-stone-600 hover:text-red-800 cursor-pointer font-serif"
                                    onClick={() => setView({ page: 'author', id: author.id })}
                                >
                                    By {author.name}
                                </p>
                            </div>
                            <div className="mt-4">
                                <p className="text-3xl font-sans tracking-tight text-stone-800">${book.price}</p>
                            </div>
                            <div className="mt-6 flex items-center">
                                <Rating rating={book.avgRating} />
                                <a href="#reviews" className="ml-3 text-sm font-medium text-red-800 hover:text-red-600">
                                    {bookReviews.length} reviews
                                </a>
                            </div>
                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>
                                <div className="space-y-6 text-base text-stone-700 leading-relaxed">
                                    <p>{book.description}</p>
                                </div>
                            </div>
                            <div className="mt-10 flex flex-col gap-y-4">
                                <button
                                    type="button"
                                    onClick={() => handleBuyNow(book.id)}
                                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-amber-500 py-3 px-8 text-base font-medium text-stone-900 shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
                                >
                                    Buy Now
                                </button>
                                <div className="flex gap-x-4">
                                    <button
                                        type="button"
                                        onClick={() => addToCart(book.id, 1)}
                                        className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-red-800 py-3 px-8 text-base font-medium text-white shadow-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 transition-colors"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => toggleWishlist(book.id)}
                                        className="p-3 flex items-center justify-center rounded-md text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800 transition-colors"
                                        aria-label="Toggle Wishlist"
                                    >
                                        <HeartIcon isFilled={isInWishlist} className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                             <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowSample(true)}
                                    className="w-full rounded-md py-3 px-8 text-base font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800 transition-colors"
                                >
                                    Read Sample
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="reviews" className="mt-16 pt-10 border-t-2 border-stone-200">
                        <h2 className="text-3xl font-serif font-bold text-stone-900">Customer Reviews</h2>
                        <div className="mt-6 space-y-10">
                            {bookReviews.length > 0 ? bookReviews.map(review => (
                                <div key={review.id} className="p-4 border-b border-stone-200">
                                    <div className="flex items-center mb-2">
                                        <Rating rating={review.rating} />
                                        <p className="ml-4 text-md font-semibold text-stone-800">{review.userName}</p>
                                    </div>
                                    <p className="text-base text-stone-600 italic">"{review.comment}"</p>
                                </div>
                            )) : (
                                <p className="text-stone-500">No reviews yet. Be the first to share your thoughts!</p>
                            )}
                        </div>
                    </div>
                    {relatedBooks.length > 0 && (
                        <div id="related" className="mt-16 pt-10 border-t-2 border-stone-200">
                             <h2 className="text-3xl font-serif font-bold text-stone-900">You Might Also Like</h2>
                             <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                                {relatedBooks.map((relatedBook) => (
                                    <BookCard key={relatedBook.id} book={relatedBook} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
};

const AuthorPage = ({ id }) => {
    const author = authors[id];
    if (!author) return <NotFoundPage />;
    const authorBooks = books.filter(book => book.authorId === id);

    return (
        <PageWrapper>
            <div className="bg-amber-50/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex flex-col md:flex-row gap-8 items-center border-b-2 border-stone-300 pb-10 mb-10 bg-white p-8 rounded-lg shadow-md">
                        <img 
                            src={author.imageUrl} 
                            alt={`Portrait of ${author.name}`} 
                            className="w-48 h-48 rounded-full object-cover shadow-xl border-4 border-white"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/a3a3a3/ffffff?text=Author'; }}
                        />
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-serif font-bold tracking-tight text-stone-900">{author.name}</h1>
                            <p className="mt-4 text-lg text-stone-600">{author.bio}</p>
                        </div>
                    </div>
                    <h2 className="text-3xl font-serif font-bold tracking-tight text-stone-900 mb-8">Books by {author.name}</h2>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                        {authorBooks.map((book) => ( <BookCard key={book.id} book={book} /> ))}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

const CartPage = () => {
    const { cart, updateCartQuantity, removeFromCart, setView } = useContext(AppContext);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <PageWrapper>
            <div className="bg-amber-50/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
                    <h1 className="text-4xl font-serif font-bold tracking-tight text-stone-900">Your Shopping Cart</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
                        <section className="lg:col-span-7 bg-white p-6 rounded-lg shadow-md border border-stone-200">
                            <h2 className="sr-only">Items in your shopping cart</h2>
                            {cart.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-stone-600 text-lg">Your cart is currently empty.</p>
                                    <button 
                                        onClick={() => setView({ page: 'all-products'})}
                                        className="mt-4 rounded-md bg-red-800 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-red-700"
                                    >
                                        Find Your Next Book
                                    </button>
                                </div>
                            ) : (
                                <ul role="list" className="divide-y divide-stone-200">
                                    {cart.map(item => (
                                        <li key={item.id} className="flex py-6">
                                            <div className="flex-shrink-0">
                                                <img src={item.coverImageUrl} alt={item.title} className="h-32 w-24 rounded-md object-cover shadow-sm"/>
                                            </div>
                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div>
                                                    <h3 className="text-md font-serif font-semibold text-stone-800">{item.title}</h3>
                                                    <p className="mt-1 text-sm text-stone-500">{authors[item.authorId].name}</p>
                                                    <p className="mt-2 text-md font-sans font-medium text-stone-900">${item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <select value={item.quantity} onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value))} className="rounded-md border-stone-300 py-1.5 text-base font-medium text-stone-700 shadow-sm focus:border-red-800 focus:ring-1 focus:ring-red-800">
                                                        {[...Array(10).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                                                    </select>
                                                    <button type="button" onClick={() => removeFromCart(item.id)} className="text-sm font-medium text-red-700 hover:text-red-900">
                                                        <span>Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                        <section className="mt-16 rounded-lg bg-stone-100 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 border border-stone-200 shadow-md">
                            <h2 className="text-lg font-serif font-medium text-stone-900">Order Summary</h2>
                            <dl className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-stone-600">Subtotal</dt>
                                    <dd className="text-sm font-medium text-stone-900">${subtotal.toFixed(2)}</dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-stone-300 pt-4">
                                    <dt className="text-base font-medium text-stone-900">Order Total</dt>
                                    <dd className="text-base font-medium text-stone-900">${subtotal.toFixed(2)}</dd>
                                </div>
                            </dl>
                            <div className="mt-6">
                                <button 
                                    onClick={() => setView({ page: 'checkout' })}
                                    disabled={cart.length === 0} 
                                    className="w-full rounded-md border border-transparent bg-red-800 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-400"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

const WishlistPage = () => {
    const { wishlist, setView } = useContext(AppContext);
    const wishlistedBooks = books.filter(book => wishlist.includes(book.id));

    return (
        <PageWrapper>
            <div className="bg-amber-50/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
                    <div className="border-b-2 border-stone-300 pb-6 mb-10">
                        <h1 className="text-4xl font-serif font-bold tracking-tight text-stone-900">Your Wishlist</h1>
                        <p className="mt-4 text-base text-stone-600">Your collection of saved books. Ready to dive in?</p>
                    </div>

                    {wishlistedBooks.length === 0 ? (
                         <div className="text-center py-12">
                            <p className="text-stone-600 text-lg">Your wishlist is empty.</p>
                            <p className="text-stone-500 mt-2">Click the heart icon on any book to save it here.</p>
                            <button 
                                onClick={() => setView({ page: 'all-products'})}
                                className="mt-4 rounded-md bg-red-800 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-red-700"
                            >
                                Discover Books
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {wishlistedBooks.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
};

const ContactPage = () => {
    const { showToast } = useContext(AppContext);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd send this data to a server.
        // For now, we'll just simulate a success message.
        showToast("Thank you for your message!");
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <PageWrapper>
            <div className="bg-amber-50/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-4xl font-serif font-bold tracking-tight text-stone-900">Contact Us</h1>
                        <p className="mt-4 text-lg text-stone-600">Have a question or feedback? We'd love to hear from you.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-12 max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md border border-stone-200">
                        <div className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-stone-700">Full name</label>
                                <div className="mt-1">
                                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="block w-full rounded-md border-stone-300 shadow-sm focus:border-red-800 focus:ring-red-800" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email</label>
                                <div className="mt-1">
                                    <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="block w-full rounded-md border-stone-300 shadow-sm focus:border-red-800 focus:ring-red-800" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-stone-700">Message</label>
                                <div className="mt-1">
                                    <textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleChange} className="block w-full rounded-md border-stone-300 shadow-sm focus:border-red-800 focus:ring-red-800"></textarea>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="w-full flex justify-center items-center gap-2 rounded-md border border-transparent bg-red-800 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2">
                                    Send Message
                                    <PaperAirplaneIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </PageWrapper>
    );
};

const SearchResultsPage = ({ query }) => {
    const { setView } = useContext(AppContext);
    const lowerCaseQuery = query.toLowerCase();
    const results = books.filter(book => 
        book.title.toLowerCase().includes(lowerCaseQuery) || 
        authors[book.authorId].name.toLowerCase().includes(lowerCaseQuery)
    );

    return (
        <PageWrapper>
            <div className="bg-amber-50/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
                    <div className="border-b-2 border-stone-300 pb-6 mb-10">
                        <h1 className="text-4xl font-serif font-bold tracking-tight text-stone-900">Search Results</h1>
                        <p className="mt-4 text-base text-stone-600">
                            {results.length} {results.length === 1 ? 'result' : 'results'} found for "<span className="font-semibold">{query}</span>"
                        </p>
                    </div>

                    {results.length === 0 ? (
                         <div className="text-center py-12">
                            <p className="text-stone-600 text-lg">No books matched your search.</p>
                            <p className="text-stone-500 mt-2">Try a different search term or browse our full collection.</p>
                            <button 
                                onClick={() => setView({ page: 'all-products'})}
                                className="mt-4 rounded-md bg-red-800 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-red-700"
                            >
                                Browse All Books
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {results.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
};

const CheckoutPage = () => {
    const { cart, handlePurchase } = useContext(AppContext);
    const [paymentMethod, setPaymentMethod] = useState('bkash');
    const [isProcessing, setIsProcessing] = useState(false);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const onPurchase = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            handlePurchase();
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <PageWrapper>
            <div className="bg-amber-50/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-serif font-bold tracking-tight text-stone-900 text-center">Checkout</h1>
                        <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-x-12">
                            <div className="bg-white p-8 rounded-lg shadow-md border border-stone-200">
                                <h2 className="text-2xl font-serif font-semibold text-stone-800">Payment Details</h2>
                                <div className="mt-6">
                                    <label className="text-base font-medium text-stone-900">Payment Method</label>
                                    <fieldset className="mt-4">
                                        <legend className="sr-only">Payment type</legend>
                                        <div className="space-y-4">
                                            {['bkash', 'nagad', 'rocket'].map((method) => (
                                                <div key={method} className="flex items-center">
                                                    <input id={method} name="payment-type" type="radio" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="h-4 w-4 border-stone-300 text-red-800 focus:ring-red-800" />
                                                    <label htmlFor={method} className="ml-3 flex items-center gap-3 text-sm font-medium text-stone-700">
                                                        {method === 'bkash' && <BkashIcon />}
                                                        {method === 'nagad' && <NagadIcon />}
                                                        {method === 'rocket' && <RocketIcon />}
                                                        <span className="capitalize">{method}</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </fieldset>
                                </div>
                                <form onSubmit={onPurchase} className="mt-6 space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email for Receipt</label>
                                        <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-red-800 focus:ring-red-800" />
                                    </div>
                                    <div>
                                        <label htmlFor="mobile-number" className="block text-sm font-medium text-stone-700">{paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)} Account Number</label>
                                        <input type="tel" id="mobile-number" name="mobile-number" placeholder="e.g., 01xxxxxxxxx" required className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-red-800 focus:ring-red-800" />
                                    </div>
                                    <button type="submit" disabled={isProcessing} className="w-full flex justify-center items-center gap-2 rounded-md border border-transparent bg-red-800 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 disabled:bg-stone-400">
                                        {isProcessing ? 'Processing...' : `Pay $${subtotal.toFixed(2)}`}
                                    </button>
                                </form>
                            </div>
                            <div className="mt-10 lg:mt-0">
                                <h2 className="text-2xl font-serif font-semibold text-stone-800">Order Summary</h2>
                                <div className="mt-4 bg-white p-6 rounded-lg shadow-md border border-stone-200">
                                    <ul className="divide-y divide-stone-200">
                                        {cart.map(item => (
                                            <li key={item.id} className="flex items-center py-4">
                                                <img src={item.coverImageUrl} alt={item.title} className="h-20 w-16 rounded-md object-cover"/>
                                                <div className="ml-4 flex-1">
                                                    <h3 className="text-md font-semibold text-stone-800">{item.title}</h3>
                                                    <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="text-md font-medium text-stone-900">${(item.price * item.quantity).toFixed(2)}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="border-t border-stone-200 pt-4 mt-4">
                                         <div className="flex justify-between text-base font-medium text-stone-900">
                                            <p>Total</p>
                                            <p>${subtotal.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

const OrderConfirmationPage = () => {
    const { setView, lastOrder } = useContext(AppContext);

    return (
        <PageWrapper>
            <div className="bg-amber-50/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-2xl mx-auto text-center bg-white p-10 rounded-lg shadow-xl border border-stone-200">
                        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                        <h1 className="mt-6 text-4xl font-serif font-bold tracking-tight text-stone-900">Thank You!</h1>
                        <p className="mt-4 text-lg text-stone-600">Your order has been confirmed. You can download your books below or find them anytime in "My Library".</p>
                        
                        <div className="mt-8 text-left">
                             <h2 className="text-xl font-serif font-semibold text-stone-800">Your Downloads</h2>
                             <ul className="mt-4 divide-y divide-stone-200 border-t border-b">
                                {lastOrder.map(item => (
                                    <li key={item.id} className="flex items-center justify-between py-4">
                                        <div>
                                            <h3 className="font-semibold">{item.title}</h3>
                                            <p className="text-sm text-stone-500">{authors[item.authorId].name}</p>
                                        </div>
                                        <a href={item.downloadUrl} download className="flex items-center gap-2 rounded-md bg-stone-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-stone-800 transition-colors">
                                            <ArrowDownTrayIcon className="w-5 h-5" />
                                            Download
                                        </a>
                                    </li>
                                ))}
                             </ul>
                        </div>

                        <button 
                            onClick={() => setView({ page: 'my-library' })}
                            className="mt-8 w-full rounded-md bg-red-800 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-red-700"
                        >
                            Go to My Library
                        </button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

const MyLibraryPage = () => {
    const { purchasedBooks, setView } = useContext(AppContext);
    
    return (
        <PageWrapper>
            <div className="bg-amber-50/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
                    <div className="border-b-2 border-stone-300 pb-6 mb-10">
                        <h1 className="text-4xl font-serif font-bold tracking-tight text-stone-900">My Library</h1>
                        <p className="mt-4 text-base text-stone-600">All of your purchased books in one place.</p>
                    </div>

                    {purchasedBooks.length === 0 ? (
                         <div className="text-center py-12">
                            <p className="text-stone-600 text-lg">You haven't purchased any books yet.</p>
                            <button 
                                onClick={() => setView({ page: 'all-products'})}
                                className="mt-4 rounded-md bg-red-800 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-red-700"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {purchasedBooks.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
};


const NotFoundPage = () => {
    const { setView } = useContext(AppContext);
    return (
        <PageWrapper>
            <main className="grid min-h-full place-items-center bg-amber-50/50 px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-red-800">404</p>
                    <h1 className="mt-4 text-3xl font-serif font-bold tracking-tight text-stone-900 sm:text-5xl">Page Not Found</h1>
                    <p className="mt-6 text-base leading-7 text-stone-600">Apologies, we can't seem to find the page you're looking for.</p>
                    <div className="mt-10">
                        <button onClick={() => setView({ page: 'home' })} className="rounded-md bg-red-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700">
                            Return to the Homepage
                        </button>
                    </div>
                </div>
            </main>
        </PageWrapper>
    )
}

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button 
            onClick={scrollToTop}
            className={`fixed bottom-5 right-5 p-3 rounded-full bg-stone-800 text-white shadow-lg hover:bg-stone-900 transition-all duration-300 z-50 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            aria-label="Go to top"
        >
            <ArrowUpIcon className="w-6 h-6" />
        </button>
    );
};


// --- Main App Component ---
export default function App() {
  const [view, setView] = useState({ page: 'home', id: null, query: '' });
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [lastOrder, setLastOrder] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Add fonts and animation styles to the document head
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Open+Sans:wght@400;600;700&display=swap');
      .font-serif { font-family: 'Playfair Display', serif; }
      .font-sans { font-family: 'Open Sans', sans-serif; }
      .font-body-serif { font-family: 'Lora', serif; }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-in-out forwards;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  // Cart Management
  const addToCart = (bookId, quantity) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === bookId);
      if (existingItem) {
        return prevCart.map(item => item.id === bookId ? { ...item, quantity: item.quantity + quantity } : item);
      } else {
        return [...prevCart, { ...book, quantity }];
      }
    });
    showToast(`${book.title} added to cart!`);
  };

  const updateCartQuantity = (bookId, newQuantity) => {
    setCart(prevCart => prevCart.map(item => item.id === bookId ? { ...item, quantity: newQuantity } : item));
  };

  const removeFromCart = (bookId) => {
    const book = books.find(b => b.id === bookId);
    setCart(prevCart => prevCart.filter(item => item.id !== bookId));
    if(book) showToast(`${book.title} removed from cart.`);
  };
  
  // Wishlist Management
  const toggleWishlist = (bookId) => {
      const book = books.find(b => b.id === bookId);
      if (!book) return;
      setWishlist(prevWishlist => {
          if (prevWishlist.includes(bookId)) {
              showToast(`${book.title} removed from wishlist.`);
              return prevWishlist.filter(id => id !== bookId);
          } else {
              showToast(`${book.title} added to wishlist!`);
              return [...prevWishlist, bookId];
          }
      });
  };

  // Purchase Management
  const handlePurchase = () => {
      const newPurchases = cart.map(item => books.find(b => b.id === item.id));
      setPurchasedBooks(prev => {
          const existingIds = new Set(prev.map(b => b.id));
          const uniqueNewPurchases = newPurchases.filter(b => !existingIds.has(b.id));
          return [...prev, ...uniqueNewPurchases];
      });
      setLastOrder(cart);
      setCart([]);
      setView({ page: 'order-confirmation' });
  };
  
  const handleBuyNow = (bookId) => {
      const book = books.find(b => b.id === bookId);
      if (!book) return;
      setCart([{ ...book, quantity: 1 }]);
      setView({ page: 'checkout' });
  };

  const renderPage = () => {
    switch (view.page) {
      case 'home': return <HomePage />;
      case 'all-products': return <ProductListPage />;
      case 'product': return <ProductDetailPage id={view.id} />;
      case 'author': return <AuthorPage id={view.id} />;
      case 'cart': return <CartPage />;
      case 'wishlist': return <WishlistPage />;
      case 'contact': return <ContactPage />;
      case 'search-results': return <SearchResultsPage query={view.query} />;
      case 'checkout': return <CheckoutPage />;
      case 'order-confirmation': return <OrderConfirmationPage />;
      case 'my-library': return <MyLibraryPage />;
      default: return <NotFoundPage />;
    }
  };

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const contextValue = { view, setView, cart, addToCart, updateCartQuantity, removeFromCart, wishlist, toggleWishlist, showToast, purchasedBooks, handlePurchase, lastOrder, handleBuyNow };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="bg-amber-50/50 min-h-screen font-sans">
        <Header />
        <main>{renderPage()}</main>
        <Footer />
        <BackToTopButton />
        <div aria-live="assertive" className={`pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 transition-all duration-300 ${toast.show ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            <div className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ${toast.show ? 'translate-y-0 sm:translate-x-0' : 'translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'}`}>
              <div className="p-4">
                <div className="flex items-start">
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-stone-900">{toast.message}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

