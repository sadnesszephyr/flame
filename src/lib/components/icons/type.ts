import * as icons from './';

export type IconComponent = (typeof icons)[keyof typeof icons];
