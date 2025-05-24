// composables/useCart.js


export function useCart() {
  const addToCart = async (productId) => {
    const accessToken = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user");

    if (!accessToken || !userId) {
      console.error("Tizimga kirilmagan yoki foydalanuvchi aniqlanmagan");
      return false;
    }

    try {
      // Hozirgi foydalanuvchining barcha cartItems'larini olish
      const res = await fetch(`${BASE_URL}cartItems/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const allItems = await res.json();
      const existingItem = allItems.find(
        (item) => item.product === productId && item.profile === parseInt(userId)
      );

      if (existingItem) {
        // Mavjud bo‘lsa, miqdorini oshiramiz
        const updated = await fetch(`${BASE_URL}cartItems/${existingItem.id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            amount: existingItem.amount + 1,
          }),
        });

        if (!updated.ok) throw new Error("Miqdor yangilanmadi");
        return true;
      }

      // Agar topilmasa, yangi item qo‘shamiz
      const created = await fetch(`${BASE_URL}cartItems/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          amount: 1,
          product: productId,
          profile: parseInt(userId),
        }),
      });

      if (!created.ok) throw new Error("Yangi mahsulot qo‘shilmadi");
      return true;
    } catch (error) {
      console.error("Savatga mahsulot qo‘shishda xatolik:", error);
      return false;
    }
  };

  return {
    addToCart,
  };
}
