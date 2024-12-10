import { typescale } from './themes/tokens';
import type { Type, Typescale, TypescaleKey } from '../types';

export const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '400' as '400',
    },
    medium: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '500' as '500',
    },
    light: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300' as '300',
    },
    thin: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '100' as '100',
    },
  },
  ios: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400' as '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300' as '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100' as '100',
    },
  },
  default: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal' as 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal' as 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal' as 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal' as 'normal',
    },
  },
};

type FontsConfig =
  | {
      [key in TypescaleKey]: Partial<Type>;
    }
  | {
      [key: string]: Type;
    }
  | Partial<Type>;

function configureV3Fonts(
  config: FontsConfig
): Typescale | (Typescale & { [key: string]: Type }) {
  if (!config) {
    return typescale;
  }

  const isFlatConfig = Object.keys(config).every(
    (key) => typeof config[key as keyof typeof config] !== 'object'
  );

  if (isFlatConfig) {
    return Object.fromEntries(
      Object.entries(typescale).map(([variantName, variantProperties]) => [
        variantName,
        { ...variantProperties, ...config },
      ])
    ) as Typescale;
  }

  return Object.assign(
    {},
    typescale,
    ...Object.entries(config).map(([variantName, variantProperties]) => ({
      [variantName]: {
        ...typescale[variantName as TypescaleKey],
        ...variantProperties,
      },
    }))
  );
}

// eslint-disable-next-line no-redeclare
export default function configureFonts(params?: {
  config?: Partial<Type>;
}): Typescale;
// eslint-disable-next-line no-redeclare
export default function configureFonts(params?: {
  config?: Partial<Record<TypescaleKey, Partial<Type>>>;
}): Typescale;
// eslint-disable-next-line no-redeclare
export default function configureFonts(params: {
  config: Record<string, Type>;
}): Typescale & { [key: string]: Type };
// eslint-disable-next-line no-redeclare
export default function configureFonts(params?: any) {
  const { config } = params || {};

  console.log(configureV3Fonts(config))

  return configureV3Fonts(config);
}
