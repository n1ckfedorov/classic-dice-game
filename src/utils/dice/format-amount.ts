export const formatAmount = (value: string) => {
  const sanitizedValue = value.replace(/[^0-9.]/g, '');

  return sanitizedValue;
};
