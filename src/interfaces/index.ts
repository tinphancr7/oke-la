export interface IHotMatch {
	matchId: string;
	status: number;
	homeName: string;
	awayName: string;
	homeIcon: string;
	awayIcon: string;
	homeScore: number;
	awayScore: number;
	leagueName: string;
	matchTime: number;
	halfStartTime: number;
	location: string;
	leagueId?: string;
	homeId?: number;
	awayId?: number;
	weather?: string;
	leagueType?: string;
	temperature?: string;
}

export interface IBreadcrumbProp {
	backLink: string;
	breadCrumb: {
		title: string;
		url: string;
	}[];
}

export interface IUser {
	following: string[];
	createdAt: string;
	email: string;
	full_name: string;
	isFake: boolean;
	level: number;
	role: string;
	status: true;
	updatedAt: string;
	username: string;
	avatar: string;
	follower: string[];
	tip: number;
	like: number;
	_id: string;
	matchs: string[];
	tips?: number;
	leagues: string[];
}

export interface IMessage {
	content: string;
	createdAt: string;
	isHome: boolean;
	updatedAt: string;
	_id: string;
	user: IUser;
}

export interface IMatch {
	extraExplain: any;
	isHot: boolean;
	_id: string;
	date: string;
	matchId: string;
	leagueType: 2;
	leagueId: string;
	leagueName: string;
	leagueShortName: string;
	leagueColor: string;
	subLeagueId: string;
	subLeagueName: string;
	matchTime: number;
	halfStartTime: number;
	status: number;
	homeId: string;
	homeName: string;
	homeIcon: string;
	awayId: string;
	awayName: string;
	awayIcon: string;
	homeScore: number;
	awayScore: number;
	homeHalfScore: number;
	awayHalfScore: number;
	homeRed: number;
	awayRed: number;
	homeYellow: number;
	awayYellow: number;
	homeCorner: number;
	awayCorner: number;
	homeRank: string;
	awayRank: string;
	season: string;
	stageId: string;
	round: string;
	group: string;
	location: string;
	weather: string;
	temperature: string;
	explain: string;
	hasLineup: false;
	neutral: false;
	showBanner: false;
	bannerUrl: string;
	showHome: false;
	preventiveLinks: string[];
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface IMatchGroupLeague {
	_id: string;
	leagueName: string;
	listMatches: any[];
}

export interface IGroup {
	_id: string;
	groupName: string;
	createdBy: string;
	groupAvatar: string;
	groupDesc: string;
	member: string[];
	tip: number;
}

export interface IComment {
	_id: string;
	content: string;
	user: IUser;
	tip: string;
	createdAt: string;
}

export interface ITip {
	_id: string;
	title: string;
	slug: string;
	user: IUser;
	content: string;
	alt: string;
	matchId: string;
	createdAt: string;
	description: string;
	group: IGroup;
	view: number;
	like: number;
	likes: string[];
	comment: number | IComment[];
	odd?: any;
}

export interface IAuthContext {
	user: IUser;
	uploadAvatar: (fileName: string) => void;
	setUser: (user: IUser) => void;
	authUser: (
		username: string,
		password: string
	) => Promise<
		| {
				success: boolean;
				message?: undefined;
		  }
		| {
				success: boolean;
				message: any;
		  }
		| undefined
	>;
	registerUser: (
		name: string,
		username: string,
		email: string,
		password: string
	) => Promise<
		| {
				success: boolean;
				message?: undefined;
		  }
		| {
				success: boolean;
				message: any;
		  }
		| undefined
	>;
	error: any;
	setError: (params: any) => void;
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	logOutUser: () => void;
	isLogin: boolean;
	setIsLogin: (isLogin: boolean) => void;
	updateAuthUser: (user: IUser) => void;
	favouriteLeagues: ILeague[];
}

export interface INews {
	_id?: string;
	title?: string;
	slug?: string;
	thumbnail?: string;
	category?: object;
	alt?: string;
	seo_description?: string;
	tags?: string[];
	user?: string;
	createdAt?: string;
	updatedAt?: string;
	content?: string;
}

export interface IVote {
	_id?: string;
	home: string[];
	draw: string[];
	away: string[];
	matchId: string;
	total: number;
}

export interface IRank {
	_id?: string;
	username: string;
	full_name: string;
	level: number;
	tips: number;
}

export interface ILeague {
	_id: string;
	leagueId: string;
	type: number;
	color: string;
	logo: string;
	name: string;
	shortName: string;
	subLeagueName: string;
	totalRound: number;
	currentRound: number;
	currentSeason: string;
	countryId: string;
	country: string;
	countryLogo: string;
	areaId: number;
}

export interface ILineupItem {
	playerId: string;
	name: string;
	number: number;
	position: number;
}

export interface ILineup {
	matchId: string;
	homeFormation: string;
	awayFormation: string;
	homeLineup: ILineupItem[];
	awayLineup: ILineupItem[];
	homeBackup: ILineupItem[];
	awayBackup: ILineupItem[];
}

export interface IRankGroupItem {
	groupName: "Group A";
	scoreItems: {
		rank: number;
		teamId: string;
		teamName: string;
		color: string;
		totalCount: number;
		winCount: number;
		drawCount: number;
		loseCount: number;
		getScore: number;
		loseScore: number;
		goalDifference: number;
		integral: number;
	}[];
}
