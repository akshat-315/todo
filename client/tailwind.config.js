/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/flowbite/**/*.js'
    ],
    theme: {
        extend: {
            fontFamily: {
                jersey: ['"Jersey 20"', 'cursive']
            }
        }
    },
    plugins: [require('flowbite/plugin')]
};
