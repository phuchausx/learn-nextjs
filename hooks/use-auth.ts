import { authApi } from '@/api-client';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';

export function useAuth (options?: Partial<PublicConfiguration>) {
    const { data: profile, error, mutate } = useSWR(`/profile`, null, {
        // Khi tab B về lại tab A sẽ không call API
        revalidateOnFocus: false,
        // sau boa nhiêu thời gian đó sẽ call lại API
        dedupingInterval: 60 * 60 * 1000,
        ...options,
    })

    const firstLoading = profile === undefined && error === undefined;

    const login = async () => {
        await authApi.login({
            username: 'test1',
            password: '123123',
        })
        // sẽ giúp gọi lại api /profile
        await mutate();
    }

    const logout = async () => {
        await authApi.logout()
        // {} set value là object rỗng và không gọi lại api /profile
        await mutate({}, false);
    }

    return {
        profile,
        error,
        firstLoading,
        login,
        logout,
    }
}
