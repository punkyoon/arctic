export { Apple } from "./providers/apple.js";
export { Discord } from "./providers/discord.js";
export { Facebook } from "./providers/facebook.js";
export { Github } from "./providers/github.js";
export { Google } from "./providers/google.js";
export { Spotify } from "./providers/spotify.js";
export { Twitch } from "./providers/twitch.js";
export { Twitter } from "./providers/twitter.js";

export type {
	AppleCredentials,
	AppleIdTokenClaims,
	AppleRefreshedTokens,
	AppleTokens
} from "./providers/apple.js";
export type { DiscordTokens, DiscordUser } from "./providers/discord.js";
export type { FacebookTokens, FacebookUser } from "./providers/facebook.js";
export type {
	GithubTokens,
	GithubUser,
	PrivateGithubUser,
	PublicGithubUser
} from "./providers/github.js";
export type { GoogleRefreshedTokens, GoogleTokens, GoogleUser } from "./providers/google.js";
export type { SpotifyTokens, SpotifyUser } from "./providers/spotify.js";
export type { TwitchTokens, TwitchUser } from "./providers/twitch.js";
export type { TwitterTokens, TwitterUser } from "./providers/twitter.js";

export { generateCodeVerifier, generateState, verifyState, OAuth2RequestError } from "oslo/oauth2";
