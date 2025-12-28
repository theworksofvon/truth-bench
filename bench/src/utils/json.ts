export const stringify = (value: unknown, indent?: number): string => {
  return JSON.stringify(value, null, indent);
};

export const parse = (json: string): unknown => {
  try {
    return JSON.parse(json);
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error}`);
  }
};
