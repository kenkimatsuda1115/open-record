import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * 認証プロバイダーを設定する
 * TODO: 認証のパスワードやユーザー名をDBからセキュアに取得するようにする
 * FIXME: ユーザー名とパスワードをハードコーディングしている
 */
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const user = { id: "1", name: credentials.username };
        if (
          credentials.username === "bbbb" &&
          credentials.password === "gadaas"
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/signUp",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
