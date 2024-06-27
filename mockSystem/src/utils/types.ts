export type OptionalField<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
export type RequireField<T, K extends keyof T> = Partial<Pick<T, Exclude<keyof T, K>>> & Pick<T, K>;
