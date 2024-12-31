import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from './entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}
