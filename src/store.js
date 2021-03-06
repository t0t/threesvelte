import { writable } from 'svelte/store';

export let activeLocationName = new writable(null);

export const locationInformation = {
    'Button1': {
        'bbbbb': {
            location: 'xxx',
            logo: '/assets/logos/logo.svg',
            header: 'ddd',
            subheader: 'ccc',
            description: 'xxx'
        },
        'ccccc': {
            location: 'xxx',
            logo: '/assets/logos/logo.svg',
            header: 'ddd',
            subheader: 'ccc',
            description: 'xxx'
        },
        'eeeee': {
            location: 'xxx',
            logo: '/assets/logos/logo.svg',
            header: 'ddd',
            subheader: 'ccc',
            description: 'xxx'
        },
        'fffff': {
            location: 'xxx',
            logo: '/assets/logos/logo.svg',
            header: 'ddd',
            subheader: 'ccc',
            description: 'xxx'
        }
    },
    'Button2': {
        'aaaaa': {
            location: 'xxx',
            logo: '/assets/logos/logo.svg',
            header: 'ddd',
            subheader: 'ccc',
            description: 'xxx'
        },
        'ddddd': {
            location: 'xxx',
            logo: '/assets/logos/logo.svg',
            header: 'ddd',
            subheader: 'ccc',
            description: 'xxx'
        }
    },
    'Button3': {
        'Birthplace': {
            location: 'xxx',
            logo: '/assets/logos/logo.svg',
            header: 'ddd',
            subheader: 'ccc',
            description: 'xxx'
        }
    }
}