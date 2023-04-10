import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from 'http-proxy';
import Cookies from "cookies";

export const config = {
    api: {
        bodyParser: false,
    }
}

// Initialization proxyServer
const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method !== 'POST') {
        res.status(404).json({ message: 'method not supported' })
    }

    const cookies = new Cookies(req, res);
    // Bạn remove cookies bằng cách không set giá trị
    cookies.set('access_token')

    res.status(200).json({ message: 'logout successfully' })
}
