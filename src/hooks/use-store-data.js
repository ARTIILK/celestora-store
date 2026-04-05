import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/routes";
import { mockData } from "@/lib/mockData";

// Safe JSON parser with logging for debugging
function parseWithLogging(schema, data, label) {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    return data; // Return original data as fallback if validation fails, just in case
  }
  return result.data;
}

export function useSiteConfig() {
  return useQuery({
    queryKey: [api.config.site.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.config.site.path, { credentials: "include" });
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        return parseWithLogging(api.config.site.responses[200], data, "Site Config");
      } catch (err) {
        console.warn("Using mock site config data:", err.message);
        return mockData.siteConfig;
      }
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: [api.config.categories.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.config.categories.path, { credentials: "include" });
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        return parseWithLogging(api.config.categories.responses[200], data, "Categories");
      } catch (err) {
        console.warn("Using mock categories data:", err.message);
        return mockData.categories;
      }
    },
  });
}

export function useProducts() {
  return useQuery({
    queryKey: [api.config.products.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.config.products.path, { credentials: "include" });
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        return parseWithLogging(api.config.products.responses[200], data, "Products");
      } catch (err) {
        console.warn("Using mock products data:", err.message);
        return mockData.products;
      }
    },
  });
}
