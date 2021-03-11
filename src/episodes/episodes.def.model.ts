import { ApiProperty } from "@nestjs/swagger";

export class Episode {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    minutes: string;
}