import { writable } from 'svelte/store';

export let activeLocationName = new writable(null);

export const locationInformation = {
    'Ottawa': {
        'Mitel Networks': {
            location: 'Ottawa, Canada',
            logo: '/assets/logos/mitel.svg',
            header: 'Mitel Networks, Test Automation Engineer Intern',
            subheader: 'July 2019 — August 2019',
            description: 'Developed an end-to-end framework using Node.JS and Protractor to assist in the creation and execution of end-to-end tests, thus speeding up application iteration time. Developed automated end-to-end tests using the previously described framework to catch regressions and improve the quality of future releases.'
        },
        'Carleton University': {
            location: 'Ottawa, Canada',
            logo: '/assets/logos/carleton.svg',
            header: 'Carleton University, Bachelor of Computer Science, Honours, Co-op',
            subheader: 'September 2019 — Present',
            description: 'Overall CGPA: 11/12 (A). Concentration in algorithms and a minor in business.'
        },
        'cuHacking 2020': {
            location: 'Ottawa, Canada',
            logo: '/assets/logos/carleton.svg',
            header: 'cuHacking 2020, RBC Analytics Challenge Winner',
            subheader: 'January 2020',
            description: 'Planned, designed, and implemented a solution for tracking user sentiment around specific topics on Twitter to provide teams with a better understanding of public sentiment. Developed a frontend user interface with Angular to ensure simplicity and ease of use. Communicated effectively with a team of 3 other students to ensure quick development and MVP completion within 24 hours. https://devpost.com/software/cuhacking-2020-q7g5hd'
        },
        'Smarticle': {
            location: 'Ottawa, Canada',
            logo: '/assets/logos/smarticle.svg',
            header: 'Smarticle News',
            subheader: 'January 2019 — June 2019',
            description: 'Planned, designed, and developed a tool to aggregate and sort news articles based on story to simplify the lives of those who wish to understand the world around them. Developed the frontend and backend systems using the MEAN stack to further develop technical skills used in industry today.'
        }
    },
    'Toronto': {
        'Royal Bank of Canada': {
            location: 'Toronto, Canada',
            logo: '/assets/logos/rbc.svg',
            header: 'Royal Bank of Canada, Software Engineer Intern',
            subheader: 'May 2020 — August 2020',
            description: 'Planned and implemented a solution for tracking key performance indicators using Node.JS, SQL, and Azure to increase the effectiveness of decision making by team leaders. Developed APIs for virtual visa debit inquiry and application to improve the modularity of visa debit implementation. Thoroughly researched the viability of using the Elastic Stack to monitor PTB/CIS data for improved tracking and understanding of client trends across the bank.'
        },
        'Innovation Challenge': {
            location: 'Toronto, Canada',
            logo: '/assets/logos/rbc.svg',
            header: 'Royal Bank of Canada, Innovation Challenge Winner',
            subheader: 'May 2020 — August 2020',
            description: 'Planned and prototyped a density tracking solution to reduce the health risks associated with RBC’s back to work initiative. Worked effectively with a team of interns and collaborated with employees from teams such as privacy, risk, and security. Presented solution to multiple members of senior management and wrote a detailed handoff package for future use.'
        }
    },
    'Chertsey': {
        'Birthplace': {
            location: 'Chertsey, England',
            logo: '/assets/logos/england.svg',
            header: 'Birthplace',
            subheader: 'January 2002',
            description: 'Born on January 14, 2002 in Chertsey, England and moved to Ottawa, Canada in 2010. Currently possess dual British and Canadian citizenship.'
        }
    }
}