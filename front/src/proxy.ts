export let proxy = 'http://18.216.49.251:3000';

if (import.meta.env.DEV) {
    proxy = '/api'
}