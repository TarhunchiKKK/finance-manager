import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CategoryAuthorGuard } from './guards/category-author.guard'

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    create(@Body() createCategoryDto: CreateCategoryDto, @Req() request) {
        return this.categoryService.create(createCategoryDto, +request.user.id)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() request) {
        return this.categoryService.findAll(+request.user.id)
    }

    @Get(':type/:id')
    @UseGuards(JwtAuthGuard, CategoryAuthorGuard)
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(+id)
    }

    @Patch(':type/:id')
    @UseGuards(JwtAuthGuard, CategoryAuthorGuard)
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(+id, updateCategoryDto)
    }

    @Delete(':type/:id')
    @UseGuards(JwtAuthGuard, CategoryAuthorGuard)
    remove(@Param('id') id: string) {
        return this.categoryService.remove(+id)
    }
}
