
export interface EnvConfig {
	[key:string]: {
		name: string;
		defaultValue?: any;
		type?: string;
	}
}

export interface EnvResult {
	[key: string]: any;
}

declare const _default: {
	initialize(config:EnvConfig):EnvResult;
}

export default _default;
