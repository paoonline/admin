export const searchArray = <T>(data: Array<T>, text: string, keys?: Array<keyof T>) => {
    const dataFilter = data.filter((item) => {
      if (typeof item == 'string' && item.toLowerCase().includes(text.toLowerCase())) {
        return item;
      } else if (typeof item === 'object') {
        if (item) {
          if (keys) {
            for (const key of keys) {
              const strValue = String(item[key]);
              if (strValue.toLowerCase().includes(text.toLowerCase())) {
                return item;
              }
            }
          } else {
            for (const [, value] of Object.entries(item)) {
              const strValue = String(value);
              if (strValue.toLowerCase().includes(text.toLowerCase())) {
                return item;
              }
            }
          }
        }
      }
    });
    return dataFilter;
  };
  