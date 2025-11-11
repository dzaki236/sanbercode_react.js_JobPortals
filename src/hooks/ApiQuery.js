import { useEffect, useState, useCallback } from "react";

export default function ApiQuery(key, fetchFn, options = {}) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    const fetchData = useCallback(async () => {
        setIsFetching(true);
        setError(null);
        try {
            const result = await fetchFn();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
            setIsFetching(false);
        }
    }, [fetchFn]);

    useEffect(() => {
        fetchData();
    }, [key, fetchData]);

    return {
        data,
        error,
        isLoading,
        isFetching,
        refetch: fetchData,
    };
}
