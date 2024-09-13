import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// provider is provider by which I have signed-in the user into my application

const backendUrl = process.env.NEXT_PUBLIC_API_KEY;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
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
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

// Handle GET and POST requests
// with this my server is read for authentification

// Correctly handle GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };




