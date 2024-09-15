import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const backendUrl = process.env.NEXT_PUBLIC_API_KEY; 

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // Send user data to your Express backend
        const response = await fetch(`${backendUrl}/api/auth/callback/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
          }),
        });

        if (!response.ok) {
          console.error('Failed to create/update user in backend');
          return false;
        }
        return true;
      } catch (error) {
        // Handle fetch error
        console.error('Error during signIn callback:', error);
        return false; // Return false to prevent sign-in
      }
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

// Correctly handle GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
