export default function createApi(fetch) {

    const get = (url) => fetch(url, { method: "GET" })
        .then(response => {
            return response.json()
                .catch(() => ({ response }))
                .then(json => {
                    if (response.ok) {
                        return json;
                    } else {
                        return Promise.reject({ status: response.status });
                    }
                });
        });

    return {
        fetchLibrary: () => get("library.json")
    }
}