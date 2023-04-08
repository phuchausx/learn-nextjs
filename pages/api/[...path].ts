import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from 'http-proxy';

export const config = {
    api: {
        bodyParser: false,
    }
}

// Initialization proxyServer
const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    return new Promise((resolve) => {
        // don't send cookies while request to API server
        // set value cookie equal ''
        req.headers.cookie = ''

        // /api/students
        // https://js-post-api.herokuapp.com/api/students

        proxy.web(req, res, {
            target: 'https://js-post-api.herokuapp.com',
            changeOrigin: true,
            selfHandleResponse: false,
        })

        proxy.once('proxyRes', () => {
            resolve(true);
        })
    })
}
