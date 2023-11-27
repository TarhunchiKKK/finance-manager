import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}
    
    async create(createCategoryDto: CreateCategoryDto, userId: number): Promise<Category> {
        const isExist = await this.categoryRepository.findBy({
            user: {
                id: userId,
            },
            title: createCategoryDto.title,
        })

        if (isExist.length) throw new BadRequestException('This category lready exists')

        const newCategory = { 
            title: createCategoryDto.title, 
            user: {
                id: userId,
            }
        }

        return await this.categoryRepository.save(newCategory)
    }

    async findAll(userId: number): Promise<Category[]> {
        return await this.categoryRepository.find({
            where:  {
                user: {
                    id: userId,
                }
            },
            relations: {
                transactions: true,
            }
        })
    }

    async findOne(id: number): Promise<Category> {
        const category: Category = await this.categoryRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                user: true,
                transactions: true,
            }
        }) 

        if (!category) throw new NotFoundException('Category not found')

        return category
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        const category: Category = await this.categoryRepository.findOne({
            where: {
                id: id,
            },
        })

        if (!category) throw new NotFoundException('Category not exist')

        return await this.categoryRepository.update(id, updateCategoryDto)
    }

    async remove(id: number) {
        const category: Category = await this.categoryRepository.findOne({
            where: {
                id: id,
            }
        })

        if (!category) throw new NotFoundException('Category not exist')

        return await this.categoryRepository.delete(id)
    }
}
