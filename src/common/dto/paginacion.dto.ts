import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";


export class PaginacionDto{
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsPositive()
    offset?: number;
}