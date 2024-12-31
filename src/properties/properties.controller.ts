import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { PropertyEntity } from './entities/property.entity';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { Logger } from 'src/utility/decorators/logger.decorator';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.USER]))
  @Post()
  async create(
    @Body() createPropertyDto: CreatePropertyDto,
    @Logger() logger: UserEntity,
  ): Promise<PropertyEntity> {
    return await this.propertiesService.create(createPropertyDto, logger);
  }

  @Get('dashboard/all')
  async findAll(): Promise<PropertyEntity[]> {
    return await this.propertiesService.findAll();
  }

  @Get('dashboard/:id')
  async findOne(@Param('id') id: string): Promise<PropertyEntity> {
    return await this.propertiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.USER]))
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    const property = await this.propertiesService.findOne(+id);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found.`);
    }
    await this.propertiesService.remove(+id);
    return `Property with ID ${id} has been successfully removed.`;
  }
}
