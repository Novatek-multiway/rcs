declare type PromiseResult<T> = T extends Promise<infer R> ? R : T
