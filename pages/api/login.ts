import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from "cookies";

type Data = {
    message: string;
}

export const config = {
    api: {
        bodyParser: false,
    }
}

// Initialization proxyServer
const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    return new Promise((resolve) => {
        // Check method
        if (req.method !== 'POST') {
            return res.status(404).json({ message: 'method not supported' })
        }

        // don't send cookies while request to API server
        req.headers.cookie = ''

        const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
            let body = '';
            // data là lúc đang trả dữ liệu về
            proxyRes.on('data' , (chunk) => {
                body += chunk
            })

            // end là lúc đã hoàn thành quá trình trả về data
            proxyRes.on('end', () => {
                try {
                    const { accessToken, expiredAt } = JSON.parse(body);
                    
                    // yarn add cookies , yarn add --dev @types/cookies
                    const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
                    cookies.set('access_token', accessToken, {
                        httpOnly: true,
                        sameSite: 'lax',
                        expires: new Date(expiredAt),
                    });

                    (res as NextApiResponse).status(200).json({ message: 'Login successfully' })
                } catch (error) {
                    (res as NextApiResponse).status(500).json({ message: 'Something went wrong' })
                }
            })
        }

        proxy.once('proxyRes', handleLoginResponse)

        proxy.web(req, res, {
            target: 'https://js-post-api.herokuapp.com',
            changeOrigin: true,
            // Chuyển đổi thành true vì chúng ta đang muốn xử lý token đc trả về từ Server
            selfHandleResponse: true,
        })
    })
}
