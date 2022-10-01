type Nullable<T> = T | null;

export type WithNullable<T> = {
    [key in keyof T]: Nullable<T[key]>;
}

export default Nullable;