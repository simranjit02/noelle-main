import { useState, useEffect, useCallback } from "react";

const GUEST_CART_KEY = "noelle_guest_cart";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get current user info
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userId = localStorage.getItem("userId");

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, [isLoggedIn, userId]);

  // Load cart from appropriate source
  const loadCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (isLoggedIn && userId) {
        // Fetch cart from database for logged-in user
        const response = await fetch(
          `${API_URL}/cart/get.php?user_id=${userId}`,
        );
        const data = await response.json();

        if (data.status === "success") {
          setCart(data.data || []);
        } else {
          setError(data.message);
        }
      } else {
        // Load cart from localStorage for guest user
        const guestCart = localStorage.getItem(GUEST_CART_KEY);
        if (guestCart) {
          setCart(JSON.parse(guestCart));
        } else {
          setCart([]);
        }
      }
    } catch (err) {
      setError(`Error loading cart: ${err.message}`);
      console.error("Error loading cart:", err);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, userId]);

  // Add product to cart
  const addToCart = useCallback(
    async (product) => {
      try {
        setError(null);

        if (isLoggedIn && userId) {
          // Add to database cart
          const response = await fetch(`${API_URL}/cart/add.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: userId,
              product_id: product.id,
              quantity: product.quantity || 1,
            }),
          });

          const data = await response.json();

          if (data.status === "success") {
            await loadCart(); // Refresh cart
            return { success: true, message: data.message };
          } else {
            setError(data.message);
            return { success: false, message: data.message };
          }
        } else {
          // Add to localStorage cart
          const existingProduct = cart.find(
            (item) => item.product_id === product.id,
          );

          let updatedCart;
          if (existingProduct) {
            // Update quantity if product exists
            updatedCart = cart.map((item) =>
              item.product_id === product.id
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item,
            );
          } else {
            // Add new product
            updatedCart = [
              ...cart,
              {
                product_id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
                quantity: product.quantity || 1,
              },
            ];
          }

          setCart(updatedCart);
          localStorage.setItem(GUEST_CART_KEY, JSON.stringify(updatedCart));
          return { success: true, message: "Added to cart" };
        }
      } catch (err) {
        const message = `Error adding to cart: ${err.message}`;
        setError(message);
        return { success: false, message };
      }
    },
    [isLoggedIn, userId, cart, loadCart],
  );

  // Remove product from cart
  const removeFromCart = useCallback(
    async (productId) => {
      try {
        setError(null);

        if (isLoggedIn && userId) {
          // Remove from database cart
          const response = await fetch(`${API_URL}/cart/remove.php`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: userId,
              product_id: productId,
            }),
          });

          const data = await response.json();

          if (data.status === "success") {
            await loadCart(); // Refresh cart
            return { success: true, message: data.message };
          } else {
            setError(data.message);
            return { success: false, message: data.message };
          }
        } else {
          // Remove from localStorage cart
          const updatedCart = cart.filter(
            (item) => item.product_id !== productId,
          );
          setCart(updatedCart);
          localStorage.setItem(GUEST_CART_KEY, JSON.stringify(updatedCart));
          return { success: true, message: "Removed from cart" };
        }
      } catch (err) {
        const message = `Error removing from cart: ${err.message}`;
        setError(message);
        return { success: false, message };
      }
    },
    [isLoggedIn, userId, cart, loadCart],
  );

  // Update product quantity
  const updateQuantity = useCallback(
    async (productId, newQuantity) => {
      try {
        setError(null);

        if (newQuantity < 1) {
          return removeFromCart(productId);
        }

        if (isLoggedIn && userId) {
          // Update in database cart
          const response = await fetch(`${API_URL}/cart/update.php`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: userId,
              product_id: productId,
              quantity: newQuantity,
            }),
          });

          const data = await response.json();

          if (data.status === "success") {
            await loadCart(); // Refresh cart
            return { success: true, message: data.message };
          } else {
            setError(data.message);
            return { success: false, message: data.message };
          }
        } else {
          // Update in localStorage cart
          const updatedCart = cart.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: newQuantity }
              : item,
          );
          setCart(updatedCart);
          localStorage.setItem(GUEST_CART_KEY, JSON.stringify(updatedCart));
          return { success: true, message: "Quantity updated" };
        }
      } catch (err) {
        const message = `Error updating quantity: ${err.message}`;
        setError(message);
        return { success: false, message };
      }
    },
    [isLoggedIn, userId, cart, loadCart, removeFromCart],
  );

  // Merge guest cart to user cart (called after login)
  const mergeGuestCartToUser = useCallback(async () => {
    try {
      setError(null);

      const guestCart = localStorage.getItem(GUEST_CART_KEY);

      if (guestCart && isLoggedIn && userId) {
        const guestItems = JSON.parse(guestCart);

        if (guestItems.length > 0) {
          const response = await fetch(`${API_URL}/cart/merge.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: userId,
              items: guestItems,
            }),
          });

          const data = await response.json();

          if (data.status === "success") {
            // Clear guest cart from localStorage
            localStorage.removeItem(GUEST_CART_KEY);
            // Reload cart from database
            await loadCart();
            return {
              success: true,
              message: data.message,
              merged: data.merged_count,
            };
          }
        }
      }
      return { success: true, message: "No guest cart to merge" };
    } catch (err) {
      const message = `Error merging cart: ${err.message}`;
      setError(message);
      return { success: false, message };
    }
  }, [isLoggedIn, userId, loadCart]);

  // Get cart statistics
  const getCartStats = useCallback(() => {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      itemCount,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      itemsCount: cart.length,
    };
  }, [cart]);

  // Clear entire cart
  const clearCart = useCallback(async () => {
    try {
      setError(null);

      if (isLoggedIn && userId) {
        // Delete all items from database (would need a clear endpoint)
        // For now, just reload empty
        setCart([]);
      } else {
        setCart([]);
        localStorage.removeItem(GUEST_CART_KEY);
      }
      return { success: true, message: "Cart cleared" };
    } catch (err) {
      const message = `Error clearing cart: ${err.message}`;
      setError(message);
      return { success: false, message };
    }
  }, [isLoggedIn, userId]);

  return {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    mergeGuestCartToUser,
    getCartStats,
    clearCart,
    loadCart,
    isLoggedIn,
  };
};

export default useCart;
