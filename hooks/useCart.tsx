"use client";

import { CardProductProps } from "@/app/components/detail/DetailClient";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface CardContextProps {
  productCartQty: number;
  addToBasket: (product: CardProductProps) => void;
  removeFromCart: (product: CardProductProps) => void;
  removeCart: () => void;
  cartPrdcts: CardProductProps[] | null;
  addtoBasketIncrease: (product: CardProductProps) => void
  addtoBasketDecrease: (product: CardProductProps) => void
  isReady: boolean
}

const CardContext = createContext<CardContextProps | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [productCartQty, setproductCartQty] = useState(0);
  const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[]>([]);
  const [isReady, setIsReady] = useState(false);


  useEffect(() => {
  const getItem = localStorage.getItem("card");
  const getItemParse: CardProductProps[] = JSON.parse(getItem || "[]");
  setCartPrdcts(getItemParse);
  setIsReady(true);
}, []);


  const addtoBasketIncrease = useCallback(
    (product: CardProductProps) => {
      let updatedCart;
      if(product.quantity== 10){
        return toast.error('Daha fazla ürün ekleyemezsin...')
      }
      if(cartPrdcts){
        updatedCart = [...cartPrdcts]
        const existingItem = cartPrdcts.findIndex(item => item.id === product.id)

        if(existingItem > -1){
          updatedCart[existingItem].quantity = ++updatedCart[existingItem].quantity
        }
        setCartPrdcts(updatedCart)
        localStorage.setItem("card", JSON.stringify(updatedCart));
      }
    }, [cartPrdcts] )

    const addtoBasketDecrease = useCallback(
    (product: CardProductProps) => {
      let updatedCart;
      if(product.quantity== 1){
        return
      }
      if(cartPrdcts){
        updatedCart = [...cartPrdcts]
        const existingItem = cartPrdcts.findIndex(item => item.id === product.id)

        if(existingItem > -1){
          updatedCart[existingItem].quantity = --updatedCart[existingItem].quantity
        }
        setCartPrdcts(updatedCart)
        localStorage.setItem("card", JSON.stringify(updatedCart));
      }
    }, [cartPrdcts] )

  const removeCart = useCallback(() => {
    setCartPrdcts([]);
    toast.success("Sepet Temizlendi...");
    localStorage.setItem("card", JSON.stringify(null));
  }, []);

  const addToBasket = useCallback(
    (product: CardProductProps) => {
      setCartPrdcts((prev) => {
        let updatedCart;
        if (prev) {
          updatedCart = [...prev, product];
        } else {
          updatedCart = [product];
        }
        localStorage.setItem("card", JSON.stringify(updatedCart));
        return updatedCart;
      });
      toast.success("Ürün Sepete Eklendi...", { removeDelay: 2000 });
    },
    [cartPrdcts]
  );

  const removeFromCart = useCallback(
    (product: CardProductProps) => {
      if (cartPrdcts) {
        const filteredProducts = cartPrdcts.filter(
          (cart) => cart.id !== product.id
        );
        setCartPrdcts(filteredProducts);
        toast.success("Ürün Sepetten Kaldırıldı...",{ removeDelay: 500 });
        localStorage.setItem("card", JSON.stringify(filteredProducts));
      }
    },
    [cartPrdcts]
  );

  let value = {
    productCartQty,
    addToBasket,
    cartPrdcts,
    removeFromCart,
    removeCart,
    addtoBasketIncrease,
    addtoBasketDecrease,
    isReady
  };
  return <CardContext.Provider value={value} {...props} />;
};

const UseCart = () => {
  const context = useContext(CardContext);
  if (context == null) {
    throw new Error("Bir hata durumu mevcut");
  }
  return context;
};

export default UseCart;
