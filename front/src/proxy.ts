export let proxy = 'https://weschedule.kro.kr';

if (import.meta.env.DEV) {
    proxy = '/api'
}