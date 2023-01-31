export interface ApiListResponse<T>{
    data: {
        entities: T[],
        total: number,
    },
    success: boolean,
}