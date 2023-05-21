export const dateTranformer = {
  to(value: Date | null) {
    return value;
  },
  from(value: Date | null) {
    if (value === null) return null;

    const date = new Date(value);
    const lacaleDate = date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
    const localeTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return `${lacaleDate} ${localeTime}`;
  }
};