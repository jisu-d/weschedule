export let proxy = 'https://weschedule.kro.kr';
// export let proxy = 'http://0.0.0.0:3000';

if (import.meta.env.DEV) {
    proxy = '/api'
}