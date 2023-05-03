export const dateTranformer = {
  to(value: Date | null) {
    return value;
  },
  from(value: Date | null) {
    if (value === null) return null;

    const date = new Date(value);

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
};