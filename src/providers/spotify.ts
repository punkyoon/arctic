import { TimeSpan, createDate } from "oslo";
import { OAuth2Client } from "oslo/oauth2";

import type { OAuth2ProviderWithPKCE } from "../index.js";

const authorizeEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";

export class Spotify implements OAuth2ProviderWithPKCE {
	private client: OAuth2Client;
	private scope: string[];

	constructor(
		clientId: string,
		redirectURI: string,
		options?: {
			scope?: string[];
		}
	) {
		this.client = new OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
			redirectURI
		});
		this.scope = options?.scope ?? [];
	}

	public async createAuthorizationURL(codeVerifier: string): Promise<URL> {
		return await this.client.createAuthorizationURL({
			codeVerifier,
			scope: this.scope
		});
	}

	public async validateAuthorizationCode(
		code: string,
		codeVerifier: string
	): Promise<SpotifyTokens> {
		const result = await this.client.validateAuthorizationCode<TokenResponseBody>(code, {
			codeVerifier
		});
		return {
			accessToken: result.access_token,
			refreshToken: result.refresh_token,
			accessTokenExpiresAt: createDate(new TimeSpan(result.expires_in, "s"))
		};
	}

	public async getUser(accessToken: string): Promise<SpotifyUser> {
		const response = await fetch("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: ["Bearer", accessToken].join(" ")
			}
		});
		return await response.json();
	}

	public async refreshAccessToken(refreshToken: string): Promise<SpotifyTokens> {
		const result = await this.client.refreshAccessToken<TokenResponseBody>(refreshToken);
		return {
			accessToken: result.access_token,
			refreshToken: result.refresh_token,
			accessTokenExpiresAt: createDate(new TimeSpan(result.expires_in, "s"))
		};
	}
}

interface TokenResponseBody {
	access_token: string;
	expires_in: number;
	refresh_token: string;
}

export interface SpotifyTokens {
	accessToken: string;
	refreshToken: string;
	accessTokenExpiresAt: Date;
}

export interface SpotifyUser {
	country?: string;
	display_name: string | null;
	email?: string;
	explicit_content: {
		filter_enabled?: boolean;
		filter_locked?: boolean;
	};
	external_urls: {
		spotify: string;
	};
	followers: {
		href: string | null;
		total: number;
	};
	href: string;
	id: string;
	images: [
		{
			url: string;
			height: number | null;
			width: number | null;
		}
	];
	product?: string;
	type: string;
	uri: string;
}
