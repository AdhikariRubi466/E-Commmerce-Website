import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      const exists = state.items.find(i => i.id === action.payload.id);
      return {
        ...state,
        items: exists
          ? state.items.filter(i => i.id !== action.payload.id)
          : [...state.items, action.payload],
      };
    default:
      return state;
  }
};

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] }, (init) => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state));
  }, [state]);

  const toggleWishlist = (product) => dispatch({ type: 'TOGGLE', payload: product });
  const isWishlisted = (id) => state.items.some(i => i.id === id);

  return (
    <WishlistContext.Provider value={{ items: state.items, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
