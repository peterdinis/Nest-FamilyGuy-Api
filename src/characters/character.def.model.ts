import { ApiProperty } from "@nestjs/swagger";

export class Character {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    image: string;
}