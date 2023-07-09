export const entityDateTranformer = {
  to(value: Date | null) {
    return value;
  },
  from(value: Date | null) {
    if (value === null) return null;

    const date = new Date(value);
    const lacaleDate = date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
    const localeTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return `${lacaleDate} ${localeTime}`;
  }
};

export const sqlDateTranformer = (col: string) => `to_char(${col}::timestamptz, 'yyyy-mm-dd HH24:MI:SS') as ${col}`;