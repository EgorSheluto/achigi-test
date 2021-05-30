import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MainConfigService {
	constructor(
		private readonly configService: ConfigService,
	) {}

	get type(): string {
		return this.configService.get<string>('postgresql.type');
	}

	get host(): string {
		return this.configService.get<string>('postgresql.host');
	}

	get port(): number {
		return Number(this.configService.get<number>('postgresql.port'));
	}

	get username(): string {
		return this.configService.get<string>('postgresql.username');
	}

	get password(): string {
		return this.configService.get<string>('postgresql.password');
	}

	get database(): string {
		return this.configService.get<string>('postgresql.database');
	}

	get entities(): string {
		return this.configService.get<string>('postgresql.entities');
	}

	get synchronize(): boolean {
		return this.configService.get<string>('postgresql.synchronize') === 'true';
	}

	get loggingBoolean(): boolean {
		console.log(this.configService.get<string>('postgresql.logging'));
		return this.configService.get<string>('postgresql.logging') === 'true';
	}

	get loggingArray(): string[] {
		return this.configService.get<string[]>('postgresql.logging');
	}
}
