import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Project } from 'src/schemas/project.schema';

export class UpdateTransferOrderDto {
  @IsOptional()
  @IsString()
  driverName: string;

  @IsOptional()
  @IsMongoId()
  fromProject: Project;

  @IsOptional()
  @IsMongoId()
  toProject: Project;
}
