// src/hooks/useCategories.js
import { useState, useEffect } from "react";

export function useCategories() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    window.api.getCategories().then(setCats);
  }, []);
  return cats;
}