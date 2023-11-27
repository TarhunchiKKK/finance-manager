import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    Req,
    UseGuards,
    Query,
} from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    create(@Body() createTransactionDto: CreateTransactionDto, @Req() request) {
        return this.transactionService.create(createTransactionDto, +request.user.id)
    }

    @Get('pagination')
    @UseGuards(JwtAuthGuard)
    findAllWithPagination(@Req() request, @Query('page') page:  number = 1, @Query('limit') limit: number = 3) {
        return this.transactionService.findAllWithPagination(+request.user.id, +page, +limit)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() request) {
        return this.transactionService.findAll(+request.user.id)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.transactionService.findOne(+id)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
        return this.transactionService.update(+id, updateTransactionDto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.transactionService.remove(+id)
    }
}
