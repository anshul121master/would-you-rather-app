export const DATA_LOADED = 'DATA_LOADED';

export function setLoading(loading) {
  return {
    type: DATA_LOADED,
    loading
  };
}