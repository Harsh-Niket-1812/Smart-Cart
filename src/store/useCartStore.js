import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);
        
        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
      },
      
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      
      getSubtotal: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      
      getDiscountTotal: () => {
        const subtotal = get().getSubtotal();
        // Mock AI discount logic
        return subtotal > 500 ? subtotal * 0.1 : 0;
      },
      
      getTax: () => (get().getSubtotal() - get().getDiscountTotal()) * 0.08,
      
      getShipping: () => {
        const total = get().getSubtotal();
        return total > 200 ? 0 : 15;
      },
      
      getTotal: () => {
        return get().getSubtotal() - get().getDiscountTotal() + get().getTax() + get().getShipping();
      }
    }),
    {
      name: 'smart-cart-storage',
    }
  )
);
