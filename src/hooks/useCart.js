import { useState, useEffect, useCallback, useRef } from "react";

const GUEST_CART_KEY = "noelle_guest_cart";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userId = localStorage.getItem("userId");
  const loadCartRef = useRef(null);

  // Helper to extract price as number
  const getPriceAsNumber = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      return parseFloat(price.replace("$", "").replace(",", "")) || 0;
    }
    return 0;
  };

  // Load cart from appropriate source  - wrapped in useCallback with empty deps to keep it stable
  const loadCart = useCallback(async () => {
    const isUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const currentUserId = localStorage.getItem("userId");

    setLoading(true);
    setError(null);

    try {
      if (isUserLoggedIn && currentUserId) {
        const response = await fetch(
          `${API_URL}/cart/get.php?user_id=${currentUserId}`,
        );
        const data = await response.json();
        console.log("Cart API response:", data); // Debug

        if (data.status === "success") {
          setCart(data.data || []);
          console.log("Cart loaded:", data.data); // Debug
        } else {
          setError(data.message);
          setCart([]);
        }
      } else {
        const guestCart = localStorage.getItem(GUEST_CART_KEY);
        if (guestCart) {
          try {
            setCart(JSON.parse(guestCart));
          } catch (e) {
            console.error("Error parsing guest cart:", e);
            setCart([]);
          }
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
  }, []);

  // Store loadCart in ref for use in other callbacks - keep this stable
  useEffect(() => {
    loadCartRef.current = loadCart;
  }, [loadCart]);

  // Load cart on mount and when user login state changes
  useEffect(() => {
    if (loadCartRef.current) {
      loadCartRef.current();
    }
  }, [isLoggedIn, userId]);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      console.log("Cart update event received, refreshing...");
      if (loadCartRef.current) {
        loadCartRef.current();
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  // Add product to cart
  const addToCart = useCallback(
    async (product) => {
      try {
        setError(null);

        if (!product || !product.id) {
          return { success: false, message: "Invalid product data" };
        }

        if (isLoggedIn && userId) {
          // Add to database cart
          const response = await fetch(`${API_URL}/cart/add.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: userId,
              product_id: String(product.id),
              quantity: parseInt(product.quantity) || 1,
            }),
          });

          const data = await response.json();

          if (data.status === "success") {
            if (loadCartRef.current) await loadCartRef.current();
            window.dispatchEvent(new Event("cartUpdated"));
            return { success: true, message: "Product added to cart!" };
          } else {
            return {
              success: false,
              message: data.message || "Failed to add to cart",
            };
          }
        } else {
          // Add to localStorage cart
          const existingProduct = cart.find(
            (item) => String(item.product_id) === String(product.id),
          );

          let updatedCart;
          if (existingProduct) {
            updatedCart = cart.map((item) =>
              String(item.product_id) === String(product.id)
                ? {
                    ...item,
                    quantity: item.quantity + (parseInt(product.quantity) || 1),
                  }
                : item,
            );
          } else {
            updatedCart = [
              ...cart,
              {
                product_id: product.id,
                name: product.name,
                price: getPriceAsNumber(product.price),
                img: product.img,
                quantity: parseInt(product.quantity) || 1,
              },
            ];
          }

          setCart(updatedCart);
          localStorage.setItem(GUEST_CART_KEY, JSON.stringify(updatedCart));
          window.dispatchEvent(new Event("cartUpdated"));
          return { success: true, message: "Product added to cart!" };
        }
      } catch (err) {
        const message = `Error adding to cart: ${err.message}`;
        setError(message);
        console.error("Error in addToCart:", err);
        return { success: false, message };
      }
    },
    [isLoggedIn, userId, cart],
  );

  // Remove product from cart
  const removeFromCart = useCallback(
    async (productId) => {
      try {
        setError(null);

        if (isLoggedIn && userId) {
          const response = await fetch(`${API_URL}/cart/remove.php`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: userId,
              product_id: String(productId),
            }),
          });

          const data = await response.json();

          if (data.status === "success") {
            if (loadCartRef.current) await loadCartRef.current();
            window.dispatchEvent(new Event("cartUpdated"));
            return { success: true, message: data.message };
          } else {
            setError(data.message);
            return { success: false, message: data.message };
          }
        } else {
          const updatedCart = cart.filter(
            (item) => String(item.product_id) !== String(productId),
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
    [isLoggedIn, userId, cart],
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
          const response = await fetch(`${API_URL}/cart/update.php`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: userId,
              product_id: String(productId),
              quantity: parseInt(newQuantity),
            }),
          });

          const data = await response.json();

          if (data.status === "success") {
            if (loadCartRef.current) await loadCartRef.current();
            window.dispatchEvent(new Event("cartUpdated"));
            return { success: true, message: data.message };
          } else {
            setError(data.message);
            return { success: false, message: data.message };
          }
        } else {
          const updatedCart = cart.map((item) =>
            String(item.product_id) === String(productId)
              ? { ...item, quantity: parseInt(newQuantity) }
              : item,
          );
          setCart(updatedCart);
          localStorage.setItem(GUEST_CART_KEY, JSON.stringify(updatedCart));
          window.dispatchEvent(new Event("cartUpdated"));
          return { success: true, message: "Quantity updated" };
        }
      } catch (err) {
        const message = `Error updating quantity: ${err.message}`;
        setError(message);
        return { success: false, message };
      }
    },
    [isLoggedIn, userId, cart, removeFromCart],
  );

  // Merge guest cart to user cart
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
            localStorage.removeItem(GUEST_CART_KEY);
            if (loadCartRef.current) await loadCartRef.current();
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
  }, [isLoggedIn, userId]);

  // Get cart statistics
  const getCartStats = useCallback(() => {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => {
      const price = getPriceAsNumber(item.price);
      return sum + price * item.quantity;
    }, 0);

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
      setCart([]);
      localStorage.removeItem(GUEST_CART_KEY);
      return { success: true, message: "Cart cleared" };
    } catch (err) {
      const message = `Error clearing cart: ${err.message}`;
      setError(message);
      return { success: false, message };
    }
  }, []);

  return {
    cart,
    loading,
    error,
    isLoggedIn,
    userId,
    addToCart,
    removeFromCart,
    updateQuantity,
    mergeGuestCartToUser,
    getCartStats,
    clearCart,
    loadCart,
  };
};

export default useCart;
