import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyEntity } from './entities/property.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {}

  async create(
    createPropertyDto: CreatePropertyDto,
    logger: UserEntity,
  ): Promise<PropertyEntity> {
    const property = await this.propertyRepository.create(createPropertyDto);
    property.addedBy = logger;
    return await this.propertyRepository.save(property);
  }

  async findAll(): Promise<PropertyEntity[]> {
    return await this.propertyRepository.find();
  }

  async findOne(id: number): Promise<PropertyEntity> {
    const pro = await this.propertyRepository.findOneBy({ id });
    if (!pro) throw new NotFoundException('not found');
    return pro;
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  async remove(id: number): Promise<void> {
    const property = await this.findOne(id);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found.`);
    }
    await this.propertyRepository.delete(id);
  }
}
