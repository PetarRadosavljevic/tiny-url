import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class DomainVisitsRequestDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    {
      message: 'Limit should be a number.',
    },
  )
  @Min(1, {
    message: `Limit should be at least 1.`,
  })
  @Max(100, {
    message: `Limit should be at most 100.`,
  })
  @ApiProperty({ required: false })
  readonly limit: number = 10;
}
