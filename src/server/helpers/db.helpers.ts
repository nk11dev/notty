export const formatColumnTime = (col: string) => `to_char(${col}::timestamptz, 'yyyy-mm-dd HH24:MI:SS') as ${col}`;