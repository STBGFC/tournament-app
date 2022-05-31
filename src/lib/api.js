import { io } from "socket.io-client";
import { browser } from "$app/env";
import * as stores from "$lib/stores";

export const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const get = (path, token) => {
    return send({ method: "GET", path, token });
};

export const del = (path, token) => {
    return send({ method: "DELETE", path, token });
};

export const post = (path, data, token) => {
    return send({ method: "POST", path, data, token });
};

export const put = (path, data, token) => {
    return send({ method: "PUT", path, data, token });
};

const send = async ({ method, path, data, token }) => {
    const opts = { method, headers: {} };

    if (data) {
        opts.headers["Content-Type"] = "application/json";
        opts.body = JSON.stringify(data);
    }

    if (token) {
        opts.headers["Authorization"] = `Bearer ${token}`;
    }

    let res = await fetch(`${baseUrl}/${path}`, opts);
    let json = await res.json();
    return json;
};

const initSocket = async () => {
    let socket = io(baseUrl, { "connect timeout": 5000 });

    socket.on("connect", () => {
        console.log("socket created with ID:", socket.id);
    });

    socket.on("result", (data) => {
        console.debug("Received result", data);
        stores.results.update((r) => {
            for (let i = 0; i < r.length; i++) {
                if (r[i]._id == data._id) {
                    r[i] = data;
                    break;
                }
            }
            return r;
        });
    });

    socket.on("remove", (data) => {
        console.debug("Result deleted", data);
        // TODO implement
    });

    socket.on("news", (data) => {
        console.debug("Received news", data);
        // TODO implement
    });

    socket.on("connect_error", (error) => {
        console.error("Failed to connect", error);
    });

    socket.on("error", (error) => {
        console.error("Error on socket", error);
    });
};

if (browser) {
    initSocket();
}
