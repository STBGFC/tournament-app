export const baseUrl = "http://192.168.21.100:4001";

async function send({ method, path, data, token }) {
    const opts = { method, headers: {} };

    if (data) {
        opts.headers["Content-Type"] = "application/json";
        opts.body = JSON.stringify(data);
    }

    if (token) {
        opts.headers["Authorization"] = `Token ${token}`;
    }

    let res = await fetch(`${baseUrl}/${path}`, opts);
    let json = await res.json();
    return json;
}

export function get(path, token) {
    return send({ method: "GET", path, token });
}

export function del(path, token) {
    return send({ method: "DELETE", path, token });
}

export function post(path, data, token) {
    return send({ method: "POST", path, data, token });
}

export function put(path, data, token) {
    return send({ method: "PUT", path, data, token });
}
