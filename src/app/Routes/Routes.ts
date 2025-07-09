export const RoutePaths = {
  // Core Routes
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  HOME: '/home',

  // User-related Routes
  PROFILE: '/profile',
  USER_DETAILS: '/user-details',

  // Organization-related Routes
  ORGANIZATION_DETAILS: '/organization-details',

  ORGANIZATION_PROFILE:'organization-profile',

  /**
   * Generates a dynamic route path for a user's details page.
   * @param id The unique identifier of the user.
   * @returns The complete route string, e.g., '/user-details/123'.
   */
  userDetails: (id: string): string => `/user-details/${id}`,
};