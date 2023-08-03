/**
 * Replaces the placeholders in the given URL with the corresponding values from the params object and returns the formatted URL.
 *
 * @param {string} url - The URL with placeholders to be replaced.
 * @param {Record<string, string>} params - An object containing the values to replace the placeholders with.
 * @returns {string} The formatted URL with replaced placeholders.
 */
export const formatUrlWithParams = (
  url: string,
  params: Record<string, string>
): string => {
  let formattedUrl = url;
  Object.entries(params).forEach(([key, value]) => {
    formattedUrl = formattedUrl.replace(`:${key}`, value);
  });
  return formattedUrl;
};

/**
 * Formats a URL with query parameters.
 *
 * @param {string} url - The URL to format.
 * @param {object} params - The query parameters to include in the URL.
 * @param {boolean} asc - Determines if the query parameters should be sorted in ascending order.
 * @return {string} The formatted URL with the query parameters included.
 */
export const formatUrlWithQueryParams = (url, params, asc) => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const formattedUrl = `${url}?${queryParams}`;

  return asc ? `${formattedUrl}:${asc}` : formattedUrl;
};

export const formatUrlWithParamsAndQueryParams = (url, params) => {
  let formattedUrl = url;
  Object.entries(params).forEach(([key, value]) => {
    formattedUrl = formattedUrl.replace(`:${key}`, value);
  });
  const queryParams = Object.entries(params)
    .filter(([key]) => key === "query" || key === "page" || key === "expand")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  if (queryParams) formattedUrl = `${formattedUrl}?${queryParams}`;

  return formattedUrl;
};

/**
 * Executes a REST API request and returns the response as JSON.
 *
 * @param {object} params - The parameters for the API request.
 * @return {Promise<object>} The JSON response from the API.
 */
export const rest = async ({ ...params }) => {
  try {
    const response = await fetch(params?.url, {
      method: params?.method || "GET",
      headers: {
        origin: "dev",
        "Content-Type": "application/json",
      },
    });

    if ([401, 403, 500].includes(response.status)) {
      const error = await response.json();
      return { status: response.status, error };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error", error);
  }
};
