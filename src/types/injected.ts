// Theme names used in '@/plugins/vuetify.ts'
export type ThemeNames = 'colorblindDark' | 'dark' | 'colorblindLight' | 'light';

// Functions describe in '@/views/App.vue', use those types when injecting them into sub-components
export type GetTheme = () => boolean
export type SetTheme = (value: boolean) => void

// determines to display whether or not the navbar
export type GetLogo = () => string
