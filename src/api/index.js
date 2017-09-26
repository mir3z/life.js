export default function createApi(fetch) {

    const get = (url, { type = "json" } = {}) => fetch(url, { method: "GET" })
        .then(response => {
            return response[type]()
                .catch(() => ({ response }))
                .then(result => {
                    if (response.ok) {
                        return result;
                    } else {
                        return Promise.reject({ status: response.status });
                    }
                });
        });

    return {
        fetchLibrary: () => get("library.json"),
        readPattern: (filename) => get(`patterns/${ filename }`, { type: "blob" })
    };
}