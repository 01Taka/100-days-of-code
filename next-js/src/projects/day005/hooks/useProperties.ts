import { useCallback, useState } from "react";
import { v7 as uuidv7 } from "uuid";
export const useProperties = () => {
  const [properties, setProperties] = useState<Record<string, Property>>({});

  const createNewProperty = useCallback((property: Omit<Property, "id">) => {
    const id = uuidv7();
    setProperties((prev) => ({
      ...prev,
      [id]: {
        id,
        ...property,
      },
    }));
  }, []);
};
