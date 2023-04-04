// src/types/tailwind-rn.d.ts
declare module 'tailwind-rn' {
  const create: (config: object) => (className: string) => any;
  export default create;
}
