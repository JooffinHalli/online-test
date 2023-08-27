/** для работы с css классами */
export const cn = (...classes: (string | false)[]) => classes.filter(Boolean).join(' ');