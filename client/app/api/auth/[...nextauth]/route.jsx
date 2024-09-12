import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// provider is provider by which I have signed-in the user into my application

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // This callback ensures that you redirect to the correct base URL
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

// Handle GET and POST requests
// with this my server is read for authentification

// Correctly handle GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

////




