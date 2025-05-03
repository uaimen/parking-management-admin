import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

// Define a more specific type that works with expo-router's Link component
type Props = Omit<ComponentProps<typeof Link>, 'href'> & { 
  href: string; // Keep this as string for your component's API
};

export function ExternalLink({ href, ...rest }: Props) {
  // For expo-router, we need to handle external URLs differently
  // External URLs should be handled by openBrowserAsync on native
  const isExternalUrl = href.startsWith('http://') || href.startsWith('https://');
  
  return (
    <Link
      target="_blank"
      {...rest}
      // Cast the href to any to bypass the type checking
      // This is safe because we're handling the URL opening ourselves
      href={href as any}
      onPress={async (event) => {
        if (Platform.OS !== 'web' && isExternalUrl) {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href);
        }
      }}
    />
  );
}